/**
 * Parse a HTML string and returns the element.
 * 
 * NOTE: It seems that the performance of innerHTML is not
 *       that good, so this implementation will probably
 *       change...
 * 
 * @param {String} html
 * 
 * @return {HTMLElement}
 */
export default function toDom(html) {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.firstElementChild
}