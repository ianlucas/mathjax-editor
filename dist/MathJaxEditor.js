/*!
 * 
 * MathJax Editor
 * http://github.com/ianlucas/mathjax-editor
 * 
 * by Ian Lucas
 * Released under the MIT license.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MathJaxEditor"] = factory();
	else
		root["MathJaxEditor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;
/**
 * @param {NodeList} obj 
 */
function toArray(obj) {
  return Array.prototype.slice.call(obj);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;
/**
 * @param {HTMLElement} $el  
 * @param {String} name 
 */
function addClass($el, name) {
  return $el.classList.add(name);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClass;
/**
 * @param {HTMLElement} $el  
 * @param {String} name 
 */
function removeClass($el, name) {
  return $el.classList.remove(name);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mathJaxEditor = __webpack_require__(4);

var _mathJaxEditor2 = _interopRequireDefault(_mathJaxEditor);

__webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mathJaxEditor2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editor = __webpack_require__(5);

var _editor2 = _interopRequireDefault(_editor);

var _operatorList = __webpack_require__(27);

var _operatorList2 = _interopRequireDefault(_operatorList);

var _inArray = __webpack_require__(28);

var _inArray2 = _interopRequireDefault(_inArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathJaxEditor = function () {
  /**
   * @param {String|Node} selectors 
   * @param {Object} [options] 
   */
  function MathJaxEditor(selectors, options) {
    _classCallCheck(this, MathJaxEditor);

    this.core = new _editor2.default(selectors, options);

    this.core.on('@input', this.insert.bind(this));
  }

  /**
   * @param {Number} n 
   */


  _createClass(MathJaxEditor, [{
    key: 'insertNumber',
    value: function insertNumber(n) {
      if (n < 0 || n > 9) {
        throw new RangeError('MathjaxEditor: The number must be 0 or up to 9.');
      }

      var $mn = document.createElement('mn');
      $mn.innerHTML = n;

      this.core.insert($mn);
    }

    /**
     * @param {String} i
     */

  }, {
    key: 'insertIdentifier',
    value: function insertIdentifier(i) {
      if (typeof i !== 'string' && !i.match(/^[a-zA-Z]$/)) {
        throw new RangeError('MathjaxEditor: A single letter must be provided.');
      }

      var $mi = document.createElement('mi');
      $mi.innerHTML = i;

      this.core.insert($mi);
    }
  }, {
    key: 'insertFraction',
    value: function insertFraction() {
      var $mfrac = document.createElement('mfrac');
      var $mrowNum = document.createElement('mrow');
      var $mrowDen = document.createElement('mrow');

      $mfrac.appendChild($mrowNum);
      $mfrac.appendChild($mrowDen);

      this.core.insert($mfrac, $mrowNum);
    }
  }, {
    key: 'insertSqrt',
    value: function insertSqrt() {
      var $msqrt = document.createElement('msqrt');
      var $mrow = document.createElement('mrow');

      $msqrt.appendChild($mrow);

      this.core.insert($msqrt, $mrow);
    }

    /**
     * @param {String} o 
     */

  }, {
    key: 'insertOperator',
    value: function insertOperator(o) {
      if (!_operatorList2.default[o]) {
        throw new TypeError('MathjaxEditor: Unknown operator "' + o + '"');
      }

      var $mo = document.createElement('mo');
      $mo.innerHTML = _operatorList2.default[o];

      this.core.insert($mo);
    }
  }, {
    key: 'insertSuperscript',
    value: function insertSuperscript() {
      var $msup = document.createElement('msup');
      var $mrowBase = document.createElement('mrow');
      var $mrowPower = document.createElement('mrow');

      $msup.appendChild($mrowBase);
      $msup.appendChild($mrowPower);

      this.core.insert($msup, $mrowBase);
    }

    /**
     * @param {String} what 
     */

  }, {
    key: 'insert',
    value: function insert(what) {
      if (what.match(/^[0-9]$/)) {
        return this.insertNumber(parseInt(what, 10));
      }
      if (what.match(/^[a-zA-Z]$/)) {
        return this.insertIdentifier(what);
      }
      if (_operatorList2.default[what]) {
        return this.insertOperator(what);
      }
      console.warn('MathjaxEditor: insert: unknown "' + what + '"');
    }
  }]);

  return MathJaxEditor;
}();

exports.default = MathJaxEditor;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blinker = __webpack_require__(6);

var _blinker2 = _interopRequireDefault(_blinker);

var _cursor = __webpack_require__(7);

var _cursor2 = _interopRequireDefault(_cursor);

var _cursorMover = __webpack_require__(9);

var _cursorMover2 = _interopRequireDefault(_cursorMover);

var _eventEmitter = __webpack_require__(10);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _rendered = __webpack_require__(11);

var _rendered2 = _interopRequireDefault(_rendered);

var _tree = __webpack_require__(15);

var _tree2 = _interopRequireDefault(_tree);

var _addClass = __webpack_require__(1);

var _addClass2 = _interopRequireDefault(_addClass);

var _appendElement = __webpack_require__(16);

var _appendElement2 = _interopRequireDefault(_appendElement);

var _appendElementAfter = __webpack_require__(17);

var _appendElementAfter2 = _interopRequireDefault(_appendElementAfter);

var _applyDelete = __webpack_require__(18);

var _applyDelete2 = _interopRequireDefault(_applyDelete);

var _applyBackspace = __webpack_require__(19);

var _applyBackspace2 = _interopRequireDefault(_applyBackspace);

var _createElement = __webpack_require__(20);

var _createElement2 = _interopRequireDefault(_createElement);

var _findTextarea = __webpack_require__(21);

var _findTextarea2 = _interopRequireDefault(_findTextarea);

var _getJaxElement = __webpack_require__(22);

var _getJaxElement2 = _interopRequireDefault(_getJaxElement);

var _hideElement = __webpack_require__(23);

var _hideElement2 = _interopRequireDefault(_hideElement);

var _listenElement = __webpack_require__(24);

var _listenElement2 = _interopRequireDefault(_listenElement);

var _removeClass = __webpack_require__(2);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _showElement = __webpack_require__(25);

var _showElement2 = _interopRequireDefault(_showElement);

var _toDisplay = __webpack_require__(26);

var _toDisplay2 = _interopRequireDefault(_toDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Editor = function () {
  function Editor(selectors) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Editor);

    this.$el = (0, _findTextarea2.default)(selectors);
    this.$value = (0, _createElement2.default)('math');
    this.$input = (0, _createElement2.default)('input', 'mathjax-editor-input');
    this.$container = (0, _createElement2.default)('div', 'mathjax-editor-container');
    this.$display = (0, _createElement2.default)('div', 'mathjax-editor-display');
    this.$caret = (0, _createElement2.default)('div', 'mathjax-editor-caret');
    this.focused = false;
    this.mouseAtDisplay = false;
    this.emitter = new _eventEmitter2.default();
    this.tree = new _tree2.default(this.$value);
    this.rendered = new _rendered2.default(this.$display, this.tree);
    this.cursor = new _cursor2.default(this.tree, this.rendered, this.$caret);
    this.cursorMover = new _cursorMover2.default(this.tree, this.rendered, this.cursor);
    this.blinker = new _blinker2.default(this.$caret);
    this.placeholder = 'Start typing...';

    (0, _hideElement2.default)(this.$caret);
    (0, _hideElement2.default)(this.$el);
    (0, _appendElement2.default)(this.$display, this.$value);
    (0, _appendElement2.default)(this.$container, this.$display);
    (0, _appendElement2.default)(this.$container, this.$input);
    (0, _appendElement2.default)(this.$display, this.$caret);
    (0, _appendElementAfter2.default)(this.$el, this.$container);
    (0, _getJaxElement2.default)(this.$display).then(function (jaxElement) {
      _this.jaxElement = jaxElement;
      _this.update();
    });

    (0, _listenElement2.default)(this.$display, 'click', this.handleClick.bind(this));
    (0, _listenElement2.default)(this.$input, 'keyup', this.handleInput.bind(this));
    (0, _listenElement2.default)(this.$input, 'keydown', this.handleInput.bind(this));
    (0, _listenElement2.default)(this.$input, 'keydown', this.handleKeydown.bind(this));
    (0, _listenElement2.default)(this.$input, 'focus', this.handleFocus.bind(this));
    (0, _listenElement2.default)(this.$input, 'blur', this.handleBlur.bind(this));
    (0, _listenElement2.default)(this.$display, 'mouseenter', this.handleMouseenter.bind(this));
    (0, _listenElement2.default)(this.$display, 'mouseleave', this.handleMouseleave.bind(this));
  }

  /**
   * @param {e} ClickEvent
   */


  _createClass(Editor, [{
    key: 'handleClick',
    value: function handleClick(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;

      this.focus();
      this.cursorMover.click(clientX, clientY);
      this.blinker.freeze();
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.focused = true;
      (0, _addClass2.default)(this.$display, 'is-focused');
      (0, _showElement2.default)(this.$caret);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      if (this.mouseAtDisplay) {
        return;
      }
      this.focused = false;
      (0, _removeClass2.default)(this.$display, 'is-focused');
      (0, _hideElement2.default)(this.$caret);
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {
      var input = this.$input.value.trim();
      this.$input.value = '';
      if (input.length) {
        this.emitter.emit('@input', input);
      }
    }
  }, {
    key: 'handleMouseenter',
    value: function handleMouseenter() {
      this.mouseAtDisplay = true;
    }
  }, {
    key: 'handleMouseleave',
    value: function handleMouseleave() {
      this.mouseAtDisplay = false;
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      switch (e.which) {
        case 8:
          return this.backspaceRemove();
        case 13:
          return this.insertNewline();
        case 37:
          return this.moveCursorLeft();
        case 39:
          return this.moveCursorRight();
        case 46:
          return this.deleteRemove();
        // default: console.log(e.which)
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      if (!this.jaxElement) {
        return;
      }
      this.tree.update();
      this.jaxElement.setValue((0, _toDisplay2.default)(this.$value, this.placeholder)).update().then(function () {
        _this2.rendered.update();
        _this2.cursor.update();
      });
    }
  }, {
    key: 'backspaceRemove',
    value: function backspaceRemove() {
      (0, _applyBackspace2.default)(this.$value, this.cursor);
      this.update();
    }
  }, {
    key: 'deleteRemove',
    value: function deleteRemove() {
      (0, _applyDelete2.default)(this.$value, this.cursor);
      this.update();
    }

    /**
     * @param {HTMLElement} $el  
     * @param {HTMLElement} [$moveTo]
     */

  }, {
    key: 'insert',
    value: function insert($el) {
      var $moveTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var $position = this.cursor.getPosition();

      if (!$position) {
        this.$value.insertBefore($el, this.$value.firstElementChild);
      } else {
        switch ($position.tagName) {
          case 'MROW':
            $position.insertBefore($el, $position.firstElementChild);break;
          case 'MATH':
            this.$value.appendChild($el);break;
          default:
            $position.parentNode.insertBefore($el, $position.nextSibling);
        }
      }

      this.cursor.setPosition($moveTo || $el);
      this.focus();
      this.update();
    }
  }, {
    key: 'insertNewline',
    value: function insertNewline() {
      var $position = this.cursor.getPosition();
      if ($position && $position.tagName !== 'MATH' && $position.parentNode.tagName !== 'MATH') {
        return;
      }

      var $mspace = document.createElement('mspace');
      $mspace.setAttribute('linebreak', 'newline');
      this.insert($mspace);
    }
  }, {
    key: 'moveCursorLeft',
    value: function moveCursorLeft() {
      return this.cursor.moveLeft();
    }
  }, {
    key: 'moveCursorRight',
    value: function moveCursorRight() {
      return this.cursor.moveRight();
    }

    /**
     * @param {String} type 
     * @param {Function} listener
     */

  }, {
    key: 'on',
    value: function on(type, listener) {
      return this.emitter.on(type, listener);
    }
  }, {
    key: 'focus',
    value: function focus() {
      return this.$input.focus();
    }
  }]);

  return Editor;
}();

exports.default = Editor;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addClass = __webpack_require__(1);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(2);

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blinker = function () {
  /**
   * @param {HTMLElement} $caret  
   */
  function Blinker($caret) {
    var _this = this;

    _classCallCheck(this, Blinker);

    this.$caret = $caret;
    this.freezeDuration = 500;
    this.blinkDuration = 500;

    this.id = setInterval(function () {
      if (_this.$caret.style.display !== 'block') {
        return;
      }
      _this.$caret.style.opacity = _this.$caret.style.opacity === '0' ? '1' : '0';
    }, this.blinkDuration);

    this.prevFreezeId = null;
  }

  _createClass(Blinker, [{
    key: 'destroy',
    value: function destroy() {
      clearInterval(this.id);
    }
  }, {
    key: 'freeze',
    value: function freeze() {
      var _this2 = this;

      clearInterval(this.prevFreezeId);
      (0, _addClass2.default)(this.$caret, 'is-freezed');
      this.prevFreezeId = setTimeout(function () {
        (0, _removeClass2.default)(_this2.$caret, 'is-freezed');
      }, this.freezeDuration);
    }
  }]);

  return Blinker;
}();

exports.default = Blinker;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _px = __webpack_require__(8);

var _px2 = _interopRequireDefault(_px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function () {
  /**
   * @param {Tree} tree 
   * @param {Rendered} rendered 
   * @param {HTMLElement} $caret
   */
  function Cursor(tree, rendered, $caret) {
    _classCallCheck(this, Cursor);

    /** @type {Tree} */
    this.tree = tree;
    /** @type {Rendered} */
    this.rendered = rendered;
    /** @type {HTMLElement} */
    this.$caret = $caret;
    /** @type {HTMLElement} */
    this.$position = null;
  }

  /**
   * @return {ClientRect}
   */


  _createClass(Cursor, [{
    key: 'getCaretBounding',
    value: function getCaretBounding() {
      return this.$caret.getBoundingClientRect();
    }

    /**
     * @return {HTMLElement}
     */

  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.$position;
    }

    /**
     * @param {HTMLElement} $position  
     * 
     * @return {this}
     */

  }, {
    key: 'setPosition',
    value: function setPosition($position) {
      this.$position = $position;
      return this;
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      if (!this.$position) {
        return this.update();
      }
      var path = this.tree.getPath();
      var index = path.indexOf(this.$position);
      this.$position = path[index - 1];
      this.update();
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      var path = this.tree.getPath();
      if (!this.$position) {
        var $first = path[1];
        if ($first.tagName !== 'MATH') {
          this.$position = $first;
        }
      } else {
        var index = path.indexOf(this.$position);
        var $next = path[index + 1];
        var isMath = $next.tagName === 'MATH';
        var isParent = this.$position.parentNode === $next;
        if ($next && !(isMath && isParent)) {
          this.$position = $next;
        }
      }
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var element = this.rendered.findElement(this.$position);
      var position = element.getCaretPosition();
      position.$parent.appendChild(this.$caret);
      this.$caret.style.top = (0, _px2.default)(position.top);
      this.$caret.style.left = (0, _px2.default)(position.left);
      this.$caret.style.height = (0, _px2.default)(position.height);
    }
  }]);

  return Cursor;
}();

exports.default = Cursor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = px;
/**
 * @param {Number} value
 */
function px(value) {
  return value + "px";
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CursorMover = function () {
  function CursorMover(tree, rendered, cursor) {
    _classCallCheck(this, CursorMover);

    /** @type {Tree} */
    this.tree = tree;
    /** @type {Rendered} */
    this.rendered = rendered;
    /** @type {Cursor} */
    this.cursor = cursor;
  }

  _createClass(CursorMover, [{
    key: 'click',
    value: function click(x, y) {
      var shortest = Infinity;
      var $set = null;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.rendered.getLines()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;

          if (!line.betweenYAxis(y)) {
            continue;
          }
          if (!line.betweenXAxis(x)) {
            if (x > line.x2) {
              return this.cursor.setPosition(line.getLastElement().getElement()).update();
            } else {
              return this.cursor.setPosition(line.getFirstElement().getElement()).update();
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.tree.getPath()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var $el = _step2.value;

          if ($el && $el.tagName === 'MATH') {
            continue;
          }

          this.cursor.setPosition($el).update();

          var bounding = this.cursor.getCaretBounding();
          var cx = bounding.left + bounding.width / 2;
          var cy = bounding.top + bounding.height / 2;
          var dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));

          if (shortest > dist) {
            shortest = dist;
            $set = $el;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.cursor.setPosition($set).update();
    }
  }]);

  return CursorMover;
}();

exports.default = CursorMover;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.listeners = {};
  }

  /**
   * @param {String} type 
   * @param {Function} listener 
   */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(type, listener) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(listener);
    }

    /**
     * 
     * @param {String} type 
     * @param {...*} rest 
     */

  }, {
    key: "emit",
    value: function emit(type) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (!this.listeners[type]) {
        return;
      }
      this.listeners[type].forEach(function (listener) {
        return listener.apply(undefined, rest);
      });
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = __webpack_require__(12);

var _element2 = _interopRequireDefault(_element);

var _line = __webpack_require__(14);

var _line2 = _interopRequireDefault(_line);

var _toArray = __webpack_require__(0);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rendered = function () {
  /**
   * @param {HTMLElement} $display
   * @param {Tree} tree
   */
  function Rendered($display, tree) {
    _classCallCheck(this, Rendered);

    /** @type {HTMLElement} */
    this.$display = $display;
    /** @type {Tree} */
    this.tree = tree;
    /** @type {Array} */
    this.elements = [];
    /** @type {Array} */
    this.lines = [];
  }

  /**
   * @return {Array}
   */


  _createClass(Rendered, [{
    key: 'getLines',
    value: function getLines() {
      return this.lines;
    }

    /**
     * @return {Array}
     */

  }, {
    key: 'getElements',
    value: function getElements() {
      return this.elements;
    }

    /**
     * @return {Array}
     */

  }, {
    key: 'findRenderedLines',
    value: function findRenderedLines() {
      var blocks = (0, _toArray2.default)(this.$display.querySelectorAll('.mjx-block'));
      if (!blocks.length) {
        return [this.$display.querySelector('.mjx-math')];
      }
      return blocks.map(function ($block) {
        return $block.firstElementChild;
      });
    }

    /**
     * @param {HTMLElement} $el
     * 
     * @return {HTMLElement}
     */

  }, {
    key: 'findRenderedElement',
    value: function findRenderedElement($el) {
      if (!$el) {
        return null;
      }
      var id = $el.getAttribute('id');
      return this.$display.querySelector('#' + id);
    }

    /**
     * @param {HTMLElement} $el
     * 
     * @return {Element}
     */

  }, {
    key: 'findElement',
    value: function findElement($el) {
      return this.elements.find(function (element) {
        return element.$el === $el;
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var lineIndex = 0;
      var renderedLines = this.findRenderedLines();
      var lines = [new _line2.default()];
      this.lines = [];
      this.elements = [];

      lines[lineIndex].setRendered(renderedLines[lineIndex]);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tree.getPath()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var $el = _step.value;

          var line = lines[lineIndex];
          var $rendered = this.findRenderedElement($el);
          var element = new _element2.default($el, $rendered);

          if ($el && $el.tagName === 'MSPACE') {
            line = new _line2.default();
            lineIndex += 1;
            line.setRendered(renderedLines[lineIndex]);
            lines.push(line);
          }

          element.rendered = this;
          element.line = line;
          line.elements.push(element);
          this.elements.push(element);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.lines = lines;
    }
  }]);

  return Rendered;
}();

exports.default = Rendered;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hasClass = __webpack_require__(13);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
  /**
   * @param {HTMLElement}  $el
   * @param {HTMLElement}  $rendered
   */
  function Element($el, $rendered) {
    _classCallCheck(this, Element);

    /** @type {HTMLElement} */
    this.$el = $el;
    /** @type {HTMLElement} */
    this.$rendered = $rendered;
    /** @type {Line} */
    this.line = null;
    /** @type {Rendered} */
    this.rendered = null;

    if ($rendered) {
      var bounding = $rendered.getBoundingClientRect();
      /** @type {Number} */
      this.width = bounding.width;
      /** @type {Number} */
      this.height = bounding.height;
      /** @type {Number} */
      this.x1 = bounding.left;
      /** @type {Number} */
      this.x2 = bounding.right;
      /** @type {Number} */
      this.y1 = bounding.top;
      /** @type {Number} */
      this.y2 = bounding.bottom;
      /** @type {Number} */
      this.cx = this.x1 + this.width / 2;
      /** @type {Number} */
      this.cy = this.y1 + this.height / 2;
      /** @type {Number} */
      this.top = $rendered.offsetTop;
      /** @type {Number} */
      this.left = $rendered.offsetLeft;
    }
  }

  /**
   * @return {HTMLElement}
   */


  _createClass(Element, [{
    key: 'getElement',
    value: function getElement() {
      return this.$el;
    }

    /**
     * @return {String}
     */

  }, {
    key: 'getTagName',
    value: function getTagName() {
      if (!this.$el) {
        return 'NULL';
      }
      return this.$el.tagName;
    }

    /**
     * @param {String} tag 
     * 
     * @return {Boolean}
     */

  }, {
    key: 'isTagName',
    value: function isTagName(tag) {
      return this.getTagName() === tag;
    }

    /**
     * @return {Boolean}
     */

  }, {
    key: 'hasChildren',
    value: function hasChildren() {
      return !!this.$el.children.length;
    }

    /**
     * @return {Null|HTMLElement}
     */

  }, {
    key: 'getLastChild',
    value: function getLastChild() {
      return this.$el.children[this.$el.children.length - 1];
    }

    /**
     * @return {Object}
     */

  }, {
    key: 'getCaretPosition',
    value: function getCaretPosition() {
      if (!this.$el) {
        return {
          top: this.line.top,
          left: this.line.left,
          height: this.line.height,
          $parent: this.line.$rendered.parentNode
        };
      }
      var height = this.line.height;
      if (this.isTagName('MROW')) {
        height = this.height;
      } else if (this.$el.parentNode.tagName === 'MROW') {
        var parent = this.rendered.findElement(this.$el.parentNode);
        height = parent.$rendered.clientHeight;
      }
      return {
        top: Math.max(this.top - Math.max(height - this.height, 0), 0),
        left: this.left + (!this.isTagName('MROW') ? this.width : 0),
        height: height,
        $parent: this.$rendered.parentNode
      };
    }
  }]);

  return Element;
}();

exports.default = Element;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
/**
 * @param {HTMLElement} $el  
 * @param {String} name 
 */
function hasClass($el, name) {
  return $el.classList.contains(name);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
  function Line() {
    _classCallCheck(this, Line);

    /** @type {Array} */
    this.elements = [];
    /** @type {HTMLElement} */
    this.$rendered = null;
    /** @type {Number} */
    this.width = null;
    /** @type {Number} */
    this.left = null;
    /** @type {Number} */
    this.x1 = null;
    /** @type {Number} */
    this.x2 = null;
    /** @type {Number} */
    this.y1 = null;
    /** @type {Number} */
    this.y2 = null;
    /** @type {Number} */
    this.left = null;
    /** @type {Number} */
    this.top = null;
  }

  /**
   * @param {HTMLElement} $rendered
   */


  _createClass(Line, [{
    key: 'setRendered',
    value: function setRendered($rendered) {
      var bounding = $rendered.getBoundingClientRect();
      this.width = bounding.width;
      this.height = bounding.height;
      this.x1 = bounding.left;
      this.x2 = bounding.right;
      this.y1 = bounding.top;
      this.y2 = bounding.bottom;
      this.left = $rendered.offsetLeft;
      this.top = $rendered.offsetTop;
      this.$rendered = $rendered;
    }

    /**
     * @return {Element}
     */

  }, {
    key: 'getFirstElement',
    value: function getFirstElement() {
      return this.elements[0];
    }

    /**
     * @return {Element}
     */

  }, {
    key: 'getLastElement',
    value: function getLastElement() {
      var element = void 0;
      var i = this.elements.length - 1;
      while (element = this.elements[i--]) {
        if (!element.isTagName('MATH')) {
          return element;
        }
      }
      return null;
    }

    /**
     * @param {Number} y
     */

  }, {
    key: 'betweenYAxis',
    value: function betweenYAxis(y) {
      return y > this.y1 && y < this.y2;
    }

    /**
     * @param {Number} x
     */

  }, {
    key: 'betweenXAxis',
    value: function betweenXAxis(x) {
      return x > this.x1 && x < this.x2;
    }
  }]);

  return Line;
}();

exports.default = Line;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _toArray = __webpack_require__(0);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  /**
   * @param {HTMLElement} $value  
   */
  function Tree($value) {
    _classCallCheck(this, Tree);

    this.$value = $value;
    this.path = [];
    this.nextId = 0;

    this.update();
  }

  /**
   * @param {HTMLElement} $value
   * 
   * @return {Tree}
   */


  _createClass(Tree, [{
    key: 'setValue',
    value: function setValue($value) {
      this.$value = $value;
      return this;
    }

    /**
     * @return {Array}
     */

  }, {
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      this.path = [null];

      var walk = function walk($el) {
        var children = (0, _toArray2.default)($el.children);

        if (!$el.hasAttribute('id')) {
          $el.setAttribute('id', 'mje' + _this.nextId++);
        }

        _this.path.push($el);

        children.forEach(function ($child) {
          return walk($child);
        });

        if (children.length && $el.tagName !== 'MROW') {
          var index = _this.path.indexOf($el);
          _this.path.splice(index, 1);
          _this.path.push($el);
        }
      };

      walk(this.$value);
    }
  }]);

  return Tree;
}();

exports.default = Tree;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = append;
function append($parent, $child) {
  $parent.appendChild($child);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendElementAfter;
/**
 * @param {HTMLElement} $ref  
 * @param {HTMLElement} $new 
 */
function appendElementAfter($ref, $new) {
  return $ref.parentNode.insertBefore($new, $ref.nextSibling);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyDelete;
/**
 * @param {HTMLElement}  
 * @param {Cursor} cursor 
 */
function applyDelete($value, cursor) {
  var $position = cursor.getPosition();
  if (!$position) {
    $value.removeChild($value.firstElementChild);
  } else if (!$position.nextElementSibling) {
    var $parent = $position.parentNode;
    if ($parent.tagName === 'MROW') {
      cursor.setPosition($parent.parentNode.previousElementSibling);
      $parent.parentNode.parentNode.removeChild($parent.parentNode);
    } else {
      $parent.parentNode.removeChild($parent);
    }
  } else {
    $position.parentNode.removeChild($position.nextElementSibling);
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyBackspace;
/**
 * @param {HTMLElement}  
 * @param {Cursor} cursor 
 */
function applyBackspace($value, cursor) {
  var $position = cursor.getPosition();

  if (!$position) {
    return;
  }
  if ($position.tagName === 'MROW') {
    var $parent = $position.parentNode;
    var $previous = $parent.previousElementSibling;
    $parent.parentNode.removeChild($parent);
    cursor.setPosition($previous);
  } else {
    if ($position.previousElementSibling) {
      cursor.setPosition($position.previousElementSibling);
    } else if ($position.parentNode.tagName === 'MROW') {
      cursor.setPosition($position.parentNode);
    } else {
      cursor.setPosition($position.parentNode.previousElementSibling);
    }
    $position.parentNode.removeChild($position);
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;
function createElement(tagName) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var $el = document.createElement(tagName);
  $el.className = className;
  return $el;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTextarea;
/**
 * @param {String|Node} selectors
 * 
 * @return {Node}
 */
function findTextarea(selectors) {
  var $node = typeof selectors === 'string' ? document.querySelector(selectors) : selectors.nodeType === 1 ? selectors : null;

  if (!$node) {
    throw new ReferenceError('MathjaxEditor: Target TEXTAREA was not found.');
  }

  if ($node.tagName !== 'TEXTAREA') {
    throw new TypeError('MathjaxEditor: Target element must be a TEXTAREA.');
  }

  return $node;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = getJaxElement;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JaxElement = function () {
  /**
   * @param {MathjaxJaxElement} jax
   */
  function JaxElement(jax) {
    _classCallCheck(this, JaxElement);

    /** @type {MathjaxJaxElement} */
    this.jax = jax;
    /** @type {String} */
    this.value = '';
  }

  /**
   * @param {String} value 
   * 
   * @return {JaxElement}
   */


  _createClass(JaxElement, [{
    key: 'setValue',
    value: function setValue(value) {
      this.value = value;
      return this;
    }

    /**
     * @return {Promise}
     */

  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.jax.Text(_this.value, function () {
          return resolve();
        });
      });
    }
  }]);

  return JaxElement;
}();

/**
 * @param {Node} $node
 * @param {Function} callback
 * 
 * @return {Void}
 */


function getJaxElement($node, callback) {
  var placeholder = '<math><mo>...</mo></math>';

  return new Promise(function (resolve) {
    MathJax.Hub.Config({
      displayAlign: "left"
    });
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $node, function () {
      var jax = MathJax.Hub.getAllJax($node)[0];
      jax.Text(placeholder, function () {
        return resolve(new JaxElement(jax));
      });
    }]);
  });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hideElement;
function hideElement($el) {
  $el.style.display = 'none';
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listenElement;
/**
 * @param {HTMLElement} $el
 * @param {String} type
 * @param {Function} listener
 */
function listenElement($el, type, listener) {
  return $el.addEventListener(type, listener);
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showElement;
/**
 * @param {HTMLElement} $el  
 */
function showElement($el) {
  $el.style.display = 'block';
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDisplay;

var _toArray = __webpack_require__(0);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {HTMLElement} $value
 * @param {String} [placeholder] 
 */
function toDisplay($value) {
  var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var $clone = $value.cloneNode(true);

  if (!$clone.children.length) {
    $clone.innerHTML = '<mtext class="mathjax-editor-placeholder">' + placeholder + '</mtext>';
  }

  (0, _toArray2.default)($clone.querySelectorAll('mrow')).forEach(function ($mrow) {
    if ($mrow.children.length) {
      if ($mrow.parentNode.tagName === 'MSQRT') {
        var $mspace = document.createElement('mspace');
        $mspace.setAttribute('width', 'thinmathspace');
        $mspace.className = 'mathjax-editor-helper';
        $mrow.appendChild($mspace);
      }
    } else {
      var $mo = document.createElement('mo');
      $mo.className = 'mathjax-editor-placeholder';
      $mo.innerHTML = '?';
      $mrow.appendChild($mo);
    }
  });

  (0, _toArray2.default)($clone.querySelectorAll('mspace')).forEach(function ($mspace) {
    if ($mspace.getAttribute('linebreak') !== 'newline') {
      return;
    }

    var $previous = $mspace.previousElementSibling;
    var $next = $mspace.nextElementSibling;
    var $mo = document.createElement('mo');
    $mo.className = 'mathjax-editor-newline-empty';
    $mo.innerHTML = '⏎';

    if (!$next || $next.tagName === 'MATH') {
      $mspace.parentNode.insertBefore($mo, $mspace.nextSibling);
    }

    if (!(!$previous || $previous.tagName === 'MSPACE')) {
      return;
    }
    $mspace.parentNode.insertBefore($mo.cloneNode(true), $mspace);
  });

  return $clone.outerHTML;
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '+': '+',
  '-': '-',
  '=': '=',
  '*': '&#x22C5;<!-- ⋅ -->',
  '/': '&#x00F7;<!-- ÷ -->',
  'div': '&#x00F7;<!-- ÷ -->',
  'times': '&#x00D7;<!-- × -->',
  'cdot': '&#x22C5;<!-- ⋅ -->',
  'pm': '&#x00B1;<!-- ± -->'
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inArray;
/**
 * @param {Array} array 
 * @param {*} subject 
 */
function inArray(array, subject) {
  return array.indexOf(subject) !== -1;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _styles = __webpack_require__(30);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  if (!MathJax) {
    throw new Error('MathjaxEditor: MathJax is missing.');
  }

  MathJax.Hub.processSectionDelay = 0;
  MathJax.Ajax.Styles(_styles2.default);
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '.mathjax-editor-input': {
    'left': '-100%',
    'position': 'absolute',
    'top': '-100%'
  },

  '.mathjax-editor-container': {
    'position': 'relative'
  },

  '.mathjax-editor-display': {
    'background-color': '#fff',
    'cursor': 'text',
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },

  '.mathjax-editor-display .mjx-chtml': {
    'outline': 'none !important'
  },

  '.mathjax-editor-caret': {
    'background-color': '#000',
    'position': 'absolute',
    'width': '1px'
  },

  '.mathjax-editor-caret.is-freezed': {
    'opacity': '1 !important'
  },

  '.mathjax-editor-newline-empty': {
    'opacity': 0.2
  },

  '.mathjax-editor-placeholder': {
    'color': '#ccc'
  }
};

/***/ })
/******/ ])["default"];
});