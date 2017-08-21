import lcc from './lcc'
import removeElement from './remove-element'

/**
 * Perform the "backspace" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {HTMLElement} $pos 
 * 
 * @return {Void}
 */
export default function applyBackspace($value, $pos) {
  if (!$pos) {return $pos}

  const $parent = $pos.parentNode

  switch (lcc($pos.tagName)) {
  case 'mrow':
    return applyBackspace($value, $parent)
  case 'math':
    return $pos
  }

  const $newPos = (
    $pos.previousElementSibling || 
    (!lcc($parent.tagName, 'math') ? $parent : null)
  )
  
  removeElement($pos)

  return $newPos
}