import Display from './Display'
import DisplayHelper from './DisplayHelper'
import { createId, isContainer, walk, insertElement, deleteElement, deleteBeforeElement, createElement, extractElement } from './utils'
import { operators } from './constants'

const ARROW_LEFT = 37
const ARROW_RIGHT = 39
const BACKSPACE = 8
const DELETE = 46
const IS_NUMBER = /^\d$/
const IS_LETTER = /^[a-z]$/i

/**
 * @typedef {Object} Step
 * @property {HTMLElement} dom
 * @property {HTMLElement} element
 * @property {DOMRect} rect
 * @property {Step|null} next
 * @property {Step|null} previous
 * @property {Object} cursor
 * @property {Number} cursor.x
 * @property {Number} cursor.y
 * @property {Number} cursor.height
 */

export default class Editor {
  /**
   * @param {MathJax} mathJax
   */
  constructor (mathJax) {
    /** @type {HTMLElement} */
    this.math = document.createElement('math')
    /** @type {Editor} */
    this.display = new Display(mathJax)
    /** @type {HTMLElement} */
    this.cursor = this.math
    /** @type {Step[]} */
    this.path = []

    this.math.setAttribute('id', 'root')
    this.display.on('keydown', this.handleKeyboardInteraction.bind(this))
    this.display.on('mouseup', this.handleMouseInteraction.bind(this))
  }

  /**
   * @param {String} value
   * @return {Void}
   */
  setValue (value) {
    this.math.innerHTML = value
    this.cursor = this.math
    this.update()
  }

  /**
   * @param {HTMLElement} value
   * @return {Void}
   */
  setCursor (value) {
    this.cursor = value
  }

  /**
   * @return {Void}
   */
  update () {
    this.prepareMath()
    this.display.render(
      DisplayHelper.prepare(this.math)
    ).then(() => {
      this.preparePath()
      this.updateCursor()
    })
  }

  /**
   * @param {HTMLElement} value
   * @param {Boolean} disableScrollIntoView
   * @return {Void}
   */
  updateCursor (value, disableScrollIntoView = false) {
    if (value) {
      this.setCursor(value)
    }
    const { cursor } = this.getCurrentStep()
    this.display.updateCursor(cursor, disableScrollIntoView)
  }

  /**
   * @return {Void}
   */
  prepareMath () {
    walk(this.math, (element) => {
      if (!element.hasAttribute('id')) {
        element.setAttribute('id', createId())
      }
    })
  }

  /**
   * @return {Void}
   */
  preparePath () {
    const path = []
    const line = {
      index: 0,
      rect: null
    }
    let previousStep = null

    const findStep = (element) => {
      return path.find((other) => (
        other.element === element
      ))
    }

    const createStep = (element) => {
      const { dom, rect } = this.display.getElementById(element.id)

      let x = rect.x
      let y = rect.y
      let height = rect.height

      if (isContainer(element)) {
        // Cursor should be placed after last element child.
        if (element.children.length) {
          const lastChildStep = findStep(element.lastElementChild)
          x = lastChildStep.rect.x + lastChildStep.rect.width
          y = lastChildStep.rect.y
          height = lastChildStep.rect.height
        }
      }

      const step = {
        dom,
        element,
        rect,

        next: null,
        previous: previousStep,

        cursor: {
          x,
          y,
          height
        }
      }

      if (previousStep) {
        previousStep.next = step
      }

      previousStep = step
      path.push(step)
    }

    walk(this.math, {
      before: (element) => {
        if (!line.rect) {
          line.rect = this.display.getEndOfLineByIndex(
            line.index
          ).rect
        }
        if (!isContainer(element)) {
          createStep(element)
        }
      },

      after (element) {
        if (isContainer(element)) {
          createStep(element)
        }
      }
    })

    this.path = path
  }

  /**
   * @return {Step}
   */
  getCurrentStep () {
    return this.path.find((step) => (
      this.cursor === step.element
    ))
  }

  /**
   * @param {KeyboardEvent} e
   * @return {Void}
   */
  handleKeyboardInteraction (e) {
    const { keyCode, key } = e

    if (keyCode === ARROW_RIGHT) {
      this.moveRight()
    } else if (keyCode === ARROW_LEFT) {
      this.moveLeft()
    } else if (keyCode === BACKSPACE) {
      this.applyBackspace()
    } else if (keyCode === DELETE) {
      this.applyDelete()
    } else if (key.match(IS_NUMBER)) {
      this.addNumber(key)
    } else if (key.match(IS_LETTER)) {
      this.addIdentifier(key)
    } else if (operators[key]) {
      this.addOperator(operators[key])
    }

    e.preventDefault()
  }

  /**
   * @param {MouseEvent} e
   * @return {Void}
   */
  handleMouseInteraction (e) {
    const x = e.pageX
    const y = e.pageY

    let smaller = Infinity
    let candidate = null

    for (const step of this.path) {
      const p1x = step.cursor.x
      const p1y = step.cursor.y
      const p2y = p1y + step.cursor.height
      const d = Math.abs(p1x - x)
      if (p1y <= y && y <= p2y && smaller > d) {
        smaller = d
        candidate = step
      }
    }

    if (!candidate || candidate.element === this.cursor) {
      return
    }

    this.updateCursor(candidate.element, true)
  }

  /**
   * @return {Void}
   */
  applyDelete () {
    this.setCursor(deleteElement(this.math, this.cursor))
    this.update()
  }

  /**
   * @return {Void}
   */
  applyBackspace () {
    this.setCursor(deleteBeforeElement(this.math, this.cursor))
    this.update()
  }

  /**
   * @return {Void}
   */
  moveRight () {
    const step = this.getCurrentStep()
    if (step.next) {
      this.updateCursor(step.next.element)
    }
  }

  /**
   * @return {Void}
   */
  moveLeft () {
    const step = this.getCurrentStep()
    if (step.previous) {
      this.updateCursor(step.previous.element)
    }
  }

  /**
   * @param {String|HTMLElement|CreateElementObject} elementToInsert
   * @param {HTMLElement|null} elementToCursor
   * @return {Void}
   */
  insert (elementToInsert, elementToCursor = null) {
    const element = extractElement(elementToInsert)
    insertElement(element, this.cursor)
    if (elementToCursor) {
      this.setCursor(
        extractElement(elementToCursor)
      )
    }
    this.display.focus()
    this.update()
  }

  /**
   * @param {Function} factory
   * @return {Void}
   */
  insertCustom (factory) {
    const [elementToInsert, elementToCursor] = factory(createElement)
    this.insert(elementToInsert, elementToCursor)
  }

  /**
   * @param {String} number
   * @return {Void}
   */
  addNumber (number) {
    this.insert(createElement('mn', number))
  }

  /**
   * @param {String} letter
   * @return {Void}
   */
  addIdentifier (letter) {
    this.insert(createElement('mi', letter))
  }

  /**
   * @param {String} operator
   * @return {Void}
   */
  addOperator (operator) {
    this.insert(createElement('mo', operator))
  }
}
