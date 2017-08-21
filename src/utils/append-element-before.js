/**
 * Append an element before the referenced element.
 * 
 * @param {HTMLElement} $ref  
 * @param {HTMLElement} $new 
 * 
 * @return {Void}
 */
export default function appendElementBefore($ref, $new) {
  return $ref.parentNode.insertBefore($new, $ref)
}