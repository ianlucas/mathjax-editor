import lc from './utils/lc'
import toArray from './utils/to-array'

export default class Tree {
  /**
   * This class walks through the editor's value and creates
   * a path for the cursor. Also, it sets an id for each
   * element of the value, so we can find them later on Rendered class.
   * 
   * @param {HTMLElement} $value 
   * 
   * @constructor
   */
  constructor($value) {
    this.$value = $value
    this.path = []
    this.nextId = 0

    this.update()
  }

  /**
   * Change the value of the tree.
   * 
   * @param {HTMLElement} $value
   * 
   * @return {Tree}
   */
  setValue($value) {
    this.$value = $value
    return this
  }

  /**
   * Get the cursor path.
   * 
   * @return {Array}
   */
  getPath() {
    return this.path
  }

  /**
   * Walk through the valeu and set an id to the elements
   * that don't have one.
   * 
   * @return {Void}
   */
  update() {
    this.path = [null]

    const walk = $el => {
      const children = toArray($el.children)

      if (!$el.hasAttribute('id')) {
        $el.setAttribute('id', `mje${this.nextId++}`)
      }
      
      this.path.push($el)

      children.forEach($child => walk($child))

      if (children.length && lc($el.tagName) !== 'mrow') {
        const index = this.path.indexOf($el)
        this.path.splice(index, 1)
        this.path.push($el)
      }
    }

    walk(this.$value)
  }
}