import RenderedElements from './rendered-elements'

import CURSOR_SKIP from './constants/cursor-skip'

import findTextarea from './utils/find-textarea'
import getJaxElement from './utils/get-jax-element'
import inArray from './utils/in-array'
import px from './utils/px'

export default class Editor {
  /**
   * @param {String|Node} selectors 
   * @param {Object} [options] 
   */
  constructor(selectors, options) {
    this.$el = findTextarea(selectors)

    this.$math = document.createElement('math')

    this.$container = document.createElement('div')
    this.$container.className = 'mathjax-editor-container'

    this.$display = document.createElement('div')
    this.$display.className = 'mathjax-editor-display'

    this.$cursor = document.createElement('div')
    this.$cursor.className = 'mathjax-editor-cursor'

    this.$display.appendChild(this.$math)
    this.$container.appendChild(this.$display)
    this.$display.appendChild(this.$cursor)

    this.$el.parentNode.insertBefore(this.$container, this.$el.nextSibling)
    this.$el.style.display = 'none'

    /** @type {Null|Node} */
    this.cursor = null
    /** @type {JaxElement} */
    this.jaxElement = null
    /** @type {Array} */
    this.flatMathTree = []
    /** @type {RenderedElements} */
    this.renderedElements = null

    getJaxElement(this.$display, (jaxElement, minHeight) => {
      this.jaxElement = jaxElement
      this.$display.style.minHeight = px(minHeight)
      this.updateJaxElement()
    })

    document.addEventListener('keydown', e => {
      switch (e.which) {
      case 37: return this.moveCursorLeft()
      case 39: return this.moveCursorRight()
      case 8: return this.backspaceRemove()
      case 46: return this.deleteRemove()
      // default: console.log(e.which)
      }
    })
  }

  attachClickEvents() {
    this.renderedElements.forEach(element => {
      const { $el, $rendered } = element
      if ($el.tagName === 'MROW') {return}
      const { clientWidth } = $rendered
      $rendered.addEventListener('click', e => {
        const { offsetX } = e
        this.cursor = $el
        if (offsetX > clientWidth / 2) {
          return this.updateCursor()
        }
        this.moveCursorLeft()
      })
    })
  }

  updateCursor() {
    if (!this.cursor) {
      this.$display.appendChild(this.$cursor)
      this.$cursor.style.height = px(this.$display.clientHeight)
      this.$cursor.style.top = 0;
      this.$cursor.style.left = 0
      return
    }

    let $rendered

    // TODO: When we enable multiline we gotta find a way to deal with this.
    if (this.cursor.tagName === 'MATH') {
      $rendered = this.$display.querySelector('.mjx-chtml')
    }
    else {
      $rendered = this.renderedElements.findRendered(this.cursor)
    }

    if (!$rendered) {
      console.log(this.cursor)
      return console.warn('MathjaxEditor: Rendered element not found.')
    }

    $rendered.parentNode.appendChild(this.$cursor)
    this.$cursor.style.height = px($rendered.clientHeight)
    this.$cursor.style.top = px($rendered.offsetTop)
    this.$cursor.style.left = px($rendered.offsetLeft + $rendered.clientWidth)
  }

  updateJaxElement() {
    if (!this.jaxElement) {return}
    this.flattenMathTree()
    this.jaxElement.Text(this.$math.outerHTML, () => {
      this.renderedElements = new RenderedElements(this.flatMathTree, this.$display)
      this.attachClickEvents()
      this.updateCursor()
    })
  }

  moveCursorLeft() {
    
    if (!this.cursor) {return}

    const index = this.flatMathTree.indexOf(this.cursor)
    if (this.flatMathTree[index - 1] !== undefined) {
      this.cursor = this.flatMathTree[index - 1]
    }

    if (this.cursor && inArray(CURSOR_SKIP, this.cursor.tagName)) {
      return this.moveCursorLeft()
    }

    this.updateCursor()
  }

  moveCursorRight() {
    
    if (!this.cursor) {
      this.cursor = this.flatMathTree[1] || null
    }
    else  {
      const index = this.flatMathTree.indexOf(this.cursor)
      const $next = this.flatMathTree[index + 1]
      if ($next) {
        if (!($next.tagName === 'MATH' && this.cursor.parentNode === $next)) {
          this.cursor = $next
        }
      }
    }
      
    if (inArray(CURSOR_SKIP, this.cursor.tagName)) {
      return this.moveCursorRight()
    }

    this.updateCursor()
  }

  backspaceRemove() {
    if (!this.cursor) {return}

    const previousSibling = this.cursor.previousSibling
      ? this.cursor.previousSibling
      : this.cursor.parentNode.previousSibling

    this.cursor.parentNode.removeChild(this.cursor)
    this.cursor = previousSibling

    this.updateJaxElement()
  }

  deleteRemove() {
    let nextSibling
    if (!this.cursor) {
      nextSibling = this.$math.firstChild
    }
    else if (!this.cursor.nextSibling && !this.cursor.parentNode.nextSibling) {
      return
    }
    else {
      nextSibling = this.cursor.nextSibling
        ? this.cursor.nextSibling
        : this.cursor.parentNode.nextSibling
    }
    if (!nextSibling) {return}
    nextSibling.parentNode.removeChild(nextSibling)

    this.updateJaxElement()
  }

  /**
   * @param {Node} $el  
   */
  insert($el) {
    if (!this.cursor) {
      this.$math.insertBefore($el, this.$math.firstChild)
    }
    else if (this.cursor.tagName === 'MROW') {
      this.cursor.insertBefore($el, this.cursor.firstChild)
    }
    else if (this.cursor.tagName === 'MATH') {
      this.$math.appendChild($el)
    }
    else {
      this.cursor.parentNode.insertBefore($el, this.cursor.nextSibling)
    }
    this.cursor = $el

    this.updateJaxElement()
  }

  flattenMathTree() {
    const nodes = [null]
    let $el = this.$math.firstElementChild

    while ($el) {
      nodes.push($el)

      if ($el.firstElementChild) {
        $el = $el.firstElementChild
      }
      else if ($el.nextElementSibling) {
        $el = $el.nextElementSibling
      }
      else {
        let $parent = $el.parentNode
        while ($parent) {
          if ($parent.nextElementSibling) {
            $el = $parent.nextElementSibling
            break
          }
          $parent = $parent.parentNode
        }

        if (!$parent) {break}
      }
    }

    nodes.push(this.$math)

    this.flatMathTree = nodes
  }
}