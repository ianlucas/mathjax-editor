/**
 * Tries to find the specified element. If it fails, an error is thrown.
 * 
 * @param {DOMElement|string} el - An element or a selector.
 * 
 * @return {DOMElement}
 */
export function mustFindElement(el) {
  const error = new Error('You must define a target element.');

  if (!el) {
    throw error;
  }

  if (typeof el === 'string') {
    const $el = document.querySelector(el);
    if (!$el) {
      throw error;
    }
    return $el;
  }

  // Yeah, we just assume an element was given...
  return el;
}