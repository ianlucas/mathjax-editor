import lcc from './lcc'
import removeElement from './remove-element'

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
    if ($value.firstElementChild) {
      removeElement($value.firstElementChild)
    }
  }
  else if (!$position.nextElementSibling) {
    const $parent = $position.parentNode
    if (lcc($parent.tagName, 'mrow')) {
      cursor.setPosition(
        $parent.parentNode.previousElementSibling ||
        $parent.parentNode.parentNode
      )
      removeElement($parent.parentNode)
    }
    else {
      if ($parent.previousElementSibling) {
        cursor.setPosition($parent.previousElementSibling)
      }
      else if (lcc($parent.parentNode.tagName, 'math')) {
        cursor.setPosition(null)
      }
      else {cursor.setPosition($parent.parentNode)}
      removeElement($parent)
    }
  }
  else {
    removeElement($position.nextElementSibling)
  }
}