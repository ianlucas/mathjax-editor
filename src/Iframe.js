export default class Iframe {
  /**
   * Creates and appends an iframe to a target element.
   *
   * @param {HTMLElement} target
   */
  constructor (target) {
    this.element = document.createElement('iframe')
    this.storedStyles = {}
    this.storedElements = {}
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    target.appendChild(this.element)
  }

  /**
   * Gets iframe document.
   *
   * @return {Document}
   */
  getDocument () {
    return this.element.contentDocument
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
    this.getDocument().head.appendChild(element)
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
    this.getDocument().body.appendChild(
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
    this.getDocument().body.replaceChild(
      newElement,
      this.storedElements[key]
    )
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
    this.getDocument().head.replaceChild(
      newElement,
      this.storedStyles[key]
    )
  }
}
