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
    }
    /**
     * Gets iframe document.
     *
     * @return {Document}
     */


    _createClass(Iframe, [{
      key: "getDocument",
      value: function getDocument() {
        return this.element.contentDocument;
      }
      /**
       * Create a placeholder element
       *
       * @return {HTMLElement}
       */

    }, {
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
        this.getDocument().head.appendChild(element);
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
        this.getDocument().body.appendChild(this.storedElements[key]);
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

        this.getDocument().body.replaceChild(newElement, this.storedElements[key]);
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

        this.getDocument().head.replaceChild(newElement, this.storedStyles[key]);
      }
    }]);

    return Iframe;
  }();

  var style = document.createElement('style');style.innerHTML = 'body{cursor:text;font-size:32px;margin:0}mje-cursor{background-color:red;position:absolute;width:1px}mjx-container{outline:0}[type=eof]{opacity:0}';

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
      this.prepareHead();
      this.prepareBody();
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
       * Get element from iframe.
       *
       * @param {String} id
       */

    }, {
      key: "getElementById",
      value: function getElementById(id) {
        var dom = this.iframe.getDocument().getElementById(id);
        return {
          dom: dom,
          rect: dom.getBoundingClientRect()
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
        return this.iframe.getDocument().querySelectorAll('[type=eof]')[index];
      }
      /**
       * Update cursor position on the iframe.
       *
       * @param {Object} properties
       */

    }, {
      key: "updateCursor",
      value: function updateCursor(properties) {
        this.cursor.style.left = properties.x + 'px';
        this.cursor.style.top = properties.y + 'px';
        this.cursor.style.height = properties.height + 'px';
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
        return this.iframe.getDocument().addEventListener(type, listener);
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
   * Checks if element is an <math> element.
   *
   * @param {HTMLElement} element
   */

  function isMath(element) {
    return element.tagName === 'MATH';
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
    createContainerPlaceholder: function createContainerPlaceholder() {
      var mo = document.createElement('mo');
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
        if (isContainer(element) && !element.children.length) {
          element.appendChild(_this.createContainerPlaceholder());
        }
      });
      clone.appendChild(this.createEndOfLine());
      return clone;
    }
  };

  var ARROW_LEFT = 37;
  var ARROW_RIGHT = 39;

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
       *
       * @return {Void}
       */

    }, {
      key: "updateCursor",
      value: function updateCursor(value) {
        if (value) {
          this.cursor = value;
        }

        var _this$getCurrentStep = this.getCurrentStep(),
            cursor = _this$getCurrentStep.cursor;

        this.display.updateCursor(cursor);
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

        var createStep = function createStep(element) {
          var _this2$display$getEle = _this2.display.getElementById(element.id),
              dom = _this2$display$getEle.dom,
              rect = _this2$display$getEle.rect;

          var x = rect.x + (isRow(element) ? rect.width : 0);
          var y = rect.y;
          var height = rect.height;

          if (isMath(element) || isMath(element.parentNode)) {
            height = line.rect.height;
            y = line.rect.y;
          }

          if (isMath(element)) {
            x = line.rect.x + 5;
          }

          var step = {
            dom: dom,
            element: element,
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
              line.rect = _this2.display.getEndOfLineByIndex(line.index).getBoundingClientRect();
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
        var step = this.getCurrentStep();

        if (!step) {
          return;
        }

        if (e.keyCode === ARROW_RIGHT && step.next) {
          this.updateCursor(step.next.element);
        } else if (e.keyCode === ARROW_LEFT && step.previous) {
          this.updateCursor(step.previous.element);
        }
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

        this.updateCursor(candidate.element);
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
