/**
 * @param {Node} $node
 * @param {Function} callback
 * 
 * @return {Void}
 */
export default function getJaxElement($node, callback) {
  MathJax.Hub.Config({
    displayAlign: "left"
  });
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, $node, () => {
    const jaxElement = MathJax.Hub.getAllJax($node)[0]
    jaxElement.Text('<math><mo>...</mo></math>', () => {
      callback(jaxElement, $node.clientHeight - 8 /* (?) */)
    })
  }])
}