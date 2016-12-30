import EventBus from './EventBus';

let $paints = [];

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
    let proceedSearch = true;

    // First strategy: checks if the clicked point is inside a number/
    // variable/operator bounding. If it is, place it where is proper.

    intervals.forEach((interval, i) => {
      if (interval.startX <= x && x < interval.endX && proceedSearch) {
        if (interval.startY <= y && y < interval.endY) {
          found = true;
          index = this.placeAtInterval(interval, i, x);
          if (interval.box) {
            proceedSearch = false;
          }
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
   * Add an interval at the given index in intervals list.
   *
   * @param {Number} key
   * @param {Object} data
   * 
   * @return {Void}
   */
  addIntervalAt(key, data) {
    this.intervals.splice(key, 0, data);
  }

  /**
   * Add an interval to intervals list.
   * 
   * @param {Object} data
   * 
   * @return {Void}
   */
  addInterval(data) {
    if (Number.isNaN(data.index)) {
      console.error('An interval has NaN as index.');
    }
    this.intervals.push(data);
  }

  /**
   * Shortcut for adding an interval.
   * 
   * @param {Number} index
   * @param {Object} bounding
   * 
   * @return {Void}
   */
  addIntervalBox(index, { top, bottom, left, right }) {
    this.addInterval({
      index,
      startX: left,
      endX: right,
      startY: top,
      endY: bottom,
      box: true
    });
  }

  /**
   * Add an interval without bouncing.
   * 
   * @param {Number} index
   * 
   * @return {Void}
   */
  addBouncinglessInterval(index) {
    this.addInterval({
      index,
      top: 0,
      bottom: 0, 
      left: 0, 
      right: 0
    });
  }

  /**
   * Returns the index which the cursor should be placed
   * based on given `x`, and `y`.
   * 
   * @param {Object} interval
   * @param {Number} i - Index of the given interval inside `this.intervals`.
   * @param {Number} x
   * 
   * @return {Number}
   */
  placeAtInterval(interval, i, x) {
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

        case 'eol':
          this.findEndOfLine(element);
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
  find(data) {
    const { type, index, nearClosure } = data;
    const key = this.getNextKeyFor(type);
    const $el = this.$display.querySelectorAll(`.mjx-${type}`)[key];
    if (!$el) {
      return console.warn(`Could not find an element of type ${type}.`, index);
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
      this.addBouncinglessInterval(index + 1);
    }
  }

  /**
   * Find a command element.
   * 
   * @param {Object} data
   * @param {String} data.type
   * @param {Object} data.props
   * 
   * @return {Void}
   */
  findCommand({ type, props }) {
    const key = this.getNextKeyFor(type);
    const $el = this.$display.querySelectorAll(`.mjx-m${type}`)[key];
    const { brackets, blocks, subType } = props;

    this.addBouncinglessInterval(props.start);

    switch (type) {
      case 'frac': {
        const $numerator = $el.querySelector('.mjx-numerator');
        const $denominator = $el.querySelector('.mjx-denominator');
        const numBounding = $numerator.getBoundingClientRect();
        const denBounding = $denominator.getBoundingClientRect();
        const boundings = [numBounding, denBounding];

        boundings.forEach((bounding, i) => {
          if (blocks[i].length === 1) {
            this.addIntervalBox(blocks[i].closeIndex, bounding);
          }
        });

        break;
      }

      case 'root':
      case 'sqrt': {
        if (brackets && (brackets.closeIndex - brackets.openIndex) === 1) {
          const $root = $el.querySelector('.mjx-root .mjx-char');  
          const bounding = $root.getBoundingClientRect();
          this.addIntervalBox(brackets.closeIndex, bounding);
        }
        if (blocks[0].length === 1) {
          const $box = $el.querySelector('.mjx-box');
          const bounding = $box.getBoundingClientRect();
          this.addIntervalBox(blocks[0].closeIndex, bounding);
        }
        break;
      }

      case 'subsup': {
        if (blocks[0].length === 1) {
          const $target = $el.querySelector(`.mjx-${subType}`);
          const bounding = $target.getBoundingClientRect();
          this.addIntervalBox(blocks[0].closeIndex, bounding);
        }
        break;
      }
    }
  }
  
  /**
   * Find an end of line element.
   * 
   * @param {Object} data
   * @param {String} data.type
   * @param {Number} data.index
   * 
   * @return {Void}
   */
  findEndOfLine({ type, index }) {
    const key = this.getNextKeyFor(type);
    let $el = this.$display.querySelectorAll(`.mjx-${type}`)[key];
    // If $el was not found, it seems there is only one line.
    if (!$el) {
      $el = this.$display.querySelector('.mjx-math');
    }
    const $box = $el.firstChild;
    const { top, left, bottom, right } = $box.getBoundingClientRect();
    const width = 20;
    const lineStart = this.findLastStartOfLineIndex();

    // Insert start of line interval.
    this.addIntervalAt(lineStart.intervalKey, {
      index: lineStart.start,
      startX: left - width,
      endX: left,
      startY: top,
      endY: bottom,
      box: true
    });

    // Insert end of line interval.
    this.addInterval({
      index,
      startX: right,
      endX: right + width,
      startY: top,
      endY: bottom,
      box: true
    });
  }

  /**
   * Find the last start of line index in the intervals list.
   * 
   * @return {Number}
   */
  findLastStartOfLineIndex() {
    const intervals = this.intervals.slice().reverse();
    const length = intervals.length;
    let i = 0;
    let start = 0;
    let intervalKey = 0;

    for (; i < length; i++) {
      const interval = intervals[i];
      if (interval.is === 'eol') {
        start = interval.index + 2;
        intervalKey = i;
        break;
      }
    }

    return { start, intervalKey };
  }

  // Debug function to draw a interval.
  paint(interval) {
    const $div = document.createElement('div');
    $div.style.position = 'absolute';
    $div.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
    $div.style.width = (interval.endX - interval.startX) + 'px';
    $div.style.height = (interval.endY - interval.startY) + 'px';
    $div.style.top = interval.startY + 'px';
    $div.style.left = interval.startX + 'px';
    $div.style.pointerEvents = 'none';
    document.body.appendChild($div);
    return $div;
  }

  // Debug function to paint all intervals.
  paintIntervals() {
    $paints.forEach($paint => document.body.removeChild($paint));
    $paints = [];

    this.intervals.forEach(interval => {
      $paints.push(this.paint(interval));
    });

    console.log(this.intervals);
  }
}

export default Placer;