import Display from './Display'
import DisplayHelper from './DisplayHelper'
import { createId, isContainer, isMath, isRow, walk, insertElement, deleteElement, deleteBeforeElement } from './utils'
import { operators } from './constants'

const ARROW_LEFT = 37
const ARROW_RIGHT = 39
const BACKSPACE = 8
const DELETE = 46
const IS_NUMBER = /^\d$/
const IS_LETTER = /^[a-z]$/i

export default class Editor {
  /**
   * Creates a editor instance.
   *
   * @param {MathJax} mathJax
   */
  constructor (mathJax) {
    this.math = document.createElement('math')
    this.display = new Display(mathJax)
    this.cursor = this.math
    this.path = []

    this.math.setAttribute('id', 'root')
    this.display.on('keydown', this.handleKeyboardInteraction.bind(this))
    this.display.on('mouseup', this.handleMouseInteraction.bind(this))
  }

  /**
   * Set the value of the editor.
   *
   * @param {String} value
   */
  setValue (value) {
    this.math.innerHTML = value
    this.cursor = this.math
    this.update()
  }

  /**
   * Update the editor displayed math.
   *
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
   * Set cursor position.
   *
   * @param {HTMLElement} value
   *
   * @return {Void}
   */
  updateCursor (value) {
    if (value) {
      this.cursor = value
    }
    const { cursor } = this.getCurrentStep()
    this.display.updateCursor(cursor)
  }

  /**
   * Assign an id to every element.
   *
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
   * Creates a path for the cursor. Path is an array of steps.
   * Each step has its attached element and size/positioning
   * for cursor placement.
   *
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
        // Cursor should be placed after last element child of this mrow.
        if (element.children.length) {
          const lastChildStep = findStep(element.lastElementChild)
          x = lastChildStep.rect.x + lastChildStep.rect.width
          y = lastChildStep.rect.y
          height = lastChildStep.rect.height
        }
      }

      if (isMath(element.parentNode)) {
        height = line.rect.height
        y = line.rect.y
      }

      if (isMath(element)) {
        x = line.rect.x + 0
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
          ).getBoundingClientRect()
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

  getCurrentStep () {
    return this.path.find((step) => (
      this.cursor === step.element
    ))
  }

  /**
   * Handles keyboard events.
   *
   * @param {KeyboardEvent} e
   */
  handleKeyboardInteraction (e) {
    const { keyCode, key } = e
    const step = this.getCurrentStep()

    if (!step) {
      return
    }

    if (keyCode === ARROW_RIGHT && step.next) {
      this.updateCursor(step.next.element)
    } else if (keyCode === ARROW_LEFT && step.previous) {
      this.updateCursor(step.previous.element)
    } else if (keyCode === BACKSPACE) {
      this.cursor = deleteBeforeElement(this.math, this.cursor)
      this.update()
    } else if (keyCode === DELETE) {
      this.cursor = deleteElement(this.math, this.cursor)
      this.update()
    } else if (key.match(IS_NUMBER)) {
      this.addNumber(key)
    } else if (key.match(IS_LETTER)) {
      this.addIdentifier(key)
    } else if (operators[key]) {
      this.addOperator(operators[key])
    }
  }

  /**
   * Handles mouse events.
   *
   * @param {MouseEvent} e
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

    this.updateCursor(candidate.element)
  }

  addNumber (number) {
    const mn = document.createElement('mn')
    mn.textContent = number
    insertElement(mn, this.cursor)
    this.update()
  }

  addIdentifier (letter) {
    const mi = document.createElement('mi')
    mi.textContent = letter
    insertElement(mi, this.cursor)
    this.update()
  }

  addOperator (operator) {
    const mo = document.createElement('mo')
    mo.textContent = operator
    insertElement(mo, this.cursor)
    this.update()
  }
}
