import Blinker from './blinker'
import Cursor from './cursor'
import CursorMover from './cursor-mover'
import EventEmitter from './event-emitter'
import Rendered from './rendered'
import Tree from './tree'
import mml2Tex from './mml2tex'

import addClass from './utils/add-class'
import appendElement from './utils/append-element'
import appendElementAfter from './utils/append-element-after'
import applyDelete from './utils/apply-delete'
import applyBackspace from './utils/apply-backspace'
import createElement from './utils/create-element'
import findTextarea from './utils/find-textarea'
import getElementJax from './utils/get-element-jax'
import getCleanCopy from './utils/get-clean-copy'
import hideElement from './utils/hide-element'
import listenElement from './utils/listen-element'
import prependElement from './utils/prepend-element'
import removeClass from './utils/remove-class'
import showElement from './utils/show-element'
import toDisplay from './utils/to-display'
import toDom from './utils/to-dom'

export default class Editor {
  /**
   * This is the main class of the Editor. 
   * 
   * @param {String|HTMLElement} selectors 
   * @param {Object} [options] 
   * @param {Boolean} [options.newline=false]
   * @param {String} [options.placeholder="Start typing..."]
   * 
   * @constructor
   */
  constructor(selectors, options = {}) {
    this.$el = findTextarea(selectors)
    this.$value = createElement('math')
    this.$input = createElement('input', 'mathjax-editor-input')
    this.$container = createElement('div', 'mathjax-editor-container')
    this.$display = createElement('div', 'mathjax-editor-display')
    this.$caret = createElement('div', 'mathjax-editor-caret')
    this.focused = false
    this.mouseAtDisplay = false
    this.emitter = new EventEmitter
    this.tree = new Tree(this.$value)
    this.rendered = new Rendered(this.$display, this.tree)
    this.cursor = new Cursor(this.tree, this.rendered, this.$caret)
    this.cursorMover = new CursorMover(this.tree, this.rendered, this.cursor)
    this.blinker = new Blinker(this.$caret)
    this.placeholder = options.placeholder || 'Start typing...'
    this.allowNewlines = options.allowNewlines || false
    
    hideElement(this.$caret)
    hideElement(this.$el)
    appendElement(this.$display, this.$value)
    appendElement(this.$container, this.$display)
    appendElement(this.$container, this.$input)
    appendElement(this.$display, this.$caret)
    appendElementAfter(this.$el, this.$container)
    getElementJax(this.$display)
      .then(elementJax => {
        this.elementJax = elementJax
        this.update()
      })

    listenElement(this.$display, 'click', this.handleClick.bind(this))
    listenElement(this.$input, 'keyup', this.handleInput.bind(this))
    listenElement(this.$input, 'keydown', this.handleInput.bind(this))
    listenElement(this.$input, 'keydown', this.handleKeydown.bind(this))
    listenElement(this.$input, 'focus', this.handleFocus.bind(this))
    listenElement(this.$input, 'blur', this.handleBlur.bind(this))
    listenElement(this.$display, 'mouseenter', this.handleMouseenter.bind(this))
    listenElement(this.$display, 'mouseleave', this.handleMouseleave.bind(this))
  }

  /**
   * Handle the click event on the display.
   * 
   * @param {e} ClickEvent
   * 
   * @return {Void}
   */
  handleClick({ clientX, clientY }) {
    this.focus()
    this.cursorMover.click(clientX, clientY)
    this.blinker.freeze()
  }

  /**
   * Handle the focus event on the input.
   * 
   * @return {Void}
   */
  handleFocus() {
    this.emitter.emit('focus')
    this.focused = true
    addClass(this.$display, 'is-focused')
    showElement(this.$caret)
  }

  /**
   * Handle the blur event on the input.
   * 
   * @return {Void}
   */
  handleBlur() {
    if (this.mouseAtDisplay) {return}
    this.emitter.emit('blur')
    this.focused = false
    removeClass(this.$display, 'is-focused')
    hideElement(this.$caret)
  }

