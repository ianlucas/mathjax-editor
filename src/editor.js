import Cursor from './cursor'
import CursorMover from './cursor-mover'
import EventEmitter from './event-emitter'
import Rendered from './rendered'
import Tree from './tree'

import addClass from './utils/add-class'
import appendElement from './utils/append-element'
import appendElementAfter from './utils/append-element-after'
import createElement from './utils/create-element'
import findTextarea from './utils/find-textarea'
import getJaxElement from './utils/get-jax-element'
import hideElement from './utils/hide-element'
import listenElement from './utils/listen-element'
import removeClass from './utils/remove-class'
import showElement from './utils/show-element'
import toDisplay from './utils/to-display'

export default class Editor {
  constructor(selectors, options = {}) {
    this.$el = findTextarea(selectors)
    this.$value = createElement('math')
    this.$input = createElement('input', 'mathjax-editor-input')
    this.$container = createElement('div', 'mathjax-editor-container')
    this.$display = createElement('div', 'mathjax-editor-display')
    this.$caret = createElement('div', 'mathjax-editor-caret')
    this.focused = false
    this.emitter = new EventEmitter
    this.tree = new Tree(this.$value)
    this.rendered = new Rendered(this.$display, this.tree)
    this.cursor = new Cursor(this.tree, this.rendered, this.$caret)
    this.cursorMover = new CursorMover(this.rendered)
    this.placeholder = 'Start typing...'
    
    hideElement(this.$caret)
    hideElement(this.$el)
    appendElement(this.$display, this.$value)
    appendElement(this.$container, this.$display)
    appendElement(this.$container, this.$input)
    appendElement(this.$display, this.$caret)
    appendElementAfter(this.$el, this.$container)
    getJaxElement(this.$display)
      .then(jaxElement => {
        this.jaxElement = jaxElement
        this.update()
      })

    listenElement(this.$display, 'click', this.handleClick.bind(this))
    listenElement(this.$input, 'keyup', this.handleInput.bind(this))
    listenElement(this.$input, 'keydown', this.handleInput.bind(this))
    listenElement(this.$input, 'keydown', this.handleKeydown.bind(this))
    listenElement(this.$input, 'focus', this.handleFocus.bind(this))
    listenElement(this.$input, 'blur', this.handleBlur.bind(this))
  }

  /**
   * @param {e} ClickEvent
   */
  handleClick({ clientX, clientY }) {
    this.focus()
    this.cursorMover.click(clientX, clientY)
      .then(({ $to, moveLeft, moveCount = 1 }) => {
        this.cursor.setPosition($to)
        if (moveLeft) {this.moveCursorLeft()}
        else {this.cursor.update()}
      })
  }

  handleFocus() {
    this.focused = true
    addClass(this.$display, 'is-focused')
    showElement(this.$caret)
  }

  handleBlur() {
    this.focused = false
    removeClass(this.$display, 'is-focused')
    hideElement(this.$caret)
  }

  handleInput() {
    const input = this.$input.value.trim()
    this.$input.value = ''
    if (input.length) {
      this.emitter.emit('@input', input)
    }
  }

  handleKeydown(e) {
    switch (e.which) {
    case 8: return this.backspaceRemove()
    case 13: return this.insertNewline()
    case 37: return this.moveCursorLeft()
    case 39: return this.moveCursorRight()
    case 46: return this.deleteRemove()
    // default: console.log(e.which)
    }
  }

  update() {
    if (!this.jaxElement) {return}
    this.tree.update()
    this.jaxElement
      .setValue(toDisplay(this.$value, this.placeholder))
      .update()
      .then(() => {
        this.rendered.update()
        this.cursor.update()
      })
  }

  backspaceRemove() {
    const $position = this.cursor.getPosition()

    if (!$position) {return}
    if ($position.tagName === 'MROW') {
      const $parent = $position.parentNode
      const $previous = $parent.previousElementSibling
      $parent.parentNode.removeChild($parent)
      this.cursor.setPosition($previous)
    }
    else {
      if ($position.previousElementSibling) {
        this.cursor.setPosition($position.previousElementSibling)
      }
      else if ($position.parentNode.tagName === 'MROW') {
        this.cursor.setPosition($position.parentNode)
      }
      else {
        this.cursor.setPosition($position.parentNode.previousElementSibling)
      }
      $position.parentNode.removeChild($position)
    }
    
    this.update()
  }

  deleteRemove() {
    const $position = this.cursor.getPosition()
    if (!$position) {
      this.$value.removeChild(this.$value.firstElementChild)
    }
    else if (!$position.nextElementSibling) {
      const $parent = $position.parentNode
      if ($parent.tagName === 'MROW') {
        this.cursor.setPosition($parent.parentNode.previousElementSibling)
        $parent.parentNode.parentNode.removeChild($parent.parentNode)
      }
      else {
        $parent.parentNode.removeChild($parent)
      }
    }
    else {
      $position.parentNode.removeChild($position.nextElementSibling)
    }

    this.update()
  }

  /**
   * @param {HTMLElement} $el  
   * @param {HTMLElement} [$moveTo]
   */
  insert($el, $moveTo = null) {
    const $position = this.cursor.getPosition()

    if (!$position) {
      this.$value.insertBefore($el, this.$value.firstElementChild)
    }
    else {
      switch ($position.tagName) {
      case 'MROW': $position.insertBefore($el, $position.firstElementChild); break
      case 'MATH': this.$value.appendChild($el); break
      default: $position.parentNode.insertBefore($el, $position.nextSibling)
      }
    }

    this.cursor.setPosition($moveTo || $el)
    this.focus()
    this.update()
  }

  insertNewline() {
    const $position = this.cursor.getPosition()
    if (
      $position &&
      $position.tagName !== 'MATH' && 
      $position.parentNode.tagName !== 'MATH'
    ) {return}

    const $mspace = document.createElement('mspace')
    $mspace.setAttribute('linebreak', 'newline')
    this.insert($mspace)
  }

  moveCursorLeft() {
    return this.cursor.moveLeft()
  }

  moveCursorRight() {
    return this.cursor.moveRight()
  }

  /**
   * @param {String} type 
   * @param {Function} listener
   */
  on(type, listener) {
    return this.emitter.on(type, listener)
  }

  focus() {
    return this.$input.focus()
  }
}