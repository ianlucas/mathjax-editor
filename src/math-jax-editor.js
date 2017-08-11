import Editor from './editor'

import OPERATOR_LIST from './constants/operator-list'

import inArray from './utils/in-array'

export default class MathJaxEditor {
  /**
   * @param {String|Node} selectors 
   * @param {Object} [options] 
   */
  constructor(selectors, options) {
    this.core = new Editor(selectors, options)

    this.core.on('@input', this.insert.bind(this))
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

    this.core.insert($mn)
  }

  /**
   * @param {String} i
   */
  insertIdentifier(i) {
    if (typeof i !== 'string' && !i.match(/^[a-zA-Z]$/)) {
      throw new RangeError('MathjaxEditor: A single letter must be provided.')
    }

    const $mi = document.createElement('mi')
    $mi.innerHTML = i

    this.core.insert($mi)
  }

  insertFraction() {
    const $mfrac = document.createElement('mfrac')
    const $mrowNum = document.createElement('mrow')
    const $mrowDen = document.createElement('mrow')

    $mfrac.appendChild($mrowNum)
    $mfrac.appendChild($mrowDen)

    this.core.insert($mfrac, $mrowNum)
  }

  insertSqrt() {
    const $msqrt = document.createElement('msqrt')
    const $mrow = document.createElement('mrow')

    $msqrt.appendChild($mrow)

    this.core.insert($msqrt)
  }

  /**
   * @param {String} o 
   */
  insertOperator(o) {
    if (!OPERATOR_LIST[o]) {
      throw new TypeError(`MathjaxEditor: Unknown operator "${o}"`)
    }

    const $mo = document.createElement('mo')
    $mo.innerHTML = OPERATOR_LIST[o]

    this.core.insert($mo)
  }

  insertSuperscript() {
    const $msup = document.createElement('msup')
    const $mrowBase = document.createElement('mrow')
    const $mrowPower = document.createElement('mrow')

    $msup.appendChild($mrowBase)
    $msup.appendChild($mrowPower)

    this.core.insert($msup, $mrowBase)
  }

  /**
   * @param {String} what 
   */
  insert(what) {
    if (what.match(/^[0-9]$/)) {
      return this.insertNumber(parseInt(what, 10))
    }
    if (what.match(/^[a-zA-Z]$/)) {
      return this.insertIdentifier(what)
    }
    if (OPERATOR_LIST[what]) {
      return this.insertOperator(what)
    }
    console.warn(`MathjaxEditor: insert: unknown "${what}"`)
  }
}