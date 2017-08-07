/**
 * @param {String|Node} selectors
 * 
 * @return {Node}
 */
export default function findTextarea(selectors) {
  const $node = typeof selectors === 'string'
    ? document.querySelector(selectors)
    : (selectors.nodeType === 1 ? selectors : null)

  if (!$node) {
    throw new ReferenceError('MathjaxEditor: Target TEXTAREA was not found.')
  }

  if ($node.tagName !== 'TEXTAREA') {
    throw new TypeError('MathjaxEditor: Target element must be a TEXTAREA.')
  }

  return $node
}