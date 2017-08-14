export default class CursorMover2 {
  constructor(tree, rendered, cursor) {
    /** @type {Tree} */
    this.tree = tree
    /** @type {Rendered} */
    this.rendered = rendered
    /** @type {Cursor} */
    this.cursor = cursor
  }

  click(x, y) {
    let shortest = Infinity
    let $set = null

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

    for (const $el of this.tree.getPath()) {
      if ($el && $el.tagName === 'MATH') {continue}

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