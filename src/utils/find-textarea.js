/**
 * Find the textarea with the given selector. Just one textarea will be
 * picked by this function, so the first found one.
 * 
 * @param {String|HTMLElement} selectors
 * 
 * @return {HTMLElement}
 */
export default function findTextarea(selectors) {
  const $el = typeof selectors === 'string'
    ? document.querySelector(selectors)
    : (selectors.nodeType === 1 ? selectors : null)

  if (!$el) {
    throw new ReferenceError('MathjaxEditor: Target TEXTAREA was not found.')
  }

  if ($el.tagName !== 'TEXTAREA') {
    throw new TypeError('MathjaxEditor: Target element must be a TEXTAREA.')
  }

  return $el
}