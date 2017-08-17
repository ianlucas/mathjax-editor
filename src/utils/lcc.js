/**
 * Converts a string to the lower case, and check if it is equal to
 * the second argument if it is given.
 * 
 * @param {String} str
 * @param {String} other
 * 
 * @return {String}
 */
export default function lcc(str, other) {
  str = str.toLowerCase()
  if (other === undefined) {return str}
  return str === other.toLowerCase()
}