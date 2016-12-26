import Editor from './Editor';
import extendMathJax from './extendMathJax';

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
    this.version = '1.1.7';
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
  insertCommand(command, blockCount = 1, brackets = false) {
    this.core.insertCommand(command, blockCount, brackets);
  }

  /**
   * Insert a piece of text in editor's value.
   * 
   * @param {String} value
   * 
   * @return {Void}
   */
  insert(value) {
    this.core.insert(value);
  }

  /**
   * Get editor's jax.
   * 
   * @deprecated
   * 
   * @return {String}
   */
  getJax() {
    console.warn('[deprecated] getJax is deprecated, use getValue instead.')
    return this.core.value;
  }

  /**
   * Get editor's value.
   * 
   * @deprecated
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