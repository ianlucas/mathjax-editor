import toArray from './utils/to-array'

export default class Tree {
  /**
   * @param {HTMLElement} $value  
   */
  constructor($value) {
    this.$value = $value
    this.path = []
    this.nextId = 0

    this.update()
  }

  /**
   * @param {HTMLElement} $value
   * 
   * @return {Tree}
   */
  setValue($value) {
    this.$value = $value
    return this
  }

  /**
   * @return {Array}
   */
  getPath() {
    return this.path
  }

  update() {
    this.path = [null]

    const walk = $el => {
      const children = toArray($el.children)

      if (!$el.hasAttribute('id')) {
        $el.setAttribute('id', `mje${this.nextId++}`)
      }
      
      this.path.push($el)

      children.forEach($child => walk($child))

      if (children.length && $el.tagName !== 'MROW') {
        const index = this.path.indexOf($el)
        this.path.splice(index, 1)
        this.path.push($el)
      }
    }

    walk(this.$value)
  }
}