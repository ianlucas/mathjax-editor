/**
 * Parse a MathML string and returns the element.
 * 
 * @param {String} html
 * 
 * @return {HTMLElement}
 */
export default function toDom(source) {
  let doc
  try {
    doc = (new DOMParser()).parseFromString(source, 'text/html')
  }
  catch (e) {
    doc = document.implementation.createHTMLDocument('')
    doc.body.innerHTML = source
  }
  return doc.body.firstChild
}