export default class Element {
  /**
   * @param {HTMLElement}  $el
   * @param {HTMLElement}  $rendered
   */
  constructor($el, $rendered) {
    /** @type {HTMLElement} */
    this.$el = $el
    /** @type {HTMLElement} */
    this.$rendered = $rendered
    /** @type {Line} */
    this.line = null
    /** @type {Rendered} */
    this.rendered = null

    if ($rendered) {
      const bounding = $rendered.getBoundingClientRect()
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
      /** @type {Number} */
      this.top = $rendered.offsetTop
      /** @type {Number} */
      this.left = $rendered.offsetLeft
    }
  }

  /**
   * @return {HTMLElement}
   */
  getElement() {
    return this.$el
  }

  /**
   * @return {String}
   */
  getTagName() {
    if (!this.$el) {return 'NULL'}
    return this.$el.tagName
  }

  /**
   * @param {String} tag 
   * 
   * @return {Boolean}
   */
  isTagName(tag) {
    return this.getTagName() === tag
  }

  /**
   * @return {Boolean}
   */
  hasChildren() {
    return !!this.$el.children
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * 
   * @return {Boolean}
   */
  pointIn(x, y) {
    return x > this.x1 && x < this.x2 &&
           y > this.y1 && y < this.y2
  }

  /**
   * @param {Number} x 
   * @param {Number} y 
   * 
   * @return {Number}
   */
  distanceTo(x, y) {
    return Math.sqrt(
      Math.pow(x - this.cx, 2) + 
      Math.pow(y - this.cy, 2)
    )
  }

  /**
   * @param {Number} x
   * 
   * @return {Boolean}
   */
  isLeftSide(x) {
    if (this.$el.tagName === 'MROW') {return false}
    return this.cx > x
  }

  getCaretPosition() {
    if (!this.$el) {
      return {
        top: this.line.top,
        left: this.line.left,
        height: this.line.height,
        $parent: this.line.$rendered.parentNode
      }
    }
    let height = this.line.height
    if (this.isTagName('MROW')) {
      height = this.height
    }
    else if (this.$el.parentNode.tagName === 'MROW') {
      const parent = this.rendered.findElement(this.$el.parentNode)
      height = parent.$rendered.clientHeight
    }
    return {
      top: this.top - Math.max(height - this.height, 0),
      left: this.left + (this.$el.tagName !== 'MROW' ? this.width : 0),
      height,
      $parent: this.$rendered.parentNode
    }
  }
}