class EventBus {
  constructor() {
    this.registry = {};
  }

  on(type, listener) {
    this.registry[type] = (this.registry[type] || []).concat(listener);
  }

  trigger(type, ...rest) {
    if (this.registry[type]) {
      this.registry[type].forEach(listener => listener(...rest));
    }
  }
}

export default EventBus;