import lc from './utils/lc'

export default class CursorMover {
  /**
   * This class handles where the cursor should be placed
   * when the user clicks the display.
   * 
   * @param {Tree} tree
   * @param {Rendered} rendered
   * @param {Cursor} cursor
   * 
   * @constructor
   */
  constructor(tree, rendered, cursor) {
    /** @type {Tree} */
    this.tree = tree
    /** @type {Rendered} */
    this.rendered = rendered
    /** @type {Cursor} */
    this.cursor = cursor
  }

  /**
   * Perform the calculation to determine where the cursor
   * should be placed.
   * 
   * @param {Number} x
   * @param {Number} y
   * 
   * @return {Void}
   */
  click(x, y) {
    let shortest = Infinity
    let $set = null

    // Here we check if the (x, y) is outside the boundings
    // of the lines, so the cursor can be placed at the first element
    // or last element of a line.

    for (let line of this.rendered.getLines()) {
      if (!line.betweenYAxis(y)) {continue}
      if (!line.betweenXAxis(x)) {
        if (x > line.x2) {
          return this.cursor
            .setPosition(line.getLastElement().getElement())
            .update()
        }
        else {
          return this.cursor
            .setPosition(line.getFirstElement().getElement())
            .update()
        }
      }
    }

    // Dunno how much expensive getBoundingClientRect is, but
    // this seems to be the best solution I had to deal with
    // proper cursor placement without doing tricky code.

    // We basically set the cursor to every possible place it
    // can be at, then we calculate its distance to the given
    // x and y. The shortest to that coordinate will determine
    // where it should be placed.

    for (const $el of this.tree.getPath()) {
      if ($el && lc($el.tagName) === 'math') {continue}

      this.cursor.setPosition($el).update()

      const bounding = this.cursor.getCaretBounding()
      const cx = bounding.left + (bounding.width / 2)
      const cy = bounding.top + (bounding.height / 2)
      const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2))
      
      if (shortest > dist) {
        shortest = dist
        $set = $el
      }
    }

    this.cursor.setPosition($set).update()
  }
}