/**
 * Add a class to an element.
 * 
 * @param {HTMLElement} $el  
 * @param {String} name
 * 
 * @return {Void}
 */
export default function addClass($el, name) {
  const classes = $el.className.split(' ')
  if (!(~classes.indexOf(name))) {
    $el.className += ` ${name}`
  }
}