import OPERATOR_LIST from './constants/operator-list'

import reverseObject from './utils/reverse-object'
import toArray from './utils/to-array'

const REVERSE_OPERATOR_LIST = reverseObject(OPERATOR_LIST)

export default function mml2Tex($value) {
  let output = ''
  
  /** @param {HTMLElement} $el */
  const walk = $el => {
    const tagName = $el.tagName
    const innerValue = $el.innerHTML

    switch (tagName) {
    case 'math':
    case 'msup':
    case 'msub':
      break
    case 'mn':
    case 'mi':
      output += innerValue
      break
    case 'mo':
      output += REVERSE_OPERATOR_LIST[innerValue] || '?'
      break
    case 'mrow':
      output = output.trim() + '{'
      break
    default:
      output += `\\${tagName.substr(1)} `
      break
    }

    toArray($el.children)
      .forEach($child => walk($child))

    switch (tagName) {
    case 'mrow':
      output = output.trim() + '}'
      
      if ($el.parentNode.firstElementChild === $el) {
        switch ($el.parentNode.tagName) {
        case 'msup':
          output += '^'
          break
        case 'msub':
          output += '_'
          break
        }
      }
      break
    }
  }

  walk($value)

  return output
}