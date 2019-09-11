import lower from './lower'

/**
 * Perform a delete relative to current cursor position.
 * @param {HTMLElement} value 
 * @param {HTMLElement} current
 * @param {HTMLElement} initial
 * @return {HTMLElement} New cursor position.
 */
export default function del(value, current, initial) {
  const parent = current.parentNode

  if (current.hasAttribute('editable')) {
    return initial || current
  }
  
  switch (lower(current.tagName)) {
  case 'mrow':
    return del(value, parent, current)

  case 'math':
    return current
  }

  const to = current.nextElementSibling || parent
  parent.removeChild(current)
  
  return to
}