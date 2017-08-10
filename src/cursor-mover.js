import MOVER_SKIP from './constants/mover-skip'

import inArray from './utils/in-array'

export default class CursorMover {
  /**
   * @param {RenderedElements} renderedElements
   */
  constructor(renderedElements) {
    this.boxes = []

    renderedElements.forEach(element => {
      const { $el, $rendered } = element

      if (inArray(MOVER_SKIP, $el.tagName)) {return}

      const bounding = $rendered.getBoundingClientRect()

      this.boxes.push({
        $el,
        cx: bounding.left + ($rendered.clientWidth / 2),
        cy: bounding.top + ($rendered.clientHeight / 2)
      })
    })
  }

  /**
   * @callback
   * @param {Node} $node
   * @param {Boolean} isLeft
   */
  /**
   * @param {Number} x 
   * @param {Number} y 
   * @param {resultCallback} callback 
   */
  click(x, y, callback) {
    let candidate = { $el: null }
    let shortest = Infinity

    for (const box of this.boxes) {
      if (box.$el.tagName === 'MROW'
        && box.$el.childNodes.length) {continue}

      const dist = Math.sqrt(Math.pow(y - box.cy, 2) + Math.pow(x - box.cx, 2))

      if (shortest > dist) {
        shortest = dist
        candidate = box
      }
    }

    callback(candidate.$el, x < candidate.cx)
  }
}