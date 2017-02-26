class EventBus {
  /**
   * This is a simple Event Bus to register/trigger events.
   * 
   * @constructor
   */
  constructor() {
    this.registry = {};
  }

  /**
   * Listen to an event to be triggered.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    this.registry[type] = (this.registry[type] || []).concat(listener);
  }

  /**
   * Trigger an event.
   * 
   * @param {String} type
   * @param {Mixed} ...rest
   * 
   * @return {Void}
   */
  trigger(type, ...rest) {
    if (this.registry[type]) {
      this.registry[type].forEach(listener => listener(...rest));
    }
  }
}

module.exports = EventBus;