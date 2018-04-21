import lcc from './lcc'

/**
 * Check if an to be inserted element is insertable or some of its parents.
 * 
 * @param {HTMLElement} $el
 * 
 * @return {Boolean}
 */
export default function isEditable($el) {
  if ($el.getAttribute('editable') === 'true') {
    return true
  }
  if (!lcc($el.tagName, 'math') && $el.parentNode) {
    return isEditable($el.parentNode)
  }
  return false
}