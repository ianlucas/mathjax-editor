export default class IFrame {
  /**
   * @param {HTMLElement} target
   */
  constructor (target) {
    /** @type {HTMLIFrameElement} */
    this.element = document.createElement('iframe')
    this.element.className = 'mathjax-editor-input'
    /** @type {Object} */
    this.storedStyles = {}
    /** @type {Object} */
    this.storedElements = {}

    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    target.parentNode.replaceChild(this.element, target)

    /** @type {Document} */
    this.document = this.element.contentDocument
    /** @type {Window} */
    this.window = this.element.contentWindow
    /** @type {HTMLElement} */
    this.body = this.document.body
    /** @type {HTMLHeadElement} */
    this.head = this.document.head

    this.window.addEventListener('focus', () => this.handleFocus())
    this.window.addEventListener('blur', () => this.handleBlur())
    this.body.classList.add('isInactive')
  }

  /**
   * @return {HTMLElement}
   */
  createPlaceholderElement () {
    return document.createElement('void')
  }

  /**
   * @param {String} key
   * @param {HTMLElement} element
   * @return {Void}
   */
  addStyle (key, element) {
    this.storedStyles[key] = element.cloneNode(true)
    this.head.appendChild(this.storedStyles[key])
  }

  /**
   * @param {String} key
   * @param {HTMLElement} element
   * @return {Void}
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
   * @param {String} key
   * @param {HTMLElement} newElement
   * @return {Void}
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
   * @param {String} key
   * @param {HTMLElement} newElement
   * @return {Void}
   */
  updateStyle (key, newElement) {
    if (!this.storedStyles[key]) {
      return
    }
    const cloneElement = newElement.cloneNode(true)
    this.head.replaceChild(
      cloneElement,
      this.storedStyles[key]
    )
    this.storedStyles[key] = cloneElement
  }

  /**
   * @return {Void}
   */
  handleFocus () {
    this.element.classList.add('isActive')
    this.body.classList.remove('isInactive')
  }

  /**
   * @return {Void}
   */
  handleBlur () {
    this.element.classList.remove('isActive')
    this.body.classList.add('isInactive')
  }
}
