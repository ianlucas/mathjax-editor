import raf from 'raf'

import Promise from './utils/promise'

export default class ElementJax {
  /**
   * This class is a wrapper around MathJax's ElementJax.
   * 
   * @see http://docs.mathjax.org/en/latest/api/elementjax.html
   * 
   * @param {MathJax's ElementJax} jax
   * 
   * @constructor
   */
  constructor(jax) {
    /** @type {MathJax's ElementJax} */
    this.jax = jax
    /** @type {String} */
    this.value = ''
  }

  /**
   * Change the value of ElementJax.
   * 
   * @param {String} value 
   * 
   * @return {this}
   */
  setValue(value) {
    this.value = value
    return this
  }

  /**
   * Update ElementJax to the current value, so the math
   * will be reprocessed by MathJax.
   * 
   * @return {Promise}
   */
  update() {
    return new Promise(resolve => {
      
      // Use requestAnimationFrame to ensure that the browser really finished
      // rendering the mathematics. Without using it, the caret could be placed
      // in the wrong top and left pos when inserting multiple square roots at once.

      this.jax.Text(this.value, () => raf(() => resolve()))
    })
  }
}