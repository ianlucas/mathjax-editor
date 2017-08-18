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
    const value = attributes[key]
    switch (key) {
    case '_html':
      $el.innerHTML = value
      break
    default:
      $el.setAttribute(key, value)
    }
  })
  return $el
}