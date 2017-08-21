import addClass from './add-class'
import lcc from './lcc'
import toArray from './to-array'

/**
 * Create a mathspace.
 * 
 * @return {HTMLElement}
 */
function createMspace() {
  const $mspace = document.createElement('mspace')
  $mspace.setAttribute('width', 'thinmathspace')
  $mspace.className = 'mathjax-editor-helper'
  return $mspace
}

/**
 * This function will add some visual stuff to the editor's current
 * value after cloning it, then will return the final markup to be set
 * on the display.
 * 
 * @param {HTMLElement} $value
 * @param {String} [placeholder] 
 * 
 * @return {String}
 */
export default function toDisplay($value, placeholder = '') {
  const $clone = $value.cloneNode(true)

  if (!$clone.children.length) {
    $clone.innerHTML = `<mtext class="mathjax-editor-placeholder">${placeholder}</mtext>`
  }

  toArray($clone.querySelectorAll('mrow'))
    .forEach($mrow => {
      addClass($mrow, 'mathjax-editor-mrow')

      if ($mrow.children.length) {
        switch (lcc($mrow.parentNode.tagName)) {
        case 'msqrt':
          $mrow.appendChild(createMspace())
          break
        case 'mroot':
          if ($mrow.parentNode.firstElementChild === $mrow) {
            $mrow.appendChild(createMspace())
          }
          break
        }
      }
      else {
        const $mo = document.createElement('mo')
        $mo.className = 'mathjax-editor-placeholder'
        $mo.innerHTML = '?'
        $mrow.appendChild($mo)
      }
    })

  toArray($clone.querySelectorAll('mspace'))
    .forEach($mspace => {
      if ($mspace.getAttribute('linebreak') !== 'newline') {return}

      const $previous = $mspace.previousElementSibling
      const $next = $mspace.nextElementSibling
      const $mo = document.createElement('mo')
      $mo.className = 'mathjax-editor-newline-empty'
      $mo.innerHTML = '⏎'

      if (!$next || lcc($next.tagName, 'math')) {
        $mspace.parentNode.insertBefore($mo, $mspace.nextSibling)
      }

      if (!(!$previous || lcc($previous.tagName, 'mspace'))) {return}
      $mspace.parentNode.insertBefore($mo.cloneNode(true), $mspace)
    })
    
  return $clone.outerHTML
}