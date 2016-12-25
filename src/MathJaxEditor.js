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
    const editor = new Editor(options);

    this.editor = editor;
    this.version = '1.1.6';
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */
  blur() {
    this.editor.blur();
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    this.editor.focus();
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
    this.editor.insertCommand(command, blockCount, brackets);
  }

  /**
   * Insert a piece of text in editor's value.
   * 
   * @param {String} value
   * 
   * @return {Void}
   */
  insert(value) {
    this.editor.insert(value);
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
    return this.editor.value;
  }

  /**
   * Get editor's value.
   * 
   * @deprecated
   * 
   * @return {String}
   */
  getValue() {
    return this.editor.value;
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveCursorLeft() {
    this.editor.moveCursorLeft();
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void} 
   */
  moveCursorRight() {
    this.editor.moveCursorRight();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  erase() {
    this.editor.erase();
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
    this.editor.on(type, listener);
  }
}

module.exports = MathJaxEditor;