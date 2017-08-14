/**
 * @param {HTMLElement} $el  
 * @param {String} name 
 */
export default function hasClass($el, name) {
  return $el.classList.contains(name)
}