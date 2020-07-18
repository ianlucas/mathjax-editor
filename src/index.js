import Editor from './Editor'

export default {
  version: '4.0.0',

  /**
   * @typedef {Object} MathJaxEditorOptions
   * @property {HTMLElement} target
   * @property {String[]} allowedTags
   * @property {Boolean} readonly
   */
  /**
   * @param {MathJax} mathJax
   * @param {MathJaxEditorOptions} options
   */
  createUsing (mathJax, options) {
    return new Editor(mathJax, options)
  }
}
