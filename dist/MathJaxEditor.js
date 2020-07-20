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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  var IFrame = /*#__PURE__*/function () {
    /**
     * @param {HTMLElement} target
     */
    function IFrame(target) {
      var _this = this;

      _classCallCheck(this, IFrame);

      /** @type {HTMLIFrameElement} */
      this.element = document.createElement('iframe');
      this.element.className = 'mathjax-editor-input';
      /** @type {Object} */

      this.storedStyles = {};
      /** @type {Object} */

      this.storedElements = {};

      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      target.parentNode.replaceChild(this.element, target);
      /** @type {Document} */

      this.document = this.element.contentDocument;
      /** @type {Window} */

      this.window = this.element.contentWindow;
      /** @type {HTMLElement} */

      this.body = this.document.body;
      /** @type {HTMLHeadElement} */

      this.head = this.document.head;
      this.window.addEventListener('focus', function () {
        return _this.handleFocus();
      });
      this.window.addEventListener('blur', function () {
        return _this.handleBlur();
      });
      this.body.classList.add('isInactive');
    }
    /**
     * @return {HTMLElement}
     */


    _createClass(IFrame, [{
      key: "createPlaceholderElement",
      value: function createPlaceholderElement() {
        return document.createElement('void');
      }
      /**
       * @param {String} key
       * @param {HTMLElement} element
       * @return {Void}
       */

    }, {
      key: "addStyle",
      value: function addStyle(key, element) {
        this.storedStyles[key] = element.cloneNode(true);
        this.head.appendChild(this.storedStyles[key]);
      }
      /**
       * @param {String} key
       * @param {HTMLElement} element
       * @return {Void}
       */

    }, {
      key: "addElement",
      value: function addElement(key, element) {
        this.storedElements[key] = element || this.createPlaceholderElement();
        this.body.appendChild(this.storedElements[key]);
      }
      /**
       * @param {String} key
       * @param {HTMLElement} newElement
       * @return {Void}
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
       * @param {String} key
       * @param {HTMLElement} newElement
       * @return {Void}
       */

    }, {
      key: "updateStyle",
      value: function updateStyle(key, newElement) {
        if (!this.storedStyles[key]) {
          return;
        }

        var cloneElement = newElement.cloneNode(true);
        this.head.replaceChild(cloneElement, this.storedStyles[key]);
        this.storedStyles[key] = cloneElement;
      }
      /**
       * @return {Void}
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        this.element.classList.add('isActive');
        this.body.classList.remove('isInactive');
      }
      /**
       * @return {Void}
       */

    }, {
      key: "handleBlur",
      value: function handleBlur() {
        this.element.classList.remove('isActive');
        this.body.classList.add('isInactive');
      }
    }]);

    return IFrame;
  }();

  var style = document.createElement('style');style.innerHTML = 'body{cursor:text;margin:0;padding:1em}br{font-size:0}mje-cursor{background-color:#000;position:absolute;width:1px}mje-cursor.hidden{display:none}mjx-container{outline:0}[type=eof]{opacity:1}[type=placeholder]{opacity:0}body.isInactive mje-cursor{display:none}';

  var CURSOR_BLINK = 600;

  var Display = /*#__PURE__*/function () {
    /**
     * @param {Object} options
     * @param {MathJax} options.mathJax
     * @param {HTMLElement} options.target
     * @param {String} options.fontSize
     */
    function Display() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Display);

      /** @type {MathJax} */
      this.mathJax = options.mathJax;
      /** @type {IFrame} */

      this.iframe = new IFrame(options.target);
      /** @type {HTMLElement} */

      this.cursor = document.createElement('mje-cursor');
      /** @type {Number|null} */

      this.cursorBlink = null;
      this.iframe.body.style.fontSize = options.fontSize || '32px';
      this.prepareHead();
      this.prepareBody();
      this.updateCursorBlink();
    }
    /**
     * @return {Void}
     */


    _createClass(Display, [{
      key: "prepareHead",
      value: function prepareHead() {
        this.iframe.addStyle('mathjax', this.mathJax.chtmlStylesheet());
        this.iframe.addStyle('editor', style);
      }
      /**
       * @return {Void}
       */

    }, {
      key: "prepareBody",
      value: function prepareBody() {
        this.iframe.addElement('mathjax', null);
        this.iframe.addElement('cursor', this.cursor);
      }
      /**
       * @param {HTMLElement} math
       * @return {Promise}
       */

    }, {
      key: "render",
      value: function render(math) {
        var _this = this;

        this.iframe.updateElement('mathjax', math);
        return this.mathJax.typesetPromise([math]).then(function () {
          _this.iframe.updateStyle('mathjax', _this.mathJax.chtmlStylesheet());
        });
      }
      /**
       * @param {HTMLElement} element
       * @return {DOMRect}
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
       * @typedef {Object} DisplayElement
       * @property {HTMLElement} dom
       * @property {DOMRect} rect
       */

      /**
       * @param {HTMLElement} element
       * @return {DisplayElement}
       */

    }, {
      key: "getElement",
      value: function getElement(element) {
        var dom = this.iframe.document.getElementById(element.id);
        var rect = this.getElementRect(dom);
        return {
          dom: dom,
          rect: rect
        };
      }
      /**
       * @param {Object} properties
       * @param {Boolean} disableScrollIntoView
       * @return {Void}
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
      /**
       * @param {Boolean} reset
       * @return {Void}
       */

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
       * @param {String} type
       * @param {Function} listener
       * @return {Void}
       */

    }, {
      key: "on",
      value: function on(type, listener) {
        return this.iframe.document.addEventListener(type, listener);
      }
      /**
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
   * @return {String}
   */

  function createId() {
    idCount += 1;
    return "mje-node".concat(idCount);
  }
  /**
   * @param {HTMLElement} root
   * @param {Object|Function} actions
   * @return {Void}
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
   * @typedef CreateElementObject
   * @property {HTMLElement} element
   * @property {Function} appendTo
   */

  /**
   * @param {String} tagName
   * @param {String} textContent
   * @return {CreateElementObject}
   */

  function createElement(tagName, textContent) {
    var element = document.createElement(tagName);

    if (textContent) {
      element.textContent = textContent;
    }

    return {
      element: element,

      /**
       * @param {HTMLElement} other
       */
      appendTo: function appendTo(other) {
        extractElement(other).appendChild(element);
        return this;
      }
    };
  }
  /**
   * @param {HTMLElementObject|HTMLElement} subject
   * @return {HTMLElement}
   */

  function extractElement(subject) {
    return subject.element || subject;
  }
  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} reference
   * @return {Boolean}
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
   * @param {HTMLElement} value
   * @param {HTMLElement} current
   * @param {HTMLElement} initial
   * @return {HTMLElement}
   */

  function deleteElement(value, current, initial) {
    var parent = current.parentNode;

    if (current.hasAttribute('editable')) {
      return initial || current;
    }

    if (isRow(current)) {
      return deleteElement(value, parent, current);
    } else if (isMath(current)) {
      if (current.nextSibling) {
        var siblingMath = current.nextSibling.nextSibling;
        var newPosition = siblingMath.firstChild;

        while (siblingMath.firstChild) {
          current.appendChild(siblingMath.firstChild);
        }

        removeChild(current.nextSibling);
        removeChild(siblingMath);
        return newPosition || current;
      }

      return current;
    }

    var to = current.nextElementSibling || parent;
    removeChild(current);
    return to;
  }
  /**
   * @param {HTMLElement} value
   * @param {HTMLElement} current
   * @return {HTMLElement}
   */

  function backspaceElement(value, current) {
    var parent = current.parentNode;
    var previous = current.previousElementSibling;

    if (isContainer(current)) {
      if (current.lastChild) {
        return deleteElement(value, current.lastChild, current);
      }

      if (isMath(current)) {
        // Handling newline deletion. If a <math> element has a sibling,
        // that means it is a <br> element. In this case, it is empty
        // and we should only remove it and its line break element.
        if (current.previousSibling) {
          var newPosition = current.previousSibling.previousSibling;
          removeChild(current.previousSibling);
          removeChild(current);
          return newPosition;
        }

        return current;
      }

      return deleteElement(value, parent, current);
    }

    if (!previous && isMath(parent)) {
      // Handling newline deletion. If the parent is a <math> element,
      // we check if it has a sibling (<br> element). If that is true,
      // we then merge all contents of this line with its sibling <math>.
      if (parent.previousSibling) {
        var _newPosition = parent.firstChild;
        var siblingMath = parent.previousSibling.previousSibling;

        while (parent.firstChild) {
          siblingMath.appendChild(parent.firstChild);
        }

        removeChild(parent);
        return _newPosition || siblingMath;
      }

      return current;
    }

    return deleteElement(value, previous || parent, current);
  }
  /**
   * @param {String} a
   * @param {String} b
   * @return {Boolean}
   */

  function equals(a, b) {
    return a.toLowerCase() === b;
  }
  /**
   * @param {HTMLElement} element
   * @return {Boolean}
   */

  function isMath(element) {
    return element && equals(element.tagName, 'math');
  }
  /**
   * @param {HTMLElement} element
   * @return {Boolean}
   */

  function isRow(element) {
    return equals(element.tagName, 'mrow');
  }
  /**
   * @param {HTMLElement} element
   * @return {Boolean}
   */

  function isContainer(element) {
    return isMath(element) || isRow(element);
  }
  /**
   * @param {HTMLElement} element
   * @return {Boolean}
   */

  function isIgnoredElement(element) {
    return equals(element.tagName, 'mathjax-editor-value') || equals(element.tagName, 'br');
  }
  /**
   * @param {HTMLElement} element
   * @return {Void}
   */

  function removeChild(element) {
    element.parentNode.removeChild(element);
  }

  var DisplayHelper = {
    /**
     * @return {HTMLElement}
     */
    createSpace: function createSpace() {
      var mspace = createElement('mspace');
      mspace.element.setAttribute('width', 'thinmathspace');
      return mspace.element;
    },

    /**
     * @return {HTMLElement}
     */
    createContainerPlaceholder: function createContainerPlaceholder() {
      var mo = createElement('mo', '?');
      mo.element.setAttribute('type', 'placeholder');
      return mo.element;
    },

    /**
     * @param {HTMLElement} math
     * @return {HTMLElement}
     */
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
      return clone;
    }
  };

  var WHITESPACE = />\s+</g;
  var IOHelper = {
    /**
     * @param {String} value
     * @return {String}
     */
    "in": function _in(value) {
      var parser = document.createElement('div');
      parser.innerHTML = value.replace(WHITESPACE, '><').trim();

      if (parser.children.length > 1) {
        throw new Error('MathJax Editor: the input value should have a single <math> element.');
      }

      if (!isMath(parser.firstChild)) {
        throw new Error('MathJax Editor: the input value should have a single <math> element.');
      }

      var currentMath = null;
      Array.from(parser.firstChild.children).forEach(function (child) {
        var isNewline = equals(child.tagName, 'mspace') && child.getAttribute('linebreak') === 'newline';

        if (isNewline) {
          currentMath = document.createElement('math');
          parser.appendChild(document.createElement('br'));
          parser.appendChild(currentMath);
        } else if (currentMath) {
          currentMath.appendChild(child);
        }

        if (isNewline) {
          removeChild(child);
        }
      });
      return parser.innerHTML;
    },

    /**
     * @param {HTMLElement} value
     * @return {HTMLElement}
     */
    out: function out(value) {
      var clone = value.cloneNode(true);
      var math = document.createElement('math');
      Array.from(clone.children).forEach(function (otherMath, i) {
        if (isIgnoredElement(otherMath)) {
          return;
        }

        Array.from(otherMath.children).forEach(function (element) {
          walk(element, function (otherElement) {
            otherElement.removeAttribute('editable');
            otherElement.removeAttribute('id');
          });
          math.appendChild(element);
        });

        if (i !== clone.children.length - 1) {
          var mspace = document.createElement('mspace');
          mspace.setAttribute('linebreak', 'newline');
          math.appendChild(mspace);
        }
      });
      return math;
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
  var ENTER = 13;
  var IS_NUMBER = /^\d$/;
  var IS_LETTER = /^[a-z]$/i;
  /**
   * @typedef {Object} ElementPosition
   * @property {HTMLElement} dom
   * @property {HTMLElement} element
   * @property {DOMRect} rect
   * @property {Number} line
   * @property {ElementPosition|null} next
   * @property {ElementPosition|null} previous
   * @property {Object} cursor
   * @property {Number} cursor.x
   * @property {Number} cursor.y
   * @property {Number} cursor.height
   */

  /**
   * @typedef {Object} MathJaxEditorOptions
   * @property {MathJax} mathJax
   * @property {HTMLElement} target
   * @property {String[]} allowTags
   * @property {Boolean} allowNewline
   * @property {Boolean} readonly
   * @property {String} fontSize
   */

  var Editor = /*#__PURE__*/function () {
    /**
     * @param {MathJax} mathJax
     * @param {MathJaxEditorOptions} options
     */
    function Editor(options) {
      _classCallCheck(this, Editor);

      /** @type {HTMLElement} */
      this.value = document.createElement('mathjax-editor-value');
      this.value.innerHTML = '<math></math>';
      /** @type {Display} */

      this.display = new Display(options);
      /** @type {HTMLElement} */

      this.cursor = this.value.firstChild;
      /** @type {ElementPosition[]} */

      this.path = [];
      /** @type {String[]} */

      this.allowTags = options.allowTags || [];
      /** @type {Boolean} */

      this.allowNewline = options.allowNewline || true;
      /** @type {Boolean} */

      this.readonly = options.readonly || false;
      this.value.setAttribute('id', 'root');
      this.display.iframe.element.__EDITOR__ = this;
      this.display.on('keydown', this.handleKeyboardInteraction.bind(this));
      this.display.on('mouseup', this.handleMouseInteraction.bind(this));
      this.update();
    }
    /**
     * @param {String} value
     * @return {Void}
     */


    _createClass(Editor, [{
      key: "setValue",
      value: function setValue(value) {
        this.value.innerHTML = IOHelper["in"](value);
        this.cursor = this.value.firstChild;
        this.update();
      }
      /**
       * @return {HTMLElement}
       */

    }, {
      key: "getValue",
      value: function getValue() {
        return IOHelper.out(this.value);
      }
      /**
       * @return {String}
       */

    }, {
      key: "getValueAsString",
      value: function getValueAsString() {
        return this.getValue().outerHTML;
      }
      /**
       * @param {HTMLElement} value
       * @return {Void}
       */

    }, {
      key: "setCursor",
      value: function setCursor(value) {
        this.cursor = value;
      }
      /**
       * @return {Void}
       */

    }, {
      key: "update",
      value: function update() {
        var _this = this;

        this.prepareMath();
        this.display.render(DisplayHelper.prepare(this.value)).then(function () {
          _this.preparePath();

          _this.updateCursor();
        });
      }
      /**
       * @param {HTMLElement} value
       * @param {Boolean} disableScrollIntoView
       * @return {Void}
       */

    }, {
      key: "updateCursor",
      value: function updateCursor(value) {
        var disableScrollIntoView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (value) {
          this.setCursor(value);
        }

        var _this$getCurrentPosit = this.getCurrentPosition(),
            cursor = _this$getCurrentPosit.cursor;

        this.display.updateCursor(cursor, disableScrollIntoView);
      }
      /**
       * @return {Void}
       */

    }, {
      key: "prepareMath",
      value: function prepareMath() {
        walk(this.value, function (element) {
          if (!element.hasAttribute('id')) {
            element.setAttribute('id', createId());
          }
        });
      }
      /**
       * @return {Void}
       */

    }, {
      key: "preparePath",
      value: function preparePath() {
        var _this2 = this;

        var path = [];
        var lastPosition = null;
        /**
         * @param {HTMLElement} element
         * @return {ElementPosition}
         */

        var findPosition = function findPosition(element) {
          return path.find(function (other) {
            return other.element === element;
          });
        };
        /**
         * @param {HTMLElement} element
         * @return {ElementPosition}
         */


        var createPosition = function createPosition(element) {
          var _this2$display$getEle = _this2.display.getElement(element),
              dom = _this2$display$getEle.dom,
              rect = _this2$display$getEle.rect;

          var x = rect.x;
          var y = rect.y;
          var height = rect.height;

          if (isContainer(element)) {
            // Cursor should be placed after last element child.
            if (element.children.length) {
              var lastChildPosition = findPosition(element.lastChild);
              x = lastChildPosition.rect.x + lastChildPosition.rect.width;
            }
          } else {
            // Use parent rect to adjust cursor height and y.
            var _this2$display$getEle2 = _this2.display.getElement(element.parentNode),
                parentRect = _this2$display$getEle2.rect;

            height = parentRect.height;
            y = parentRect.y;
          }

          var position = {
            dom: dom,
            element: element,
            rect: rect,
            next: null,
            previous: lastPosition,
            cursor: {
              x: x,
              y: y,
              height: height
            }
          };

          if (lastPosition) {
            lastPosition.next = position;
          }

          lastPosition = position;
          path.push(position);
        };

        walk(this.value, {
          before: function before(element) {
            if (!isContainer(element) && !isIgnoredElement(element)) {
              createPosition(element);
            }
          },
          after: function after(element) {
            if (isContainer(element) && !isIgnoredElement(element)) {
              createPosition(element);
            }
          }
        });
        this.path = path;
      }
      /**
       * @return {ElementPosition}
       */

    }, {
      key: "getCurrentPosition",
      value: function getCurrentPosition() {
        var _this3 = this;

        return this.path.find(function (position) {
          return _this3.cursor === position.element;
        });
      }
      /**
       * @return {Boolean}
       */

    }, {
      key: "canInsertAtCursorPosition",
      value: function canInsertAtCursorPosition() {
        if (!this.readonly) {
          return true;
        }

        var curr = this.cursor.parentNode;

        while (curr) {
          if (curr.hasAttribute('editable')) {
            return true;
          }

          curr = curr.parentNode;
        }

        return false;
      }
      /**
       * @param {HTMLElement} element
       * @return {Boolean}
       */

    }, {
      key: "canInsert",
      value: function canInsert(element) {
        if (!this.canInsertAtCursorPosition()) {
          return false;
        }

        var tagName = element ? element.tagName.toLowerCase() : null;

        if (tagName && this.allowTags.length && this.allowTags.indexOf(tagName) === -1) {
          return false;
        }

        return true;
      }
      /**
       * @param {KeyboardEvent} e
       * @return {Void}
       */

    }, {
      key: "handleKeyboardInteraction",
      value: function handleKeyboardInteraction(e) {
        var keyCode = e.keyCode,
            key = e.key;

        if (keyCode === ARROW_RIGHT) {
          this.moveToNextPosition();
        } else if (keyCode === ARROW_LEFT) {
          this.moveToPreviousPosition();
        } else if (keyCode === BACKSPACE) {
          this.applyBackspace();
        } else if (keyCode === DELETE) {
          this.applyDelete();
        } else if (keyCode === ENTER) {
          this.addNewline();
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
       * @param {MouseEvent} e
       * @return {Void}
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
            var position = _step.value;
            var p1x = position.cursor.x;
            var p1y = position.cursor.y;
            var p2y = p1y + position.cursor.height;
            var d = Math.abs(p1x - x);

            if (p1y <= y && y <= p2y && smaller > d) {
              smaller = d;
              candidate = position;
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
       * @return {Void}
       */

    }, {
      key: "applyDelete",
      value: function applyDelete() {
        this.setCursor(deleteElement(this.value, this.cursor));
        this.update();
      }
      /**
       * @return {Void}
       */

    }, {
      key: "applyBackspace",
      value: function applyBackspace() {
        this.setCursor(backspaceElement(this.value, this.cursor));
        this.update();
      }
      /**
       * @return {Void}
       */

    }, {
      key: "moveToNextPosition",
      value: function moveToNextPosition() {
        var position = this.getCurrentPosition();

        if (position.next) {
          this.updateCursor(position.next.element);
        }
      }
      /**
       * @return {Void}
       */

    }, {
      key: "moveToPreviousPosition",
      value: function moveToPreviousPosition() {
        var position = this.getCurrentPosition();

        if (position.previous) {
          this.updateCursor(position.previous.element);
        }
      }
      /**
       * @param {String|HTMLElement|CreateElementObject} elementToInsert
       * @param {HTMLElement|null} elementToCursor
       * @return {Boolean}
       */

    }, {
      key: "insert",
      value: function insert(elementToInsert) {
        var elementToCursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var element = extractElement(elementToInsert);

        if (!this.canInsert(element)) {
          return false;
        }

        insertElement(element, this.cursor);

        if (elementToCursor) {
          this.setCursor(extractElement(elementToCursor));
        }

        this.display.focus();
        this.update();
        return true;
      }
      /**
       * @param {Function} factory
       * @return {Boolean}
       */

    }, {
      key: "insertCustom",
      value: function insertCustom(factory) {
        var _factory = factory(createElement),
            _factory2 = _slicedToArray(_factory, 2),
            elementToInsert = _factory2[0],
            elementToCursor = _factory2[1];

        return this.insert(elementToInsert, elementToCursor);
      }
      /**
       * @return {Void}
       */

    }, {
      key: "addNewline",
      value: function addNewline() {
        var currentNode = this.cursor;
        var parentNode = currentNode.parentNode;

        if (!this.allowNewline || !isMath(currentNode) && !isMath(parentNode)) {
          return;
        }

        var math = document.createElement('math');
        var br = document.createElement('br');
        var context = currentNode;
        var newPosition = math;

        if (!isMath(currentNode)) {
          while (currentNode.nextSibling) {
            math.appendChild(currentNode.nextSibling);
          }

          math.insertBefore(currentNode, math.firstChild);
          context = parentNode;
          newPosition = math.firstChild;
        }

        this.value.insertBefore(math, context.nextSibling);
        this.value.insertBefore(br, math);
        this.setCursor(newPosition);
        this.update();
      }
      /**
       * @param {String} number
       * @return {Void}
       */

    }, {
      key: "addNumber",
      value: function addNumber(number) {
        this.insert(createElement('mn', number));
      }
      /**
       * @param {String} letter
       * @return {Void}
       */

    }, {
      key: "addIdentifier",
      value: function addIdentifier(letter) {
        this.insert(createElement('mi', letter));
      }
      /**
       * @param {String} operator
       * @return {Void}
       */

    }, {
      key: "addOperator",
      value: function addOperator(operator) {
        this.insert(createElement('mo', operator));
      }
    }]);

    return Editor;
  }();

  var index = {
    version: '4.0.0',
    activeEditor: null,

    /**
     * @typedef {Object} MathJaxEditorOptions
     * @property {MathJax} mathJax
     * @property {HTMLElement} target
     * @property {String[]} allowTags
     * @property {String[]} allowNewline
     * @property {Boolean} readonly
     */

    /**
     * @param {MathJaxEditorOptions} options
     */
    create: function create(options) {
      var _this = this;

      var editor = new Editor(options);
      editor.display.iframe.window.addEventListener('focus', function () {
        _this.activeEditor = editor;
      });
      return editor;
    },

    /**
     * @param {MathJaxEditorOptions} options
     */
    initialize: function initialize() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Array.from(document.querySelectorAll('mathjax-editor')).forEach(function (element) {
        var editor = new Editor(Object.assign(options, {
          // We assume there is a global MathJax if it is not passed in the options.
          mathJax: options.MathJax || window.MathJax,
          target: element
        }));
        editor.display.iframe.window.addEventListener('focus', function () {
          _this2.activeEditor = editor;
        });
      });
    }
  };

  return index;

})));
