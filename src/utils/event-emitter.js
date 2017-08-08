export default class EventEmitter {
  constructor() {
    this.handlers = {}
  }

  /**
   * @param {String} type 
   * @param {Function} callback 
   */
  on(type, callback) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type].push(callback)
  }

  /**
   * 
   * @param {String} type 
   * @param {...*} rest 
   */
  emit(type, ...rest) {
    if (!this.handlers[type]) {return}
    this.handlers[type].forEach(handler => handler(...rest))
  }
}