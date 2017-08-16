import Element from './element'
import Line from './line'

import toArray from './utils/to-array'

export default class Rendered {
  /**
   * This class matches every element of the editor's value to its
   * rendered element by MathJax.
   * 
   * @param {HTMLElement} $display
   * @param {Tree} tree
   * 
   * @constructor
   */
  constructor($display, tree) {
    /** @type {HTMLElement} */
    this.$display = $display
    /** @type {Tree} */
    this.tree = tree
    /** @type {Array} */
    this.elements = []
    /** @type {Array} */
    this.lines = []
  }

  /**
   * Get the lines.
   * 
   * @return {Array}
   */
  getLines() {
    return this.lines
  }

  /**
   * Get the elements.
   * 
   * @return {Array}
   */
  getElements() {
    return this.elements
  }

  /**
   * Find the rendered line elements.
   * 
   * @return {Array}
   */
  findRenderedLines() {
    const blocks = toArray(this.$display.querySelectorAll('.mjx-block'))
    if (!blocks.length) {
      return [this.$display.querySelector('.mjx-math')]
    }
    return blocks.map($block => $block.firstElementChild)
  }

  /**
   * Find a rendered element.
   * 
   * @param {HTMLElement} $el
   * 
   * @return {HTMLElement}
   */
  findRenderedElement($el) {
    if (!$el) {return null}
    const id = $el.getAttribute('id')
    return this.$display.querySelector(`#${id}`)
  }

  /**
   * Find an element.
   * 
   * @param {HTMLElement} $el
   * 
   * @return {Element}
   */
  findElement($el) {
    return this.elements.find(element => element.$el === $el)
  }

  /**
   * Catch all rendered elements and lines of the display.
   * 
   * @return {Void}
   */
  update() {
    let lineIndex = 0
    const renderedLines = this.findRenderedLines()
    const lines = [new Line]
    this.lines = []
    this.elements = []

    lines[lineIndex].setRendered(renderedLines[lineIndex])

    for (const $el of this.tree.getPath()) {
      let line = lines[lineIndex]
      const $rendered = this.findRenderedElement($el)
      const element = new Element($el, $rendered)

      if ($el && $el.tagName === 'MSPACE') {
        line = new Line
        lineIndex += 1
        line.setRendered(renderedLines[lineIndex])
        lines.push(line)
      }

      element.rendered = this
      element.line = line
      line.elements.push(element)
      this.elements.push(element)
    }

    this.lines = lines
  }
}