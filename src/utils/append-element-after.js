/**
 * Append an element after the referenced element.
 * 
 * @param {HTMLElement} $ref  
 * @param {HTMLElement} $new 
 * 
 * @return {Void}
 */
export default function appendElementAfter($ref, $new) {
  return $ref.parentNode.insertBefore($new, $ref.nextSibling)
}