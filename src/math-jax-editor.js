import Editor from './editor'

import EXTRA_OPERATOR_LIST from './constants/extra-operator-list'

export default class MathJaxEditor {
  /**
   * The surface that interacts with the Editor class.
   * 
   * @param {String|Node} selectors 
   * @param {Object} [options]
   * @param {Boolean} [options.newline=false]
   * @param {String} [options.placeholder="Start typing..."]
   * 
   * @constructor
   */
  constructor(selectors, options = {}) {
    this.core = new Editor(selectors, options)

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

    const $mn = document.createElement('mn')
    $mn.innerHTML = n

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
    if (typeof i !== 'string' && !i.match(/^[a-zA-Z]$/)) {
      throw new RangeError('MathjaxEditor: A single letter must be provided.')
    }

    const $mi = document.createElement('mi')
    $mi.innerHTML = i

    this.core.insert($mi)
  }

  /**
   * Insert a fraction in the editor.
   * 
   * @return {Void}
   */
  insertFraction() {
    const $mfrac = document.createElement('mfrac')
    const $mrowNum = document.createElement('mrow')
    const $mrowDen = document.createElement('mrow')

    $mfrac.appendChild($mrowNum)
    $mfrac.appendChild($mrowDen)

    this.core.insert($mfrac, $mrowNum)
  }

  /**
   * Insert a square root on the editor.
   * 
   * @return {Void}
   */
  insertSqrt() {
    const $msqrt = document.createElement('msqrt')
    const $mrow = document.createElement('mrow')

    $msqrt.appendChild($mrow)

    this.core.insert($msqrt, $mrow)
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

    const $mo = document.createElement('mo')
    $mo.innerHTML = EXTRA_OPERATOR_LIST[o]

    this.core.insert($mo)
  }

  /**
   * Insert a superscript in the editor.
   * 
   * @return {Void}
   */
  insertSuperscript() {
    const $msup = document.createElement('msup')
    const $mrowBase = document.createElement('mrow')
    const $mrowPower = document.createElement('mrow')

    $msup.appendChild($mrowBase)
    $msup.appendChild($mrowPower)

    this.core.insert($msup, $mrowBase)
  }

  /**
   * Insert a subscript in the editor.
   * 
   * @return {Void}
   */
  insertSubscript() {
    const $msub = document.createElement('msub')
    const $mrowBase = document.createElement('mrow')
    const $mrowSequence = document.createElement('mrow')

    $msub.appendChild($mrowBase)
    $msub.appendChild($mrowSequence)

    this.core.insert($msub, $mrowBase)
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
    if (what.match(/^[a-zA-Z]$/)) {
      return this.insertIdentifier(what)
    }
    if (EXTRA_OPERATOR_LIST[what]) {
      return this.insertOperator(what)
    }
    console.warn(`MathjaxEditor: insert: unknown "${what}"`)
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
    this.core.setValue($value)
  }
}