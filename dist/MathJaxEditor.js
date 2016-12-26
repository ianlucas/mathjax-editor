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

	var _extendMathJax = __webpack_require__(6);

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

	    var core = new _Editor2.default(options);

	    this.core = core;
	    this.version = '1.2.1';
	  }

	  /**
	   * Blur the editor.
	   * 
	   * @return {Void}
	   */


	  _createClass(MathJaxEditor, [{
	    key: 'blur',
	    value: function blur() {
	      this.core.blur();
	    }

	    /**
	     * Focus the editor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.core.focus();
	    }

	    /**
	     * This inserts a command into the editor.
	     * 
	     * @param {String} command
	     * @param {Number} blockCount
	     * @param {Boolean} brackets
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var brackets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      this.core.insertCommand(command, blockCount, brackets);
	    }

	    /**
	     * Insert a character at cursor position.
	     * Allowed characters: 0-9 (numbers), a-z (variables).
	     * 
	     * @param {String} insert
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insert',
	    value: function insert(char) {
	      if (!char.match(/[0-9]/) && !char.match(/[a-z]/)) {
	        throw new RangeError('Only numbers and variables are allowed in insert, not "' + char + '".');
	      }
	      this.core.insert(char);
	    }

	    /**
	     * Insert a symbol at cursor position.
	     * 
	     * @param {String} symbol
	     */

	  }, {
	    key: 'insertSymbol',
	    value: function insertSymbol(symbol) {
	      var symbols = ['+', '-', '/', '=', '<', '>', ',', '.', ':', ';', '?', '(', ')', '[', ']', '%'];
	      var escape = ['%'];

	      if (!~symbols.indexOf(symbol)) {
	        throw new RangeError('"' + symbol + '" is not a valid symbol.');
	      }

	      if (!~escape.indexOf(symbol)) {
	        return this.core.insert(symbol);
	      }

	      this.core.insertCommand('\\' + symbol);
	    }

	    /**
	     * Get editor's value.
	     *  
	     * @return {String}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.core.value;
	    }

	    /**
	     * Move the cursor to the left.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'moveCursorLeft',
	    value: function moveCursorLeft() {
	      this.core.moveCursorLeft();
	    }

	    /**
	     * Move the cursor to the right.
	     * 
	     * @return {Void} 
	     */

	  }, {
	    key: 'moveCursorRight',
	    value: function moveCursorRight() {
	      this.core.moveCursorRight();
	    }

	    /**
	     * Erases the character before the cursor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'erase',
	    value: function erase() {
	      this.core.erase();
	    }

	    /**
	     * Listen to an event to be triggered by the Editor.
	     * 
	     * @param {String} type
	     * @param {Function} listener
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'on',
	    value: function on(type, listener) {
	      this.core.on(type, listener);
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

	var _EventBus = __webpack_require__(2);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var _Placer = __webpack_require__(3);

	var _Placer2 = _interopRequireDefault(_Placer);

	var _Tex = __webpack_require__(4);

	var _Tex2 = _interopRequireDefault(_Tex);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	   * @param {Boolean} options.newLine - Allow or disallow newline. (default is false)
	   * 
	   * @constructor
	   */
	  function Editor(_ref) {
	    var _this = this;

	    var el = _ref.el,
	        _ref$debug = _ref.debug,
	        debug = _ref$debug === undefined ? false : _ref$debug,
	        _ref$focusClass = _ref.focusClass,
	        focusClass = _ref$focusClass === undefined ? 'isFocused' : _ref$focusClass,
	        _ref$newLine = _ref.newLine,
	        newLine = _ref$newLine === undefined ? false : _ref$newLine,
	        _ref$value = _ref.value,
	        value = _ref$value === undefined ? '' : _ref$value;

	    _classCallCheck(this, Editor);

	    var Element = MathJax.HTML.Element;

	    var $el = (0, _utils.mustFindElement)(el);
	    var $container = Element('div', { className: 'mj-ed-container' });
	    var $input = Element('input', { className: 'mj-ed-input' });
	    var $display = Element('div', { className: 'mj-ed-display' }, ['\\({\\cursor}' + value + '\\)']);
	    var $debug = Element('pre', { className: 'mj-ed-debug' }, ['|']);

	    $el.parentNode.replaceChild($container, $el);
	    $container.appendChild($input);
	    $container.appendChild($display);
	    $container.appendChild($debug);

	    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
	    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
	    $input.addEventListener('blur', this.blur.bind(this));
	    $display.addEventListener('click', this.focus.bind(this));
	    document.body.addEventListener('click', this.handleBodyClick.bind(this));

	    $display.style.opacity = 0;
	    $debug.style.display = debug ? 'block' : 'none';

	    MathJax.Hub.Queue(function () {
	      return MathJax.Hub.Typeset($display);
	    }, function () {
	      return _this.jaxElement = MathJax.Hub.getAllJax($display)[0];
	    }, function () {
	      $display.style.opacity = 1;
	      $display.style.minHeight = $display.offsetHeight + 'px';
	      _this.update({ cursorHidden: true });
	    });

	    this.$container = $container;
	    this.$debug = $debug;
	    this.$display = $display;
	    this.$input = $input;
	    this.bus = new _EventBus2.default();
	    this.cursor = 0;
	    this.placer = null;
	    this.debug = debug;
	    this.focusClass = focusClass;
	    this.newLine = newLine;
	    this.tex = new _Tex2.default(value);
	    this.value = value;
	    this.lastValue = value;
	  }

	  /**
	   * This will update `this.$display`'s jax. Also will update `this.$debug`
	   * inner HTML if the options.debug is enabled.
	   * 
	   * @param {String} value - Jax to be used. It defaults to the editor's value.
	   * @param {Object} cursorOptions - Options to be passed to `updateCursorElement`.
	   * 
	   * @return {Void}
	   */


	  _createClass(Editor, [{
	    key: 'update',
	    value: function update() {
	      var _this2 = this;

	      var cursorOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var value = this.value;

	      if (value !== this.lastValue) {
	        this.tex = new _Tex2.default(value);
	      }

	      var cursor = this.cursor;
	      // TODO: Improve this ugh
	      var valueWithCursor = (0, _utils.insertBetween)(value, cursor, '{\\cursor}').replace(/\d/g, function (n) {
	        return '{' + n + '}';
	      }).replace(/\,/g, function (comma) {
	        return '{' + comma + '}';
	      }).replace(/\{\}/g, '{\\isEmpty}').replace(/\[\]/g, '[\\isEmpty]').replace(/\{\{\\cursor\}\}/g, '{{\\cursor}\\isEmpty}').replace(/\[\{\\cursor\}\]/g, '[{\\cursor}\\isEmpty]');

	      if (this.debug) {
	        this.$debug.innerHTML = (0, _utils.insertBetween)(value, cursor, '|');
	      }

	      this.updateJaxElement(valueWithCursor, function () {
	        setTimeout(function () {
	          var placer = new _Placer2.default(_this2);
	          placer.on('setCursor', function (cursor) {
	            _this2.debug && console.log('The cursor should be placed at ' + cursor + '.');
	            _this2.cursor = cursor;
	            _this2.update();
	          });
	          _this2.placer = placer;
	        }, 16);
	        _this2.updateCursorElement(cursorOptions);
	      });
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
	      var _this3 = this;

	      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Function;

	      MathJax.Hub.Queue(function () {
	        return _this3.jaxElement.Text(jax);
	      }, callback);
	    }

	    /**
	     * This updates the cursor position based on the amount
	     * of movement is given.
	     * 
	     * @param {Number} amount
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'updateCursor',
	    value: function updateCursor() {
	      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      var cursor = this.cursor;
	      var points = this.tex.cursorPoints;
	      var key = points.indexOf(cursor);

	      var to = cursor;

	      if (amount > 0) {
	        to = points[key + 1];
	      } else if (amount < 0) {
	        to = points[key - 1];
	      }

	      this.cursor = to;
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
	      var _this4 = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var hidden = options.cursorHidden || false;

	      MathJax.Hub.Queue(function () {
	        var $cursor = _this4.$display.querySelector('.mjx-cursor');
	        if (!$cursor) {
	          return;
	        }
	        if (!$cursor.style.marginLeft) {
	          $cursor.style.marginLeft = '-' + $cursor.offsetWidth + 'px';
	        }

	        // Fix #7
	        if (_this4._cursorRecentlyPlaced) {
	          clearTimeout(_this4._cursorRecentlyPlaced);
	        }
	        (0, _utils.addClass)($cursor, 'wasRecentlyPlaced');
	        _this4._cursorRecentlyPlaced = setTimeout(function () {
	          (0, _utils.removeClass)($cursor, 'wasRecentlyPlaced');
	        }, 600);

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
	        if (~['\\', '^', '_'].indexOf(value[i])) {
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
	      var _this5 = this;

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
	        ',': ',',
	        '.': '.',
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

	        _this5.handleInput(which, char);
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
	          this.moveCursorLeft();
	          return;

	        case KEY_RIGHT:
	          this.moveCursorRight();
	          return;

	        case KEY_BACKSPACE:
	          this.erase();
	          return;

	        case KEY_DELETE:
	          this.delete();
	          return;

	        case KEY_ENTER:
	          if (this.newLine) {
	            this.insert('\\\\');
	          }
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
	     * Move the cursor to the left.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'moveCursorLeft',
	    value: function moveCursorLeft() {
	      if (this.cursor > 0) {
	        this.updateCursor(-1);
	      }
	    }

	    /**
	     * Move the cursor to the right.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'moveCursorRight',
	    value: function moveCursorRight() {
	      if (this.cursor < this.value.length) {
	        this.updateCursor(1);
	      }
	    }

	    /**
	     * When document.body is clicked, this will check if the
	     * cursor can be moved.
	     * 
	     * @see Placer
	     * 
	     * @param {Event} e
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'handleBodyClick',
	    value: function handleBodyClick(e) {
	      if (!this.placer) {
	        return;
	      }

	      this.placer.trigger('click', e);
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
	      this.bus.trigger('focus');
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
	      this.bus.trigger('blur');
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

	      this.cursor += value.length;
	      this.lastValue = this.value;
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
	     * @param {Boolean} brackets - If brackets should be placed.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var brackets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      this.focus();

	      if (brackets) {
	        command += '[]';
	      }

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

	      this.lastValue = this.value;
	      this.value = (0, _utils.insertBetween)(value, cursor, blocks);
	      this.update();
	    }

	    /**
	     * Erases the character before the cursor.
	     * TODO: REFACTORE THIS
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
	     * TODO: REFACTORE THIS
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

	    /**
	     * Listen to an event to be triggered by Editor.
	     * 
	     * @param {String} type
	     * @param {Function} listener
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'on',
	    value: function on(type, listener) {
	      this.bus.on(type, listener);
	    }
	  }]);

	  return Editor;
	}();

	exports.default = Editor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventBus = function () {
	  /**
	   * This is a simple Event Bus to register/trigger events.
	   * 
	   * @constructor
	   */
	  function EventBus() {
	    _classCallCheck(this, EventBus);

	    this.registry = {};
	  }

	  /**
	   * Listen to an event to be triggered.
	   * 
	   * @param {String} type
	   * @param {Function} listener
	   * 
	   * @return {Void}
	   */


	  _createClass(EventBus, [{
	    key: "on",
	    value: function on(type, listener) {
	      this.registry[type] = (this.registry[type] || []).concat(listener);
	    }

	    /**
	     * Trigger an event.
	     * 
	     * @param {String} type
	     * @param {Mixed} ...rest
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: "trigger",
	    value: function trigger(type) {
	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }

	      if (this.registry[type]) {
	        this.registry[type].forEach(function (listener) {
	          return listener.apply(undefined, rest);
	        });
	      }
	    }
	  }]);

	  return EventBus;
	}();

	exports.default = EventBus;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _EventBus = __webpack_require__(2);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Placer = function () {
	  /**
	   * This will handle the cursor placement when the user clicks somewhere
	   * on the editor.
	   * 
	   * @param {Editor} editor
	   * 
	   * @constructor
	   */
	  function Placer(editor) {
	    _classCallCheck(this, Placer);

	    var bus = new _EventBus2.default();

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


	  _createClass(Placer, [{
	    key: 'on',
	    value: function on(type, listener) {
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

	  }, {
	    key: 'trigger',
	    value: function trigger(type) {
	      var _bus;

	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }

	      (_bus = this.bus).trigger.apply(_bus, [type].concat(rest));
	    }

	    /**
	     * Checks if the cursor must be moved, and if so,
	     * it triggers the event 'setCursor' with the position.
	     * 
	     * @param {Event} e
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      var _this = this;

	      var _$display$getBounding = this.$display.getBoundingClientRect(),
	          top = _$display$getBounding.top,
	          bottom = _$display$getBounding.bottom;

	      var x = e.clientX;
	      var y = e.clientY;
	      var intervals = this.intervals;
	      var index = this.tex.length;

	      if (!intervals.length || y > bottom || y < top) {
	        return false;
	      }

	      var found = false;

	      // First strategy: checks if the clicked point is inside a number/
	      // variable/operator bounding. If it is, place it where is proper.

	      intervals.forEach(function (interval, i) {
	        if (interval.startX <= x && x < interval.endX) {
	          if (interval.startY <= y && y < interval.endY) {
	            found = true;
	            index = _this.placeAtInterval(interval, i, x, y);
	          }
	        }
	      });

	      // Second strategy: find the nearest element to the clicked point.

	      if (!found) {
	        var _ret = function () {
	          var last = { interval: null, distance: null, i: null };

	          intervals.forEach(function (interval, i) {
	            if (!(interval.startY < y && y < interval.endY)) {
	              return;
	            }
	            var distance = Math.min(Math.abs(interval.startX - x), Math.abs(interval.endX - x));
	            if (last.distance === null || distance < last.distance) {
	              last.interval = interval;
	              last.distance = distance;
	              last.i = i;
	            }
	          });

	          if (!last.interval) {
	            return {
	              v: false
	            };
	          }

	          index = _this.placeAtInterval(last.interval, last.i, x, y);
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

	  }, {
	    key: 'getNextKeyFor',
	    value: function getNextKeyFor(type) {
	      this.findings[type] = this.findings[type] || 0;
	      var key = this.findings[type];
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

	  }, {
	    key: 'addInterval',
	    value: function addInterval(data) {
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

	  }, {
	    key: 'placeAtInterval',
	    value: function placeAtInterval(interval, i, x, y) {
	      var intervals = this.intervals;
	      var width = interval.endX - interval.startX;
	      var nextInterval = i + 1;

	      var index = interval.index;

	      if (interval.box) {
	        return index;
	      }

	      if (x > interval.startX + width / 2) {
	        if (intervals[nextInterval]) {
	          index = intervals[nextInterval].index;
	        } else {
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

	  }, {
	    key: 'iterate',
	    value: function iterate() {
	      var _this2 = this;

	      this.elements.forEach(function (element) {
	        switch (element.is) {
	          case 'command':
	            _this2.findCommand(element);
	            break;

	          default:
	            _this2.find(element);
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

	  }, {
	    key: 'find',
	    value: function find(_ref) {
	      var type = _ref.type,
	          index = _ref.index,
	          nearClosure = _ref.nearClosure;

	      var key = this.getNextKeyFor(type);
	      var $el = this.$display.querySelectorAll('.mjx-' + type)[key];
	      if (!$el) {
	        return console.log('COULD NOT FIND THIS ELEMENT', $el);
	      }

	      var _$el$getBoundingClien = $el.getBoundingClientRect(),
	          left = _$el$getBoundingClien.left,
	          right = _$el$getBoundingClien.right,
	          top = _$el$getBoundingClien.top,
	          bottom = _$el$getBoundingClien.bottom;

	      this.addInterval({
	        startX: left,
	        endX: right,
	        startY: top,
	        endY: bottom,
	        index: index
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

	  }, {
	    key: 'findCommand',
	    value: function findCommand(_ref2) {
	      var _this3 = this;

	      var type = _ref2.type,
	          index = _ref2.index,
	          props = _ref2.props;

	      var key = this.getNextKeyFor(type);
	      var $el = this.$display.querySelectorAll('.mjx-m' + type)[key];
	      var brackets = props.brackets,
	          blocks = props.blocks;


	      switch (type) {
	        case 'frac':
	          var $numerator = $el.querySelector('.mjx-numerator');
	          var $denominator = $el.querySelector('.mjx-denominator');
	          var numBounding = $numerator.getBoundingClientRect();
	          var denBounding = $denominator.getBoundingClientRect();
	          var boundings = [numBounding, denBounding];

	          boundings.forEach(function (_ref3, i) {
	            var left = _ref3.left,
	                right = _ref3.right,
	                top = _ref3.top,
	                bottom = _ref3.bottom;

	            if (blocks[i].closeIndex - blocks[i].openIndex === 1) {
	              _this3.addInterval({
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
	          if (brackets && brackets.closeIndex - brackets.openIndex === 1) {
	            var $root = $el.querySelector('.mjx-root .mjx-char');

	            var _$root$getBoundingCli = $root.getBoundingClientRect(),
	                left = _$root$getBoundingCli.left,
	                right = _$root$getBoundingCli.right,
	                top = _$root$getBoundingCli.top,
	                bottom = _$root$getBoundingCli.bottom;

	            this.addInterval({
	              index: brackets.closeIndex,
	              startX: left,
	              endX: right,
	              startY: top,
	              endY: bottom,
	              box: true
	            });
	          }
	          if (blocks[0].closeIndex - blocks[0].openIndex === 1) {
	            var $box = $el.querySelector('.mjx-box');

	            var _$box$getBoundingClie = $box.getBoundingClientRect(),
	                _left = _$box$getBoundingClie.left,
	                _right = _$box$getBoundingClie.right,
	                _top = _$box$getBoundingClie.top,
	                _bottom = _$box$getBoundingClie.bottom;

	            this.addInterval({
	              index: blocks[0].closeIndex,
	              startX: _left,
	              endX: _right,
	              startY: _top,
	              endY: _bottom,
	              box: true
	            });
	          }
	          break;
	      }
	    }
	  }]);

	  return Placer;
	}();

	exports.default = Placer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NEAR_CLOSURE_HAYSTACK = ['}', ']', '\\'];

	var test = {
	  isNumber: /[0-9]/,
	  isVariable: /[a-z]/,
	  isOperator: /[\+\-\=\,\.\[\]]/,
	  isEscapedOperator: /[\{\}]/
	};

	var Tex = function () {
	  /**
	   * This class will parse the given tex and produce `cursorPoints` (indexes)
	   * where cursor can be placed, and `elements` (that are passed to Placer).
	   * 
	   * @param {String} tex
	   * 
	   * @constructor
	   */
	  function Tex(tex) {
	    _classCallCheck(this, Tex);

	    this.tex = tex;
	    this.cursorPoints = [];
	    this.elements = [];
	    this.length = tex.length;

	    this.parse();
	  }

	  /**
	   * Parse the given tex.
	   * 
	   * @return {Void}
	   */


	  _createClass(Tex, [{
	    key: 'parse',
	    value: function parse() {
	      var cursorPoints = [];
	      var tex = this.tex;
	      var length = this.tex.length;
	      var i = 0;

	      for (; i < length; i++) {
	        var index = i;
	        var char = tex[index];
	        var nextChar = tex[index + 1];
	        var lastChar = tex[index - 1];
	        var nearClosure = (0, _utils.isAny)(nextChar, NEAR_CLOSURE_HAYSTACK);

	        // Check if character is a number.
	        if (test.isNumber.exec(char)) {
	          this.elements.push({
	            is: 'number',
	            type: 'mn',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        // Check if character is a variable.
	        if (test.isVariable.exec(char)) {
	          this.elements.push({
	            is: 'variable',
	            type: 'mi',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        // Check if character is an operator.
	        if (test.isOperator.exec(char)) {
	          this.elements.push({
	            is: 'operator',
	            type: 'mo',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        if (test.isEscapedOperator.exec(char) && lastChar === '\\') {
	          this.elements.push({
	            is: 'operator',
	            type: 'mo',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        // Newline up ahead.
	        if (char === '\\' && nextChar === '\\') {
	          i += 1;
	        }

	        // A command.
	        if (char === '\\' && test.isVariable.exec(nextChar)) {
	          i = this.parseCommand(i);
	        }

	        // Sup and sub commands.
	        if ((0, _utils.isAny)(char, ['^', '_'])) {
	          i = this.parseCommand(i);
	        }

	        // Closing a command block.
	        if (char === '}' && lastChar !== '\\') {}
	        //


	        // Opening a command block.
	        if (char === '{') {
	          continue;
	        }

	        cursorPoints.push(index);
	      }

	      // Cursor can always be placed at the end.
	      cursorPoints.push(length);

	      this.cursorPoints = cursorPoints;
	    }

	    /**
	     * Parse a command that start at the given index.
	     * 
	     * @param {Number} i
	     * 
	     * @return {Number}
	     */

	  }, {
	    key: 'parseCommand',
	    value: function parseCommand(i) {
	      var iterator = i;
	      var tex = this.tex;
	      var length = this.tex.length;
	      var opening = null; // the first place the cursor can be placed inside this command
	      var blocks = [];
	      var brackets = null;
	      var openBlocks = 0;
	      var type = '';
	      var is = 'command'; // we assume it is a command but it can be operator or variable
	      var start = iterator; // index command starts
	      var end = null; // index command ends
	      var nearClosure = false;

	      for (i = iterator; i < length; i++) {
	        var char = tex[i];
	        var nextChar = tex[i + 1];

	        if (opening === null && test.isVariable.exec(char)) {
	          type += char;
	        }

	        // Bracket found!
	        if (char === '[') {
	          brackets = { openIndex: i };
	          if (opening === null) {
	            opening = i;
	          }
	        }

	        // Closing brackets!
	        if (char === ']') {
	          brackets.closeIndex = i;
	        }

	        // Find a block being openned.
	        if (char === '{') {
	          // If it is this command block...
	          if (openBlocks === 0) {
	            blocks.push({ openIndex: i });
	          }
	          openBlocks += 1;
	          if (opening === null) {
	            opening = i;
	          }
	        }

	        // Find a block being closed.
	        if (char === '}') {
	          openBlocks -= 1;
	          // If it is this command block...
	          if (openBlocks === 0) {
	            blocks[blocks.length - 1].closeIndex = i;
	          }
	        }

	        if (char === ' ') {
	          type = this.decideType(type);
	          is = type === 'mo' ? 'operator' : 'variable';
	          end = i;
	          opening = i;
	          if ((0, _utils.isAny)(nextChar, NEAR_CLOSURE_HAYSTACK)) {
	            nearClosure = true;
	          }
	          break;
	        }

	        if (char === '}' && nextChar !== '{') {
	          end = i;
	          break;
	        }
	      }

	      if (type === 'sqrt' && brackets !== null) {
	        type = 'root';
	      }

	      if (opening === null) {
	        throw new SyntaxError('Looks like this TeX is invalid. Now have a hard time finding where, lul.');
	      }

	      this.elements.push({
	        is: is,
	        type: type,
	        nearClosure: nearClosure,
	        props: {
	          start: start,
	          end: end,
	          opening: opening,
	          blocks: blocks,
	          brackets: brackets
	        }
	      });

	      return opening;
	    }

	    /**
	     * Decide the type based on the given type (lul).
	     *     \{type}
	     *     \alpha ---> mi
	     *     \geq   ---> mo
	     *     \sqrt  ---> msqrt
	     * 
	     * @param {String} type
	     * 
	     * @return {String}
	     */

	  }, {
	    key: 'decideType',
	    value: function decideType(type) {
	      var list = {
	        'alpha': 'mi',
	        'beta': 'mi',
	        'gamma': 'mi',
	        'Gamma': 'mi',
	        'delta': 'mi',
	        'Delta': 'mi',
	        'epsilon': 'mi',
	        'varepsilon': 'mi',
	        'zeta': 'mi',
	        'eta': 'mi',
	        'theta': 'mi',
	        'vartheta': 'mi',
	        'Theta': 'mi',
	        'iota': 'mi',
	        'kappa': 'mi',
	        'lambda': 'mi',
	        'mu': 'mi',
	        'nu': 'mi',
	        'xi': 'mi',
	        'Xi': 'mi',
	        'pi': 'mi',
	        'Pi': 'mi',
	        'rho': 'mi',
	        'varrho': 'mi',
	        'sigma': 'mi',
	        'Sigma': 'mi',
	        'tau': 'mi',
	        'upsilon': 'mi',
	        'Upsilon': 'mi',
	        'phi': 'mi',
	        'varphi': 'mi',
	        'Phi': 'mi',
	        'chi': 'mi',
	        'psi': 'mi',
	        'Psi': 'mi',
	        'omega': 'mi',
	        'Omega': 'mi',
	        '%': 'mi'
	      };

	      return list.hasOwnProperty(type) ? list[type] : 'mo';
	    }
	  }]);

	  return Tex;
	}();

	exports.default = Tex;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mustFindElement = mustFindElement;
	exports.insertBetween = insertBetween;
	exports.removeClass = removeClass;
	exports.addClass = addClass;
	exports.toArray = toArray;
	exports.isAny = isAny;
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

	  $el.className = finalValue.trim();
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
	  $el.className = $el.className.trim();
	}

	/**
	 * Converts a DOM node list to array.
	 * 
	 * @param {DOMNodeList}
	 * 
	 * @return {Array}
	 */
	function toArray(children) {
	  var slice = [].slice;
	  return slice.call(children);
	}

	/**
	 * Check if the needle is found in haystack.
	 * 
	 * @param {Mixed} needle
	 * @param {Array} haystack
	 * 
	 * @return {Boolean}
	 */
	function isAny(needle, haystack) {
	  return !!~haystack.indexOf(needle);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extendMathJax;

	var _styles = __webpack_require__(7);

	var _styles2 = _interopRequireDefault(_styles);

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
	    var defaults = {
	      mathvariant: MML.INHERIT,
	      mathsize: MML.INHERIT,
	      mathbackground: MML.INHERIT,
	      mathcolor: MML.INHERIT,
	      dir: MML.INHERIT
	    };

	    TEX.Definitions.Add({
	      macros: {
	        cursor: 'Cursor',
	        isEmpty: 'IsEmpty'
	      }
	    }, null, true);

	    MML.mcursor = MML.mbase.Subclass({
	      type: 'cursor',
	      isToken: true,
	      isSpacelike: function isSpacelike() {
	        return true;
	      },
	      texClass: MML.TEXCLASS.ORD,
	      defaults: defaults
	    });

	    MML.misEmpty = MML.mbase.Subclass({
	      type: 'isEmpty',
	      isToken: true,
	      isSpacelike: function isSpacelike() {
	        return true;
	      },
	      texClass: MML.TEXCLASS.ORD,
	      defaults: defaults
	    });

	    TEX.Parse.Augment({
	      Cursor: function Cursor(name) {
	        var $cursor = MML.mcursor('0');
	        this.Push($cursor);
	      },
	      IsEmpty: function IsEmpty(name) {
	        var $isEmpty = MML.misEmpty('?');
	        this.Push($isEmpty);
	      }
	    });
	  });

	  MathJax.Ajax.Styles(_styles2.default);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mjxCursor$MjxCur;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var animation = 'from, to { border-color: #000 }\n 50% { border-color: transparent }';

	exports.default = (_mjxCursor$MjxCur = {
	  '.mjx-cursor': {
	    '-webkit-animation': '1s mj-ed-blink step-end infinite',
	    '-moz-animation': '1s mj-ed-blink step-end infinite',
	    '-ms-animation': '1s mj-ed-blink step-end infinite',
	    '-o-animation': '1s mj-ed-blink step-end infinite',
	    animation: '1s mj-ed-blink step-end infinite',
	    'border-right': '2px solid #000',
	    color: 'transparent'
	  },

	  '.mjx-cursor.wasRecentlyPlaced': {
	    'border-right-color': '#000 !important'
	  },

	  '.mj-ed-input': {
	    left: '-100%',
	    position: 'absolute',
	    top: '-100%'
	  },

	  '.mj-ed-display': {
	    'box-sizing': 'border-box'
	  },

	  '.mj-ed-display *': {
	    outline: 'none'
	  },

	  '.mj-ed-selectionButton': {
	    cursor: 'text'
	  },

	  '.mjx-isEmpty': {
	    color: '#ccc'
	  },

	  '@keyframes mj-ed-blink': animation
	}, _defineProperty(_mjxCursor$MjxCur, '@keyframes mj-ed-blink', animation), _defineProperty(_mjxCursor$MjxCur, '@-moz-keyframes mj-ed-blink', animation), _defineProperty(_mjxCursor$MjxCur, '@-webkit-keyframes mj-ed-blink', animation), _defineProperty(_mjxCursor$MjxCur, '@-ms-keyframes mj-ed-blink', animation), _defineProperty(_mjxCursor$MjxCur, '@-o-keyframes mj-ed-blink', animation), _mjxCursor$MjxCur);

/***/ }
/******/ ])
});
;