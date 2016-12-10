
/**
 * This is the class that handles Selection in MathJax Editor.
 */
class Selection {
  /**
   * @param {DOMElement} $display
   * 
   * @constructor
   */
  constructor($display) {
    this.$display = $display;
    this.parsed = '';
    this.positions = [];
    this.oldButtons = [];
  }

  /**
   * Captures the number & variable elements.
   * 
   * @param {Function} callback
   * 
   * @return {Void}
   */
  captureElements(callback) {
    const $display = this.$display;
    const elements = $display.querySelectorAll('.mjx-texatom');
    const length = elements.length;
    const captures = [];
    let i = 0;

    // This will capture the numbers (\d) and variables (\w) elements.
    for (; i < length; i++) {
      const $el = elements[i];
      const $character = $el.querySelector('.mjx-mn') || $el.querySelector('.mjx-mi');

      if ($character) {
        captures.push($character);
      }
    }

    this.oldButtons.forEach($el => {
      if ($el.parentNode) {
        $el.parentNode.removeChild($el);
      }
    });

    this.addEventsToCaptures(captures, callback);
  }

  /**
   * Add events to the captures.
   * 
   * It actually creates a button and places it exacly over
   * the captured element.
   * 
   * @param {Array} captures
   * @param {Function} callback
   * 
   * @return {Void}
   */
  addEventsToCaptures(captures, callback) {
    const $display = this.$display;
    const Element = MathJax.HTML.Element;
    const buttons = [];

    // This will iterate over every number/variable element written
    // in the editor to create a button that is placed over it.

    captures.forEach(($el, key) => {
      MathJax.Hub.Queue(() => {
        const width = $el.offsetWidth;
        const height = $el.offsetHeight;
        const halfWidth = width / 2;
        const position = this.positions[key];
        const bounding = $el.getBoundingClientRect();

        const $button = Element('div', {
          className: 'mj-ed-selectionButton',
          style: {
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            top: `${bounding.top}px`,
            left: `${bounding.left}px`
          }
        });

        $display.appendChild($button);
        buttons.push($button);

        $button.addEventListener('click', e => {
          const layerX = e.layerX;

          // Remove all buttons createds above.
          buttons.forEach($button => this.$display.removeChild($button));

          if (layerX > halfWidth) {
            return callback(position + 1);
          }

          return callback(position);
        });
      });
    });

    this.oldButtons = buttons;
  }
  
  /**
   * This will parse the editor's value.
   * 
   * Every number and variable will be wrapped by {}, because this made
   * it easy to find the elements that represent them through MathJax.
   * 
   * @param {String} value
   */
  setValue(value) {
    const length = value.length;
    const positions = [];
    let i = 0;
    let parsed = '';
    let cursorFound = false;

    const test = {
      char: /[\d\w]/
    };

    for (; i < length; i++) {
      const char = value[i];
      if (test.char.exec(char)) {
        parsed += `{${char}}`;
        positions.push(i - (cursorFound ? 9 : 0));
      }
      else if (char === '\\') {
        let j = i;
        let subparsed = '';
        for (; j < length; j++) {
          const subchar = value[j];
          subparsed += subchar;
          if (subchar === ' ') {
            parsed += `{${subparsed}}`;
            positions.push(i - (cursorFound ? 9 : 0));
            i = j;
            break;
          }
          if (subchar === '{' || subchar === '}') {
            parsed += subparsed;
            i = j;

            if (subparsed === '\\cursor}') {
              cursorFound = true;
            }
            break;
          }
        }
      }
      else {
        parsed += char;
      }
    }

    this.parsed = parsed;
    this.positions = positions;
  }

  /**
   * Get the value parsed.
   * 
   * @return {String}
   */
  getValueForSelection() {
    return this.parsed;
  }
}

export default Selection;