import lcc from './lcc'

/**
 * Check if an element or its parent has the `editable` attribute enabled.
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