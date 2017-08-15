export default function reverseObject(obj) {
  const keys = Object.keys(obj)
  const output = {}
  for (const key of keys) {
    const value = obj[key]
    output[value] = key
  }
  return output
}