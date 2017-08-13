class JaxElement {
  /**
   * @param {MathjaxJaxElement} jax
   */
  constructor(jax) {
    /** @type {MathjaxJaxElement} */
    this.jax = jax
    /** @type {String} */
    this.value = ''
  }

  /**
   * @param {String} value 
   * 
   * @return {JaxElement}
   */
  setValue(value) {
    this.value = value
    return this
  }

  /**
   * @return {Promise}
   */
  update() {
    return new Promise(resolve => {
      this.jax.Text(this.value, () => resolve())
    })
  }
}

/**
 * @param {Node} $node
 * @param {Function} callback
 * 
 * @return {Void}
 */
export default function getJaxElement($node, callback) {
  const placeholder = '<math><mo>...</mo></math>'

  return new Promise(resolve => {
    MathJax.Hub.Config({
      displayAlign: "left"
    });
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $node, () => {
      const jax = MathJax.Hub.getAllJax($node)[0]
      jax.Text(placeholder, () => resolve(new JaxElement(jax)))
    }])
  })
}