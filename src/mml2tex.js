import toArray from './utils/to-array'

export default function mml2Tex($math) {
  let output = ''
  
  const walk = $el => {
    switch ($el.tagName) {
    case 'mn':
    case 'mi':
    case 'mo':
      output += $el.textContent
      break
    case 'mrow':
      output = output.trim() + '{'
      break
    default:
      output += `\\${$el.tagName.toLowerCase().substr(1)} `
      break
    }

    toArray($el.children)
      .forEach($child => walk($child))

    switch ($el.tagName) {
    case 'mrow':
      output = output.trim() + '}'
      break
    }
  }

  toArray($math.children)
    .forEach($child => walk($child))

  return output
}