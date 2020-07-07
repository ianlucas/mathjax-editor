import Iframe from './Iframe'
import editorStyle from './styles/editor.css'

export default class Display {
  /**
   * This class handles math rendering and DOM manipulation.
   *
   * @param {MathJax} mathJax - MathJax instance.`
   * @param {Object} options
   * @param {HTMLElement} options.target
   */
  constructor (mathJax, options = {}) {
    this.mathJax = mathJax
    // @TODO: Remove this default, target should be required.
    this.iframe = new Iframe(options.target || document.body)
    this.cursor = document.createElement('mje-cursor')

    this.prepareHead()
    this.prepareBody()
  }

  /**
   * Prepare iframe head.
   *
   * @return {Void}
   */
  prepareHead () {
    this.iframe.addStyle('mathjax', this.mathJax.chtmlStylesheet())
    this.iframe.addStyle('editor', editorStyle)
  }

  /**
   * Prepare iframe body.
   *
   * @return {Void}
   */
  prepareBody () {
    this.iframe.addElement('mathjax', null)
    this.iframe.addElement('cursor', this.cursor)
  }

  /**
   * Render the inputed math in the iframe.
   *
   * @param {HTMLElement} math
   *
   * @return {Promise}
   */
  render (math) {
    return this.mathJax.mathml2chtmlPromise(math.outerHTML).then((renderedMath) => {
      this.iframe.updateElement('mathjax', renderedMath)
      this.iframe.updateStyle('mathjax', this.mathJax.chtmlStylesheet())
    })
  }

  /**
   * Get element from iframe.
   *
   * @param {String} id
   */
  getElementById (id) {
    const dom = this.iframe.getDocument().getElementById(id)
    return {
      dom,
      rect: dom.getBoundingClientRect()
    }
  }

  /**
   * Get end of line by index.
   *
   * @param {Number} index
   */
  getEndOfLineByIndex (index) {
    return this.iframe.getDocument().querySelectorAll('[type=eof]')[index]
  }

  /**
   * Update cursor position on the iframe.
   *
   * @param {Object} properties
   */
  updateCursor (properties) {
    this.cursor.style.left = properties.x + 'px'
    this.cursor.style.top = properties.y + 'px'
    this.cursor.style.height = properties.height + 'px'
  }

  /**
   * Listen to events on the iframe.
   *
   * @param {String} type
   * @param {Function} listener
   */
  on (type, listener) {
    return this.iframe.getDocument().addEventListener(type, listener)
  }
}
