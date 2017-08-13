/**
 * @param {HTMLElement} $ref  
 * @param {HTMLElement} $new 
 */
export default function appendElementAfter($ref, $new) {
  return $ref.parentNode.insertBefore($new, $ref.nextSibling)
}