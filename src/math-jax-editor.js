import Editor from './editor'

export default class MathJaxEditor {
  /**
   * @param {String|Node} selectors 
   * @param {Object} [options] 
   */
  constructor(selectors, options) {
    this.editor = new Editor(selectors, options)

    this.editor.on('@input', this.insert.bind(this))
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

    this.editor.insert($mn)
  }

  /**
   * @param {String} i
   */
  insertVariable(i) {
    if (typeof i !== 'string' && !i.match(/^[a-zA-Z]$/)) {
      throw new RangeError('MathjaxEditor: A single letter must be provided.')
    }

    const $mi = document.createElement('mi')
    $mi.innerHTML = i

    this.editor.insert($mi)
  }

  insertFraction() {
    const $mfrac = document.createElement('mfrac')
    const $mrowNum = document.createElement('mrow')
    const $mrowDen = document.createElement('mrow')

    $mfrac.appendChild($mrowNum)
    $mfrac.appendChild($mrowDen)

    this.editor.insert($mfrac)
  }

  /**
   * @param {*} what 
   */
  insert(what) {
    if (what.match(/^[0-9]$/)) {
      return this.insertNumber(parseInt(what, 10))
    }
    if (what.match(/^[a-zA-Z]$/)) {
      return this.insertVariable(what)
    }
    console.warn(`MathjaxEditor: insert: unknown "${what}"`)
  }
}