import toArray from './to-array'

/**
 * @param {HTMLElement} $math
 * @param {String} [placeholder] 
 */
export default function getMarkupWithHelpers($math, placeholder = '') {
  const $cloneMath = $math.cloneNode(true)

  if (!$cloneMath.children.length) {
    $cloneMath.innerHTML = placeholder
  }

  toArray($cloneMath.querySelectorAll('mrow'))
    .forEach($mrow => {
      if (!$mrow.children.length) {
        const $mo = document.createElement('mo')
        $mo.className = 'mathjax-editor-placeholder'
        $mo.innerHTML = '?'
        $mrow.appendChild($mo)
      }
    })

  toArray($cloneMath.querySelectorAll('mspace'))
    .forEach($mspace => {
      const $previous = $mspace.previousElementSibling
      const $next = $mspace.nextElementSibling
      const $mo = document.createElement('mo')
      $mo.className = 'mathjax-editor-newline-empty'
      $mo.innerHTML = '⏎'

      if (!$next || $next.tagName === 'MATH') {
        $mspace.parentNode.insertBefore($mo, $mspace.nextSibling)
      }

      if (
        !(
          !$previous || 
          $previous.tagName === 'MSPACE'
        )
      ) {return}

      $mspace.parentNode.insertBefore($mo.cloneNode(true), $mspace)
    })
  return $cloneMath.outerHTML
}