/**
 * Insert an element at the beginning of the parent element.
 * 
 * @param {HTMLElement}  
 * @param {HTMLElement}
 * 
 * @return {Void}  
 */
export default function prependElement($parent, $el) {
  return $parent.insertBefore($el, $parent.firstElementChild)
}