import Editor from './Editor'

export default {
  version: '4.0.0',

  /**
   * @param {MathJax} mathJax
   * @param {Object} options
   * @param {HTMLElement} options.target
   * @return {Editor}
   */
  createUsing (mathJax, options) {
    return new Editor(mathJax, options)
  }
}
