export default class EventEmitter {
  /**
   * This class is a simple event emitter.
   * 
   * @constructor
   */
  constructor() {
    this.listeners = {}
  }

  /**
   * Listen to an event.
   * 
   * @param {String} type 
   * @param {Function} listener 
   */
  on(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(listener)
  }

  /**
   * Emit an event.
   * 
   * @param {String} type 
   * @param {...*} rest
   * 
   * @return {Void}
   */
  emit(type, ...rest) {
    if (!this.listeners[type]) {return}
    this.listeners[type].forEach(listener => listener(...rest))
  }
}