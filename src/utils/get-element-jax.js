import ElementJax from '../element-jax'
import Promise from './promise'

/**
 * This function will catch the MathJax's ElementJax inside the
 * editor's display, so we can quickly update the math.
 * 
 * @see http://docs.mathjax.org/en/latest/api/elementjax.html
 * 
 * @param {HTMLElement} $el
 * @param {Function} callback
 * 
 * @return {Void}
 */
export default function getElementJax($el, callback) {
  const placeholder = '<math><mo>...</mo></math>'

  return new Promise(resolve => {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $el, () => {
      const jax = MathJax.Hub.getAllJax($el)[0]
      jax.Text(placeholder, () => resolve(new ElementJax(jax)))
    }])
  })
}