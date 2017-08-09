import RenderedElements from './rendered-elements'

import ATTACH_SKIP from './constants/attach-skip'
import CURSOR_SKIP from './constants/cursor-skip'

import EventEmitter from './utils/event-emitter'
import findTextarea from './utils/find-textarea'
import getJaxElement from './utils/get-jax-element'
import inArray from './utils/in-array'
import px from './utils/px'
import toArray from './utils/to-array'

export default class Editor {
  /**
   * @param {String|Node} selectors 
   * @param {Object} [options] 
   */
  constructor(selectors, options) {
    this.$el = findTextarea(selectors)

    this.$math = document.createElement('math')
    this.$math.setAttribute('id', 'e0')

    this.$input = document.createElement('input')
    this.$input.className = 'mathjax-editor-input'

    this.$container = document.createElement('div')
    this.$container.className = 'mathjax-editor-container'

    this.$display = document.createElement('div')
    this.$display.className = 'mathjax-editor-display'

    this.$cursor = document.createElement('div')
    this.$cursor.className = 'mathjax-editor-cursor'
    this.$cursor.style.display = 'none'

    this.$display.appendChild(this.$math)
    this.$container.appendChild(this.$display)
    this.$container.appendChild(this.$input)
    this.$display.appendChild(this.$cursor)

    this.$el.parentNode.insertBefore(this.$container, this.$el.nextSibling)
    this.$el.style.display = 'none'

    /** @type {Null|Node} */
    this.cursor = null
    /** @type {EventEmitter} */
    this.eventEmitter = new EventEmitter
    /** @type {Boolean} */
    this.isFocused = false
    /** @type {JaxElement} */
    this.jaxElement = null
    /** @type {Array} */
    this.flatMathTree = []
    /** @type {RenderedElements} */
    this.renderedElements = null
    /** @type {Number} */
    this.nextElementId = 1

    getJaxElement(this.$display, (jaxElement, minHeight) => {
      this.jaxElement = jaxElement
      this.$display.style.minHeight = px(minHeight)
      this.updateJaxElement()
    })

    this.blinkingInterval = setInterval(() => {
      this.$cursor.style.opacity = this.$cursor.style.opacity === '0'
        ? '1'
        : '0'
    }, 500)

    document.addEventListener('keydown', e => {
      if (!this.isFocused) {return}
      switch (e.which) {
      case 37: return this.moveCursorLeft()
      case 39: return this.moveCursorRight()
      case 8: return this.backspaceRemove()
      case 46: return this.deleteRemove()
      // default: console.log(e.which)
      }
    })

    this.$display.addEventListener('click', () => this.$input.focus())
    this.$input.addEventListener('keyup', this.handleInput.bind(this))
    this.$input.addEventListener('keydown', this.handleInput.bind(this))
    this.$input.addEventListener('focus', this.handleFocus.bind(this))
    this.$input.addEventListener('blur', this.handleBlur.bind(this))
  }

  handleFocus() {
    this.isFocused = true
    this.$display.classList.add('is-focused')
    this.$cursor.style.display = 'block'
  }

  handleBlur() {
    this.isFocused = false
    this.$display.classList.remove('is-focused')
    this.$cursor.style.display = 'none'
  }

  handleInput() {
    const input = this.$input.value.trim()
    if (input.length) {
      this.eventEmitter.emit('@input', input)
    }
    this.$input.value = ''
  }

  attachClickEvents() {
    this.renderedElements.forEach(element => {
      const { $el, $rendered } = element
      if (inArray(ATTACH_SKIP, $el.tagName)) {return}
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
    this.$cursor.style.left = $rendered.classList.contains('mjx-mrow')
      ? px($rendered.offsetLeft)
      : px($rendered.offsetLeft + $rendered.clientWidth)
  }

  updateJaxElement() {
    if (!this.jaxElement) {return}
    this.flattenMathTree()

    const math = this.getMarkupWithHelpers(this.$math)
    
    this.jaxElement.Text(math, () => {
      this.renderedElements = new RenderedElements(this.flatMathTree, this.$display)
      this.attachClickEvents()
      this.updateCursor()
    })
  }

  getMarkupWithHelpers($math) {
    const $cloneMath = $math.cloneNode(true)
    toArray($cloneMath.querySelectorAll('mrow'))
      .forEach($mrow => {
        if (!$mrow.childNodes.length) {
          const $mo = document.createElement('mo')
          $mo.className = 'mathjax-editor-placeholder'
          $mo.innerHTML = '?'
          $mrow.appendChild($mo)
        }
      })
    return $cloneMath.outerHTML
  }

  moveCursorLeft() {
    if (!this.cursor) {return}

    const index = this.flatMathTree.indexOf(this.cursor)
    this.cursor = this.flatMathTree[index - 1]

    this.updateCursor()
  }

  moveCursorRight() {
    if (!this.cursor) {
      this.cursor = this.flatMathTree[1] || null
    }
    else {
      const index = this.flatMathTree.indexOf(this.cursor)
      const $next = this.flatMathTree[index + 1]
      if (!($next.tagName === 'MATH' && this.cursor.parentNode === $next)) {
        this.cursor = $next
      }
    }

    this.updateCursor()
  }

  backspaceRemove() {
    if (!this.cursor) {return}

    if (this.cursor.tagName === 'MROW') {
      const $parent = this.cursor.parentNode
      $parent.parentNode.removeChild($parent)
      this.cursor = $parent.previousSibling
    }
    else {
      const previousSibling = this.cursor.previousSibling
        ? this.cursor.previousSibling
        : this.cursor.parentNode.previousSibling

      this.cursor.parentNode.removeChild(this.cursor)
      this.cursor = previousSibling
    }
    
    this.updateJaxElement()
  }

  deleteRemove() {
    if (!this.cursor) {
      console.log(this.$math.firstElementChild)
      this.$math.removeChild(this.$math.firstElementChild)
    }
    else if (!this.cursor.nextSibling) {
      const $parent = this.cursor.parentNode
      if ($parent.tagName === 'MROW') {
        this.cursor = $parent.parentNode.previousElementSibling
        $parent.parentNode.parentNode.removeChild($parent.parentNode)
      }
      else {
        $parent.parentNode.removeChild($parent)
      }
    }
    else {
      this.cursor.parentNode.removeChild(this.cursor.nextElementSibling)
    }

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

    const walk = $el => {
      const children = toArray($el.children)

      if (!$el.hasAttribute('id')) {
        $el.setAttribute('id', `e${this.nextElementId++}`)
      }

      nodes.push($el)

      children.forEach($child => walk($child))

      if (children.length && $el.tagName !== 'MROW') {
        const index = nodes.indexOf($el)
        nodes.splice(index, 1)
        nodes.push($el)
      }
    }

    toArray(this.$math.children)
      .forEach($child => walk($child))

    nodes.push(this.$math)

    this.flatMathTree = nodes
  }

  /**
   * @param {String} type 
   * @param {Function} callback 
   */
  on(type, callback) {
    this.eventEmitter.on(type, callback)
  }
}