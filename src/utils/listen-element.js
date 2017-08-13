/**
 * @param {HTMLElement} $el
 * @param {String} type
 * @param {Function} listener
 */
export default function listenElement($el, type, listener) {
  return $el.addEventListener(type, listener)
}