import addClass from './utils/add-class'
import removeClass from './utils/remove-class'

export default class Blinker {
  /**
   * This class handles the animation of the caret element.
   * 
   * @param {HTMLElement} $caret
   * 
   * @constructor
   */
  constructor($caret) {
    this.$caret = $caret
    this.freezeDuration = 500
    this.blinkDuration = 500

    this.id = setInterval(() => {
      if (this.$caret.style.display !== 'block') {return}
      this.$caret.style.opacity = this.$caret.style.opacity === '0' ? '1' : '0'
    }, this.blinkDuration)

    this.prevFreezeId = null
  }

  /**
   * Stops the animation.
   * 
   * @return {Void}
   */
  destroy() {
    clearInterval(this.id)
  }

  /**
   * Freezes the animation temporarily.
   * 
   * @return {Void}
   */
  freeze() {
    clearInterval(this.prevFreezeId)
    addClass(this.$caret, 'is-freezed')
    this.prevFreezeId = setTimeout(() => {
      removeClass(this.$caret, 'is-freezed')
    }, this.freezeDuration)
  }
}