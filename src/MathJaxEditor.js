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
    this.version = '1.0.1';
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
   * 
   * @return {Void}
   */
  insertCommand(command, blockCount = 1) {
    this.editor.insertCommand(command, blockCount);
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