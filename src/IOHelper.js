import { isMath, equals, removeChild, walk, isIgnoredElement } from './utils'

const WHITESPACE = />\s+</g

export default {
  /**
   * @param {String} value
   * @return {String}
   */
  in (value) {
    const parser = document.createElement('div')
    parser.innerHTML = value.replace(WHITESPACE, '><').trim()
    if (parser.children.length > 1) {
      throw new Error('MathJax Editor: the input value should have a single <math> element.')
    }
    if (!isMath(parser.firstChild)) {
      throw new Error('MathJax Editor: the input value should have a single <math> element.')
    }
    let currentMath = null
    Array.from(parser.firstChild.children).forEach((child) => {
      const isNewline = (
        equals(child.tagName, 'mspace') &&
        child.getAttribute('linebreak') === 'newline'
      )
      if (isNewline) {
        currentMath = document.createElement('math')
        parser.appendChild(document.createElement('br'))
        parser.appendChild(currentMath)
      } else if (currentMath) {
        currentMath.appendChild(child)
      }
      if (isNewline) {
        removeChild(child)
      }
    })
    return parser.innerHTML
  },

  /**
   * @param {HTMLElement} value
   * @return {HTMLElement}
   */
  out (value) {
    const clone = value.cloneNode(true)
    const math = document.createElement('math')
    Array.from(clone.children).forEach((otherMath, i) => {
      if (isIgnoredElement(otherMath)) {
        return
      }
      Array.from(otherMath.children).forEach((element) => {
        walk(element, (otherElement) => {
          otherElement.removeAttribute('editable')
          otherElement.removeAttribute('id')
        })
        math.appendChild(element)
      })
      if (i !== clone.children.length - 1) {
        const mspace = document.createElement('mspace')
        mspace.setAttribute('linebreak', 'newline')
        math.appendChild(mspace)
      }
    })
    return math
  }
}
