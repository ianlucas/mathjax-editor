export default function createElement(tagName, className = '') {
  const $el = document.createElement(tagName)
  $el.className = className
  return $el
}