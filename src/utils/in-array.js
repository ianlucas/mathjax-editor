/**
 * Check if the subject is inside the given array.
 * 
 * @param {Array} array 
 * @param {*} subject 
 * 
 * @return {Boolean}
 */
export default function inArray(array, subject) {
  return array.indexOf(subject) !== -1
}