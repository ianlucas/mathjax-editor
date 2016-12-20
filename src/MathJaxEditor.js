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
    this.version = '1.1.0';
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
   * Get editor's jax.
   * 
   * @return {String}
   */
  getJax() {
    return this.editor.value;
  }
}

module.exports = MathJaxEditor;