export default class Iframe {
  /**
   * Creates and appends an iframe to a target element.
   *
   * @param {HTMLElement} target
   */
  constructor (target) {
    this.element = document.createElement('iframe')
    this.element.className = 'mathjax-editor-input'
    this.storedStyles = {}
    this.storedElements = {}
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    target.appendChild(this.element)
    this.document = this.element.contentDocument
    this.window = this.element.contentWindow
    this.body = this.document.body
    this.head = this.document.head

    this.window.addEventListener('focus', () => this.handleFocus())
    this.window.addEventListener('blur', () => this.handleBlur())
  }

  /**
   * Create a placeholder element
   *
   * @return {HTMLElement}
   */
  createPlaceholderElement () {
    return document.createElement('void')
  }

  /**
   * Add a style to the iframe.
   *
   * @param {String} key
   * @param {HTMLElement} element
   */
  addStyle (key, element) {
    this.storedStyles[key] = element
    this.head.appendChild(element)
  }

  /**
   * Add an element to the iframe.
   *
   * @param {String} key
   * @param {HTMLElement} element
   */
  addElement (key, element) {
    this.storedElements[key] = (
      element ||
      this.createPlaceholderElement()
    )
    this.body.appendChild(
      this.storedElements[key]
    )
  }

  /**
   * Update an element of the iframe.
   *
   * @param {String} key
   * @param {HTMLElement} element
   */
  updateElement (key, newElement) {
    if (!this.storedElements[key]) {
      return
    }
    this.body.replaceChild(
      newElement,
      this.storedElements[key]
    )
    this.storedElements[key] = newElement
  }

  /**
   * Update a style of the iframe.
   *
   * @param {String} key
   * @param {HTMLElement} element
   */
  updateStyle (key, newElement) {
    if (!this.storedStyles[key]) {
      return
    }
    this.head.replaceChild(
      newElement,
      this.storedStyles[key]
    )
    this.storedStyles[key] = newElement
  }

  /**
   * Handles iframe focus.
   */
  handleFocus () {
    this.element.classList.add('isActive')
  }

  /**
   * Handles iframe blur.
   */
  handleBlur () {
    this.element.classList.remove('isActive')
  }
}
