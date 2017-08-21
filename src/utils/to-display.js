import addClass from './add-class'
import appendElement from './append-element'
import appendElementAfter from './append-element-after'
import appendElementBefore from './append-element-before'
import createElement from './create-element'
import lcc from './lcc'
import toArray from './to-array'

/**
 * Create a thin space.
 * 
 * @return {HTMLElement}
 */
function createThinSpace() {
  return createElement('mspace', 'mathjax-editor-helper', {
    width: 'thinmathspace'
  })
}

/**
 * Create a placeholder for empty <mrow>s.
 * 
 * @return {HTMLElement}
 */
function createPlaceholder() {
  return createElement('mo', 'mathjax-editor-placeholder', {
    _html: '?'
  })
}

/**
 * Create a placeholder for empty lines.
 * 
 * @return {HTMLElement}
 */
function createNewlinePlaceholder() {
  return createElement('mo', 'mathjax-editor-newline-empty', {
    _html: '⏎'
  })
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

      if (!$mrow.children.length) {
        return appendElement($mrow, createPlaceholder())
      }

      switch (lcc($mrow.parentNode.tagName)) {
      case 'msqrt':
        appendElement($mrow, createThinSpace())
        break
      case 'mroot':
        if ($mrow.parentNode.firstElementChild === $mrow) {
          appendElement($mrow, createThinSpace())
        }
        break
      }
    })

  toArray($clone.querySelectorAll('mspace'))
    .forEach($mspace => {
      if ($mspace.getAttribute('linebreak') !== 'newline') {return}

      // Newlines are allowed only as child of the <math> element.

      const $math = $mspace.parentNode
      const $previous = $mspace.previousElementSibling
      const $next = $mspace.nextElementSibling

      if (!$next || lcc($next.tagName, 'math')) {
        appendElementAfter($mspace, createNewlinePlaceholder())
      }

      if (!(!$previous || lcc($previous.tagName, 'mspace'))) {return}
      appendElementBefore($mspace, createNewlinePlaceholder())
    })
    
  return $clone.outerHTML
}