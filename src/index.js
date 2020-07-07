import add from './add'
import backspace from './backspace'
import del from './del'
import display from './display'
import each from './each'
import operators from './operators'
import recalculate from './recalculate'
import view from './view'

/**
 * Create a mathJaxEditor instance.
 * @param {HTMLElement|String} target HTML Element or string selector
 */
export default function mathJaxEditor(target) {
  if (!MathJax) {
    throw new Error('mathJaxEditor: MathJax not found. Ensure that MathJax is loaded before calling mathJaxEditor.')
  }

  /** @type {String} Version of the library. */
  const version = '1.0.2'
  /** @type {Object} Public API of the library. */
  const api = {}
  /** @type {HTMLElement} Value of this instance. */
  let math = MathJax.HTML.Element('math')
  /** Create the user interface of this instance. */
  const ui = view()

  /** @type {HTMLElement} Current editor cursor element. */
  let current = math
  /** @type {Object} Current editor cursor data. */
  let pos = null
  /** @type {Array} Path of editor cursor data. */
  let path = null
  /** @type {Boolean} */
  let readonly = false
  /** @type {Array} Tags allowed to be inserted. */
  let allowedTags = []
  /** @type {Boolean} Allow newline insertion. */
  let allowNewline = false 

  /**
   * Draw the cursor in the viewport.
   * @return {Void}
   */
  const draw = () => {
    pos = path.find(predicate => {
      return predicate.source === current
    })
    ui.draw(pos)
  }

  /**
   * Update the math in the viewport.
   * @param {HTMLElement} to Cursor position element.
   * @param {HTMLElement} math Root value element.
   * @return {Void}
   */
  const update = (to, math) => {
    if (to) {
      ui.unblink()
      current = to
    }
    if (math) {
      return ui.value(display(math)).then(() => {
        path = recalculate(math)
        draw()
      })
    }
    return draw()
  }

  /**
   * Check whether it is possible to input a change in the value.
   * @param {HTMLElement} el
   * @return {Boolean}
   */
  const canInput = tag => {
    if (!readonly) {return true}
    if (tag && allowedTags.length && allowedTags.indexOf(tag) === -1) {return false}
    let curr = current
    while (curr) {
      if (curr.hasAttribute('editable')) {
        return true
      }
      curr = curr.parentNode
    }
    return false
  }

  // API functions

  api.raw = () => math

  api.path = () => path

  api.version = () => version

  api.right = () => {
    update(pos.next)
  }

  api.left = () => {
    update(pos.previous)
  }

  api.del = () => {
    if (!canInput()) {return} 
    update(del(math, current), math)
  }

  api.backspace = () => {
    if (!canInput()) {return} 
    update(backspace(math, current), math)
  }

  api.newline = () => {
    if (!allowNewline) {return}
    if (!canInput()) {return}
    if (current.parentNode !== math && current !== math) {return}
    const mspace = MathJax.HTML.Element('mspace')
    mspace.setAttribute('linebreak', 'newline')
    add(mspace, current)
    update(null, math)
  }

  api.number = n => {
    if (!canInput('mn')) {return} 
    const mn = MathJax.HTML.Element('mn', null, [n])
    add(mn, current)
    update(null, math)
  }

  api.identifier = c => {
    if (!canInput('mi')) {return} 
    const mi = MathJax.HTML.Element('mi', null, [c])
    add(mi, current)
    update(null, math)
  }

  api.operator = c => {
    if (!canInput('mo')) {return} 
    const mo = MathJax.HTML.Element('mo', null, [c])
    add(mo, current)
    update(null, math)
  }

  api.frac = () => {
    if (!canInput('mfrac')) {return} 
    const mfrac = MathJax.HTML.Element('mfrac')
    const mrow1 = MathJax.HTML.Element('mrow')
    const mrow2 = MathJax.HTML.Element('mrow')
    mfrac.appendChild(mrow1)
    mfrac.appendChild(mrow2)
    add(mfrac, current)
    update(mrow1, math)
  }

  api.sqrt = () => {
    if (!canInput('msqrt')) {return} 
    const msqrt = MathJax.HTML.Element('msqrt')
    const mrow = MathJax.HTML.Element('mrow')
    msqrt.appendChild(mrow)
    add(msqrt, current)
    update(mrow, math)
  }

  api.root = () => {
    if (!canInput('mroot')) {return} 
    const mroot = MathJax.HTML.Element('mroot')
    const mrow1 = MathJax.HTML.Element('mrow')
    const mrow2 = MathJax.HTML.Element('mrow')
    mroot.appendChild(mrow1)
    mroot.appendChild(mrow2)
    add(mroot, current)
    update(mrow1, math)
  }

  api.sup = () => {
    if (!canInput('msup')) {return} 
    const msup = MathJax.HTML.Element('msup')
    const mrow1 = MathJax.HTML.Element('mrow')
    const mrow2 = MathJax.HTML.Element('mrow')
    msup.appendChild(mrow1)
    msup.appendChild(mrow2)
    add(msup, current)
    update(mrow1, math)
  }

  api.sub = () => {
    if (!canInput('msub')) {return} 
    const msub = MathJax.HTML.Element('msub')
    const mrow1 = MathJax.HTML.Element('mrow')
    const mrow2 = MathJax.HTML.Element('mrow')
    msub.appendChild(mrow1)
    msub.appendChild(mrow2)
    add(msub, current)
    update(mrow1, math)
  }

  api.subsup = () => {
    if (!canInput('msubsup')) {return} 
    const msubsup = MathJax.HTML.Element('msubsup')
    const mrow1 = MathJax.HTML.Element('mrow')
    const mrow2 = MathJax.HTML.Element('mrow')
    const mrow3 = MathJax.HTML.Element('mrow')
    msubsup.appendChild(mrow1)
    msubsup.appendChild(mrow2)
    msubsup.appendChild(mrow3)
    add(msubsup, current)
    update(mrow1, math)
  }

  api.get = () => {
    const output = math.cloneNode(true)
    each(output, source => source.removeAttribute('id'))
    return output.outerHTML
  }

  api.set = input => {
    const parser = new DOMParser
    const doc = parser.parseFromString(input, 'text/html')
    math = doc.body.firstElementChild
    math.parentNode.removeChild(math)
    update(math, math)
  }

  api.readonly = val => {
    readonly = val
  }

  api.allowedTags = val => {
    allowedTags = val
  }

  api.allowNewline = val => {
    allowNewline = val
  }

  // UI functions

  /**
   * Handle cursor placement.
   * @param {Number} x
   * @param {Number} y
   * @return {Void}
   */
  ui.events.click = (x, y) => {
    let smaller = Infinity
    let candidate = null
    for (const data of (path || [])) {
      const p1x = data.x
      const p1y = data.y
      const p2y = p1y + data.height
      const d = Math.abs(p1x - x)
      if (p1y <= y && y <= p2y && smaller > d) {
        smaller = d
        candidate = data
      }
    }
    if (!candidate || candidate.source === current) {return}
    update(candidate.source)
  }

  /**
   * Handle basic input.
   * @param {String} char
   * @return {Void}
   */
  ui.events.input = (char) => {
    if (char.match(/\d/)) {
      return api.number(char)
    }
    else if (char.match(/[a-zA-Z]/)) {
      return api.identifier(char)
    }
    else if (operators.hasOwnProperty(char)) {
      return api.operator(operators[char])
    }
  }

  /**
   * Handle basic actions.
   * @param {Number} code
   * @return {Void}
   */
  ui.events.code = (code) => {
    switch (code) {
    case 8: return api.backspace()
    case 13: return api.newline()
    case 37: return api.left()
    case 39: return api.right()
    case 46: return api.del()
    }
  }

  // Initialization flow

  if (typeof target === 'string') {
    target = document.querySelector(target)
  }
  if (!target || !target.parentNode) {
    throw new Error('mathJaxEditor: target element not found.')
  }

  target.parentNode.replaceChild(ui.wrapper(), target)
  MathJax.Hub.processSectionDelay = 0
  update(math, math)

  return api
}