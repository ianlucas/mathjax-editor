/**
 * @param {HTMLElement}  
 * @param {Cursor} cursor 
 */
export default function applyBackspace($value, cursor) {
  const $position = cursor.getPosition()
  
  if (!$position) {return}
  if ($position.tagName === 'MROW') {
    const $parent = $position.parentNode
    const $previous = $parent.previousElementSibling
    $parent.parentNode.removeChild($parent)
    cursor.setPosition($previous)
  }
  else {
    if ($position.previousElementSibling) {
      cursor.setPosition($position.previousElementSibling)
    }
    else if ($position.parentNode.tagName === 'MROW') {
      cursor.setPosition($position.parentNode)
    }
    else {
      cursor.setPosition($position.parentNode.previousElementSibling)
    }
    $position.parentNode.removeChild($position)
  }
}