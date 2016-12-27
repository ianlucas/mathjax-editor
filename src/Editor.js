import EventBus from './EventBus';
import Placer from './Placer';
import Tex from './Tex';
import {
  addClass,
  insertBetween,
  mustFindElement,
  removeClass,
  removeFragment,
  repeat
} from './utils';

const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DELETE = 46;

class Editor {
  /**
   * This is the main class of the Editor.
   * 
   * It contains all methods to deal with the cursor and math input.
   * It accepts an object as first argument, which must contain the options.
   * 
   * @param {Object} options
   * @param {DOMElement|String} options.el - The DOM Element itself or a string selector.
   * @param {Boolean} options.debug - Set debug mode.
   * @param {String} options.focusClass - Which class to use to identify focus.
   * @param {Boolean} options.newLine - Allow or disallow newline. (default is false)
   * 
   * @constructor
   */
  constructor({ el, debug = false, focusClass = 'isFocused', newLine = false, value = '' }) {
    const Element = MathJax.HTML.Element;

    const $el = mustFindElement(el);
    const $container = Element('div', { className: 'mj-ed-container' });
    const $input = Element('input', { className: 'mj-ed-input' });
    const $display = Element('div', { className: 'mj-ed-display' }, [`\\({\\cursor}${value}\\)`]);
    const $debug = Element('pre', { className: 'mj-ed-debug' }, ['|']);

    $el.parentNode.replaceChild($container, $el);
    $container.appendChild($input);
    $container.appendChild($display);
    $container.appendChild($debug);

    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
    $input.addEventListener('blur', this.blur.bind(this));
    $display.addEventListener('click', this.focus.bind(this));
    document.body.addEventListener('click', this.handleBodyClick.bind(this));

    $display.style.opacity = 0;
    $debug.style.display = debug ? 'block' : 'none';

    MathJax.Hub.Queue(
      () => MathJax.Hub.Typeset($display),
      () => this.jaxElement = MathJax.Hub.getAllJax($display)[0], 
      () => {
        $display.style.opacity = 1;
        $display.style.minHeight = `${$display.offsetHeight}px`;
        this.update({ cursorHidden: true });
      }
    );

    this.$container = $container;
    this.$debug = $debug;
    this.$display = $display;
    this.$input = $input;
    this.bus = new EventBus;
    this.cursorIndex = 0;
    this.placer = null;
    this.debug = debug;
    this.focusClass = focusClass;
    this.newLine = newLine;
    this.tex = new Tex(value, 0);
    this.value = value;
    this.lastValue = value;
  }

  /**
   * This will update `this.$display`'s jax. Also will update `this.$debug`
   * inner HTML if the options.debug is enabled.
   * 
   * @param {String} value - Jax to be used. It defaults to the editor's value.
   * @param {Object} cursorOptions - Options to be passed to `updateCursorElement`.
   * 
   * @return {Void}
   */
  update(cursorOptions = {}) {
    const { cursorIndex, value } = this;
    let tex = this.tex;

    if (value !== this.lastValue) {
      tex = new Tex(value, cursorIndex);
      this.tex = tex;
    }

    if (this.debug) {
      this.$debug.innerHTML = insertBetween(value, cursorIndex, '|');
    }

    this.updateJaxElement(
      tex.displayTex,
      () => {
        setTimeout(() => {
          const placer = new Placer(this);
          placer.on('setCursor', index => {
            this.debug && console.log(`The cursor should be placed at ${index}.`);
            this.cursorIndex = index;
            this.update();
          });
          this.placer = placer;
        }, 16);
        this.updateCursorElement(cursorOptions);
      }
    );
  }

  /**
   * Updates the Jax Element inside of `this.display`.
   * 
   * @param {String} jax
   * @param {Function} callback
   * 
   * @return {Void}
   */
  updateJaxElement(jax, callback = Function) {
    MathJax.Hub.Queue(
      () => this.jaxElement.Text(jax),
      callback
    );
  }

