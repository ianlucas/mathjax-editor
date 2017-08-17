import lcc from './lcc'

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
    const $previous = cursor.getLeft()
    $parent.parentNode.removeChild($parent)
    cursor.setPosition($previous)
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
    $position.parentNode.removeChild($position)
  }
}