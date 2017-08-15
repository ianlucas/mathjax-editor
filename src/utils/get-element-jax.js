import ElementJax from '../element-jax'

/**
 * This function will catch the MathJax's ElementJax inside the
 * editor's display, so we can quickly update the math.
 * 
 * @see http://docs.mathjax.org/en/latest/api/elementjax.html
 * 
 * @param {Node} $node
 * @param {Function} callback
 * 
 * @return {Void}
 */
export default function getElementJax($node, callback) {
  const placeholder = '<math><mo>...</mo></math>'

  return new Promise(resolve => {
    MathJax.Hub.Config({
      displayAlign: "left"
    });
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $node, () => {
      const jax = MathJax.Hub.getAllJax($node)[0]
      jax.Text(placeholder, () => resolve(new ElementJax(jax)))
    }])
  })
}