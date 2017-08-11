import MOVER_SKIP from './constants/mover-skip'

import inArray from './utils/in-array'

export default class CursorMover {
  /**
   * @param {RenderedElements} renderedElements
   */
  constructor(renderedElements) {
    this.renderedElements = renderedElements
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
    let candidate = null
    let shortest = Infinity

    for (let line of this.renderedElements.getLines()) {
      if (!line.betweenYAxis(y)) {continue}
      if (!line.betweenXAxis(x)) {
        if (x > line.x2) {return callback(line.$lastEl, false)}
        else {return callback(line.$firstEl, true)}
      }
    }

    for (let element of this.renderedElements.getElements()) {
      if (inArray(MOVER_SKIP, element.getTag())) {continue}

      if (element.isTag('mrow')) {
        if (element.hasChildren()) {
          continue
        }
        else if (element.pointIn(x, y)) {
          candidate = element
          break
        }
        continue
      }

      const distance = element.distanceTo(x, y)

      if (shortest > distance) {
        shortest = distance
        candidate = element
      }
    }

    if (candidate) {
      callback(candidate.getNode(), candidate.isLeftSide(x))
    }
    else {callback(null)}
  }
}