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

	var _extendMathJax = __webpack_require__(7);

	var _extendMathJax2 = _interopRequireDefault(_extendMathJax);

	var _utils = __webpack_require__(5);

	var _constants = __webpack_require__(6);

	var _constants2 = _interopRequireDefault(_constants);

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
	    this.version = '1.2.4';
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
	      var number = _constants2.default.number,
	          variable = _constants2.default.variable;

	      if (char.length !== 1) {
	        throw new RangeError('Only one char can be inserted through this method.');
	      }
	      if (!char.match(number) && !char.match(variable)) {
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
	      var operators = _constants2.default.operators,
	          escapedOperators = _constants2.default.escapedOperators;

	      var symbols = operators.slice().concat(escapedOperators);

	      if (!(0, _utils.inArray)(symbol, symbols)) {
	        throw new RangeError('"' + symbol + '" is not a valid symbol.');
	      }

	      if ((0, _utils.inArray)(symbol, escapedOperators)) {
	        symbol = '\\' + symbol;
	      }

	      this.core.insert(symbol);
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
	    this.cursorIndex = 0;
	    this.lastCursorTimeout = null;
	    this.placer = null;
	    this.debug = debug;
	    this.focusClass = focusClass;
	    this.newLine = newLine;
	    this.tex = new _Tex2.default(value, 0);
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
	      var cursorIndex = this.cursorIndex,
	          value = this.value;

	      var tex = this.tex;

	      if (value !== this.lastValue) {
	        tex = new _Tex2.default(value, cursorIndex);
	        this.tex = tex;
	      }

	      if (this.debug) {
	        this.$debug.innerHTML = (0, _utils.insertBetween)(value, cursorIndex, '|');
	      }

	      this.updateJaxElement(tex.displayTex, function () {
	        setTimeout(function () {
	          var placer = new _Placer2.default(_this2);
	          placer.on('setCursor', function (index) {
	            _this2.debug && console.log('The cursor should be placed at ' + index + '.');
	            _this2.cursorIndex = index;
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

	      var cursorIndex = this.cursorIndex;
	      var points = this.tex.cursorPoints;
	      var key = points.indexOf(cursorIndex);

	      var to = cursorIndex;

	      if (amount > 0) {
	        to = points[key + 1];
	      } else if (amount < 0) {
	        to = points[key - 1];
	      }

	      this.cursorIndex = to;
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
	      var className = 'wasRecentlyPlaced';

	      MathJax.Hub.Queue(function () {
	        var $cursor = _this4.$display.querySelector('.mjx-cursor');

	        if (!$cursor) {
	          return;
	        }

	        if (!$cursor.style.marginLeft) {
	          $cursor.style.marginLeft = '-' + $cursor.offsetWidth + 'px';
	        }

	        if (_this4.lastCursorTimeout) {
	          clearTimeout(_this4.lastCursorTimeout);
	        }

	        (0, _utils.addClass)($cursor, className);

	        _this4.lastCursorTimeout = setTimeout(function () {
	          return (0, _utils.removeClass)($cursor, className);
	        }, 600);

	        $cursor.style.display = hidden ? 'none' : 'inline-block';
	      });
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value) {
	      this.lastValue = this.value;
	      this.value = value;
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
	      if (this.cursorIndex > 0) {
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
	      if (this.cursorIndex < this.value.length) {
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
	      this.updateCursorElement({ cursorHidden: false });
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
	      this.updateCursorElement({ cursorHidden: true });
	      this.bus.trigger('blur');
	      (0, _utils.removeClass)(this.$display, this.focusClass);
	    }

	    /**
	     * Insert a piece of text in editor's value.
	     * 
	     * @param {String} chars
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insert',
	    value: function insert(chars) {
	      var cursorIndex = this.cursorIndex,
	          value = this.value;


	      this.cursorIndex += chars.length;

	      this.setValue((0, _utils.insertBetween)(value, cursorIndex, chars));
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

	      var value = this.value,
	          cursorIndex = this.cursorIndex;

	      var blocks = '}' + (0, _utils.repeat)('{}', blockCount - 1);

	      this.setValue((0, _utils.insertBetween)(value, cursorIndex, blocks));
	      this.update();
	    }

	    /**
	     * Apply a deletion method based on cursor position.
	     * 
	     * @param {String} method - Available: "erase" and "delete".
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'applyDeletion',
	    value: function applyDeletion(method) {
	      var cursorIndex = this.cursorIndex,
	          tex = this.tex;

	      var prevIndex = cursorIndex - 1;
	      var elements = tex.elements;

	      var deletionStart = null;
	      var deletionEnd = null;
	      var comparator = void 0;
	      var startOrEnd = void 0;
	      var openOrClose = void 0;
	      var numVarDeletionStart = void 0;
	      var numVarDeletionEnd = void 0;

	      switch (method) {
	        case 'erase':
	          if (cursorIndex === 0) {
	            return;
	          }
	          comparator = prevIndex;
	          startOrEnd = 'end';
	          openOrClose = 'openIndex';
	          numVarDeletionStart = prevIndex;
	          numVarDeletionEnd = cursorIndex;
	          break;

	        case 'delete':
	          if (cursorIndex === tex.length) {
	            return;
	          }
	          comparator = cursorIndex;
	          startOrEnd = 'start';
	          openOrClose = 'closeIndex';
	          numVarDeletionStart = cursorIndex;
	          numVarDeletionEnd = cursorIndex + 1;
	          break;

	        default:
	          throw new RangeError('Unknown method "' + method + '".');
	      }

	      // Deal with new lines deletion.
	      if (tex.newLines[comparator]) {
	        var nl = tex.newLines[comparator];
	        deletionStart = nl.start;
	        deletionEnd = nl.end + 1;
	      } else {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var element = _step.value;
	            var index = element.index,
	                props = element.props;

	            // Command deletion.

	            if (props) {
	              var brackets = props.brackets;

	              // If is erasing at the start/end of the command/ or is erasing brackets of the command.
	              if (props[startOrEnd] === comparator || brackets && brackets[openOrClose] === comparator) {
	                deletionStart = props.start;
	                deletionEnd = props.end + 1;
	                break;
	              }
	              // If is erasing one of block opening/closing.
	              var _iteratorNormalCompletion2 = true;
	              var _didIteratorError2 = false;
	              var _iteratorError2 = undefined;

	              try {
	                for (var _iterator2 = props.blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                  var block = _step2.value;

	                  if (block[openOrClose] === comparator) {
	                    deletionStart = props.start;
	                    deletionEnd = props.end + 1;
	                    break;
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
	            }
	            // Number/variable deletion.
	            else if (index === comparator) {
	                deletionStart = numVarDeletionStart;
	                deletionEnd = numVarDeletionEnd;
	                break;
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
	      }

	      this.cursorIndex = deletionStart;
	      this.setValue((0, _utils.removeFragment)(this.value, deletionStart, deletionEnd));
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
	      this.applyDeletion('erase');
	    }

	    /**
	     * Erases the character before the cursor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'delete',
	    value: function _delete() {
	      this.applyDeletion('delete');
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

	var $paints = [];

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
	      var proceedSearch = true;

	      // First strategy: checks if the clicked point is inside a number/
	      // variable/operator bounding. If it is, place it where is proper.

	      intervals.forEach(function (interval, i) {
	        if (interval.startX <= x && x < interval.endX && proceedSearch) {
	          if (interval.startY <= y && y < interval.endY) {
	            found = true;
	            index = _this.placeAtInterval(interval, i, x, y);
	            if (interval.box) {
	              proceedSearch = false;
	            }
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
	     * Add an interval at the given index in intervals list.
	     *
	     * @param {Number} key
	     * @param {Object} data
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'addIntervalAt',
	    value: function addIntervalAt(key, data) {
	      this.intervals.splice(key, 0, data);
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
	      if (Number.isNaN(data.index)) {
	        console.log(this.elements);
	        console.error('This interval has NaN as index.');
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

	  }, {
	    key: 'addIntervalBox',
	    value: function addIntervalBox(index, _ref) {
	      var top = _ref.top,
	          bottom = _ref.bottom,
	          left = _ref.left,
	          right = _ref.right;

	      this.addInterval({
	        index: index,
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

	  }, {
	    key: 'addBouncinglessInterval',
	    value: function addBouncinglessInterval(index) {
	      this.addInterval({
	        index: index,
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

	          case 'eol':
	            _this2.findEndOfLine(element);
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
	    value: function find(data) {
	      var type = data.type,
	          index = data.index,
	          nearClosure = data.nearClosure;

	      var key = this.getNextKeyFor(type);
	      var $el = this.$display.querySelectorAll('.mjx-' + type)[key];
	      if (!$el) {
	        return console.warn('Could not find an element of type ' + type + '.', index);
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
	        this.addBouncinglessInterval(index + 1);
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
	          blocks = props.blocks,
	          subType = props.subType;


	      this.addBouncinglessInterval(props.start);

	      switch (type) {
	        case 'frac':
	          var $numerator = $el.querySelector('.mjx-numerator');
	          var $denominator = $el.querySelector('.mjx-denominator');
	          var numBounding = $numerator.getBoundingClientRect();
	          var denBounding = $denominator.getBoundingClientRect();
	          var boundings = [numBounding, denBounding];

	          boundings.forEach(function (bounding, i) {
	            if (blocks[i].length === 1) {
	              _this3.addIntervalBox(blocks[i].closeIndex, bounding);
	            }
	          });

	          break;

	        case 'root':
	        case 'sqrt':
	          if (brackets && brackets.closeIndex - brackets.openIndex === 1) {
	            var $root = $el.querySelector('.mjx-root .mjx-char');
	            var bounding = $root.getBoundingClientRect();
	            this.addIntervalBox(brackets.closeIndex, bounding);
	          }
	          if (blocks[0].length === 1) {
	            var $box = $el.querySelector('.mjx-box');
	            var _bounding = $box.getBoundingClientRect();
	            this.addIntervalBox(blocks[0].closeIndex, _bounding);
	          }
	          break;

	        case 'subsup':
	          if (blocks[0].length === 1) {
	            var $target = $el.querySelector('.mjx-' + subType);
	            var _bounding2 = $target.getBoundingClientRect();
	            this.addIntervalBox(blocks[0].closeIndex, _bounding2);
	          }
	          break;
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

	  }, {
	    key: 'findEndOfLine',
	    value: function findEndOfLine(_ref3) {
	      var type = _ref3.type,
	          index = _ref3.index;

	      var key = this.getNextKeyFor(type);
	      var $el = this.$display.querySelectorAll('.mjx-' + type)[key];
	      // If $el was not found, it seems there is only one line.
	      if (!$el) {
	        $el = this.$display.querySelector('.mjx-math');
	      }
	      var $box = $el.firstChild;

	      var _$box$getBoundingClie = $box.getBoundingClientRect(),
	          top = _$box$getBoundingClie.top,
	          left = _$box$getBoundingClie.left,
	          bottom = _$box$getBoundingClie.bottom,
	          right = _$box$getBoundingClie.right;

	      var width = 20;
	      var lineStart = this.findLastStartOfLineIndex();

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
	        index: index,
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

	  }, {
	    key: 'findLastStartOfLineIndex',
	    value: function findLastStartOfLineIndex() {
	      var intervals = this.intervals.slice().reverse();
	      var length = intervals.length;
	      var i = 0;
	      var start = 0;
	      var intervalKey = 0;

	      for (; i < length; i++) {
	        var interval = intervals[i];
	        if (interval.is === 'eol') {
	          start = interval.index + 2;
	          intervalKey = key;
	          break;
	        }
	      }

	      return { start: start, intervalKey: intervalKey };
	    }

	    // Debug function to draw a interval.

	  }, {
	    key: 'paint',
	    value: function paint(interval) {
	      var $div = document.createElement('div');
	      $div.style.position = 'absolute';
	      $div.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
	      $div.style.width = interval.endX - interval.startX + 'px';
	      $div.style.height = interval.endY - interval.startY + 'px';
	      $div.style.top = interval.startY + 'px';
	      $div.style.left = interval.startX + 'px';
	      $div.style.pointerEvents = 'none';
	      document.body.appendChild($div);
	      return $div;
	    }

	    // Debug function to paint all intervals.

	  }, {
	    key: 'paintIntervals',
	    value: function paintIntervals() {
	      var _this4 = this;

	      $paints.forEach(function ($paint) {
	        return document.body.removeChild($paint);
	      });
	      $paints = [];

	      this.intervals.forEach(function (interval) {
	        $paints.push(_this4.paint(interval));
	      });

	      console.log(this.intervals);
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

	var _constants = __webpack_require__(6);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var nearClosureHaystack = _constants2.default.nearClosureHaystack,
	    cursorTex = _constants2.default.cursorTex,
	    emptyTex = _constants2.default.emptyTex,
	    escType = _constants2.default.escType;


	var test = {
	  isNumber: _constants2.default.number,
	  isVariable: _constants2.default.variable,
	  isOperator: (0, _utils.listToCharacterRegex)(_constants2.default.operators),
	  isEscapedOperator: (0, _utils.listToCharacterRegex)(_constants2.default.escapedOperators)
	};

	var Tex = function () {
	  /**
	   * This class will parse the given tex and produce `cursorPoints` (indexes)
	   * where cursor can be placed, and `elements` (that are passed to Placer).
	   * 
	   * @param {String} tex
	   * @param {Number} cursorIndex
	   * 
	   * @constructor
	   */
	  function Tex(tex) {
	    var cursorIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    _classCallCheck(this, Tex);

	    this.tex = tex;
	    this.cursorPoints = [];
	    this.elements = [];
	    this.newLines = {};
	    this.length = tex.length;
	    this.displayTex = '';
	    this.cursorIndex = cursorIndex;
	    this.isPartOfCommand = [];

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
	      var cursorIndex = this.cursorIndex;
	      var i = 0;

	      this.cursorPlaced = false;

	      for (; i < length; i++) {
	        var index = i;
	        var nextIndex = i + 1;
	        var char = tex[index];
	        var nextChar = tex[nextIndex];
	        var lastChar = tex[index - 1];
	        var nearClosure = (0, _utils.isAny)(nextChar, nearClosureHaystack);
	        var isComma = char === ',';
	        var isGrOrLeSign = (0, _utils.isAny)(char, ['<', '>']);
	        var isNumber = test.isNumber.exec(char);
	        var isVariable = test.isVariable.exec(char);
	        var isOperator = test.isOperator.exec(char);
	        var isNextCharEscapedOperator = test.isEscapedOperator.exec(nextChar);
	        var shouldBeAroundBraces = isComma || isNumber || isGrOrLeSign;

	        if (!this.cursorPlaced && cursorIndex === index) {
	          this.cursorPlaced = true;
	          this.displayTex += cursorTex;
	        }

	        if (shouldBeAroundBraces) {
	          this.displayTex += '{';
	        }

	        // Closing a command block, add spacing.
	        if (char === '}' && lastChar !== '\\') {
	          this.displayTex += '\\;';
	        }

	        // Add char to tex that are displayed on editor.
	        this.displayTex += char;

	        if (shouldBeAroundBraces) {
	          this.displayTex += '}';
	        }

	        // Check if character is a number.
	        if (isNumber) {
	          this.elements.push({
	            is: 'number',
	            type: 'mn',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        // Check if character is a variable.
	        if (isVariable) {
	          this.elements.push({
	            is: 'variable',
	            type: 'mi',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        // Check if character is an operator.
	        if (isOperator && !(0, _utils.inArray)(index, this.isPartOfCommand)) {
	          this.elements.push({
	            is: 'operator',
	            type: 'mo',
	            index: index,
	            nearClosure: nearClosure
	          });
	        }

	        if (char === '\\' && isNextCharEscapedOperator) {
	          var type = escType[nextChar] ? escType[nextChar] : 'mo';
	          this.elements.push({
	            is: 'operator',
	            type: type,
	            index: index,
	            nearClosure: nearClosure
	          });
	          this.displayTex += nextChar;
	          i += 1;
	        }

	        // Newline up ahead.
	        if (char === '\\' && nextChar === '\\') {
	          var newLine = { start: index, end: nextIndex };
	          this.newLines[index] = newLine;
	          this.newLines[nextIndex] = newLine;
	          this.displayTex += '\\';
	          this.elements.push({
	            is: 'eol',
	            type: 'block',
	            index: index
	          });
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

	        // Opening a command block.
	        if (char === '{') {
	          if (nextChar === '}') {
	            if (!this.cursorPlaced && nextIndex === cursorIndex) {
	              this.cursorPlaced = true;
	              this.displayTex += cursorTex;
	            }
	            this.displayTex += emptyTex;
	          }
	          continue;
	        }

	        if (char === ' ') {
	          continue;
	        }

	        cursorPoints.push(index);
	      }

	      // Last line eol element.
	      if (length) {
	        this.elements.push({
	          is: 'eol',
	          type: 'block',
	          index: length
	        });
	      }

	      // Add cursor at the end if it was not placed.
	      if (!this.cursorPlaced && cursorIndex === length) {
	        this.cursorPlaced = true;
	        this.displayTex += cursorTex;
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
	      var cursorIndex = this.cursorIndex;
	      var firstChar = tex[iterator];
	      var opening = null; // the first place the cursor can be placed inside this command
	      var blocks = [];
	      var brackets = null;
	      var openBlocks = 0;
	      var type = '';
	      var subType = null;
	      var is = 'command'; // we assume it is a command but it can be operator or variable
	      var start = iterator; // index command starts
	      var end = null; // index command ends
	      var nearClosure = false;

	      switch (firstChar) {
	        case '^':
	          type = 'subsup';
	          subType = 'sup';
	          break;
	        case '_':
	          type = 'subsup';
	          subType = 'sub';
	          break;
	      }

	      for (i = iterator; i < length; i++) {
	        var char = tex[i];
	        var nextIndex = i + 1;
	        var nextChar = tex[nextIndex];
	        var isVariable = test.isVariable.exec(char);

	        if (opening === null) {
	          this.displayTex += !(0, _utils.isAny)(char, ['\\', '^', '_']) ? char : '';
	          if (isVariable) {
	            type += char;
	          }
	        }

	        // Bracket found!
	        if (char === '[') {
	          brackets = { openIndex: i };
	          if (opening === null) {
	            opening = i;
	          }

	          // Add symbol of empty.
	          if (nextChar === ']') {
	            this.displayTex += emptyTex;
	          }
	        }

	        // Closing brackets!
	        if (char === ']') {
	          brackets.closeIndex = i;
	          this.isPartOfCommand.push(i);
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

	            // Place the cursor if it is there.
	            if (!this.cursorPlaced && nextIndex === cursorIndex) {
	              this.cursorPlaced = true;
	              this.displayTex += cursorTex;
	            }

	            if (nextChar === '}') {
	              this.displayTex += emptyTex;
	            }
	          }
	        }

	        // Find a block being closed.
	        if (char === '}') {
	          openBlocks -= 1;
	          // If it is this command block...
	          if (openBlocks === 0) {
	            var key = blocks.length - 1;
	            blocks[key].closeIndex = i;
	            blocks[key].length = i - blocks[key].openIndex;
	          }
	        }

	        if (char === ' ') {
	          type = this.decideType(type);
	          is = type === 'mo' ? 'operator' : 'variable';
	          end = i;
	          opening = i;
	          if ((0, _utils.isAny)(nextChar, nearClosureHaystack)) {
	            nearClosure = true;
	          }
	          break;
	        }

	        if (char === '}' && nextChar !== '{' && openBlocks === 0) {
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
	        index: iterator,
	        nearClosure: nearClosure,
	        props: {
	          subType: subType,
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
	exports.inArray = inArray;
	exports.repeat = repeat;
	exports.removeFragment = removeFragment;
	exports.listToCharacterRegex = listToCharacterRegex;
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

	/**
	 * Same as `isAny`. Just better naming.
	 * 
	 * @see isAny
	 */
	function inArray(needle, haystack) {
	  return isAny(needle, haystack);
	}

	/**
	 * Repeat a string.
	 * 
	 * @param {String} str
	 * @param {Number} count
	 * 
	 * @return {String}
	 */
	function repeat(str, count) {
	  var result = '';
	  var double = str + str;
	  var isOdd = count % 2 !== 0;
	  var length = Math.floor(count / 2);
	  var i = 0;
	  for (; i < length; i++) {
	    result += double;
	  }

	  if (isOdd) {
	    result += str;
	  }

	  return result;
	}

	/**
	 * Remove part of a string.
	 * 
	 * >> removeFragment("0123456", 1, 3);
	 * << "03456"
	 * 
	 * So, when start 1 and end 3, "0123456"
	 *                               ^^
	 *                             Removed
	 */
	function removeFragment(str, start, end) {
	  return str.slice(0, start) + str.slice(end);
	}

	/**
	 * Convert a list to a character regex.
	 * 
	 * @param {Array} list
	 * 
	 * @return {RegExp}
	 */
	function listToCharacterRegex(list) {
	  var chars = list.map(function (char) {
	    return '\\' + char;
	  }).join('');
	  return new RegExp('^[' + chars + ']$');
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  cursorTex: '{\\cursor}',

	  emptyTex: '\\isEmpty',

	  number: /^[0-9]$/,

	  variable: /^[a-z]$/,

	  nearClosureHaystack: ['}', ']'],

	  operators: ['+', '-', '=', '<', '>', ',', '.', ':', ';', '?', '(', ')', '[', ']'],

	  escapedOperators: ['{', '}', '%'],

	  escType: {
	    '%': 'mi'
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extendMathJax;

	var _styles = __webpack_require__(8);

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
/* 8 */
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