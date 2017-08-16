/**
 * Add a class to an element.
 * (IE>=10)
 * 
 * @param {HTMLElement} $el  
 * @param {String} name
 * 
 * @return {Void}
 */
export default function addClass($el, name) {
  return $el.classList.add(name)
}