/**
 * Parse a MathML string and returns the element.
 * 
 * @param {String} html
 * 
 * @return {HTMLElement}
 */
export default function toDom(source) {
  const doc = (new DOMParser()).parseFromString(source, 'text/html')
  return doc.body.firstChild
}