  /**
   * Handle the keyup/keydown event on the input.
   * 
   * @return {Void}
   */
  handleInput() {
    const input = this.$input.value.trim()
    this.$input.value = ''
    if (input.length) {
      this.emitter.emit('@input', input)
    }
  }

  /**
   * Handle the mouseenter event on the display.
   * 
   * @return {Void}
   */
  handleMouseenter() {
    this.mouseAtDisplay = true
  }

  /**
   * Handle the mouseleave event on the display.
   * 
   * @return {Void}
   */
  handleMouseleave() {
    this.mouseAtDisplay = false
  }

  /**
   * Handle the keydown event in the input.
   * 
   * @param {KeyboardEvent} e
   * 
   * @return {Void}
   */
  handleKeydown(e) {
    switch (e.which) {
    case 8: return this.backspaceRemove()
    case 13: return this.insertNewline()
    case 37: return this.cursor.moveLeft()
    case 39: return this.cursor.moveRight()
    case 46: return this.deleteRemove()
    // default: console.log(e.which)
    }
  }

  /**
   * Update the editor tree, display, and cursor stuff.
   * 
   * @return {Void}
   */
  update() {
    if (!this.elementJax) {return}
    const $cleanValue = this.getValue()
    this.$el.value = $cleanValue.outerHTML
    this.emitter.emit('update', $cleanValue)
    this.tree.setValue(this.$value)
    this.tree.update()
    this.elementJax
      .setValue(toDisplay(this.$value, this.placeholder))
      .update()
      .then(() => {
        this.rendered.update()
        this.cursor.update()
      })
  }

  /**
   * Apply a "backspace" deletion.
   * 
   * @return {Void}
   */
  backspaceRemove() {
    applyBackspace(this.$value, this.cursor)
    this.update()
  }

  /**
   * Apply a "delete" deletion.
   * 
   * @return {Void}
   */
  deleteRemove() {
    applyDelete(this.$value, this.cursor)
    this.update()
  }

  /**
   * Insert an element at current cursor position.
   * 
   * @param {HTMLElement} $el  
   * @param {HTMLElement} [$moveTo]
   * 
   * @return {Void}
   */
  insert($el, $moveTo = null) {
    const $position = this.cursor.getPosition()

    if (!$position) {
      prependElement(this.$value, $el)
    }
    else {
      switch ($position.tagName.toLowerCase()) {
      case 'mrow': prependElement($position, $el); break
      case 'math': appendElement(this.$value, $el); break
      default: appendElementAfter($position, $el)
      }
    }

    this.cursor.setPosition($moveTo || $el)
    this.focus()
    this.update()
  }

  /**
   * Insert a newline in the editor.
   * 
   * @return {Void}
   */
  insertNewline() {
    if (!this.allowNewlines) {return}
    const $position = this.cursor.getPosition()
    if (
      $position &&
      $position.tagName.toLowerCase() !== 'math' && 
      $position.parentNode.tagName.toLowerCase() !== 'math'
    ) {return}

    const $mspace = createElement('mspace', {
      linebreak: 'newline'
    })

    this.insert($mspace)
  }

  /**
   * Listen to an event of the editor.
   * 
   * @param {String} type 
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    return this.emitter.on(type, listener)
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    return this.$input.focus()
  }

  /**
   * Get the value of the editor as string.
   * 
   * @return {String}
   */
  toString() {
    return this.getValue().outerHTML
  }

  /**
   * Get the value of the editor as a tex string.
   * 
   * @return {String}
   */
  toTex() {
    return mml2Tex(this.$value)
  }

  /**
   * Get the value of the editor (a copy).
   * 
   * @return {HTMLElement}
   */
  getValue() {
    return getCleanCopy(this.$value)
  }

  /**
   * Set the value of the editor.
   * 
   * @param {HTMLElement} $value
   * 
   * @return {Void}
   */
  setValue($value) {
    if (typeof $value === 'string') {
      $value = toDom($value)
    }
    if ($value.nodeType !== 1 || $value.tagName.toLowerCase() !== 'math') {
      throw new Error('MathjaxEditor: the value must be an <math> element.')
    }
    this.$value = $value
    this.cursor.setPosition(null)
    this.update()
  }
}