let idCount = 0

/**
 * @return {String}
 */
export function createId () {
  idCount += 1
  return `mje-node${idCount}`
}

/**
 * @param {HTMLElement} root
 * @param {Object|Function} actions
 * @return {Void}
 */
export function walk (root, actions) {
  const iterator = (element) => {
    if (actions.before) {
      actions.before(element)
    }

    Array.from(element.children).forEach((child) => {
      iterator(child, actions)
    })

    if (actions.after) {
      actions.after(element)
    }

    if (typeof actions === 'function') {
      actions(element)
    }
  }

  iterator(root)
}

/**
 * @typedef CreateElementObject
 * @property {HTMLElement} element
 * @property {Function} appendTo
 */
/**
 * @param {String} tagName
 * @param {String} textContent
 * @return {CreateElementObject}
 */
export function createElement (tagName, textContent) {
  const element = document.createElement(tagName)
  if (textContent) {
    element.textContent = textContent
  }
  return {
    element,

    /**
     * @param {HTMLElement} other
     */
    appendTo (other) {
      extractElement(other).appendChild(element)
      return this
    }
  }
}

/**
 * @param {HTMLElementObject|HTMLElement} subject
 * @return {HTMLElement}
 */
export function extractElement (subject) {
  return subject.element || subject
}

/**
 * @param {HTMLElement} element
 * @param {HTMLElement} reference
 * @return {Boolean}
 */
export function insertElement (element, reference) {
  if (isContainer(reference)) {
    if (!reference.children.length) {
      reference.appendChild(element)
      return true
    }
    reference.insertBefore(element, reference.lastElementChild.nextSibling)
  } else {
    reference.parentNode.insertBefore(element, reference)
  }
  return true
}

/**
 * @param {HTMLElement} value
 * @param {HTMLElement} current
 * @param {HTMLElement} initial
 * @return {HTMLElement}
 */
export function deleteElement (value, current, initial) {
  const parent = current.parentNode

  if (current.hasAttribute('editable')) {
    return initial || current
  }

  if (isRow(current)) {
    return deleteElement(value, parent, current)
  } else if (isMath(current)) {
    if (current.nextSibling) {
      const siblingMath = current.nextSibling.nextSibling
      const newPosition = siblingMath.firstChild
      while (siblingMath.firstChild) {
        current.appendChild(siblingMath.firstChild)
      }
      removeChild(current.nextSibling)
      removeChild(siblingMath)
      return newPosition || current
    }
    return current
  }

  const to = current.nextElementSibling || parent
  removeChild(current)

  return to
}

/**
 * @param {HTMLElement} value
 * @param {HTMLElement} current
 * @return {HTMLElement}
 */
export function backspaceElement (value, current) {
  const parent = current.parentNode
  const previous = current.previousElementSibling

  if (isContainer(current)) {
    if (current.lastChild) {
      return deleteElement(value, current.lastChild, current)
    }
    if (isMath(current)) {
      // Handling newline deletion. If a <math> element has a sibling,
      // that means it is a <br> element. In this case, it is empty
      // and we should only remove it and its line break element.
      if (current.previousSibling) {
        const newPosition = current.previousSibling.previousSibling
        removeChild(current.previousSibling)
        removeChild(current)
        return newPosition
      }
      return current
    }
    return deleteElement(value, parent, current)
  }

  if (!previous && isMath(parent)) {
    // Handling newline deletion. If the parent is a <math> element,
    // we check if it has a sibling (<br> element). If that is true,
    // we then merge all contents of this line with its sibling <math>.
    if (parent.previousSibling) {
      const newPosition = parent.firstChild
      const siblingMath = parent.previousSibling.previousSibling
      while (parent.firstChild) {
        siblingMath.appendChild(parent.firstChild)
      }
      removeChild(parent)
      return newPosition || siblingMath
    }
    return current
  }

  return deleteElement(value, previous || parent, current)
}

/**
 * @param {String} a
 * @param {String} b
 * @return {Boolean}
 */
export function equals (a, b) {
  return a.toLowerCase() === b
}

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isMath (element) {
  return (
    element &&
    equals(element.tagName, 'math')
  )
}

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isRow (element) {
  return (
    equals(element.tagName, 'mrow') ||
    equals(element.tagName, 'mtd')
  )
}

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isContainer (element) {
  return (
    isMath(element) ||
    isRow(element)
  )
}

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isIgnoredElement (element) {
  return (
    equals(element.tagName, 'mathjax-editor-value') ||
    equals(element.tagName, 'br') ||
    equals(element.tagName, 'mtable') ||
    equals(element.tagName, 'mtr')
  )
}

/**
 * @param {HTMLElement} element
 * @return {Void}
 */
export function removeChild (element) {
  element.parentNode.removeChild(element)
}
