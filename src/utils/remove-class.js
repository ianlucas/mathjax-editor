/**
 * Remove a class of an element.
 * (IE>=10)
 * 
 * @param {HTMLElement} $el  
 * @param {String} name 
 * 
 * @return {Void}
 */
export default function removeClass($el, name) {
  return $el.classList.remove(name)
}