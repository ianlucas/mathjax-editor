import EventBus from './EventBus';

class Placer {
  /**
   * This will handle the cursor placement when the user clicks somewhere
   * on the editor.
   * 
   * @param {Editor} editor
   * 
   * @constructor
   */
  constructor(editor) {
    const bus = new EventBus;

    bus.on('click', this.handleClick.bind(this));

    this.$display = editor.$display;
    this.bus = bus;
    this.intervals = [];
    this.elements = editor.tex.elements;
    this.findings = {};
    this.tex = editor.tex;

    this.iterate();
  }

  /**
   * Listen to an event to be triggered by Placer.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    this.bus.on(type, listener);
  }

  /**
   * Triggers an event inside Placer.
   * 
   * @param {String} type
   * @param {Mixed} ...rest
   * 
   * @return {Void}
   */
  trigger(type, ...rest) {
    this.bus.trigger(type, ...rest);
  }

  /**
   * Checks if the cursor must be moved, and if so,
   * it triggers the event 'setCursor' with the position.
   * 
   * @param {Event} e
   * 
   * @return {Void}
   */
  handleClick(e) {
    const { top, bottom } = this.$display.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const intervals = this.intervals;
    let index = this.tex.length;

    if (!intervals.length || y > bottom || y < top) {
      return false;
    }

    let found = false;

    // First strategy: checks if the clicked point is inside a number/
    // variable/operator bounding. If it is, place it where is proper.

    intervals.forEach((interval, i) => {
      if (interval.startX <= x && x < interval.endX) {
        if (interval.startY <= y && y < interval.endY) {
          found = true;
          index = this.placeAtInterval(interval, i, x, y);
        }
      }
    });

    // Second strategy: find the nearest element to the clicked point.

    if (!found) {
      let last = { interval: null, distance: null, i: null };

      intervals.forEach((interval, i) => {
        if (!(interval.startY < y && y < interval.endY)) {
          return;
        }
        const distance = Math.min(Math.abs(interval.startX - x), Math.abs(interval.endX - x));
        if (last.distance === null || distance < last.distance) {
          last.interval = interval;
          last.distance = distance;
          last.i = i;
        }
      });

      if (!last.interval) {
        return false;
      }

      index = this.placeAtInterval(last.interval, last.i, x, y);
    }

    this.bus.trigger('setCursor', index);
  }

  /**
   * Get the next key for a type.
   * 
   * @param {String} type
   * 
   * @return {Number}
   */
  getNextKeyFor(type) {
    this.findings[type] = this.findings[type] || 0;
    const key = this.findings[type];
    this.findings[type] += 1;
    return key;
  }

  /**
   * Add an interval to intervals list.
   * 
   * @param {Object} data
   * 
   * @return {Void}
   */
  addInterval(data) {
    this.intervals.push(data);
  }

  /**
   * Returns the index which the cursor should be placed
   * based on given `x`, and `y`.
   * 
   * @param {Object} interval
   * @param {Number} x
   * @param {Number} y
   * @param {Number} i - Index of the given interval inside `this.intervals`.
   * 
   * @return {Number}
   */
  placeAtInterval(interval, i, x, y) {
    const intervals = this.intervals;
    const width = interval.endX - interval.startX;
    const nextInterval = i + 1;

    let index = interval.index;

    if (interval.box) {
      return index;
    }

    if (x > interval.startX + (width / 2)) {
      if (intervals[nextInterval]) {
        index = intervals[nextInterval].index;
      }
      else {
        index = this.tex.length;
      }
    }

    return index;
  }

  /**
   * Iterates over the elements created by Tex to find
   * the elements in the DOM and compute them.
   * 
   * @return {Void}
   */
  iterate() {
    this.elements.forEach(element => {
      switch (element.is) {
        case 'command':
          this.findCommand(element);
          break;

        default:
          this.find(element);
      }
    });
  }

  /**
   * Find an element of the given type and add its interval data 
   * to `this.intervals`.
   * 
   * @param {Object} data
   * @param {String} data.type
   * @param {Number} data.index
   * @param {Boolean} data.nearClosure
   * 
   * @return {Void}
   */
  find({ type, index, nearClosure }) {
    const key = this.getNextKeyFor(type);
    const $el = this.$display.querySelectorAll(`.mjx-${type}`)[key];
    if (!$el) {
      return console.log('COULD NOT FIND THIS ELEMENT', $el);
    }
    const { left, right, top, bottom } = $el.getBoundingClientRect();
    this.addInterval({
      startX: left,
      endX: right,
      startY: top,
      endY: bottom,
      index
    });
    if (nearClosure) {
      this.addInterval({
        index: index + 1,
        top: 0,
        bottom: 0, 
        left: 0, 
        right: 0
      });
    }
  }

  /**
   * Find a command element.
   * 
   * @param {Object} data
   * @param {String} data.type
   * @param {Number} data.index
   * @param {Object} data.props
   * 
   * @return {Void}
   */
  findCommand({ type, index, props }) {
    const key = this.getNextKeyFor(type);
    const $el = this.$display.querySelectorAll(`.mjx-m${type}`)[key];
    const { brackets, blocks } = props;

    switch (type) {
      case 'frac':
        const $numerator = $el.querySelector('.mjx-numerator');
        const $denominator = $el.querySelector('.mjx-denominator');
        const numBounding = $numerator.getBoundingClientRect();
        const denBounding = $denominator.getBoundingClientRect();
        const boundings = [numBounding, denBounding];

        boundings.forEach(({ left, right, top, bottom }, i) => {
          if ((blocks[i].closeIndex - blocks[i].openIndex) === 1) {
            this.addInterval({
              index: blocks[i].closeIndex, 
              startX: left,
              endX: right,
              startY: top,
              endY: bottom,
              box: true
            });
          }
        });

        break;

      case 'root':
      case 'sqrt':
        if (brackets && (brackets.closeIndex - brackets.openIndex) === 1) {
          const $root = $el.querySelector('.mjx-root .mjx-char');  
          const { left, right, top, bottom } = $root.getBoundingClientRect();
          this.addInterval({
            index: brackets.closeIndex,
            startX: left,
            endX: right,
            startY: top,
            endY: bottom,
            box: true
          });
        }
        if ((blocks[0].closeIndex - blocks[0].openIndex) === 1) {
          const $box = $el.querySelector('.mjx-box');
          const { left, right, top, bottom } = $box.getBoundingClientRect();
          this.addInterval({
            index: blocks[0].closeIndex,
            startX: left,
            endX: right,
            startY: top,
            endY: bottom,
            box: true
          });
        }
        break;
    }
  }
}

export default Placer;