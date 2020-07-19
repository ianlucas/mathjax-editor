import { isContainer, walk, createElement } from './utils'

export default {
  /**
   * @return {HTMLElement}
   */
  createSpace () {
    const mspace = createElement('mspace')
    mspace.element.setAttribute('width', 'thinmathspace')
    return mspace.element
  },

  /**
   * @return {HTMLElement}
   */
  createContainerPlaceholder () {
    const mo = createElement('mo', '?')
    mo.element.setAttribute('type', 'placeholder')
    return mo.element
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
    return clone
  }
}
