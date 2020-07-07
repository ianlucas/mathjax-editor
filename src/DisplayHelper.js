import { isContainer, walk } from './utils'

export default {
  createContainerPlaceholder () {
    const mo = document.createElement('mo')
    mo.textContent = '?'
    return mo
  },

  createEndOfLine () {
    const mo = document.createElement('mo')
    mo.setAttribute('type', 'eof')
    mo.textContent = '|'
    return mo
  },

  prepare (math) {
    const clone = math.cloneNode(true)
    walk(clone, (element) => {
      if (isContainer(element) && !element.children.length) {
        element.appendChild(
          this.createContainerPlaceholder()
        )
      }
    })
    clone.appendChild(this.createEndOfLine())
    return clone
  }
}
