import lower from './lower'

/**
 * Add an element next to the current cursor positon.
 * @param {HTMLElement} what 
 * @param {HTMLElement} source 
 * @return {Boolean}
 */
export default function add(what, source) {
  switch (lower(source.tagName)) {
  case 'mrow':
  case 'math':
    if (!source.children.length) {
      source.appendChild(what)
      return true
    }
    source.insertBefore(what, source.lastElementChild.nextSibling)
    return true

  default:
    source.parentNode.insertBefore(what, source)
    return true
  }
}