  /**
   * This updates the cursor position based on the amount
   * of movement is given.
   * 
   * @param {Number} amount
   * 
   * @return {Void}
   */
  updateCursor(amount = 0) {
    const cursorIndex = this.cursorIndex;
    const points = this.tex.cursorPoints;
    const key = points.indexOf(cursorIndex)

    let to = cursorIndex;

    if (amount > 0) {
      to = points[key + 1];
    }
    else if (amount < 0) {
      to = points[key - 1];
    }

    this.cursorIndex = to;
    this.update();
  }

  /**
   * Update the cursor element.
   * 
   * @param {Object} options
   * @param {Boolean} options.hidden
   * 
   * @return {Void}
   */
  updateCursorElement(options = {}) {
    const hidden = options.cursorHidden || false;

    MathJax.Hub.Queue(() => {
      const $cursor = this.$display.querySelector('.mjx-cursor');
      if (!$cursor) {
        return;
      }
      if (!$cursor.style.marginLeft) {
        $cursor.style.marginLeft = `-${$cursor.offsetWidth}px`;
      }

      // Fix #7
      if (this._cursorRecentlyPlaced) {
        clearTimeout(this._cursorRecentlyPlaced);
      }
      addClass($cursor, 'wasRecentlyPlaced');
      this._cursorRecentlyPlaced = setTimeout(() => {
        removeClass($cursor, 'wasRecentlyPlaced');
      }, 600);

      $cursor.style.display = hidden ? 'none' : 'inline-block';
    });
  }

  setValue(value) {
    this.lastValue = this.value;
    this.value = value;
  }

  /**
   * This will handle the events of `this.$input`.
   * It captures the key pressed and what the user have typed.
   * 
   * @param {KeyboardEvent} e
   * 
   * @return {Void}
   */
  handleInputEvent(e) {
    const { $input } = this;
    const inputValue = $input.value.trim();
    let which = e.keyCode;

    $input.value = '';

    if (e.type === 'keyup') {
      which = null;
    }

    if (!inputValue.length) {
      return this.handleInput(which);
    }

    const translate = {
      '+': '+',
      '-': '-',
      '=': '=',
      ',': ',',
      '.': '.',
      '*': '\\cdot ',
      '/': '\\div '
    };

    const test = {
      char: /[\d\w]/
    };

    inputValue.split('')
      .forEach(char => {
        if (!char.match(test.char) && !translate[char]) {
          return;
        }

        if (translate[char]) {
          char = translate[char];
        }

        this.handleInput(which, char);
      });
  }

