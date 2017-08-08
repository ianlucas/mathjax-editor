export default class RenderedElements {
  /**
   * @param {Array} flatMathTree
   * @param {Node} $display 
   */
  constructor(flatMathTree, $display) {
    this.elements = []

    for (const $el of flatMathTree) {
      if (!$el) {continue}

      const id = $el.getAttribute('id')
      const $rendered = $display.querySelector(`#${id}`)

      if (!$rendered) {
        throw new Error(`MathjaxEditor: Rendered element not found. (id: ${id}).`)
      }

      this.elements.push({
        $el,
        $rendered
      })
    }
  }

  /**
   * @param {Node} $el
   * 
   * @return {Null|Node}
   */
  findRendered($el) {
    const element = this.elements.find(element => element.$el === $el)
    if (element) {
      return element.$rendered
    }
    return null
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
}