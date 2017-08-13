import MOVER_SKIP from './constants/mover-skip'

import inArray from './utils/in-array'

export default class CursorMover {
  /**
   * @param {Rendered} rendered
   */
  constructor(rendered) {
    /** @type {Rendered} */
    this.rendered = rendered
  }

  /**
   * @param {Number} x 
   * @param {Number} y
   * 
   * @return {Promise} 
   */
  click(x, y) {
    return new Promise(resolve => {
      let candidate = null
      let shortest = Infinity

      for (let line of this.rendered.getLines()) {
        if (!line.betweenYAxis(y)) {continue}
        if (!line.betweenXAxis(x)) {
          if (x > line.x2) {
            return resolve({
              $to: line.getLastElement().getElement(),
              moveLeft: false
            })
          }
          else {
            return resolve({
              $to: line.getFirstElement().getElement(),
              moveLeft: true
            })
          }
        }
      }

      for (let element of this.rendered.getElements()) {
        if (
          !element.getElement() || 
          inArray(MOVER_SKIP, element.getTagName())
        ) {
          continue
        }

        if (element.isTagName('MROW')) {
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
        resolve({
          $to: candidate.getElement(), 
          moveLeft: candidate.isLeftSide(x)
        })
      }
      else {
        resolve({
          $to: null
        })
      }
    })
  }
}