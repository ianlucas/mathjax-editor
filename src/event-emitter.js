export default class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  /**
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
   * 
   * @param {String} type 
   * @param {...*} rest 
   */
  emit(type, ...rest) {
    if (!this.listeners[type]) {return}
    this.listeners[type].forEach(listener => listener(...rest))
  }
}