/**
 * Quickly create an element with className.
 * 
 * @param {String} tagName 
 * @param {String} [className=''] 
 * @param {Object} [attributes={}]
 * 
 * @return {HTMLElement}
 */
export default function createElement(tagName, className = '', attributes = {}) {
  if (typeof className === 'object') {
    attributes = className
    className = ''
  }

  const $el = document.createElement(tagName)
  $el.className = className

  Object.keys(attributes).forEach(key => {
    $el.setAttribute(key, attributes[key])
  })
  return $el
}