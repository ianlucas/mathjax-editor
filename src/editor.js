import RenderedElements from './rendered-elements'

import findTextarea from './utils/find-textarea'
import getJaxElement from './utils/get-jax-element'
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
    this.jaxElement = null
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

    const $rendered = this.renderedElements.findRendered(this.cursor)

    if (!$rendered) {
      return console.warn('MathjaxEditor: Rendered element not found.')
    }

    $rendered.parentNode.appendChild(this.$cursor)
    this.$cursor.style.height = px($rendered.clientHeight)
    this.$cursor.style.top = px($rendered.offsetTop)
    this.$cursor.style.left = px($rendered.offsetLeft + $rendered.clientWidth)
  }

  updateJaxElement() {
    if (!this.jaxElement) {return}
    this.jaxElement.Text(this.$math.outerHTML, () => {
      this.renderedElements = new RenderedElements(this.$math, this.$display)
      this.attachClickEvents()
      this.updateCursor()
    })
  }

  moveCursorLeft() {
    if (!this.cursor) {return}

    this.cursor = this.cursor.previousSibling
      ? this.cursor.previousSibling
      : this.cursor.parentNode.previousSibling

    this.updateCursor()
  }

  moveCursorRight() {
    if (!this.cursor) {
      this.cursor = this.$math.firstChild
    }
    else if (!this.cursor.nextSibling && !this.cursor.parentNode.nextSibling) {
      return
    }
    else {
      this.cursor = this.cursor.nextSibling
        ? this.cursor.nextSibling
        : this.cursor.parentNode.nextSibling
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
    else {
      this.cursor.parentNode.insertBefore($el, this.cursor.nextSibling)
    }
    this.cursor = $el
    this.updateJaxElement()
  }

  /**
   * @param {Number} n 
   */
  insertNumber(n) {
    if (n < 0 || n > 9) {
      throw new RangeError('MathjaxEditor: The number must be 0 or up to 9.')
    }

    const $mn = document.createElement('mn')
    $mn.innerHTML = n

    this.insert($mn)
  }
}