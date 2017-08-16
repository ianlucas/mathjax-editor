/**
 * Convert an array-like object to an actual array.
 * 
 * @param {NodeList} obj
 * 
 * @return {Array}
 */
export default function toArray(obj) {
  return Array.prototype.slice.call(obj)
}