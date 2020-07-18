import { isContainer, walk } from './utils'

export default {
  /**
   * @return {HTMLElement}
   */
  createSpace () {
    const el = document.createElement('mspace')
    el.setAttribute('width', 'thinmathspace')
    return el
  },

  /**
   * @return {HTMLElement}
   */
  createContainerPlaceholder () {
    const mo = document.createElement('mo')
    mo.setAttribute('type', 'placeholder')
    mo.textContent = '?'
    return mo
  },

  /**
   * @return {HTMLElement}
   */
  createEndOfLine () {
    const mo = document.createElement('mo')
    mo.setAttribute('type', 'eof')
    mo.textContent = '|'
    return mo
  },

  /**
   * @param {HTMLElement} math
   * @return {HTMLElement}
   */
  prepare (math) {
    const clone = math.cloneNode(true)
    walk(clone, (element) => {
      if (isContainer(element)) {
        if (!element.children.length) {
          element.appendChild(
            this.createContainerPlaceholder()
          )
        }
        element.appendChild(this.createSpace())
      }
    })
    clone.appendChild(this.createEndOfLine())
    return clone
  }
}
