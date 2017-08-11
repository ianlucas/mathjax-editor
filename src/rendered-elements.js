import Element from './element'

export default class RenderedElements {
  /**
   * @param {HTMLElement} $display 
   */
  constructor($display) {
    /** @type {HTMLElement} */
    this.$display = $display
    /** @type {Array} */
    this.elements = []
  }

  update(flatMathTree) {
    this.elements = []
    
    for (const $el of flatMathTree) {
      if (!$el) {continue}

      const id = $el.getAttribute('id')
      const $rendered = this.$display.querySelector(`#${id}`)

      if (!$rendered) {
        throw new Error(`MathjaxEditor: Rendered element not found. (id: ${id}).`)
      }

      this.elements.push(new Element($el, $rendered))
    }
  }

  /**
   * @param {Node} $el
   * 
   * @return {Null|Node}
   */
  findRendered($el) {
    const element = this.elements.find(element => element.getNode() === $el)
    return element ? element.$rendered : null
  }

  /**
   * @callback iteratorCallback
   * @param {*} currentValue
   * @param {Number} index
   * @param {Array} array
   */
  /**
   * @param {iteratorCallback} callback
   * 
   * @return {Void}
   */
  forEach(callback) {
    return this.elements.forEach(callback)
  }

  /**
   * @return {Array}
   */
  getElements() {
    return this.elements
  }
}