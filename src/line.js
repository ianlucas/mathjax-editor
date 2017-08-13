export default class Line {
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
   * @param {HTMLElement} $rendered
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
   * @return {Element}
   */
  getFirstElement() {
    return this.elements[0]
  }

  /**
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
   * @param {Number} y
   */
  betweenYAxis(y) {
    return y > this.y1 && y < this.y2
  }

  /**
   * @param {Number} x
   */
  betweenXAxis(x) {
    return x > this.x1 && x < this.x2
  }
}