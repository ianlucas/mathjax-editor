import lower from './lower'

/**
 * Walk through each element within a math element.
 * @param {HTMLElement} source 
 * @param {Function} handler 
 */
export default function each(source, handler) {
  const walk = el => {
    const isContainer = (
      lower(el.tagName) === 'mrow'
      || lower(el.tagName) === 'math'
    )

    if (!isContainer) {
      handler(el)
    }

    if (el.children) {
      let child = el.firstElementChild
      while (child) {
        walk(child)
        child = child.nextElementSibling
      }
    }

    if (isContainer) {
      handler(el)
    }
  }

  walk(source)
}