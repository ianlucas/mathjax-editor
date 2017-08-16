/**
 * Append an element to its parent.
 * 
 * @param {HTMLElement} $parent  
 * @param {HTMLElement} $child
 * 
 * @return {Void}  
 */
export default function appendElement($parent, $child) {
  return $parent.appendChild($child)
}