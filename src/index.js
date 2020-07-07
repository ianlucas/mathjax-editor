import Editor from './Editor'

export default {
  version: '4.0.0',

  /**
   * Creates an instance of the editor.
   *
   * @param {MathJax} mathJax
   * @param {Object} options
   * @param {HTMLElement} options.target
   */
  createUsing (mathJax, options) {
    return new Editor(mathJax, options)
  }
}
