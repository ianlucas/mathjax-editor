export default class RenderedElements {
  /**
   * @param {Node} $math  
   * @param {Node} $display 
   */
  constructor($math, $display) {
    this.elements = []

    const cache = {}

    let $el = $math.firstChild

    while ($el) {
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

      if ($el.nextSibling) {
        $el = $el.nextSibling
      }
      else {
        $el = $el.parentNode.nextSibling
      }
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
}