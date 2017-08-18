import IDENTIFIER_LIST from './constants/identifier-list'
import OPERATOR_LIST from './constants/operator-list'

import lcc from './utils/lcc'
import reverseObject from './utils/reverse-object'
import toArray from './utils/to-array'

const REVERSE_IDENTIFIER_LIST = reverseObject(IDENTIFIER_LIST)
const REVERSE_OPERATOR_LIST = reverseObject(OPERATOR_LIST)

/**
 * A basic basic basic MathML to Tex conversor.
 * 
 * @param {HTMLElement}  
 * 
 * @return {String}
 */
export default function mml2Tex($value) {
  let output = ''
  
  /** @param {HTMLElement} $el */
  const walk = $el => {
    const children = $el.children
    const innerValue = $el.innerHTML
    const tagName = lcc($el.tagName)
    let fromList

    switch (tagName) {
    case 'math':
    case 'msup':
    case 'msub':
      break
    case 'mn':
      output += innerValue
      break
    case 'mi':
      if (fromList = REVERSE_IDENTIFIER_LIST[innerValue]) {
        output += fromList + (fromList[0] === '\\' ? ' ' : '')
      }
      else {
        output += innerValue
      } 
      break
    case 'mo':
      if (fromList = REVERSE_OPERATOR_LIST[innerValue]) {
        output += fromList + (fromList[0] === '\\' ? ' ' : '')
      }
      else {
        output += '?'
      }
      break
    case 'mrow':
      output = output.trim() + '{'
      break
    case 'mspace':
      switch ($el.getAttribute('linebreak')) {
      case 'newline':
        output += '\\\\'
        break
      }
      break
    default:
      output += `\\${tagName.substr(1)} `
      break
    }

    toArray(children).forEach($child => walk($child))

    switch (tagName) {
    case 'mrow':
      output += '}'
      
      if ($el.parentNode.firstElementChild === $el) {
        switch (lcc($el.parentNode.tagName)) {
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