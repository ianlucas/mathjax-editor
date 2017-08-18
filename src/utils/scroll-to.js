/**
 * Scroll the $view to the $target element.
 * 
 * @param {HTMLElement}  $view
 * @param {HTMLElement}  $target
 */
export default function scrollTo($view, $target) {
  $view.scrollTop = $target.parentNode.offsetTop
  $view.scrollLeft = $target.offsetLeft
}