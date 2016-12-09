/*!
 * 
 * MathJax Editor
 * https://github.com/ianlucas/mathjax-editor
 * 
 * (c) 2016, Ian Lucas.
 * Released under the MIT license
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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Editor = __webpack_require__(1);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _extendMathJax = __webpack_require__(3);

	var _extendMathJax2 = _interopRequireDefault(_extendMathJax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.addEventListener('load', _extendMathJax2.default);

	/**
	 * This is the MathJaxEditor class.
	 * 
	 * It has an API on top of the Editor class.
	 */

	var MathJaxEditor = function () {
	  /**
	   * Creates an instance of Editor.
	   * 
	   * @constructor
	   */
	  function MathJaxEditor(options) {
	    _classCallCheck(this, MathJaxEditor);

	    var editor = new _Editor2.default(options);

	    this.editor = editor;
	    this.version = '1.0.3';
	  }

	  /**
	   * Blur the editor.
	   * 
	   * @return {Void}
	   */


	  _createClass(MathJaxEditor, [{
	    key: 'blur',
	    value: function blur() {
	      this.editor.blur();
	    }

	    /**
	     * Focus the editor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.editor.focus();
	    }

	    /**
	     * This inserts a command into the editor.
	     * 
	     * @param {String} command
	     * @param {Number} blockCount
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      this.editor.insertCommand(command, blockCount);
	    }

	    /**
	     * Get editor's jax.
	     * 
	     * @return {String}
	     */

	  }, {
	    key: 'getJax',
	    value: function getJax() {
	      return this.editor.value;
	    }
	  }]);

	  return MathJaxEditor;
	}();

	module.exports = MathJaxEditor;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KEY_BACKSPACE = 8;
	var KEY_ENTER = 13;
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var KEY_DELETE = 46;

	var Editor = function () {
	  /**
	   * This is the main class of the Editor.
	   * 
	   * It contains all methods to deal with the cursor and math input.
	   * It accepts an object as first argument, which must contain the options.
	   * 
	   * @param {Object} options
	   * @param {DOMElement|String} options.el - The DOM Element itself or a string selector.
	   * @param {Boolean} options.debug - Set debug mode.
	   * @param {String} options.focusClass - Which class to use to identify focus.
	   * 
	   * @constructor
	   */
	  function Editor(_ref) {
	    var _this = this;

	    var el = _ref.el,
	        _ref$debug = _ref.debug,
	        debug = _ref$debug === undefined ? false : _ref$debug,
	        _ref$focusClass = _ref.focusClass,
	        focusClass = _ref$focusClass === undefined ? 'isFocused' : _ref$focusClass;

	    _classCallCheck(this, Editor);

	    var Element = MathJax.HTML.Element;

	    var $el = (0, _utils.mustFindElement)(el);
	    var $container = Element('div', { className: 'mj-ed-container' });
	    var $input = Element('input', { className: 'mj-ed-input' });
	    var $display = Element('div', { className: 'mj-ed-display' }, ['\\(\\cursor\\)']);
	    var $debug = Element('pre', { className: 'mj-ed-debug' }, ['|']);

	    $el.parentNode.replaceChild($container, $el);
	    $container.appendChild($input);
	    $container.appendChild($display);
	    $container.appendChild($debug);

	    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
	    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
	    $input.addEventListener('blur', this.blur.bind(this));
	    $display.addEventListener('click', this.focus.bind(this));

	    $display.style.opacity = 0;
	    $debug.style.display = debug ? 'block' : 'none';

	    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $display], function () {
	      _this.jaxElement = MathJax.Hub.getAllJax($display)[0];
	    }, function () {
	      $display.style.opacity = 1;
	      $display.style.minHeight = $display.offsetHeight + 'px';
	      _this.updateCursorElement({ hidden: true });
	    });

	    this.$container = $container;
	    this.$debug = $debug;
	    this.$display = $display;
	    this.$input = $input;
	    this.cursor = 0;
	    this.debug = debug;
	    this.focusClass = focusClass;
	    this.value = '';
	  }

	  /**
	   * This will update `this.$display`'s jax. Also will update `this.$debug`
	   * inner HTML if the options.debug is enabled.
	   * 
	   * @param {String} value - Jax to be used. It defaults to the editor's value.
	   * 
	   * @return {Void}
	   */


	  _createClass(Editor, [{
	    key: 'update',
	    value: function update() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;

	      var cursor = this.cursor;

	      if (this.debug) {
	        this.$debug.innerHTML = (0, _utils.insertBetween)(value, cursor, '|');
	      }

	      this.updateJaxElement((0, _utils.insertBetween)(value, cursor, '{\\cursor}'), this.updateCursorElement.bind(this));
	    }

	    /**
	     * Updates the Jax Element inside of `this.display`.
	     * 
	     * @param {String} jax
	     * @param {Function} callback
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'updateJaxElement',
	    value: function updateJaxElement(jax) {
	      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Function;

	      MathJax.Hub.Queue(['Text', this.jaxElement, jax], callback);
	    }

	    /**
	     * This updates the cursor position based on the amount
	     * of movement is given.
	     * 
	     * PS: The meaning of the variable `next` is not the next index,
	     *     but the next value the cursor will hold.
	     * 
	     * @param {Number} amount
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'updateCursor',
	    value: function updateCursor() {
	      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      var next = this.cursor + amount;
	      var current = this.cursor;
	      var value = this.value;
	      var length = value.length;

	      // Moving to the left.

	      if (amount < 0) {
	        if (value[next] === '{' && value[next - 1] !== '}') {
	          var i = next;
	          while (i--) {
	            if (value[i] === '\\') {
	              break;
	            }
	          }
	          next = i;
	        }

	        if (value[next - 1] === '}') {
	          next -= 1;
	        }

	        if (value[next] === '\\' && value[next - 1] === '\\') {
	          next -= 1;
	        }

	        if (value[next] === ' ') {
	          var _i = next;
	          while (_i--) {
	            if (value[_i] === '\\') {
	              break;
	            }
	          }
	          next = _i;
	        }
	      }

	      // Moving to the right.

	      if (amount > 0) {
	        if (value[current] === '\\' && value[next] !== '\\') {
	          var _i2 = current;
	          while (_i2++ < length) {
	            if (value[_i2] === '{') {
	              break;
	            }

	            if (value[_i2] === ' ') {
	              _i2 += 1;
	              break;
	            }
	          }
	          next = _i2;
	        }

	        if (value[next] === '{') {
	          next += 1;
	        }

	        if (value[current] === '\\' && value[next] === '\\') {
	          next += 1;
	        }
	      }

	      this.cursor = next;
	      this.update();
	    }

	    /**
	     * Update the cursor element.
	     * 
	     * @param {Object} options
	     * @param {Boolean} options.hidden
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'updateCursorElement',
	    value: function updateCursorElement() {
	      var _this2 = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var hidden = options.hidden || false;

	      MathJax.Hub.Queue(function () {
	        var $cursor = _this2.$display.querySelector('.mjx-cursor');
	        if (!$cursor) {
	          return;
	        }
	        if (!$cursor.style.marginLeft) {
	          $cursor.style.marginLeft = '-' + $cursor.offsetWidth + 'px';
	        }
	        $cursor.style.display = hidden ? 'none' : 'inline-block';
	      });
	    }

	    /**
	     * Find a jax command at given position.
	     * 
	     * For instance, consider this as the current value of the editor:
	     * 
	     *     '\sqrt{2}'
	     * 
	     * If the given position is the index of any character of the
	     * command '\sqrt', it will return the start and the end of the
	     * command.
	     * 
	     * @param {Number} position
	     * 
	     * @return {Object}
	     */

	  }, {
	    key: 'findCommandAt',
	    value: function findCommandAt(position) {
	      var coordinates = { start: null, end: null };
	      var value = this.value;
	      var length = value.length;
	      var previous = position - 1;
	      var next = position + 1;
	      var i = void 0;

	      i = next;

	      while (i--) {
	        if (value[i] === '\\') {
	          coordinates.start = i;
	          break;
	        }
	      }

	      i = previous;

	      while (i++ < value.length) {
	        if (value[i] === '}' && value[i + 1] !== '{') {
	          coordinates.end = i;
	          break;
	        }

	        if (value[i - 1] === ' ') {
	          coordinates.end = i - 1;
	          break;
	        }
	      }

	      if (coordinates.end === null) {
	        coordinates.end = i;
	      }

	      return coordinates;
	    }

	    /**
	     * This will handle the events of `this.$input`.
	     * It captures the key pressed and what the user have typed.
	     * 
	     * @param {KeyboardEvent} e
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'handleInputEvent',
	    value: function handleInputEvent(e) {
	      var _this3 = this;

	      var $input = this.$input;
	      var inputValue = $input.value.trim();
	      var which = e.keyCode;

	      $input.value = '';

	      if (e.type === 'keyup') {
	        which = null;
	      }

	      if (!inputValue.length) {
	        return this.handleInput(which);
	      }

	      var translate = {
	        '+': '+',
	        '-': '-',
	        '=': '=',
	        '*': '\\cdot ',
	        '/': '\\div '
	      };

	      var test = {
	        char: /[\d\w]/
	      };

	      inputValue.split('').forEach(function (char) {
	        if (!char.match(test.char) && !translate[char]) {
	          return;
	        }

	        if (translate[char]) {
	          char = translate[char];
	        }

	        _this3.handleInput(which, char);
	      });
	    }

	    /**
	     * Handles the user input.
	     * 
	     * @param {Number} which - Which key was pressed.
	     * @param {String} char - The character that was typed.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'handleInput',
	    value: function handleInput(which, char) {
	      switch (which) {
	        case KEY_LEFT:
	          if (this.cursor > 0) {
	            this.updateCursor(-1);
	          }
	          return;

	        case KEY_RIGHT:
	          if (this.cursor < this.value.length) {
	            this.updateCursor(1);
	          }
	          return;

	        case KEY_BACKSPACE:
	          this.erase();
	          return;

	        case KEY_DELETE:
	          this.delete();
	          return;

	        case KEY_ENTER:
	          this.insert('\\\\');
	          return;
	      }

	      if (which && this.debug) {
	        console.warn('The key ' + which + ' was pressed.');
	      }

	      if (!char) {
	        return;
	      }

	      this.insert(char);
	    }

	    /**
	     * Focus the editor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.$input.focus();
	      this.updateCursorElement({ hidden: false });
	      (0, _utils.addClass)(this.$display, this.focusClass);
	    }

	    /**
	     * Blur the editor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'blur',
	    value: function blur() {
	      this.$input.blur();
	      this.updateCursorElement({ hidden: true });
	      (0, _utils.removeClass)(this.$display, this.focusClass);
	    }

	    /**
	     * Insert a piece of text in editor's value.
	     * 
	     * @param {String} value
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insert',
	    value: function insert(value) {
	      var cursor = this.cursor;
	      var current = this.value;

	      if (cursor === -1) {
	        this.value = value + current;
	        this.cursor += value.length;
	        return this.update();
	      }

	      this.cursor += value.length;
	      this.value = (0, _utils.insertBetween)(current, cursor, value);

	      this.update();
	    }

	    /**
	     * Inserts a command in the editor.
	     * 
	     * The cursor will moved to the first "block" ({}).
	     * 
	     * @param {String} command - The command.
	     * @param {Number} blockCount - The quantity of blocks it requires.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      this.focus();

	      if (blockCount > 0) {
	        command += '{';
	      } else {
	        command += ' ';
	      }

	      this.insert(command);

	      if (blockCount < 1) {
	        return;
	      }

	      var value = this.value;
	      var cursor = this.cursor;
	      var blocks = '}' + '{}'.repeat(blockCount - 1);

	      this.value = (0, _utils.insertBetween)(value, cursor, blocks);
	      this.update();
	    }

	    /**
	     * Erases the character before the cursor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'erase',
	    value: function erase() {
	      var current = this.cursor;
	      var previous = this.cursor - 1;
	      var value = this.value;

	      var before = void 0;
	      var after = void 0;

	      // Check if we are erasing a command.
	      if (~['{', '}', ' '].indexOf(value[previous])) {
	        var coordinates = this.findCommandAt(current);
	        before = value.slice(0, coordinates.start);
	        after = value.slice(coordinates.end + 1);
	      } else {
	        var beforeIndex = current - 1;

	        // Check if we are erasing a new line.
	        if (value[previous] === '\\' && value[previous - 1] === '\\') {
	          beforeIndex -= 1;
	        }

	        before = value.slice(0, beforeIndex);
	        after = value.slice(current);
	      }

	      this.value = before + after;
	      this.cursor = before.length;

	      this.update();
	    }

	    /**
	     * Erases the character before the cursor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'delete',
	    value: function _delete() {
	      var current = this.cursor;
	      var next = this.cursor + 1;
	      var value = this.value;

	      var before = void 0;
	      var after = void 0;

	      // Check if we are erasing a command (and not a new line).
	      if (value[current] === '\\' && value[next] !== '\\' || value[current] === '}') {
	        var coordinates = this.findCommandAt(current);
	        before = value.slice(0, coordinates.start);
	        after = value.slice(coordinates.end + 1);
	      } else {
	        var beforeIndex = current;
	        var afterIndex = next;

	        // Check if we are erasing a new line.
	        if (value[current] === '\\' && value[next] === '\\') {
	          afterIndex += 1;
	        }

	        before = value.slice(0, beforeIndex);
	        after = value.slice(afterIndex);
	      }

	      this.value = before + after;
	      this.cursor = before.length;

	      this.update();
	    }
	  }]);

	  return Editor;
	}();

	exports.default = Editor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mustFindElement = mustFindElement;
	exports.insertBetween = insertBetween;
	exports.removeClass = removeClass;
	exports.addClass = addClass;
	/**
	 * Tries to find the specified element. If it fails, an error is thrown.
	 * 
	 * @param {DOMElement|string} el - An element or a selector.
	 * 
	 * @return {DOMElement}
	 */
	function mustFindElement(el) {
	  var error = new Error('You must define a target element.');

	  if (!el) {
	    throw error;
	  }

	  if (typeof el === 'string') {
	    var $el = document.querySelector(el);
	    if (!$el) {
	      throw error;
	    }
	    return $el;
	  }

	  // Yeah, we just assume an element was given...
	  return el;
	}

	/**
	 * Insert a text in the middle of the given string.
	 * 
	 * @param {String} string
	 * @param {Number} index
	 * @param {String} fragment
	 * 
	 * @return {String}
	 */
	function insertBetween(string, index, fragment) {
	  var before = string.slice(0, index);
	  var after = string.slice(index);
	  return before + fragment + after;
	}

	/**
	 * Remove a class of an element.
	 * 
	 * @param {DOMElement} $el
	 * @param {String} className
	 * 
	 * @return {Void}
	 */
	function removeClass($el, className) {
	  var classes = $el.className.split(' ');
	  var finalValue = '';

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var c = _step.value;

	      if (c !== className) {
	        finalValue += ' ' + c;
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

	  $el.className = finalValue;
	}

	/**
	 * Add a class to an element.
	 * 
	 * @param {DOMElement} $el
	 * @param {String} className
	 * 
	 * @return {Void}
	 */
	function addClass($el, className) {
	  var classes = $el.className.split(' ');
	  if (!~classes.indexOf(className)) {
	    $el.className += ' ' + className;
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extendMathJax;

	var _stylesheet = __webpack_require__(4);

	var _stylesheet2 = _interopRequireDefault(_stylesheet);

	var _utils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This will extend MathJax so that we can put our simple
	 * cursor there.
	 */
	function extendMathJax() {
	  var TEX = MathJax.InputJax.TeX;
	  var MML = MathJax.ElementJax.mml;

	  // This removes the pause (in milliseconds) between input and output 
	  // phases of MathJax's processing. So it looks seamless!
	  MathJax.Hub.processSectionDelay = 0;

	  MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
	    TEX.Definitions.Add({
	      macros: {
	        cursor: 'Cursor'
	      }
	    }, null, true);

	    MML.mcursor = MML.mbase.Subclass({
	      type: 'cursor',
	      isToken: true,
	      isSpacelike: function isSpacelike() {
	        return true;
	      },
	      texClass: MML.TEXCLASS.ORD,
	      defaults: {
	        mathvariant: MML.INHERIT,
	        mathsize: MML.INHERIT,
	        mathbackground: MML.INHERIT,
	        mathcolor: MML.INHERIT,
	        dir: MML.INHERIT
	      }
	    });

	    TEX.Parse.Augment({
	      Cursor: function Cursor(name) {
	        var $cursor = MML.mcursor('0');
	        this.Push($cursor);
	      }
	    });
	  });

	  /**
	   * Append our editor styles on the DOM.
	   * Maybe an external dependency with real CSS extension instead?
	   */

	  var $style = document.createElement('style');
	  $style.innerHTML = _stylesheet2.default;
	  document.head.appendChild($style);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = "\n.mjx-cursor {\n  -webkit-animation: 1s mj-ed-blink step-end infinite;\n  -moz-animation: 1s mj-ed-blink step-end infinite;\n  -ms-animation: 1s mj-ed-blink step-end infinite;\n  -o-animation: 1s mj-ed-blink step-end infinite;\n  animation: 1s mj-ed-blink step-end infinite;\n  border-right: 2px solid #000;\n  color: transparent;\n}\n\n.mj-ed-input {\n  left: -100%;\n  position: absolute;\n  top: -100%;\n}\n\n.mj-ed-display {\n  box-sizing: border-box;\n}\n\n@keyframes mj-ed-blink {\n  from, to {\n    border-color: black;\n  }\n  50% {\n    border-color: transparent;\n  }\n}\n\n@-moz-keyframes mj-ed-blink {\n  from, to {\n    border-color: transparent;\n  }\n  50% {\n    border-color: black;\n  }\n}\n\n@-webkit-keyframes mj-ed-blink {\n  from, to {\n    border-color: transparent;\n  }\n  50% {\n    border-color: black;\n  }\n}\n\n@-ms-keyframes mj-ed-blink {\n  from, to {\n    border-color: transparent;\n  }\n  50% {\n    border-color: black;\n  }\n}\n\n@-o-keyframes mj-ed-blink {\n  from, to {\n    border-color: transparent;\n  }\n  50% {\n    border-color: black;\n  }\n}\n";

/***/ }
/******/ ])
});
;