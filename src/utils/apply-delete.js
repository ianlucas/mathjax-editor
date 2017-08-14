/**
 * @param {HTMLElement}  
 * @param {Cursor} cursor 
 */
export default function applyDelete($value, cursor) {
  const $position = cursor.getPosition()
  if (!$position) {
    $value.removeChild($value.firstElementChild)
  }
  else if (!$position.nextElementSibling) {
    const $parent = $position.parentNode
    if ($parent.tagName === 'MROW') {
      cursor.setPosition($parent.parentNode.previousElementSibling)
      $parent.parentNode.parentNode.removeChild($parent.parentNode)
    }
    else {
      $parent.parentNode.removeChild($parent)
    }
  }
  else {
    $position.parentNode.removeChild($position.nextElementSibling)
  }
}