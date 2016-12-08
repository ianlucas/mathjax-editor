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
  }

  /**
   * This inserts a command into the editor.
   * 
   * @param {String} command
   * @param {Number} blocks
   * 
   * @return {Void}
   */
  insertCommand(command, blocks = 1) {
    this.editor.insertCommand(command, blocks);
  }
}

module.exports = MathJaxEditor;