/**
 * Unlisten an event of an element.
 * 
 * @param {HTMLElement}  $el
 * @param {String} type
 * @param {Function} listener
 * 
 * @return {Void}
 */
export default function unlistenElement($el, type, listener) {
  return $el.removeEventListener(type, listener)
}