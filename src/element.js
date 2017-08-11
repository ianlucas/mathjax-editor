export default class Element {
  /**
   * @param {HTMLElement}  $el
   * @param {HTMLElement}  $rendered
   */
  constructor($el, $rendered) {
    const bounding = $rendered.getBoundingClientRect()

    /** @type {HTMLElement} */
    this.$el = $el
    /** @type {HTMLElement} */
    this.$rendered = $rendered
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
    /** @type {Number} */
    this.cx = this.x1 + (this.width / 2)
    /** @type {Number} */
    this.cy = this.y1 + (this.height / 2)
  }

  /**
   * @return {String}
   */
  getTag() {
    return this.$el.tagName
  }
  
  /**
   * @param {String} tag 
   * 
   * @return {Boolean}
   */
  isTag(tag) {
    return this.getTag().toLowerCase() === tag.toLowerCase()
  }

  /**
   * @return {Boolean}
   */
  hasChildren() {
    return !!this.$el.children.length
  }

  /**
   * @return {HTMLElement}
   */
  getRendered() {
    return this.$rendered
  }

  /**
   * @return {HTMLElement}
   */
  getNode() {
    return this.$el
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * 
   * @return {Boolean}
   */
  pointIn(x, y) {
    return x > this.x1 &&
      x < this.x2 &&
      y > this.y1 &&
      y < this.y2
  }

  /**
   * @param {Number} x 
   * @param {Number} y 
   * 
   * @return {Number}
   */
  distanceTo(x, y) {
    return Math.sqrt(Math.pow(x - this.cx, 2) + Math.pow(y - this.cy, 2))
  }

  /**
   * @param {Number} x
   * 
   * @return {Boolean}
   */
  isLeftSide(x) {
    if (this.isTag('mrow')) {return false}
    return this.cx > x
  }
}