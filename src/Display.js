import IFrame from './IFrame'
import editorStyle from './styles/editor.css'

const CURSOR_BLINK = 600

export default class Display {
  /**
   * @param {Object} options
   * @param {MathJax} options.mathJax
   * @param {HTMLElement} options.target
   */
  constructor (options = {}) {
    /** @type {MathJax} */
    this.mathJax = options.mathJax
    /** @type {IFrame} */
    this.iframe = new IFrame(options.target)
    /** @type {HTMLElement} */
    this.cursor = document.createElement('mje-cursor')
    /** @type {Number|null} */
    this.cursorBlink = null

    this.prepareHead()
    this.prepareBody()
    this.updateCursorBlink()
  }

  /**
   * @return {Void}
   */
  prepareHead () {
    this.iframe.addStyle('mathjax', this.mathJax.chtmlStylesheet())
    this.iframe.addStyle('editor', editorStyle)
  }

  /**
   * @return {Void}
   */
  prepareBody () {
    this.iframe.addElement('mathjax', null)
    this.iframe.addElement('cursor', this.cursor)
  }

  /**
   * @param {HTMLElement} math
   * @return {Promise}
   */
  render (math) {
    return this.mathJax.mathml2chtmlPromise(math.outerHTML).then((renderedMath) => {
      this.iframe.updateElement('mathjax', renderedMath)
      this.iframe.updateStyle('mathjax', this.mathJax.chtmlStylesheet())
    })
  }

  /**
   * @param {HTMLElement} element
   * @return {DOMRect}
   */
  getElementRect (element) {
    const rect = element.getBoundingClientRect()
    if (this.iframe.body.scrollLeft > 0) {
      rect.x += this.iframe.body.scrollLeft
    }
    if (this.iframe.body.scrollTop > 0) {
      rect.y += this.iframe.body.scrollTop
    }
    return rect
  }

  /**
   * @typedef {Object} DisplayElement
   * @property {HTMLElement} dom
   * @property {DOMRect} rect
   */
  /**
   * @param {String} id
   * @return {DisplayElement}
   */
  getElementById (id) {
    const dom = this.iframe.document.getElementById(id)
    const rect = this.getElementRect(dom)
    return { dom, rect }
  }

  /**
   * @param {Number} index
   * @return {DisplayElement}
   */
  getEndOfLineByIndex (index) {
    const dom = this.iframe.document.querySelectorAll('[type=eof]')[index]
    const rect = this.getElementRect(dom)
    return { dom, rect }
  }

  /**
   * @param {Object} properties
   * @param {Boolean} disableScrollIntoView
   * @return {Void}
   */
  updateCursor (properties, disableScrollIntoView) {
    this.cursor.style.left = properties.x + 'px'
    this.cursor.style.top = properties.y + 'px'
    this.cursor.style.height = properties.height + 'px'
    if (!disableScrollIntoView) {
      this.iframe.body.scrollLeft = properties.x - (this.iframe.window.innerWidth / 2)
    }
    this.updateCursorBlink(true)
  }

  /**
   * @param {Boolean} reset
   * @return {Void}
   */
  updateCursorBlink (reset = false) {
    clearInterval(this.cursorBlink)
    if (reset) {
      this.cursor.className = ''
    }
    this.cursorBlink = setInterval(() => {
      this.cursor.classList.toggle('hidden')
      this.updateCursorBlink()
    }, CURSOR_BLINK)
  }

  /**
   * @param {String} type
   * @param {Function} listener
   * @return {Void}
   */
  on (type, listener) {
    return this.iframe.document.addEventListener(type, listener)
  }

  /**
   * @return {Void}
   */
  focus () {
    this.iframe.window.focus()
  }
}
