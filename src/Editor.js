import EventBus from './EventBus';
import Placer from './Placer';
import Tex from './Tex';
import constants from './constants';
import {
  addClass,
  insertBetween,
  inArray,
  mustFindElement,
  removeClass,
  removeFragment,
  repeat
} from './utils';

const { supOrSub } = constants;

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
  constructor(options) {
    const { 
      el, 
      debug = false,
      focusClass = 'isFocused',
      newLine = false,
      value = '',
      scroll = false
    } = options;

    const Element = MathJax.HTML.Element;

    const $el = mustFindElement(el, 'textarea');
    const $container = Element('div', { className: 'mj-ed-container' });
    const $input = Element('input', { className: 'mj-ed-input' });
    const $display = Element('div', { className: 'mj-ed-display' }, [`\\({\\cursor}${value}\\)`]);
    const $debug = Element('pre', { className: 'mj-ed-debug' }, ['|']);

    $el.parentNode.insertBefore($container, $el.nextSibling);
    $container.appendChild($input);
    $container.appendChild($display);
    $container.appendChild($debug);

    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
    $input.addEventListener('blur', this.blur.bind(this));
    $display.addEventListener('click', this.focus.bind(this));
    document.body.addEventListener('click', this.handleBodyClick.bind(this));

    $display.style.opacity = 0;
    $display.style.overflowX = scroll ? 'scroll' : 'hidden';
    $debug.style.display = debug ? 'block' : 'none';
    $el.style.display = 'none';

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
    this.$el = $el;
    this.bus = new EventBus;
    this.cursorIndex = 0;
    this.lastCursorTimeout = null;
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

    // Update original textarea value.
    this.$el.innerHTML = value;

    this.updateJaxElement(
      tex.displayTex,
      () => {
        setTimeout(() => {
          const placer = new Placer(this);
          placer.on('setCursor', index => {
            this.debug && console.info(`The cursor should be placed at ${index}.`);
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
    const key = points.indexOf(cursorIndex);

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
    const { $display } = this;
    const hidden = options.cursorHidden || false;
    const className = 'wasRecentlyPlaced';

    MathJax.Hub.Queue(() => {
      const $cursor = $display.querySelector('.mjx-cursor');

      if (!$cursor) {
        return;
      }

      const { offsetWidth, offsetLeft } = $cursor;

      if (!$cursor.style.marginLeft) {
        $cursor.style.marginLeft = `-${offsetWidth}px`;
      }

      if (this.lastCursorTimeout) {
        clearTimeout(this.lastCursorTimeout);
      }

      addClass($cursor, className);

      this.lastCursorTimeout = setTimeout(
        () => removeClass($cursor, className), 600
      );

      $display.scrollLeft = offsetLeft;

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
    const {
      number, variable,
      charToCommand, operators,
      escapedOperators 
    } = constants;

    const inputValue = $input.value.trim();
    let which = e.keyCode;

    $input.value = '';

    if (e.type === 'keyup') {
      which = null;
    }

    if (!inputValue.length) {
      return this.handleKeyPress(which);
    }

    inputValue.split('')
      .forEach(char => {
        if (char.match(number) || char.match(variable)) {
          return this.insert(char);
        }

        if (charToCommand.hasOwnProperty(char)) {
          return this.insertCommand(charToCommand[char]);
        }

        if (inArray(char, operators.concat(escapedOperators))) {
          return this.insertSymbol(char);
        }
      });
  }

  /**
   * Handles the key press.
   * 
   * @param {Number} which - Which key was pressed.
   * 
   * @return {Void}
   */
  handleKeyPress(which) {
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
   * Insert a character at cursor position.
   * Allowed characters: 0-9 (numbers), a-z (variables).
   * 
   * @param {String} insert
   * 
   * @return {Void}
   */
  insertChar(char) {
    const { number, variable } = constants;

    if (char.length !== 1) {
      throw new RangeError('Only one char can be inserted through this method.');
    }
    if (!char.match(number) && !char.match(variable)) {
      throw new RangeError(`Only numbers and variables are allowed in insert, not "${char}".`);
    }

    this.insert(char);
  }

  /**
   * Insert a symbol at cursor position.
   * 
   * @param {String} symbol
   */
  insertSymbol(symbol) {
    const { operators, escapedOperators } = constants;
    const symbols = operators.slice().concat(escapedOperators);

    if (!inArray(symbol, symbols)) {
      throw new RangeError(`"${symbol}" is not a valid symbol.`);
    }

    if (inArray(symbol, escapedOperators)) {
      symbol = `\\${symbol}`;
    }

    this.insert(symbol);
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

    if (command[0] !== '\\' && !inArray(command, supOrSub)) {
      command = `\\${command}`;
    }

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

          if (!props.blocks) {
            continue;
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