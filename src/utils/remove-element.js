/**
 * Remove the element from the DOM.
 * 
 * @param {HTMLElement}  $el
 * 
 * @return {Void}
 */
export default function removeElement($el) {
  return $el.parentNode.removeChild($el)
}