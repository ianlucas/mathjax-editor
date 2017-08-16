import styles from '../styles'

/**
 * This file will use MathJax.Ajax.Styles method to apply the styles
 * of the editor. Also, it sets MathJax.Hub.processSectionDelay to
 * `0` in order to the editor display feel fast.
 * 
 * Maybe could we set this property to `0` only when the user is
 * actually using the editor and avoid rewriting the user's MathJax
 * configuration?
 */
window.addEventListener('load', () => {
  if (!MathJax) {
    throw new Error('MathjaxEditor: MathJax is missing.')
  }
  
  MathJax.Hub.processSectionDelay = 0;
  MathJax.Ajax.Styles(styles)
})