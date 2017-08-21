import Editor from './editor'

import appendElement from './utils/append-element'
import createElement from './utils/create-element'

import EXTRA_OPERATOR_LIST from './constants/extra-operator-list'
import IDENTIFIER_LIST from './constants/identifier-list'

export default class MathJaxEditor {
  /**
   * The surface that interacts with the Editor class.
   * 
   * @param {String|Node} selectors 
   * @param {Object} [options]
   * @param {Boolean} [options.allowNewlines=false]
   * @param {String} [options.placeholder="Start typing..."]
   * 
   * @constructor
   */
  constructor(selectors, options = {}) {
    this.core = new Editor(selectors, options)
    this.version = '2.0.0-beta'

    this.core.on('@input', this.insert.bind(this))
  }

  /**
   * Insert a number in the editor.
   * 
   * @param {Number} n
   * 
   * @return {Void}
   */
  insertNumber(n) {
    if (n < 0 || n > 9) {
      throw new RangeError('MathjaxEditor: The number must be 0 or up to 9.')
    }

    const $mn = createElement('mn', { _html: n })
    this.core.insert($mn)
  }

  /**
   * Insert a identifier in the editor.
   * 
   * @param {String} i
   * 
   * @return {Void}
   */
  insertIdentifier(i) {
    if (typeof i !== 'string' && !i.match(/^[a-zA-Z\\]+$/)) {
      throw new RangeError('MathjaxEditor: A string with alphabetic characters should be given.')
    }
    if (!IDENTIFIER_LIST[i]) {
      if (i[0] !== '\\') {return this.insertIdentifier(`\\${i}`)}
      else {i = i.substr(1)}
    }
    else {i = IDENTIFIER_LIST[i]}

    const $mi = createElement('mi', { _html: i })

    this.core.insert($mi)
  }

  /**
   * Insert a fraction in the editor.
   * 
   * @return {Void}
   */
  insertFraction() {
    const $mfrac = createElement('mfrac')
    const $mrowNum = createElement('mrow')
    const $mrowDen = createElement('mrow')

    appendElement($mfrac, $mrowNum, $mrowDen)

    this.core.insert($mfrac, $mrowNum)
  }

  /**
   * Insert a square root on the editor.
   * 
   * @return {Void}
   */
  insertSqrt() {
    const $msqrt = createElement('msqrt')
    const $mrow = createElement('mrow')

    appendElement($msqrt, $mrow)

    this.core.insert($msqrt, $mrow)
  }

  insertRoot() {
    const $mroot = createElement('mroot')
    const $mrowRadicand = createElement('mrow')
    const $mrowIndex = createElement('mrow')

    appendElement($mroot, $mrowRadicand, $mrowIndex)

    this.core.insert($mroot, $mrowRadicand, $mrowIndex)
  }

  /**
   * Insert a operator in the editor.
   * 
   * @param {String} o
   * 
   * @return {Void}
   */
  insertOperator(o) {
    if (!EXTRA_OPERATOR_LIST[o]) {
      if (o[0] !== '\\\\') {return this.insertOperator(`\\${o}`)}
      throw new TypeError(`MathjaxEditor: Unknown operator "${o}"`)
    }

    const $mo = createElement('mo', {
      _html: EXTRA_OPERATOR_LIST[o]
    })

    this.core.insert($mo)
  }

  /**
   * Insert a superscript in the editor.
   * 
   * @return {Void}
   */
  insertSuperscript() {
    const $msup = createElement('msup')
    const $mrowBase = createElement('mrow')
    const $mrowPower = createElement('mrow')

    appendElement($msup, $mrowBase, $mrowPower)

    this.core.insert($msup, $mrowBase)
  }

  /**
   * Insert a subscript in the editor.
   * 
   * @return {Void}
   */
  insertSubscript() {
    const $msub = createElement('msub')
    const $mrowBase = createElement('mrow')
    const $mrowSequence = createElement('mrow')

    appendElement($msub, $mrowBase, $mrowSequence)

    this.core.insert($msub, $mrowBase)
  }

  /**
   * Insert a newline in the editor.
   * 
   * @return {Void}
   */
  insertNewline() {
    return this.core.insertNewline()
  }

  /**
   * This method is not actually meant to be used, it is here to
   * handle the @input event when the user types in the editor's
   * input element.
   * 
   * @param {String} what 
   * 
   * @return {Void}
   */
  insert(what) {
    if (what.match(/^[0-9]$/)) {
      return this.insertNumber(parseInt(what, 10))
    }
    if (what.match(/^[a-zA-Z\\]+$/)) {
      return this.insertIdentifier(what)
    }
    if (EXTRA_OPERATOR_LIST[what]) {
      return this.insertOperator(what)
    }
    console.warn(`MathjaxEditor: insert: unknown "${what}"`)
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveCursorLeft() {
    return this.core.cursor.moveLeft()
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void}
   */
  moveCursorRight() {
    return this.core.cursor.moveRight()
  }

  /**
   * Get the value of the editor as string.
   * 
   * @return {String}
   */
  toString() {
    return this.core.toString()
  }

  /**
   * Get the value of the editor as a tex string.
   * 
   * @return {String}
   */
  toTex() {
    return this.core.toTex()
  }

  /**
   * Get the value of the editor (a copy).
   * 
   * @return {HTMLElement}
   */
  getValue() {
    return this.core.getValue()
  }

  /**
   * Set the value of the editor.
   * 
   * @param {HTMLElement} $value
   * 
   * @return {Void}
   */
  setValue($value) {
    return this.core.setValue($value)
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    return this.core.focus()
  }

  /**
   * Listen to an editor event.
   * 
   * @param {String} type 
   * @param {Function} listener 
   */
  on(type, listener) {
    return this.core.on(type, listener)
  }

  /**
   * Perform a "backspace" deletion.
   * 
   * @return {Void}
   */
  backspaceRemove() {
    return this.core.backspaceRemove()
  }

  /**
   * Perform a "delete" deletion.
   * 
   * @return {Void}
   */
  deleteRemove() {
    return this.core.deleteRemove()
  }

  /**
   * Remove the editor element and event listeners.
   * 
   * @return {Void}
   */
  destroy() {
    return this.core.destroy()
  }
}