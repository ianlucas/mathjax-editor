import toArray from './to-array'

/**
 * Get a clean copy of editor's value.
 * 
 * @param {HTMLElement}  $value
 * 
 * @return {HTMLElement}
 */
export default function getCleanCopy($value) {
  const $clone = $value.cloneNode(true)
  /** @param {HTMLElement} $el */
  const walk = $el => {
    $el.removeAttribute('id')
    $el.removeAttribute('class')
    toArray($el.children)
      .forEach($child => walk($child))
  }
  walk($clone)
  return $clone
}