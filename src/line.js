export default class Line {
  /**
   * This class represents a line of the editor.
   * 
   * @constructor
   */
  constructor() {
    /** @type {Array} */
    this.elements = []
    /** @type {HTMLElement} */
    this.$rendered = null
    /** @type {Number} */
    this.width = null
    /** @type {Number} */
    this.left = null
    /** @type {Number} */
    this.x1 = null
    /** @type {Number} */
    this.x2 = null
    /** @type {Number} */
    this.y1 = null
    /** @type {Number} */
    this.y2 = null
    /** @type {Number} */
    this.left = null
    /** @type {Number} */
    this.top = null
  }

  /**
   * Set the rendered line.
   * 
   * @param {HTMLElement} $rendered
   * 
   * @return {Void}
   */
  setRendered($rendered) {
    const bounding = $rendered.getBoundingClientRect()
    this.width = bounding.width
    this.height = bounding.height
    this.x1 = bounding.left
    this.x2 = bounding.right
    this.y1 = bounding.top
    this.y2 = bounding.bottom
    this.left = $rendered.offsetLeft
    this.top = $rendered.offsetTop
    this.$rendered = $rendered
  }

  /**
   * Get the first element of this line.
   * 
   * @return {Element}
   */
  getFirstElement() {
    return this.elements[0]
  }

  /**
   * Get the last element of this line.
   * 
   * @return {Element}
   */
  getLastElement() {
    let element
    let i = this.elements.length - 1
    while (element = this.elements[i--]) {
      if (!element.isTagName('MATH')) {
        return element
      }
    }
    return null
  }

  /**
   * Check if the given y is between this line y1 and y2.
   * 
   * @param {Number} y
   * 
   * @return {Boolean}
   */
  betweenYAxis(y) {
    return y > this.y1 && y < this.y2
  }

  /**
   * Check if the given x is between this line x1 and x2.
   * 
   * @param {Number} x
   * 
   * @return {Boolean}
   */
  betweenXAxis(x) {
    return x > this.x1 && x < this.x2
  }
}