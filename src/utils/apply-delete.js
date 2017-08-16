import lc from './lc'

/**
 * Perform the "delete" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {Cursor} cursor 
 * 
 * @return {Void}
 */
export default function applyDelete($value, cursor) {
  const $position = cursor.getPosition()
  if (!$position) {
    $value.removeChild($value.firstElementChild)
  }
  else if (!$position.nextElementSibling) {
    const $parent = $position.parentNode
    if (lc($parent.tagName) === 'mrow') {
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