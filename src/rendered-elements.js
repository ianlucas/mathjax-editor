import Element from './element'
import Line from './line'

import NEWLINES from './constants/newlines'

import inArray from './utils/in-array'
import toArray from './utils/to-array'

export default class RenderedElements {
  /**
   * @param {HTMLElement} $display 
   */
  constructor($display) {
    /** @type {HTMLElement} */
    this.$display = $display
    /** @type {Array} */
    this.elements = []
    /** @type {Array} */
    this.lines = []
  }

  /**
   * @param {Array} flatMathTree 
   * 
   * @return {Array}
   */
  findElements(flatMathTree) {
    const elements = []
    
    for (const $el of flatMathTree) {
      if (!$el) {continue}

      const id = $el.getAttribute('id')
      const $rendered = this.$display.querySelector(`#${id}`)

      if (!$rendered) {
        throw new Error(`MathjaxEditor: Rendered element not found. (id: ${id}).`)
      }

      elements.push(new Element($el, $rendered))
    }

    return elements
  }

  /**
   * @param {Array} flatMathTree
   * @param {HTMLElement} $cursor
   * 
   * @return {Array}
   */
  findLines(flatMathTree, $cursor) {
    const mspaces = []
    const blocks = toArray(this.$display.querySelectorAll('.mjx-block'))
    const lines = []
    const elementsInLines = []
    const $math = flatMathTree[flatMathTree.lenght - 1]
    
    let elements = []
    for (let $el of flatMathTree) {
      if ($el && inArray(NEWLINES, $el.tagName)) {
        if ($el.tagName === 'MSPACE') {
          mspaces.push($el)
        }
        elementsInLines.push(elements)
        elements = [$el]
      }
      else {
        elements.push($el)
      }
    }

    if (!mspaces.length) {
      const line = new Line($math, this.$display.querySelector('.mjx-math'))
      line.elements = elementsInLines[0]
      line.$firstEl = null
      line.$lastEl = flatMathTree[flatMathTree.length - 2] 
      lines.push(line)
    }
    else {
      const len = blocks.length
      for (let i = 0; i < len; i++) {
        const $block = blocks[i]
        const $current = mspaces[i]
        const $previous = mspaces[i - 1]
        const line = new Line($current || $math, $block.firstElementChild)

        line.elements = elementsInLines[i]
        line.$firstEl = ($previous ? $previous.previousElementSibling : null)
        line.$lastEl = ($current
          ? $current.previousElementSibling
          : flatMathTree[flatMathTree.length - 2] 
        )
        lines.push(line)
      }
    }

    return lines
  }

  /**
   * @param {Array} flatMathTree 
   * @param {HTMLElement} $cursor
   */
  update(flatMathTree, $cursor) {
    this.lines = this.findLines(flatMathTree, $cursor)
    this.elements = this.findElements(flatMathTree)
  }

  /**
   * @param {HTMLElement} $el
   * 
   * @return {Null|HTMLElement}
   */
  findRendered($el) {
    const element = this.elements.find(element => element.getNode() === $el)
    return element ? element.getRendered() : null
  }

  /**
   * @param {HTMLElement}
   * 
   * @return {Line}
   */
  findLine($el) {
    const line = this.lines.find(line => line.getNode() === $el)
    return line ? line : null
  }

  /**
   * @param {Line} line 
   * 
   * @return {Line}
   */
  findNextLine(line) {
    const index = this.lines.indexOf(line)
    return this.lines[index + 1] || null
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

  /**
   * @return {Array}
   */
  getLines() {
    return this.lines
  }
}