/**
 * Quickly create an element with className.
 * 
 * @param {String} tagName 
 * @param {String} className 
 * 
 * @return {HTMLElement}
 */
export default function createElement(tagName, className = '') {
  const $el = document.createElement(tagName)
  $el.className = className
  return $el
}