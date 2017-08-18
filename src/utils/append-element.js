/**
 * Append an element to its parent.
 * 
 * @param {HTMLElement} $parent  
 * @param {...HTMLElement} children
 * 
 * @return {Void}  
 */
export default function appendElement($parent, ...children) {
  return children.forEach($child => $parent.appendChild($child))
}