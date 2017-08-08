/**
 * @param {NodeList} obj 
 */
export default function toArray(obj) {
  return Array.prototype.slice.call(obj)
}