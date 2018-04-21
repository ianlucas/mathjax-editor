import lcc from './lcc'
import removeElement from './remove-element'

/**
 * Perform the "backspace" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {HTMLElement} $pos
 * @param {HTMLElement} [$invoker=null]
 * 
 * @return {Void}
 */
export default function applyBackspace($value, $pos, $invoker = null) {
  if (!$pos) {return $pos}

  // If the $pos contains the 'editable' attribute, we assume that
  // it's the container of the elements that can be inserted on
  // a readonly math equation, so it can't be removed.

  if ($pos.getAttribute('editable') === 'true') {return $invoker || $pos}

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