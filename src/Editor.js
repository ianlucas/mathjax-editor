import Placer from './Placer';
import { 
  mustFindElement,
  insertBetween,
  addClass,
  removeClass
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
   * 
   * @constructor
   */
  constructor({ el, debug = false, focusClass = 'isFocused' }) {
    const Element = MathJax.HTML.Element;

    const $el = mustFindElement(el);
    const $container = Element('div', { className: 'mj-ed-container' });
    const $input = Element('input', { className: 'mj-ed-input' });
    const $display = Element('div', { className: 'mj-ed-display' }, ['\\(\\cursor\\)']);
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
      ['Typeset', MathJax.Hub, $display], () => {
        this.jaxElement = MathJax.Hub.getAllJax($display)[0];
      }, () => {
        $display.style.opacity = 1;
        $display.style.minHeight = `${$display.offsetHeight}px`;
        this.updateCursorElement({ hidden: true });
      }
    );

    this.$container = $container;
    this.$debug = $debug;
    this.$display = $display;
    this.$input = $input;
    this.cursor = 0;
    this.placer = null;
    this.debug = debug;
    this.focusClass = focusClass;
    this.value = '';
  }

  /**
   * This will update `this.$display`'s jax. Also will update `this.$debug`
   * inner HTML if the options.debug is enabled.
   * 
   * @param {String} value - Jax to be used. It defaults to the editor's value.
   * 
   * @return {Void}
   */
  update(value = this.value) {
    const cursor = this.cursor;
    const valueWithCursor = insertBetween(value, cursor, '{\\cursor}')
      .replace(/\d/g, n => `{${n}}`)
      .replace(/\{\}/g, '{\\isEmpty}')
      .replace(/\{\{\\cursor\}\}/g, '{{\\cursor}\\isEmpty}');

    if (this.debug) {
      this.$debug.innerHTML = insertBetween(value, cursor, '|');
    }

    this.updateJaxElement(
      valueWithCursor, () => {
        setTimeout(() => {
          this.placer = Placer.read(this, cursor => {
            console.log(`The cursor should be placed at ${cursor}`);
            this.cursor = cursor;
            this.update();
          });
        }, 20);

        this.updateCursorElement();
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
      ['Text', this.jaxElement, jax],
      callback
    );
  }

  /**
   * This updates the cursor position based on the amount
   * of movement is given.
   * 
   * PS: The meaning of the variable `next` is not the next index,
   *     but the next value the cursor will hold.
   * 
   * @param {Number} amount
   * 
   * @return {Void}
   */
  updateCursor(amount = 0) {
    let next = this.cursor + amount;
    const current = this.cursor;
    const value = this.value;
    const length = value.length;

    // Moving to the left.

    if (amount < 0) {
      if (value[next] === '{'
            && value[next - 1] !== '}') {
        let i = next;
        while (i--) {
          if (value[i] === '\\') {
            break;
          }
        }
        next = i;
      }

      if (value[next - 1] === '}') {
        next -= 1;
      }

      if (value[next] === '\\'
            && value[next - 1] === '\\') {
        next -= 1;
      }

      if (value[next] === ' ') {
        let i = next;
        while (i--) {
          if (value[i] === '\\') {
            break;
          }
        }
        next = i;
      }
    }

    // Moving to the right.

    if (amount > 0) {
      if (value[current] === '\\' && value[next] !== '\\') {
        let i = current;
        while (i++ < length) {
          if (value[i] === '{') {
            break;
          }

          if (value[i] === ' ') {
            i += 1;
            break;
          }
        }
        next = i;
      }

      if (value[next] === '{') {
        next += 1;
      }

      if (value[current] === '\\'
            && value[next] === '\\') {
        next += 1;
      }
    }

    this.cursor = next;
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
    const hidden = options.hidden || false;
    
    MathJax.Hub.Queue(() => {
      const $cursor = this.$display.querySelector('.mjx-cursor');
      if (!$cursor) {
        return;
      }
      if (!$cursor.style.marginLeft) {
        $cursor.style.marginLeft = `-${$cursor.offsetWidth}px`;
      }
      $cursor.style.display = hidden ? 'none' : 'inline-block';
    });
  }

  /**
   * Find a jax command at given position.
   * 
   * For instance, consider this as the current value of the editor:
   * 
   *     '\sqrt{2}'
   * 
   * If the given position is the index of any character of the
   * command '\sqrt', it will return the start and the end of the
   * command.
   * 
   * @param {Number} position
   * 
   * @return {Object}
   */
  findCommandAt(position) {
    const coordinates = { start: null, end: null };
    const value = this.value;
    const length = value.length;
    const previous = position - 1;
    const next = position + 1;
    let i;
    
    i = next;

    while (i--) {
      if (value[i] === '\\') {
        coordinates.start = i;
        break;
      }
    }

    i = previous;

    while (i++ < value.length) {
      if (value[i] === '}' && value[i + 1] !== '{') {
        coordinates.end = i;
        break;
      }

      if (value[i - 1] === ' ') {
        coordinates.end = i - 1;
        break;
      }
    }

    if (coordinates.end === null) {
      coordinates.end = i;
    }

    return coordinates;
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
    const $input = this.$input;
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
        if (this.cursor > 0) {
          this.updateCursor(-1);
        }
        return;

      case KEY_RIGHT:
        if (this.cursor < this.value.length) {
          this.updateCursor(1);
        }
        return;

      case KEY_BACKSPACE:
        this.erase();
        return;

      case KEY_DELETE:
        this.delete();
        return;

      case KEY_ENTER:
        this.insert('\\\\');
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
    
    this.placer.fireClick(e);
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    this.$input.focus();
    this.updateCursorElement({ hidden: false });
    addClass(this.$display, this.focusClass);
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */
  blur() {
    this.$input.blur();
    this.updateCursorElement({ hidden: true });
    removeClass(this.$display, this.focusClass);
  }

  /**
   * Insert a piece of text in editor's value.
   * 
   * @param {String} value
   * 
   * @return {Void}
   */
  insert(value) {
    const cursor = this.cursor;
    const current = this.value;

    this.cursor += value.length;
    this.value = insertBetween(current, cursor, value);

    this.update();
  }

  /**
   * Inserts a command in the editor.
   * 
   * The cursor will moved to the first "block" ({}).
   * 
   * @param {String} command - The command.
   * @param {Number} blockCount - The quantity of blocks it requires.
   * 
   * @return {Void}
   */
  insertCommand(command, blockCount = 1) {
    this.focus();

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

    const value = this.value;
    const cursor = this.cursor;
    const blocks = '}' + '{}'.repeat(blockCount - 1);

    this.value = insertBetween(value, cursor, blocks);
    this.update();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  erase() {
    const current = this.cursor;
    const previous = this.cursor - 1;
    const value = this.value;

    let before;
    let after;

    // Check if we are erasing a command.
    if (~['{', '}', ' '].indexOf(value[previous])) {
      const coordinates = this.findCommandAt(current);
      before = value.slice(0, coordinates.start);
      after = value.slice(coordinates.end + 1);
    }
    else {
      let beforeIndex = current - 1;

      // Check if we are erasing a new line.
      if (value[previous] === '\\' 
            && value[previous - 1] === '\\') {
        beforeIndex -= 1;
      }

      before = value.slice(0, beforeIndex);
      after = value.slice(current);
    }

    this.value = before + after;
    this.cursor = before.length;

    this.update();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  delete() {
    const current = this.cursor;
    const next = this.cursor + 1;
    const value = this.value;

    let before;
    let after;

    // Check if we are erasing a command (and not a new line).
    if ((value[current] === '\\' && value[next] !== '\\') 
          || value[current] === '}') {
      const coordinates = this.findCommandAt(current);
      before = value.slice(0, coordinates.start);
      after = value.slice(coordinates.end + 1);
    }
    else {
      let beforeIndex = current;
      let afterIndex = next;

      // Check if we are erasing a new line.
      if (value[current] === '\\' 
            && value[next] === '\\') {
        afterIndex += 1;
      }

      before = value.slice(0, beforeIndex);
      after = value.slice(afterIndex);
    }

    this.value = before + after;
    this.cursor = before.length;

    this.update();
  }
}

export default Editor;