(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MathJaxEditor = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var Iframe = /*#__PURE__*/function () {
    /**
     * Creates and appends an iframe to a target element.
     *
     * @param {HTMLElement} target
     */
    function Iframe(target) {
      _classCallCheck(this, Iframe);

      this.element = document.createElement('iframe');
      this.storedStyles = {};
      this.storedElements = {};

      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      target.appendChild(this.element);
      this.document = this.element.contentDocument;
      this.window = this.element.contentWindow;
      this.body = this.document.body;
      this.head = this.document.head;
    }
    /**
     * Create a placeholder element
     *
     * @return {HTMLElement}
     */


    _createClass(Iframe, [{
      key: "createPlaceholderElement",
      value: function createPlaceholderElement() {
        return document.createElement('void');
      }
      /**
       * Add a style to the iframe.
       *
       * @param {String} key
       * @param {HTMLElement} element
       */

    }, {
      key: "addStyle",
      value: function addStyle(key, element) {
        this.storedStyles[key] = element;
        this.head.appendChild(element);
      }
      /**
       * Add an element to the iframe.
       *
       * @param {String} key
       * @param {HTMLElement} element
       */

    }, {
      key: "addElement",
      value: function addElement(key, element) {
        this.storedElements[key] = element || this.createPlaceholderElement();
        this.body.appendChild(this.storedElements[key]);
      }
      /**
       * Update an element of the iframe.
       *
       * @param {String} key
       * @param {HTMLElement} element
       */

    }, {
      key: "updateElement",
      value: function updateElement(key, newElement) {
        if (!this.storedElements[key]) {
          return;
        }

        this.body.replaceChild(newElement, this.storedElements[key]);
        this.storedElements[key] = newElement;
      }
      /**
       * Update a style of the iframe.
       *
       * @param {String} key
       * @param {HTMLElement} element
       */

    }, {
      key: "updateStyle",
      value: function updateStyle(key, newElement) {
        if (!this.storedStyles[key]) {
          return;
        }

        this.head.replaceChild(newElement, this.storedStyles[key]);
        this.storedStyles[key] = newElement;
      }
    }]);

    return Iframe;
  }();

  var style = document.createElement('style');style.innerHTML = 'body{cursor:text;font-size:32px;margin:0;padding:1em}mje-cursor{background-color:#000;position:absolute;width:1px}mje-cursor.hidden{display:none}mjx-container{outline:0}[type=eof]{opacity:0}[type=placeholder]{opacity:.25}';

  var CURSOR_BLINK = 600;

  var Display = /*#__PURE__*/function () {
    /**
     * This class handles math rendering and DOM manipulation.
     *
     * @param {MathJax} mathJax - MathJax instance.`
     * @param {Object} options
     * @param {HTMLElement} options.target
     */
    function Display(mathJax) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Display);

      this.mathJax = mathJax; // @TODO: Remove this default, target should be required.

      this.iframe = new Iframe(options.target || document.body);
      this.cursor = document.createElement('mje-cursor');
      this.cursorBlink = null;
      this.prepareHead();
      this.prepareBody();
      this.updateCursorBlink();
    }
    /**
     * Prepare iframe head.
     *
     * @return {Void}
     */


    _createClass(Display, [{
      key: "prepareHead",
      value: function prepareHead() {
        this.iframe.addStyle('mathjax', this.mathJax.chtmlStylesheet());
        this.iframe.addStyle('editor', style);
      }
      /**
       * Prepare iframe body.
       *
       * @return {Void}
       */

    }, {
      key: "prepareBody",
      value: function prepareBody() {
        this.iframe.addElement('mathjax', null);
        this.iframe.addElement('cursor', this.cursor);
      }
      /**
       * Render the inputed math in the iframe.
       *
       * @param {HTMLElement} math
       *
       * @return {Promise}
       */

    }, {
      key: "render",
      value: function render(math) {
        var _this = this;

        return this.mathJax.mathml2chtmlPromise(math.outerHTML).then(function (renderedMath) {
          _this.iframe.updateElement('mathjax', renderedMath);

          _this.iframe.updateStyle('mathjax', _this.mathJax.chtmlStylesheet());
        });
      }
      /**
       * Get element rect.
       *
       * @param {HTMLElement} element
       */

    }, {
      key: "getElementRect",
      value: function getElementRect(element) {
        var rect = element.getBoundingClientRect();

        if (this.iframe.body.scrollLeft > 0) {
          rect.x += this.iframe.body.scrollLeft;
        }

        if (this.iframe.body.scrollTop > 0) {
          rect.y += this.iframe.body.scrollTop;
        }

        return rect;
      }
      /**
       * Get element from iframe.
       *
       * @param {String} id
       */

    }, {
      key: "getElementById",
      value: function getElementById(id) {
        var dom = this.iframe.document.getElementById(id);
        var rect = this.getElementRect(dom);
        return {
          dom: dom,
          rect: rect
        };
      }
      /**
       * Get end of line by index.
       *
       * @param {Number} index
       */

    }, {
      key: "getEndOfLineByIndex",
      value: function getEndOfLineByIndex(index) {
        var dom = this.iframe.document.querySelectorAll('[type=eof]')[index];
        var rect = this.getElementRect(dom);
        return {
          dom: dom,
          rect: rect
        };
      }
      /**
       * Update cursor position on the iframe.
       *
       * @param {Object} properties
       * @param {Boolean} disableScrollIntoView
       */

    }, {
      key: "updateCursor",
      value: function updateCursor(properties, disableScrollIntoView) {
        this.cursor.style.left = properties.x + 'px';
        this.cursor.style.top = properties.y + 'px';
        this.cursor.style.height = properties.height + 'px';

        if (!disableScrollIntoView) {
          this.iframe.body.scrollLeft = properties.x - this.iframe.window.innerWidth / 2;
        }

        this.updateCursorBlink(true);
      }
    }, {
      key: "updateCursorBlink",
      value: function updateCursorBlink() {
        var _this2 = this;

        var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        clearInterval(this.cursorBlink);

        if (reset) {
          this.cursor.className = '';
        }

        this.cursorBlink = setInterval(function () {
          _this2.cursor.classList.toggle('hidden');

          _this2.updateCursorBlink();
        }, CURSOR_BLINK);
      }
      /**
       * Listen to events on the iframe.
       *
       * @param {String} type
       * @param {Function} listener
       */

    }, {
      key: "on",
      value: function on(type, listener) {
        return this.iframe.document.addEventListener(type, listener);
      }
      /**
       * Focus the editor.
       *
       * @return {Void}
       */

    }, {
      key: "focus",
      value: function focus() {
        this.iframe.window.focus();
      }
    }]);

    return Display;
  }();

  var idCount = 0;
  /**
   * Creates an unique id.
   *
   * @return {String}
   */

  function createId() {
    idCount += 1;
    return "mje-node".concat(idCount);
  }
  /**
   * Iterate through an element and its children.
   *
   * @param {HTMLElement} root
   * @param {Object|Function} actions
   */

  function walk(root, actions) {
    var iterator = function iterator(element) {
      if (actions.before) {
        actions.before(element);
      }

      Array.from(element.children).forEach(function (child) {
        iterator(child);
      });

      if (actions.after) {
        actions.after(element);
      }

      if (typeof actions === 'function') {
        actions(element);
      }
    };

    iterator(root);
  }
  /**
   * Create a HTML element.
   *
   * @param {String} tagName
   * @param {String} textContent
   */

  function createElement(tagName, textContent) {
    var element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
  }
  /**
   * Add an element next to the current cursor positon.
   *
   * @param {HTMLElement} element
   * @param {HTMLElement} reference
   */

  function insertElement(element, reference) {
    if (isContainer(reference)) {
      if (!reference.children.length) {
        reference.appendChild(element);
        return true;
      }

      reference.insertBefore(element, reference.lastElementChild.nextSibling);
    } else {
      reference.parentNode.insertBefore(element, reference);
    }

    return true;
  }
  /**
   * Delete current HTML element.
   *
   * @param {HTMLElement} value
   * @param {HTMLElement} current
   * @param {HTMLElement} initial
   */

  function deleteElement(value, current, initial) {
    var parent = current.parentNode;

    if (current.hasAttribute('editable')) {
      return initial || current;
    }

    if (isRow(current)) {
      return deleteElement(value, parent, current);
    } else if (isMath(current)) {
      return current;
    }

    var to = current.nextElementSibling || parent;
    parent.removeChild(current);
    return to;
  }
  /**
   * Perform a backspace deletion relative to current cursor position.
   *
   * @param {HTMLElement} value
   * @param {HTMLElement} current
   * @return {HTMLElement} New cursor position.
   */

  function deleteBeforeElement(value, current) {
    var parent = current.parentNode;
    var previous = current.previousElementSibling;

    if (isContainer(current)) {
      if (current.lastElementChild) {
        return deleteElement(value, current.lastElementChild, current);
      }

      if (isMath(current)) {
        return current;
      }

      return deleteElement(value, parent, current);
    }

    if (!previous && isMath(parent)) {
      return current;
    }

    return deleteElement(value, previous || parent, current);
  }
  /**
   * Checks if element is an <math> element.
   *
   * @param {HTMLElement} element
   */

  function isMath(element) {
    return element && element.tagName === 'MATH';
  }
  /**
   * Checks if element is an <mrow> element.
   *
   * @param {HTMLElement} element
   */

  function isRow(element) {
    return element.tagName === 'MROW';
  }
  /**
   * Checks if element is a container element.
   * (That is, an element that can hold other elements)
   *
   * @param {HTMLElement} element
   */

  function isContainer(element) {
    return isMath(element) || isRow(element);
  }

  var DisplayHelper = {
    createSpace: function createSpace() {
      var el = document.createElement('mspace');
      el.setAttribute('width', 'thinmathspace');
      return el;
    },
    createContainerPlaceholder: function createContainerPlaceholder() {
      var mo = document.createElement('mo');
      mo.setAttribute('type', 'placeholder');
      mo.textContent = '?';
      return mo;
    },
    createEndOfLine: function createEndOfLine() {
      var mo = document.createElement('mo');
      mo.setAttribute('type', 'eof');
      mo.textContent = '|';
      return mo;
    },
    prepare: function prepare(math) {
      var _this = this;

      var clone = math.cloneNode(true);
      walk(clone, function (element) {
        if (isContainer(element)) {
          if (!element.children.length) {
            element.appendChild(_this.createContainerPlaceholder());
          }

          element.appendChild(_this.createSpace());
        }
      });
      clone.appendChild(this.createEndOfLine());
      return clone;
    }
  };

  var operators = {
    '*': '⋅',
    '/': '÷',
    '+': '+',
    '-': '-',
    '=': '=',
    '<': '<',
    '>': '>',
    '|': '|',
    '%': '%',
    ',': ',',
    '.': '.',
    $: '$',
    '(': '(',
    ')': ')',
    '[': '[',
    ']': ']',
    '!': '!'
  };

  var ARROW_LEFT = 37;
  var ARROW_RIGHT = 39;
  var BACKSPACE = 8;
  var DELETE = 46;
  var IS_NUMBER = /^\d$/;
  var IS_LETTER = /^[a-z]$/i;

  var Editor = /*#__PURE__*/function () {
    /**
     * Creates a editor instance.
     *
     * @param {MathJax} mathJax
     */
    function Editor(mathJax) {
      _classCallCheck(this, Editor);

      this.math = document.createElement('math');
      this.display = new Display(mathJax);
      this.cursor = this.math;
      this.path = [];
      this.math.setAttribute('id', 'root');
      this.display.on('keydown', this.handleKeyboardInteraction.bind(this));
      this.display.on('mouseup', this.handleMouseInteraction.bind(this));
    }
    /**
     * Set the value of the editor.
     *
     * @param {String} value
     */


    _createClass(Editor, [{
      key: "setValue",
      value: function setValue(value) {
        this.math.innerHTML = value;
        this.cursor = this.math;
        this.update();
      }
    }, {
      key: "setCursor",
      value: function setCursor(value) {
        this.cursor = value;
      }
      /**
       * Update the editor displayed math.
       *
       * @return {Void}
       */

    }, {
      key: "update",
      value: function update() {
        var _this = this;

        this.prepareMath();
        this.display.render(DisplayHelper.prepare(this.math)).then(function () {
          _this.preparePath();

          _this.updateCursor();
        });
      }
      /**
       * Set cursor position.
       *
       * @param {HTMLElement} value
       * @param {Boolean} disableScrollIntoView
       *
       * @return {Void}
       */

    }, {
      key: "updateCursor",
      value: function updateCursor(value) {
        var disableScrollIntoView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (value) {
          this.setCursor(value);
        }

        var _this$getCurrentStep = this.getCurrentStep(),
            cursor = _this$getCurrentStep.cursor;

        this.display.updateCursor(cursor, disableScrollIntoView);
      }
      /**
       * Assign an id to every element.
       *
       * @return {Void}
       */

    }, {
      key: "prepareMath",
      value: function prepareMath() {
        walk(this.math, function (element) {
          if (!element.hasAttribute('id')) {
            element.setAttribute('id', createId());
          }
        });
      }
      /**
       * Creates a path for the cursor. Path is an array of steps.
       * Each step has its attached element and size/positioning
       * for cursor placement.
       *
       * @return {Void}
       */

    }, {
      key: "preparePath",
      value: function preparePath() {
        var _this2 = this;

        var path = [];
        var line = {
          index: 0,
          rect: null
        };
        var previousStep = null;

        var findStep = function findStep(element) {
          return path.find(function (other) {
            return other.element === element;
          });
        };

        var createStep = function createStep(element) {
          var _this2$display$getEle = _this2.display.getElementById(element.id),
              dom = _this2$display$getEle.dom,
              rect = _this2$display$getEle.rect;

          var x = rect.x;
          var y = rect.y;
          var height = rect.height;

          if (isContainer(element)) {
            // Cursor should be placed after last element child.
            if (element.children.length) {
              var lastChildStep = findStep(element.lastElementChild);
              x = lastChildStep.rect.x + lastChildStep.rect.width;
              y = lastChildStep.rect.y;
              height = lastChildStep.rect.height;
            }
          }

          var step = {
            dom: dom,
            element: element,
            rect: rect,
            next: null,
            previous: previousStep,
            cursor: {
              x: x,
              y: y,
              height: height
            }
          };

          if (previousStep) {
            previousStep.next = step;
          }

          previousStep = step;
          path.push(step);
        };

        walk(this.math, {
          before: function before(element) {
            if (!line.rect) {
              line.rect = _this2.display.getEndOfLineByIndex(line.index).rect;
            }

            if (!isContainer(element)) {
              createStep(element);
            }
          },
          after: function after(element) {
            if (isContainer(element)) {
              createStep(element);
            }
          }
        });
        this.path = path;
      }
    }, {
      key: "getCurrentStep",
      value: function getCurrentStep() {
        var _this3 = this;

        return this.path.find(function (step) {
          return _this3.cursor === step.element;
        });
      }
      /**
       * Handles keyboard events.
       *
       * @param {KeyboardEvent} e
       */

    }, {
      key: "handleKeyboardInteraction",
      value: function handleKeyboardInteraction(e) {
        var keyCode = e.keyCode,
            key = e.key;

        if (keyCode === ARROW_RIGHT) {
          this.moveRight();
        } else if (keyCode === ARROW_LEFT) {
          this.moveLeft();
        } else if (keyCode === BACKSPACE) {
          this.applyBackspace();
        } else if (keyCode === DELETE) {
          this.applyDelete();
        } else if (key.match(IS_NUMBER)) {
          this.addNumber(key);
        } else if (key.match(IS_LETTER)) {
          this.addIdentifier(key);
        } else if (operators[key]) {
          this.addOperator(operators[key]);
        }

        e.preventDefault();
      }
      /**
       * Handles mouse events.
       *
       * @param {MouseEvent} e
       */

    }, {
      key: "handleMouseInteraction",
      value: function handleMouseInteraction(e) {
        var x = e.pageX;
        var y = e.pageY;
        var smaller = Infinity;
        var candidate = null;

        var _iterator = _createForOfIteratorHelper(this.path),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var step = _step.value;
            var p1x = step.cursor.x;
            var p1y = step.cursor.y;
            var p2y = p1y + step.cursor.height;
            var d = Math.abs(p1x - x);

            if (p1y <= y && y <= p2y && smaller > d) {
              smaller = d;
              candidate = step;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (!candidate || candidate.element === this.cursor) {
          return;
        }

        this.updateCursor(candidate.element, true);
      }
      /**
       * Perform a delete opertion.
       *
       * @return {Void}
       */

    }, {
      key: "applyDelete",
      value: function applyDelete() {
        this.setCursor(deleteElement(this.math, this.cursor));
        this.update();
      }
      /**
       * Perform a backspace opertion.
       *
       * @return {Void}
       */

    }, {
      key: "applyBackspace",
      value: function applyBackspace() {
        this.setCursor(deleteBeforeElement(this.math, this.cursor));
        this.update();
      }
      /**
       * Move to next element.
       *
       * @return {Void}
       */

    }, {
      key: "moveRight",
      value: function moveRight() {
        var step = this.getCurrentStep();

        if (step.next) {
          this.updateCursor(step.next.element);
        }
      }
      /**
       * Perform to previous element.
       *
       * @return {Void}
       */

    }, {
      key: "moveLeft",
      value: function moveLeft() {
        var step = this.getCurrentStep();

        if (step.previous) {
          this.updateCursor(step.previous.element);
        }
      }
      /**
       * Add element to math.
       *
       * @param {HTMLElement} element
       * @param {HTMLElement} newCursor
       */

    }, {
      key: "add",
      value: function add(element) {
        var newCursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        insertElement(element, this.cursor);

        if (newCursor) {
          this.setCursor(newCursor);
        }

        this.display.focus();
        this.update();
      }
      /**
       * Add a <mn> to the math.
       *
       * @param {String} number
       */

    }, {
      key: "addNumber",
      value: function addNumber(number) {
        this.add(createElement('mn', number));
      }
      /**
       * Add a <mi> to the math.
       *
       * @param {String} number
       */

    }, {
      key: "addIdentifier",
      value: function addIdentifier(letter) {
        this.add(createElement('mi', letter));
      }
      /**
       * Add a <mo> to the math.
       *
       * @param {String} number
       */

    }, {
      key: "addOperator",
      value: function addOperator(operator) {
        this.add(createElement('mo', operator));
      }
    }]);

    return Editor;
  }();

  var index = {
    version: '4.0.0',

    /**
     * Creates an instance of the editor.
     *
     * @param {MathJax} mathJax
     * @param {Object} options
     * @param {HTMLElement} options.target
     */
    createUsing: function createUsing(mathJax, options) {
      return new Editor(mathJax, options);
    }
  };

  return index;

})));
