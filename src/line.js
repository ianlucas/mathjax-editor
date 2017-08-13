export default class Line {
  /**
   * @param {HTMLElement} $rendered  
   */
  constructor($el, $rendered) {
    const bounding = $rendered.getBoundingClientRect()

    /** @type {HTMLElement} */
    this.$el = $el
    /** @type {HTMLElement} */
    this.$rendered = $rendered
    /** @type {Number} */
    this.top = $rendered.offsetTop
    /** @type {Number} */
    this.left = $rendered.offsetLeft
    /** @type {Number} */
    this.width = bounding.width
    /** @type {Number} */
    this.height = bounding.height
    /** @type {Number} */
    this.x1 = bounding.left
    /** @type {Number} */
    this.x2 = bounding.right
    /** @type {Number} */
    this.y1 = bounding.top
    /** @type {Number} */
    this.y2 = bounding.bottom
    /** @type {HTMLElement} */
    this.$firstEl = null
    /** @type {HTMLElement} */
    this.$lastEl = null
    /** @type {Array} */
    this.elements = []
  }

  /** @type {HTMLElement} */
  getNode() {
    return this.$el
  }

  /** @type {HTMLElement} */
  getRendered() {
    return this.$rendered
  }

  /**
   * @param {Number} y
   */
  betweenYAxis(y) {
    return y > this.y1 &&
      y < this.y2
  }

  /**
   * @param {Number} x
   */
  betweenXAxis(x) {
    return x > this.x1 &&
      x < this.x2
  }
}