export default class RenderedElements {
  /**
   * @param {Array} flatMathTree
   * @param {Node} $display 
   */
  constructor(flatMathTree, $display) {
    this.elements = []

    const cache = {
      '.mjx-mrow': 1
    }

    for (const $el of flatMathTree) {
      if (!$el) {continue}

      const tagName = $el.tagName.toLowerCase()
      const mjxClass = `.mjx-${tagName}`

      if (!cache[mjxClass]) {
        cache[mjxClass] = 0
      }

      const index = cache[mjxClass]++
      const $rendered = $display.querySelectorAll(mjxClass)[index]

      if (!$rendered) {
        throw new Error(`MathjaxEditor: Rendered element not found. (class: ${mjxClass}, index: ${index}).`)
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