  /**
   * Handles the user input.
   * 
   * @param {Number} which - Which key was pressed.
   * @param {String} char - The character that was typed.
   * 
   * @return {Void}
   */
  handleInput(which, char) {
    switch (which) {
      case KEY_LEFT:
        this.moveCursorLeft();
        return;

      case KEY_RIGHT:
        this.moveCursorRight();
        return;

      case KEY_BACKSPACE:
        this.erase();
        return;

      case KEY_DELETE:
        this.delete();
        return;

      case KEY_ENTER:
        if (this.newLine) {
          this.insert('\\\\');
        }
        return;
    }

    if (which && this.debug) {
      console.warn(`The key ${which} was pressed.`);
    }

    if (!char) {
      return;
    }

    this.insert(char);
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveCursorLeft() {
    if (this.cursorIndex > 0) {
      this.updateCursor(-1);
    }
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void}
   */
  moveCursorRight() {
    if (this.cursorIndex < this.value.length) {
      this.updateCursor(1);
    }
  }
  
  /**
   * When document.body is clicked, this will check if the
   * cursor can be moved.
   * 
   * @see Placer
   * 
   * @param {Event} e
   * 
   * @return {Void}
   */
  handleBodyClick(e) {
    if (!this.placer) {
      return;
    }
    
    this.placer.trigger('click', e);
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    this.$input.focus();
    this.updateCursorElement({ cursorHidden: false });
    this.bus.trigger('focus');
    addClass(this.$display, this.focusClass);
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */
  blur() {
    this.$input.blur();
    this.updateCursorElement({ cursorHidden: true });
    this.bus.trigger('blur');
    removeClass(this.$display, this.focusClass);
  }

  /**
   * Insert a piece of text in editor's value.
   * 
   * @param {String} chars
   * 
   * @return {Void}
   */
  insert(chars) {
    const { cursorIndex, value } = this;

    this.cursorIndex += chars.length;

    this.setValue(insertBetween(value, cursorIndex, chars));
    this.update();
  }

  /**
   * Inserts a command in the editor.
   * 
   * The cursor will moved to the first "block" ({}).
   * 
   * @param {String} command - The command.
   * @param {Number} blockCount - The quantity of blocks it requires.
   * @param {Boolean} brackets - If brackets should be placed.
   * 
   * @return {Void}
   */
  insertCommand(command, blockCount = 0, brackets = false) {
    this.focus();

    if (brackets) {
      command += '[]';
    }

    if (blockCount > 0) {
      command += '{';
    }
    else {
      command += ' ';
    }

    this.insert(command);

    if (blockCount < 1) {
      return;
    }

    const { value, cursorIndex } = this;
    const blocks = '}' + repeat('{}', blockCount - 1);

    this.setValue(insertBetween(value, cursorIndex, blocks));
    this.update();
  }

  /**
   * Apply a deletion method based on cursor position.
   * 
   * @param {String} method - Available: "erase" and "delete".
   * 
   * @return {Void}
   */
  applyDeletion(method) {
    const { cursorIndex, tex } = this;
    const prevIndex = cursorIndex - 1;
    const elements = tex.elements;

    let deletionStart = null;
    let deletionEnd = null;
    let comparator;
    let startOrEnd;
    let openOrClose;
    let numVarDeletionStart;
    let numVarDeletionEnd;

    switch (method) {
      case 'erase':
        if (cursorIndex === 0) {
          return;
        }
        comparator = prevIndex;
        startOrEnd = 'end';
        openOrClose = 'openIndex';
        numVarDeletionStart = prevIndex;
        numVarDeletionEnd = cursorIndex;
        break;

      case 'delete':
        if (cursorIndex === tex.length) {
          return;
        }
        comparator = cursorIndex;
        startOrEnd = 'start';
        openOrClose = 'closeIndex';
        numVarDeletionStart = cursorIndex;
        numVarDeletionEnd = cursorIndex + 1;
        break;

      default:
        throw new RangeError(`Unknown method "${method}".`);
    }

    // Deal with new lines deletion.
    if (tex.newLines[comparator]) {
      const nl = tex.newLines[comparator];
      deletionStart = nl.start;
      deletionEnd = nl.end + 1;
    }
    else {
      for (const element of elements) {
        const { index, props } = element;

        // Command deletion.
        if (props) {
          const brackets = props.brackets;

          // If is erasing at the start/end of the command/ or is erasing brackets of the command.
          if (props[startOrEnd] === comparator || (brackets && brackets[openOrClose] === comparator)) {
            deletionStart = props.start;
            deletionEnd = props.end + 1;
            break;
          }
          // If is erasing one of block opening/closing.
          for (const block of props.blocks) {
            if (block[openOrClose] === comparator) {
              deletionStart = props.start;
              deletionEnd = props.end + 1;
              break;
            }
          }
        }
        // Number/variable deletion.
        else if (index === comparator) {
          deletionStart = numVarDeletionStart;
          deletionEnd = numVarDeletionEnd;
          break;
        }
      }
    }

    this.cursorIndex = deletionStart;
    this.setValue(removeFragment(this.value, deletionStart, deletionEnd));
    this.update();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  erase() {
    this.applyDeletion('erase');
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  delete() {
    this.applyDeletion('delete');
  }

  /**
   * Listen to an event to be triggered by Editor.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    this.bus.on(type, listener);
  }
}

export default Editor;