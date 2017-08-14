import addClass from './utils/add-class'
import removeClass from './utils/remove-class'

export default class Blinker {
  /**
   * @param {HTMLElement} $caret  
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

  destroy() {
    clearInterval(this.id)
  }

  freeze() {
    clearInterval(this.prevFreezeId)
    addClass(this.$caret, 'is-freezed')
    this.prevFreezeId = setTimeout(() => {
      removeClass(this.$caret, 'is-freezed')
    }, this.freezeDuration)
  }
}