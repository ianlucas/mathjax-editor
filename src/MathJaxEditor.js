import Editor from './Editor';
import extendMathJax from './extendMathJax';
import { inArray } from './utils';
import constants from './constants';

window.addEventListener('load', extendMathJax);

/**
 * This is the MathJaxEditor class.
 * 
 * It has an API on top of the Editor class.
 */
class MathJaxEditor {
  /**
   * Creates an instance of Editor.
   * 
   * @constructor
   */
  constructor(options) {
    const core = new Editor(options);

    this.core = core;
    this.version = '1.2.10';
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */
  blur() {
    this.core.blur();
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    this.core.focus();
  }

  /**
   * This inserts a command into the editor.
   * 
   * @param {String} command
   * @param {Number} blockCount
   * @param {Boolean} brackets
   * 
   * @return {Void}
   */
  insertCommand(command, blockCount = 0, brackets = false) {
    this.core.insertCommand(command, blockCount, brackets);
  }

  /**
   * Insert a character at cursor position.
   * Allowed characters: 0-9 (numbers), a-z (variables).
   * 
   * @param {String} insert
   * 
   * @return {Void}
   */
  insert(char) {
    const { number, variable } = constants;
    if (char.length !== 1) {
      throw new RangeError('Only one char can be inserted through this method.');
    }
    if (!char.match(number) && !char.match(variable)) {
      throw new RangeError(`Only numbers and variables are allowed in insert, not "${char}".`);
    }
    this.core.insert(char);
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

    this.core.insert(symbol);
  }

  /**
   * Get editor's value.
   *  
   * @return {String}
   */
  getValue() {
    return this.core.value;
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveCursorLeft() {
    this.core.moveCursorLeft();
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void} 
   */
  moveCursorRight() {
    this.core.moveCursorRight();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  erase() {
    this.core.erase();
  }

  /**
   * Listen to an event to be triggered by the Editor.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    this.core.on(type, listener);
  }
}

module.exports = MathJaxEditor;