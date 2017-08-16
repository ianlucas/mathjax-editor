import px from './utils/px'

export default class Cursor {
  /**
   * This class handles the cursor positioning.
   * 
   * @param {Tree} tree 
   * @param {Rendered} rendered 
   * @param {HTMLElement} $caret
   * 
   * @constructor
   */
  constructor(tree, rendered, $caret) {
    /** @type {Tree} */
    this.tree = tree
    /** @type {Rendered} */
    this.rendered = rendered
    /** @type {HTMLElement} */
    this.$caret = $caret
    /** @type {HTMLElement} */
    this.$position = null
  }

  /**
   * Get the client rect bounding of the caret element.
   * 
   * @return {ClientRect}
   */
  getCaretBounding() {
    return this.$caret.getBoundingClientRect()
  }

  /**
   * Get current cursor position.
   * 
   * @return {HTMLElement}
   */
  getPosition() {
    return this.$position
  }

  /**
   * Set the cursor position.
   * 
   * @param {HTMLElement} $position  
   * 
   * @return {this}
   */
  setPosition($position) {
    this.$position = $position
    return this
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveLeft() {
    if (!this.$position) {return this.update()}
    const path = this.tree.getPath()
    const index = path.indexOf(this.$position)
    this.$position = path[index - 1]
    this.update()
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void}
   */
  moveRight() {
    const path = this.tree.getPath()
    if (!this.$position) {
      const $first = path[1]
      if ($first.tagName.toLowerCase() !== 'math') {
        this.$position = $first
      }
    }
    else {
      const index = path.indexOf(this.$position)
      const $next = path[index + 1]
      const isMath = ($next.tagName.toLowerCase() === 'math')
      const isParent = (this.$position.parentNode === $next)
      if ($next && !(isMath && isParent)) {
        this.$position = $next
      }
    }
    this.update()
  }

  /**
   * Update the caret element position on the display.
   * 
   * @return {Void}
   */
  update() {
    const element = this.rendered.findElement(this.$position)
    const position = element.getCaretPosition()
    position.$parent.appendChild(this.$caret)
    this.$caret.style.top = px(position.top)
    this.$caret.style.left = px(position.left)
    this.$caret.style.height = px(position.height)
  }
}