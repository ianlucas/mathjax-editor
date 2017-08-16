/**
 * Keys trade places with values. So a key will turn into a value,
 * and its value will be its key.
 * 
 * @param {Object} obj 
 * 
 * @return {Object}
 */
export default function reverseObject(obj) {
  const keys = Object.keys(obj)
  const output = {}
  for (const key of keys) {
    const value = obj[key]
    output[value] = key
  }
  return output
}