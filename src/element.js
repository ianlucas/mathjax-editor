import hasClass from './utils/has-class'

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
    return !!this.$el.children.length
  }

  /**
   * @return {Null|HTMLElement}
   */
  getLastChild() {
    return this.$el.children[this.$el.children.length - 1]
  }

  /**
   * @return {Object}
   */
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
      top: Math.max(this.top - Math.max(height - this.height, 0), 0),
      left: this.left + (!this.isTagName('MROW') ? this.width : 0),
      height,
      $parent: this.$rendered.parentNode
    }
  }
}