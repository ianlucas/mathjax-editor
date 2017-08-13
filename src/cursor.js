import px from './utils/px'

export default class Cursor {
  /**
   * @param {Tree} tree 
   * @param {Rendered} rendered 
   * @param {HTMLElement} $caret
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
   * @return {HTMLElement}
   */
  getPosition() {
    return this.$position
  }

  /**
   * @param {HTMLElement} $position  
   */
  setPosition($position) {
    this.$position = $position
  }

  moveLeft() {
    if (!this.$position) {return}
    const path = this.tree.getPath()
    const index = path.indexOf(this.$position)
    this.$position = path[index - 1]
    this.update()
  }

  moveRight() {
    const path = this.tree.getPath()
    if (!this.$position) {
      const $first = path[1]
      if ($first.tagName !== 'MATH') {
        this.$position = $first
      }
    }
    else {
      const index = path.indexOf(this.$position)
      const $next = path[index + 1]
      const isMath = ($next.tagName === 'MATH')
      const isParent = (this.$position.parentNode === $next)
      if ($next && !(isMath && isParent)) {
        this.$position = $next
      }
    }
    this.update()
  }

  update() {
    const element = this.rendered.findElement(this.$position)
    const position = element.getCaretPosition()
    position.$parent.appendChild(this.$caret)
    this.$caret.style.top = px(position.top)
    this.$caret.style.left = px(position.left)
    this.$caret.style.height = px(position.height)
  }
}