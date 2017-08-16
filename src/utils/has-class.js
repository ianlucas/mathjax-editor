/**
 * Check if the element has the specified class.
 * (IE>=10)
 * 
 * @param {HTMLElement} $el  
 * @param {String} name 
 * 
 * @return {Boolean}
 */
export default function hasClass($el, name) {
  return $el.classList.contains(name)
}