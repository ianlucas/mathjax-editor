import Editor from './Editor'

export default {
  version: '4.0.0',

  activeEditor: null,

  /**
   * @typedef {Object} MathJaxEditorOptions
   * @property {MathJax} mathJax
   * @property {HTMLElement} target
   * @property {String[]} allowedTags
   * @property {Boolean} readonly
   */
  /**
   * @param {MathJaxEditorOptions} options
   */
  create (options) {
    const editor = new Editor(options)
    editor.display.iframe.window.addEventListener('focus', () => {
      this.activeEditor = editor
    })
    return editor
  },

  /**
   * @param {MathJaxEditorOptions} options
   */
  initialize (options = {}) {
    return Array.from(document.querySelectorAll('mathjax-editor')).forEach((element) => {
      const editor = new Editor(Object.assign(options, {
        // We assume there is a global MathJax if it is not passed in the options.
        mathJax: options.MathJax || window.MathJax,
        target: element
      }))
      editor.display.iframe.window.addEventListener('focus', () => {
        this.activeEditor = editor
      })
    })
  }
}
