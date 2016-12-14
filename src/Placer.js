class Placer {
  /**
   * This is the Placer class.
   * 
   * It parse the current tex, and calculates the boundings of each
   * variable/number/command elements to determinate if a cursor position
   * change is possible (when the user clicks on `document.body`), it also
   * specify which position the cursor should be moved to.
   * 
   * @param {Editor} editor
   * 
   * @constructor
   */
  constructor(editor) {
    this.intervals = [];
    this.onRequestPlacement = Function;
    this.tex = editor.value;
    this.$display = editor.$display;
    this.findings = {};
    this.isDebug = editor.debug;

    this.parse();
  }

  /**
   * This will read an editor, and fire `onRequestPlacement` if cursor
   * should be moved to another position.
   * 
   * This will return a new instance of Placer.
   * 
   * @param {Editor} editor
   * @param {Function} onRequestPlacement
   * 
   * @return {Placer}
   */
  static read(editor, onRequestPlacement = Function) {
    const placer = new Placer(editor);
    placer.onRequestPlacement = onRequestPlacement;
    return placer;
  }

  /**
   * Debug helper function. Works just like console.log.
   * 
   * @return {Void}
   */
  debug(...args) {
    if (!this.isDebug) {
      return;
    }
    console.log(...args);
  }

  /**
   * Add an interval to intervals list.
   * 
   * @param {Number} index
   * @param {Number} startX
   * @param {Number} endX
   * @param {Number} startY
   * @param {Number} endY
   * @param {Boolean} useAllArea - If the click point is inside this 
   *                               interval boundings, cursor will be
   *                               placed at this interval index.
   * 
   * @return {Void}
   */
  addInterval(index, startX, endX, startY, endY, useAllArea = false) {
    this.intervals.push({
      index, startX, endX, startY, endY, useAllArea
    });
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
  placeAtInterval(interval, x, y, i) {
    const width = interval.endX - interval.startX;
    let index = interval.index;

    this.debug(`Interval X from ${interval.startX} to ${interval.endX} (Middle point x: ${interval.startX + (width / 2)}, width: ${width})`);
    this.debug(`Interval Y from ${interval.startY} to ${interval.endY}`);

    if (interval.useAllArea) {
      return index;
    }

    if (x > interval.startX + (width / 2)) {
      if (this.intervals[i + 1]) {
        index = this.intervals[i + 1].index;
      }
      else {
        index = this.tex.length;
      }
    }
    
    this.debug(`[placeAtInterval] Cursor to be placed at ${index}.`);

    return index;
  }

  /**
   * Checks if the cursor must be moved, and if so,
   * it fires `this.onRequestPlacement` with the position.
   * 
   * @param {Event} e
   * 
   * @return {Void}
   */
  fireClick(e) {
    const { bottom } = this.$display.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    let index = this.tex.length;

    this.debug(`You has clicked at (${x}, ${y}).`);
    this.debug(this.intervals);

    // If there are no intervals, or the point `y` is
    // not in the range of the editor's bounds, we just
    // ignore the event. TODO: Check for y top.

    if (!this.intervals.length || y > bottom) {
      return;
    }
    
    let found = false;

    // First strategy: checks if the clicked point is inside a number/
    // variable/operator bounding. If it is, place it where is proper. 

    this.intervals.forEach((interval, i) => {
      if (interval.startX <= x && x < interval.endX) {
        if (interval.startY <= y && y < interval.endY) {
          found = true;
          index = this.placeAtInterval(interval, x, y, i);
        }
      }
    });

    // Second strategy: find the nearest element to the clicked point.
    // TODO: Improve this.

    if (!found) {
      let last = { interval: null, distance: null, i: null };

      this.intervals.forEach((interval, i) => {
        const distance = Math.min(Math.abs(interval.startX - x), Math.abs(interval.endX - x));
        if (last.distance === null || distance < last.distance) {
          last.interval = interval;
          last.distance = distance;
          last.i = i;
        }
      });

      if (!last.interval) {
        return;
      }

      index = this.placeAtInterval(last.interval, x, y, last.i);
      this.debug(`[fireClick] Not found a bounding, placeing at ${index}.`);
    }

    if (x < this.intervals[0].startX) {
      this.debug(`[fireClick] Out of display boundings. Placing at start.`);
      index = 0;
    }

    if (x > this.intervals[this.intervals.length - 1].endX) {
      this.debug(`[fireClick] Out of display boundings. Placing at the end.`);
      index = this.tex.length;
    }

    this.onRequestPlacement(index);
  }

  /**
   * Find an element of the given type and add its interval data 
   * to `this.intervals`.
   * 
   * @param {String} type
   * @param {Number} index
   * 
   * @return {Void}
   */
  find(type, index) {
    this.findings[type] = this.findings[type] || 0;
    const $el = document.querySelectorAll(`.mjx-${type}`)[this.findings[type]];
    const bounding = $el.getBoundingClientRect();
    this.addInterval(index, bounding.left, bounding.right, bounding.top, bounding.bottom);
    this.findings[type] += 1;
  }

  /**
   * Find a command element.
   * 
   * TODO: Fix placement bugs.
   * 
   * @param {String} command
   * @param {Number} index
   * 
   * @return {Void}
   */
  findCommand(command, index) {
    const name = command.slice(1, command.length - 1);
    this.findings[name] = this.findings[name] || 0;
    const $el = document.querySelectorAll(`.mjx-m${name}`)[this.findings[name]];
    const bounding = $el.getBoundingClientRect();

    switch (name) {
      case 'frac':
        const $numerator = $el.querySelector('.mjx-numerator');
        const $denominator = $el.querySelector('.mjx-denominator');
        const numBounding = $numerator.getBoundingClientRect();
        const denBounding = $denominator.getBoundingClientRect();
        const boundings = [numBounding, denBounding];
        const { blocks } = this.parseCommandAt(index);

        boundings.forEach((bounding, i) => {
          if ((blocks[i].closeIndex - blocks[i].openIndex) === 1) {
            this.addInterval(blocks[i].openIndex + 1, bounding.left, bounding.right, bounding.top, bounding.bottom, true);
          }
        });
    }
  }

  /**
   * Parse the editor's tex.
   * 
   * @return {Void}
   */
  parse() {
    const tex = this.tex;
    const length = tex.length;
    let i = 0;

    const test = {
      isNumber: /\d/,
      isVariable: /\w/,
      isOperator: /[\+\-]/
    }

    for (; i < length; i++) {
      const char = tex[i];

      if (test.isNumber.exec(char)) {
        this.find('mn', i);
        continue;
      }

      if (test.isVariable.exec(char)) {
        this.find('mi', i);
        continue;
      }

      if (test.isOperator.exec(char)) {
        this.find('mo', i);
        continue;
      }

      if (char === '\\') {
        let j = i;
        let command = '';
        for (; j < length; j++) {
          const subchar = tex[j];
          command += subchar;
          if (subchar === ' ' || subchar === '{') {
            const list = {
              '\\cdot': 'mo',
              '\\div': 'mo'
            };
            const trimmed = command.trim();
            const type = list[trimmed] ? list[trimmed] : 'mi';
            if (subchar === ' ') {
              this.find(type, i);
            }
            else {
              this.findCommand(command, i);
            }
            i = j;
            break;
          }
        }
      }
    }
  }

  parseCommandAt(i) {
    const length = this.tex.length;
    let blocks = [];
    let openBlocks = 0;

    for (; i < length; i++) {
      const char = this.tex[i];
      if (char === '{') {
        blocks.push({ openIndex: i });
        openBlocks += 1;
      }
      if (char === '}') {
        openBlocks -= 1;
        if (openBlocks === 0) {
          blocks[blocks.length - 1].closeIndex = i;
        }
      }
      if (char === '}' && this.tex[i + 1] !== '{') {
        break;
      }
    }

    return {
      blocks
    };
  }
}

export default Placer;