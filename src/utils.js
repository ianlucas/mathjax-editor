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
 * @param {String} tagName
 * @param {String} textContent
 * @return {HTMLElement}
 */
export function createElement (tagName, textContent) {
  const element = document.createElement(tagName)
  element.textContent = textContent
  return element
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
    return current
  }

  const to = current.nextElementSibling || parent
  parent.removeChild(current)

  return to
}

/**
 * @param {HTMLElement} value
 * @param {HTMLElement} current
 * @return {HTMLElement}
 */
export function deleteBeforeElement (value, current) {
  const parent = current.parentNode
  const previous = current.previousElementSibling

  if (isContainer(current)) {
    if (current.lastElementChild) {
      return deleteElement(value, current.lastElementChild, current)
    }
    if (isMath(current)) {
      return current
    }
    return deleteElement(value, parent, current)
  }

  if (!previous && isMath(parent)) {
    return current
  }

  return deleteElement(value, previous || parent, current)
}

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isMath (element) {
  return (
    element &&
    element.tagName === 'MATH'
  )
}

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isRow (element) {
  return element.tagName === 'MROW'
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
