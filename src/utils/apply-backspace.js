import lcc from './lcc'
import removeElement from './remove-element'

/**
 * Perform the "backspace" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {Cursor} cursor 
 * 
 * @return {Void}
 */
export default function applyBackspace($value, cursor) {
  const $position = cursor.getPosition()
  
  if (!$position) {return}
  if (lcc($position.tagName, 'mrow')) {
    const $parent = $position.parentNode

    if (lcc($parent.parentNode.tagName, 'math') && !$parent.previousElementSibling) {
      cursor.setPosition(null)
    }
    else {cursor.setPosition(
      $parent.previousElementSibling ||
      $parent.parentNode
    )}
    
    removeElement($parent)
  }
  else {
    if ($position.previousElementSibling) {
      cursor.setPosition($position.previousElementSibling)
    }
    else if (lcc($position.parentNode.tagName, 'mrow')) {
      cursor.setPosition($position.parentNode)
    }
    else {
      cursor.setPosition($position.parentNode.previousElementSibling)
    }

    removeElement($position)
  }
}