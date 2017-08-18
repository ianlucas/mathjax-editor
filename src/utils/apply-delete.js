import lcc from './lcc'
import removeElement from './remove-element'

/**
 * Perform the "delete" deletion on the given value and
 * current cursor position.
 * 
 * TODO: Refactor this code.
 * 
 * @param {HTMLElement} $value
 * @param {Cursor} cursor 
 * 
 * @return {Void}
 */
export default function applyDelete($value, cursor) {
  const $position = cursor.getPosition()
  const isMrow = $position && lcc($position.tagName, 'mrow')
  if (!$position) {
    if ($value.firstElementChild) {
      removeElement($value.firstElementChild)
    }
  }
  else if (!$position.nextElementSibling || isMrow) {
    const $parent = $position.parentNode
    if (isMrow) {
      const isMath = lcc($parent.parentNode.tagName, 'math')
      cursor.setPosition(
        $parent.previousElementSibling ||
        (!isMath ? $parent.parentNode : null)
      )
      removeElement($parent)
    }
    else if (lcc($parent.tagName, 'mrow')) {
      const isMath = lcc($parent.parentNode.parentNode.tagName, 'math')
      cursor.setPosition(
        $parent.parentNode.previousElementSibling ||
        (!isMath ? $parent.parentNode.parentNode : null)
      )
      removeElement($parent.parentNode)
    }
    else {
      if (lcc($parent.tagName, 'math')) {
        return
      }
      if ($parent.previousElementSibling) {
        cursor.setPosition($parent.previousElementSibling)
      }
      else if ($parent.parentNode && lcc($parent.parentNode.tagName, 'math')) {
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