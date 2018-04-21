import lcc from './lcc'
import removeElement from './remove-element'
import applyBackspace from './apply-backspace'

/**
 * Perform the "delete" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {HTMLElement} $pos 
 * 
 * @return {Void}
 */
export default function applyDelete($value, $pos) {
  if (!$pos) {return applyBackspace($value, $value.firstElementChild)}
  
  const $parent = $pos.parentNode

  switch (lcc($pos.tagName)) {
  case 'mrow':
    if (
      !$pos.firstElementChild &&
      $pos.getAttribute('editable') === 'true'
    ) {return $pos}
    return applyBackspace($value, $pos.firstElementChild || $parent)
  }

  if (!$pos.nextElementSibling) {
    if (lcc($parent.tagName, 'math')) {return $pos}
    return applyBackspace($value, $parent, $pos)
  }

  removeElement($pos.nextElementSibling)
  
  return $pos
}