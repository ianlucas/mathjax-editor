/**
 * Remove a class of an element.
 * 
 * @param {HTMLElement} $el  
 * @param {String} name 
 * 
 * @return {Void}
 */
export default function removeClass($el, name) {
  const classes = $el.className.split(' ')
  $el.className = classes.filter(n => n !== name).join(' ')
}