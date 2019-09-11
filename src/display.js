import each from './each'
import id from './id'
import lower from './lower'
import newline from './newline'

const skip = ['mo', 'mi', 'mn', 'mspace'] 

/**
 * Get the editor value as a HTML string.
 * @param {HTMLElement} math 
 * @return {String}
 */
export default function display(math) {
  each(math, source => {
    if (!source.id) {
      source.id = id()
    }
  })

  const displayed = math.cloneNode(true)

  const mspace = () => {
    const el = MathJax.HTML.Element('mspace')
    el.setAttribute('width', 'thinmathspace')
    return el
  }

  const mnewline = () => {
    return MathJax.HTML.Element('mo', { className: 'mje-newline' }, ['⏎'])
  }

  const mplaceholder = () => {
    return MathJax.HTML.Element('mi', { className: 'mje-placeholder' }, ['?'])
  }

  each(displayed, source => {
    const tag = lower(source.tagName)
    switch (tag) {
    case 'mspace':
      if (!source.id) {break}
      if (!newline(source)) {break}
      const next = source.nextElementSibling || displayed.lastElementChild
      const prev = displayed.firstChild
      let addNewlinePlaceholder = (next === source)
      if (next && lower(next.tagName) === 'mspace') {
        if (newline(next)) {
          addNewlinePlaceholder = true
        }
      }
      if (addNewlinePlaceholder) {
        source.parentNode.insertBefore(mnewline(), source.nextSibling)
      }
      if (prev === source) {
        source.parentNode.insertBefore(mnewline(), source)
      }
      break

    case 'mrow':
    case 'math':
      if (!source.children.length) {
        source.appendChild(mplaceholder())
        break
      }
      if (tag !== 'math') {
        source.appendChild(mspace())
        source.insertBefore(mspace(), source.firstChild)
      }
      break
    default:
      if (skip.indexOf(tag) === -1) {
        source.parentNode.insertBefore(mspace(), source.nextSibling)
      }
    }
  })
  return displayed.outerHTML
}