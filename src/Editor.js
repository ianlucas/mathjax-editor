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
 * @typedef {Object} ElementPosition
 * @property {HTMLElement} dom
 * @property {HTMLElement} element
 * @property {DOMRect} rect
 * @property {ElementPosition|null} next
 * @property {ElementPosition|null} previous
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
    this.value = document.createElement('math')
    /** @type {Editor} */
    this.display = new Display(mathJax)
    /** @type {HTMLElement} */
    this.cursor = this.value
    /** @type {ElementPosition[]} */
    this.path = []

    this.value.setAttribute('id', 'root')
    this.display.on('keydown', this.handleKeyboardInteraction.bind(this))
    this.display.on('mouseup', this.handleMouseInteraction.bind(this))
  }

  /**
   * @param {String} value
   * @return {Void}
   */
  setValue (value) {
    this.value.innerHTML = value
    this.cursor = this.value
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
      DisplayHelper.prepare(this.value)
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
    const { cursor } = this.getCurrentPosition()
    this.display.updateCursor(cursor, disableScrollIntoView)
  }

  /**
   * @return {Void}
   */
  prepareMath () {
    walk(this.value, (element) => {
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
    let lastPosition = null

    /**
     * @param {HTMLElement} element
     * @return {ElementPosition}
     */
    const findPosition = (element) => {
      return path.find((other) => (
        other.element === element
      ))
    }

    /**
     * @param {HTMLElement} element
     * @return {ElementPosition}
     */
    const createPosition = (element) => {
      const { dom, rect } = this.display.getElementById(element.id)

      let x = rect.x
      let y = rect.y
      let height = rect.height

      if (isContainer(element)) {
        // Cursor should be placed after last element child.
        if (element.children.length) {
          const lastChildPosition = findPosition(element.lastElementChild)
          x = lastChildPosition.rect.x + lastChildPosition.rect.width
          y = lastChildPosition.rect.y
          height = lastChildPosition.rect.height
        }
      }

      const position = {
        dom,
        element,
        rect,

        next: null,
        previous: lastPosition,

        cursor: {
          x,
          y,
          height
        }
      }

      if (lastPosition) {
        lastPosition.next = position
      }

      lastPosition = position
      path.push(position)
    }

    walk(this.value, {
      before: (element) => {
        if (!line.rect) {
          line.rect = this.display.getEndOfLineByIndex(
            line.index
          ).rect
        }
        if (!isContainer(element)) {
          createPosition(element)
        }
      },

      after (element) {
        if (isContainer(element)) {
          createPosition(element)
        }
      }
    })

    this.path = path
  }

  /**
   * @return {ElementPosition}
   */
  getCurrentPosition () {
    return this.path.find((position) => (
      this.cursor === position.element
    ))
  }

  /**
   * @param {KeyboardEvent} e
   * @return {Void}
   */
  handleKeyboardInteraction (e) {
    const { keyCode, key } = e

    if (keyCode === ARROW_RIGHT) {
      this.moveToNextPosition()
    } else if (keyCode === ARROW_LEFT) {
      this.moveToPreviousPosition()
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

    for (const position of this.path) {
      const p1x = position.cursor.x
      const p1y = position.cursor.y
      const p2y = p1y + position.cursor.height
      const d = Math.abs(p1x - x)
      if (p1y <= y && y <= p2y && smaller > d) {
        smaller = d
        candidate = position
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
    this.setCursor(deleteElement(this.value, this.cursor))
    this.update()
  }

  /**
   * @return {Void}
   */
  applyBackspace () {
    this.setCursor(deleteBeforeElement(this.value, this.cursor))
    this.update()
  }

  /**
   * @return {Void}
   */
  moveToNextPosition () {
    const position = this.getCurrentPosition()
    if (position.next) {
      this.updateCursor(position.next.element)
    }
  }

  /**
   * @return {Void}
   */
  moveToPreviousPosition () {
    const position = this.getCurrentPosition()
    if (position.previous) {
      this.updateCursor(position.previous.element)
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
