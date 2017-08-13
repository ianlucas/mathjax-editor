/**
 * @param {HTMLElement} $el  
 * @param {String} name 
 */
export default function removeClass($el, name) {
  return $el.classList.remove(name)
}