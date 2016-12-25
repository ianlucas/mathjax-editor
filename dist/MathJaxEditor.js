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

	__webpack_require__(1);

	var _Editor = __webpack_require__(5);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _extendMathJax = __webpack_require__(10);

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
	    this.version = '1.1.6';
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
	     * @param {Boolean} brackets
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	      var brackets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      this.editor.insertCommand(command, blockCount, brackets);
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
	      this.editor.insert(value);
	    }

	    /**
	     * Get editor's jax.
	     * 
	     * @deprecated
	     * 
	     * @return {String}
	     */

	  }, {
	    key: 'getJax',
	    value: function getJax() {
	      console.warn('[deprecated] getJax is deprecated, use getValue instead.');
	      return this.editor.value;
	    }

	    /**
	     * Get editor's value.
	     * 
	     * @deprecated
	     * 
	     * @return {String}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.editor.value;
	    }

	    /**
	     * Move the cursor to the left.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'moveCursorLeft',
	    value: function moveCursorLeft() {
	      this.editor.moveCursorLeft();
	    }

	    /**
	     * Move the cursor to the right.
	     * 
	     * @return {Void} 
	     */

	  }, {
	    key: 'moveCursorRight',
	    value: function moveCursorRight() {
	      this.editor.moveCursorRight();
	    }

	    /**
	     * Erases the character before the cursor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'erase',
	    value: function erase() {
	      this.editor.erase();
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
	      this.editor.on(type, listener);
	    }
	  }]);

	  return MathJaxEditor;
	}();

	module.exports = MathJaxEditor;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./stylesheet.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./stylesheet.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".mjx-cursor {\r\n  -webkit-animation: 1s mj-ed-blink step-end infinite;\r\n  -moz-animation: 1s mj-ed-blink step-end infinite;\r\n  -ms-animation: 1s mj-ed-blink step-end infinite;\r\n  -o-animation: 1s mj-ed-blink step-end infinite;\r\n  animation: 1s mj-ed-blink step-end infinite;\r\n  border-right: 2px solid #000;\r\n  color: transparent;\r\n}\r\n\r\n.mjx-cursor.wasRecentlyPlaced {\r\n  border-right-color: black !important;\r\n}\r\n\r\n.mj-ed-input {\r\n  left: -100%;\r\n  position: absolute;\r\n  top: -100%;\r\n}\r\n\r\n.mj-ed-display {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.mj-ed-display * {\r\n  outline: none;\r\n}\r\n\r\n.mj-ed-selectionButton {\r\n  cursor: text;\r\n}\r\n\r\n.mjx-isEmpty {\r\n  color: #ccc;\r\n}\r\n\r\n@keyframes mj-ed-blink {\r\n  from, to {\r\n    border-color: black;\r\n  }\r\n  50% {\r\n    border-color: transparent;\r\n  }\r\n}\r\n\r\n@-moz-keyframes mj-ed-blink {\r\n  from, to {\r\n    border-color: transparent;\r\n  }\r\n  50% {\r\n    border-color: black;\r\n  }\r\n}\r\n\r\n@-webkit-keyframes mj-ed-blink {\r\n  from, to {\r\n    border-color: transparent;\r\n  }\r\n  50% {\r\n    border-color: black;\r\n  }\r\n}\r\n\r\n@-ms-keyframes mj-ed-blink {\r\n  from, to {\r\n    border-color: transparent;\r\n  }\r\n  50% {\r\n    border-color: black;\r\n  }\r\n}\r\n\r\n@-o-keyframes mj-ed-blink {\r\n  from, to {\r\n    border-color: transparent;\r\n  }\r\n  50% {\r\n    border-color: black;\r\n  }\r\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _EventBus = __webpack_require__(6);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var _Placer = __webpack_require__(7);

	var _Placer2 = _interopRequireDefault(_Placer);

	var _Iterator = __webpack_require__(8);

	var _Iterator2 = _interopRequireDefault(_Iterator);

	var _utils = __webpack_require__(9);

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

	    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $display], function () {
	      _this.jaxElement = MathJax.Hub.getAllJax($display)[0];
	    }, function () {
	      $display.style.opacity = 1;
	      $display.style.minHeight = $display.offsetHeight + 'px';
	      _this.update(value, { hidden: true });
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
	    this.value = value;
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

	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;
	      var cursorOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var cursor = this.cursor;
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
	          _this2.placer = _Placer2.default.read(_this2, function (cursor) {
	            console.log('The cursor should be placed at ' + cursor);
	            _this2.cursor = cursor;
	            _this2.update();
	          });
	        }, 20);

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
	      var cursor = this.cursor;
	      var iterator = new _Iterator2.default(this.value);
	      var currentChar = iterator.at(cursor);
	      var nextChar = iterator.at(next);

	      // Moving to the left.

	      if (amount < 0) {
	        nextChar.when('{').andPreviousCharacterNotIs('}').findBackwards('\\', '^', '_', ']').then(function (i) {
	          return next = i;
	        });

	        nextChar.when('{').andPreviousCharacterIs('}').then(function () {
	          return next -= 1;
	        });

	        nextChar.when('\\').andPreviousCharacterIs('\\').then(function () {
	          return next -= 1;
	        });

	        nextChar.when(' ').findBackwards('\\').then(function (i) {
	          return next = i;
	        });

	        nextChar.when('[').findBackwards('\\').then(function (i) {
	          return next = i;
	        });
	      }

	      // Moving to the right.

	      if (amount > 0) {
	        currentChar.when('\\', '^', '_').andNextCharacterNotIs('\\').findForwards('{', ' ', '[').then(function (i) {
	          return next = i + 1;
	        });

	        currentChar.when('}', ']').andNextCharacterIs('{').then(function () {
	          return next += 1;
	        });

	        currentChar.when('\\').andNextCharacterIs('\\').then(function () {
	          return next += 1;
	        });
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
	      var _this3 = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var hidden = options.hidden || false;

	      MathJax.Hub.Queue(function () {
	        var $cursor = _this3.$display.querySelector('.mjx-cursor');
	        if (!$cursor) {
	          return;
	        }
	        if (!$cursor.style.marginLeft) {
	          $cursor.style.marginLeft = '-' + $cursor.offsetWidth + 'px';
	        }

	        // Fix #7
	        if (_this3._cursorRecentlyPlaced) {
	          clearTimeout(_this3._cursorRecentlyPlaced);
	        }
	        (0, _utils.addClass)($cursor, 'wasRecentlyPlaced');
	        _this3._cursorRecentlyPlaced = setTimeout(function () {
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
	      var _this4 = this;

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

	        _this4.handleInput(which, char);
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

	      this.placer.fireClick(e);
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
	      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
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
	      this.bus.on(type, listener);
	    }
	  }]);

	  return Editor;
	}();

	exports.default = Editor;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventBus = function () {
	  function EventBus() {
	    _classCallCheck(this, EventBus);

	    this.registry = {};
	  }

	  _createClass(EventBus, [{
	    key: "on",
	    value: function on(type, listener) {
	      this.registry[type] = (this.registry[type] || []).concat(listener);
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(type) {
	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }

	      if (this.registry[type]) {
	        console.log(this.registry);
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
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Placer = function () {
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
	  function Placer(editor) {
	    _classCallCheck(this, Placer);

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


	  _createClass(Placer, [{
	    key: 'debug',


	    /**
	     * Debug helper function. Works just like console.log.
	     * 
	     * @return {Void}
	     */
	    value: function debug() {
	      var _console;

	      if (!this.isDebug) {
	        return;
	      }
	      (_console = console).log.apply(_console, arguments);
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

	  }, {
	    key: 'addInterval',
	    value: function addInterval(index, startX, endX, startY, endY) {
	      var useAllArea = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

	      this.intervals.push({
	        index: index, startX: startX, endX: endX, startY: startY, endY: endY, useAllArea: useAllArea
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
	    value: function placeAtInterval(interval, x, y, i) {
	      var width = interval.endX - interval.startX;
	      var index = interval.index;

	      this.debug('Interval X from ' + interval.startX + ' to ' + interval.endX + ' (Middle point x: ' + (interval.startX + width / 2) + ', width: ' + width + ')');
	      this.debug('Interval Y from ' + interval.startY + ' to ' + interval.endY);

	      if (interval.useAllArea) {
	        return index;
	      }

	      if (x > interval.startX + width / 2) {
	        if (this.intervals[i + 1]) {
	          index = this.intervals[i + 1].index;
	        } else {
	          index = this.tex.length;
	        }
	      }

	      this.debug('[placeAtInterval] Cursor to be placed at ' + index + '.');

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

	  }, {
	    key: 'fireClick',
	    value: function fireClick(e) {
	      var _this = this;

	      var _$display$getBounding = this.$display.getBoundingClientRect(),
	          bottom = _$display$getBounding.bottom;

	      var x = e.clientX;
	      var y = e.clientY;
	      var index = this.tex.length;

	      this.debug('You has clicked at (' + x + ', ' + y + ').');
	      this.debug(this.intervals);

	      // If there are no intervals, or the point `y` is
	      // not in the range of the editor's bounds, we just
	      // ignore the event. TODO: Check for y top.

	      if (!this.intervals.length || y > bottom) {
	        return;
	      }

	      var found = false;

	      // First strategy: checks if the clicked point is inside a number/
	      // variable/operator bounding. If it is, place it where is proper. 

	      this.intervals.forEach(function (interval, i) {
	        if (interval.startX <= x && x < interval.endX) {
	          if (interval.startY <= y && y < interval.endY) {
	            found = true;
	            index = _this.placeAtInterval(interval, x, y, i);
	          }
	        }
	      });

	      // Second strategy: find the nearest element to the clicked point.

	      if (!found) {
	        var _ret = function () {
	          var last = { interval: null, distance: null, i: null };

	          _this.intervals.forEach(function (interval, i) {
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
	              v: void 0
	            };
	          }

	          index = _this.placeAtInterval(last.interval, x, y, last.i);
	          _this.debug('[fireClick] Not found a bounding, placeing at ' + index + '.');
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }

	      // Check if the clicked point is out of bounds.
	      // Since we can have now empty startX and endX, we need to
	      // iterate the intervals.

	      // let i = 0;
	      // const length = this.intervals.length;

	      // for (; i < length; i++) {
	      //   if (this.intervals[i].startX) {
	      //     if (x < this.intervals[i].startX) {
	      //       this.debug(`[fireClick] Out of display boundings. Placing at start.`);
	      //       index = 0;
	      //     }
	      //     break;
	      //   }
	      // }

	      // for (i = length - 1; i >= 0; i--) {
	      //   if (this.intervals[i].endX) {
	      //     if (x > this.intervals[i].endX) {
	      //       this.debug(`[fireClick] Out of display boundings. Placing at the end.`);
	      //       index = this.tex.length;
	      //     }
	      //     break;
	      //   }
	      // }

	      this.onRequestPlacement(index);
	    }

	    /**
	     * Find an element of the given type and add its interval data 
	     * to `this.intervals`.
	     * 
	     * @param {String} type
	     * @param {Number} index
	     * @param {Boolean} nearClosure
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'find',
	    value: function find(type, index, nearClosure) {
	      this.findings[type] = this.findings[type] || 0;
	      var $el = this.$display.querySelectorAll('.mjx-' + type)[this.findings[type]];
	      var bounding = $el.getBoundingClientRect();
	      this.addInterval(index, bounding.left, bounding.right, bounding.top, bounding.bottom);
	      this.findings[type] += 1;
	      if (nearClosure) {
	        this.addInterval(index + 1, 0, 0, 0, 0);
	      }
	    }

	    /**
	     * Find a command element.
	     * 
	     * @param {String} command
	     * @param {Number} index
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'findCommand',
	    value: function findCommand(command, index) {
	      var _this2 = this;

	      command = command.replace(/[\[\{].*(\]\{.*)?/, '');
	      var name = command.slice(1);
	      this.findings[name] = this.findings[name] || 0;
	      var $el = this.$display.querySelectorAll('.mjx-m' + name)[this.findings[name]];
	      var bounding = $el.getBoundingClientRect();

	      switch (name) {
	        case 'frac':
	          var $numerator = $el.querySelector('.mjx-numerator');
	          var $denominator = $el.querySelector('.mjx-denominator');
	          var numBounding = $numerator.getBoundingClientRect();
	          var denBounding = $denominator.getBoundingClientRect();
	          var boundings = [numBounding, denBounding];

	          var _parseCommandAt = this.parseCommandAt(index),
	              blocks = _parseCommandAt.blocks;

	          boundings.forEach(function (bounding, i) {
	            if (blocks[i].closeIndex - blocks[i].openIndex === 1) {
	              _this2.addInterval(blocks[i].closeIndex, bounding.left, bounding.right, bounding.top, bounding.bottom, true);
	            }
	          });

	          break;

	        case 'root':
	        case 'sqrt':
	          var _parseCommandAt2 = this.parseCommandAt(index),
	              blocks = _parseCommandAt2.blocks,
	              brackets = _parseCommandAt2.brackets;

	          if (brackets.closeIndex && brackets.closeIndex - brackets.openIndex === 1) {
	            var $root = $el.querySelector('.mjx-root .mjx-char');

	            var _$root$getBoundingCli = $root.getBoundingClientRect(),
	                left = _$root$getBoundingCli.left,
	                right = _$root$getBoundingCli.right,
	                top = _$root$getBoundingCli.top,
	                bottom = _$root$getBoundingCli.bottom;

	            this.addInterval(brackets.closeIndex, left, right, top, bottom, true);
	          }
	          if (blocks[0].closeIndex - blocks[0].openIndex === 1) {
	            var $box = $el.querySelector('.mjx-box');

	            var _$box$getBoundingClie = $box.getBoundingClientRect(),
	                _left = _$box$getBoundingClie.left,
	                _right = _$box$getBoundingClie.right,
	                _top = _$box$getBoundingClie.top,
	                _bottom = _$box$getBoundingClie.bottom;

	            this.addInterval(blocks[0].closeIndex, _left, _right, _top, _bottom, true);
	          }
	          break;
	      }
	    }

	    /**
	     * Parse the editor's tex.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'parse',
	    value: function parse() {
	      var tex = this.tex;
	      var length = tex.length;
	      var i = 0;

	      var test = {
	        isNumber: /\d/,
	        isVariable: /\w/,
	        isOperator: /[\+\-\=\,\.]/
	      };

	      for (; i < length; i++) {
	        var char = tex[i];
	        var nearClosure = !!~['}', ']', '\\'].indexOf(tex[i + 1]);

	        if (test.isNumber.exec(char)) {
	          this.find('mn', i, nearClosure);
	          continue;
	        }

	        if (test.isVariable.exec(char)) {
	          this.find('mi', i, nearClosure);
	          continue;
	        }

	        if (test.isOperator.exec(char)) {
	          this.find('mo', i, nearClosure);
	          continue;
	        }

	        // Newline, so we skip.
	        if (char === '\\' && tex[i + 1] === '\\') {
	          i += 1;
	          continue;
	        }

	        if (char === '\\') {
	          var j = i;
	          var command = '';
	          for (; j < length; j++) {
	            var subchar = tex[j];
	            nearClosure = !!~['}', ']', '\\'].indexOf(tex[j + 1]);
	            command += subchar;
	            if (~[' ', '{', '['].indexOf(subchar)) {
	              var list = {
	                '\\cdot': 'mo',
	                '\\div': 'mo'
	              };
	              var trimmed = command.trim();
	              var type = list[trimmed] ? list[trimmed] : 'mi';
	              if (subchar === ' ') {
	                this.find(type, i, nearClosure);
	              } else {
	                if (command.match(/\\sqrt\[/)) {
	                  command = command.replace('sqrt', 'root');
	                }
	                this.findCommand(command, i);
	              }
	              i = j;
	              break;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'parseCommandAt',
	    value: function parseCommandAt(i) {
	      var length = this.tex.length;
	      var blocks = [];
	      var brackets = { openIndex: null, closeIndex: null };
	      var openBlocks = 0;

	      for (; i < length; i++) {
	        var char = this.tex[i];
	        if (char === '[') {
	          brackets.openIndex = i;
	        }
	        if (char === ']') {
	          brackets.closeIndex = i;
	        }
	        if (char === '{') {
	          if (openBlocks === 0) {
	            blocks.push({ openIndex: i });
	          }
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
	        blocks: blocks,
	        brackets: brackets
	      };
	    }
	  }], [{
	    key: 'read',
	    value: function read(editor) {
	      var onRequestPlacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Function;

	      var placer = new Placer(editor);
	      placer.onRequestPlacement = onRequestPlacement;
	      return placer;
	    }
	  }]);

	  return Placer;
	}();

	exports.default = Placer;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class helps to iterate over a string.
	 */
	var Iterator = function () {
	  /**
	   * @param {String} tex
	   * @constructor
	   */
	  function Iterator(tex) {
	    _classCallCheck(this, Iterator);

	    this.tex = tex;
	  }

	  /**
	   * Get character at given index.
	   * 
	   * @param {Number} index
	   * 
	   * @return IteratorCharacter
	   */


	  _createClass(Iterator, [{
	    key: "at",
	    value: function at(index) {
	      return new IteratorCharacter(this.tex, index);
	    }
	  }]);

	  return Iterator;
	}();

	/**
	 * This class represents a text character.
	 */


	var IteratorCharacter = function () {
	  /**
	   * @param {String} tex - Text it came from.
	   * @param {Number} index - Its index in that text.
	   *
	   * @constructor
	   */
	  function IteratorCharacter(tex, index) {
	    _classCallCheck(this, IteratorCharacter);

	    this.tex = tex;
	    this.index = index;
	    this.value = tex[index];
	  }

	  /**
	   * Check if this character is equals to any of given arguments.
	   * 
	   * @param {String} ...chars
	   * 
	   * @return {Boolean}
	   */


	  _createClass(IteratorCharacter, [{
	    key: "is",
	    value: function is() {
	      for (var _len = arguments.length, chars = Array(_len), _key = 0; _key < _len; _key++) {
	        chars[_key] = arguments[_key];
	      }

	      return !!~chars.indexOf(this.value);
	    }

	    /**
	     * If the char is equals to any of given arguments,
	     * returns a logic constructor.
	     * 
	     * @param {String} ...char
	     * 
	     * @return {IteratorFlow}
	     */

	  }, {
	    key: "when",
	    value: function when() {
	      return new IteratorFlow(this, this.is.apply(this, arguments));
	    }

	    /**
	     * Get the character previous to this character.
	     * 
	     * @return {IteratorCharacter}
	     */

	  }, {
	    key: "previousCharacter",
	    value: function previousCharacter() {
	      return new IteratorCharacter(this.tex, this.index - 1);
	    }

	    /**
	     * Get the character next to this character.
	     * 
	     * @return {IteratorCharacter}
	     */

	  }, {
	    key: "nextCharacter",
	    value: function nextCharacter() {
	      return new IteratorCharacter(this.tex, this.index + 1);
	    }
	  }]);

	  return IteratorCharacter;
	}();

	var IteratorFlow = function () {
	  /**
	   * @param {IteratorCharacter} char
	   * @param {Boolean} assertion
	   * 
	   * @constructor
	   */
	  function IteratorFlow(char, assertion) {
	    _classCallCheck(this, IteratorFlow);

	    this.assertion = assertion;
	    this.char = char;
	    this.tex = char.tex;
	    this.iterator = char.index;
	  }

	  /**
	   * @param {Boolean} expression
	   */


	  _createClass(IteratorFlow, [{
	    key: "and",
	    value: function and(expression) {
	      if (this.assertion) {
	        this.assertion = !!expression;
	      }
	    }

	    /**
	     * Check if next character is equals to the expected.
	     * 
	     * @param {String} expected
	     * 
	     * @return {IteratorFlow} this
	     */

	  }, {
	    key: "andNextCharacterIs",
	    value: function andNextCharacterIs(expected) {
	      this.and(this.char.nextCharacter().is(expected));
	      return this;
	    }

	    /**
	     * Check if next character is not equals to the expected.
	     * 
	     * @param {String} expected
	     * 
	     * @return {IteratorFlow} this
	     */

	  }, {
	    key: "andNextCharacterNotIs",
	    value: function andNextCharacterNotIs(expected) {
	      this.and(!this.char.nextCharacter().is(expected));
	      return this;
	    }

	    /**
	     * Check if previous character is equals to the expected.
	     * 
	     * @param {String} expected
	     * 
	     * @return {IteratorFlow} this
	     */

	  }, {
	    key: "andPreviousCharacterIs",
	    value: function andPreviousCharacterIs(expected) {
	      this.and(this.char.previousCharacter().is(expected));
	      return this;
	    }

	    /**
	     * Check if previous character is not equals to the expected.
	     * 
	     * @param {String} expected
	     * 
	     * @return {IteratorFlow} this
	     */

	  }, {
	    key: "andPreviousCharacterNotIs",
	    value: function andPreviousCharacterNotIs(expected) {
	      this.and(!this.char.previousCharacter().is(expected));
	      return this;
	    }

	    /**
	     * Find backwards any of the given chars.
	     * 
	     * This will change `this.iterator` which is passed 
	     * to `this.then` callback.
	     * 
	     * @param {String} ...chars
	     * 
	     * @return {IteratorFlow} this
	     */

	  }, {
	    key: "findBackwards",
	    value: function findBackwards() {
	      var tex = this.tex;
	      var i = this.iterator;

	      for (var _len2 = arguments.length, chars = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        chars[_key2] = arguments[_key2];
	      }

	      while (i--) {
	        if (~chars.indexOf(tex[i])) {
	          break;
	        }
	      }

	      this.iterator = i;
	      return this;
	    }

	    /**
	     * Find forwards any of the given chars.
	     * 
	     * This will change `this.iterator` which is passed 
	     * to `this.then` callback.
	     * 
	     * @param {String} ...chars
	     * 
	     * @return {IteratorFlow} this
	     */

	  }, {
	    key: "findForwards",
	    value: function findForwards() {
	      var tex = this.tex;
	      var length = tex.length;
	      var i = this.iterator;

	      for (var _len3 = arguments.length, chars = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        chars[_key3] = arguments[_key3];
	      }

	      while (i++ < length) {
	        if (~chars.indexOf(tex[i])) {
	          break;
	        }
	      }

	      this.iterator = i;
	      return this;
	    }

	    /**
	     * If the assertion is truthy, call the given callback.
	     * 
	     * @param {Function} callback
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: "then",
	    value: function then(callback) {
	      if (!this.assertion) {
	        return;
	      }
	      callback(this.iterator);
	    }
	  }]);

	  return IteratorFlow;
	}();

	exports.default = Iterator;

/***/ },
/* 9 */
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

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extendMathJax;
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
	}

/***/ }
/******/ ])
});
;