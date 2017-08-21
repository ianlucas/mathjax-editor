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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lcc;
/**
 * Converts a string to the lower case, and check if it is equal to
 * the second argument if it is given.
 * 
 * @param {String} str
 * @param {String} other
 * 
 * @return {String}
 */
function lcc(str, other) {
  str = str.toLowerCase();
  if (other === undefined) {
    return str;
  }
  return str === other.toLowerCase();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;
/**
 * Convert an array-like object to an actual array.
 * 
 * @param {NodeList} obj
 * 
 * @return {Array}
 */
function toArray(obj) {
  return Array.prototype.slice.call(obj);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;
/**
 * Add a class to an element.
 * 
 * @param {HTMLElement} $el  
 * @param {String} name
 * 
 * @return {Void}
 */
function addClass($el, name) {
  var classes = $el.className.split(' ');
  if (!~classes.indexOf(name)) {
    $el.className += ' ' + name;
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promiscuous = __webpack_require__(29);

var _promiscuous2 = _interopRequireDefault(_promiscuous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _promiscuous2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendElement;
/**
 * Append an element to its parent.
 * 
 * @param {HTMLElement} $parent  
 * @param {...HTMLElement} children
 * 
 * @return {Void}  
 */
function appendElement($parent) {
  for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  return children.forEach(function ($child) {
    return $parent.appendChild($child);
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeElement;
/**
 * Remove the element from the DOM.
 * 
 * @param {HTMLElement}  $el
 * 
 * @return {Void}
 */
function removeElement($el) {
  return $el.parentNode.removeChild($el);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createElement;
/**
 * Quickly create an element with className.
 * 
 * @param {String} tagName 
 * @param {String} [className=''] 
 * @param {Object} [attributes={}]
 * 
 * @return {HTMLElement}
 */
function createElement(tagName) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if ((typeof className === 'undefined' ? 'undefined' : _typeof(className)) === 'object') {
    attributes = className;
    className = '';
  }

  var $el = document.createElement(tagName);
  $el.className = className;

  Object.keys(attributes).forEach(function (key) {
    var value = attributes[key];
    switch (key) {
      case '_html':
        $el.innerHTML = value;
        break;
      default:
        $el.setAttribute(key, value);
    }
  });
  return $el;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClass;
/**
 * Remove a class of an element.
 * 
 * @param {HTMLElement} $el  
 * @param {String} name 
 * 
 * @return {Void}
 */
function removeClass($el, name) {
  var classes = $el.className.split(' ');
  $el.className = classes.filter(function (n) {
    return n !== name;
  }).join(' ');
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = px;
/**
 * Clean way to get the pixels units.
 * 
 * @param {Number} value
 * 
 * @return {String}
 */
function px(value) {
  return value + "px";
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '\\sin': 'sin',
  '\\cos': 'cos',
  '\\tan': 'tan',
  '\\cot': 'cot',
  '\\arcsin': 'arcsin',
  '\\arccos': 'arccos',
  '\\arctan': 'arctan',
  '\\arccot': 'arccot',
  '\\sinh': 'sinh',
  '\\cosh': 'cosh',
  '\\tanh': 'tanh',
  '\\coth': 'coth',
  '\\sec': 'sec',
  '\\csc': 'csc',
  '\\alpha': 'α',
  '\\beta': 'β',
  '\\gamma': 'γ',
  '\\Gamma': 'Γ',
  '\\delta': 'δ',
  '\\Delta': 'Δ',
  '\\epsilon': 'ϵ',
  '\\varepsilon': 'ε',
  '\\zeta': 'ζ',
  '\\eta': 'η',
  '\\theta': 'θ',
  '\\vartheta': 'ϑ',
  '\\Theta': 'Θ',
  '\\iota': 'ι',
  '\\kappa': 'κ',
  '\\Lambda': 'Λ',
  '\\lambda': 'λ',
  '\\mu': 'μ',
  '\\nu': 'ν',
  '\\xi': 'ξ',
  '\\Xi': 'Ξ',
  '\\pi': 'π',
  '\\Pi': 'Π',
  '\\rho': 'ρ',
  '\\varrho': 'ϱ',
  '\\sigma': 'σ',
  '\\Sigma': 'Σ',
  '\\tau': 'τ',
  '\\upsilon': 'υ',
  '\\Upsilon': 'Υ',
  '\\phi': 'ϕ',
  '\\varphi': 'φ',
  '\\Phi': 'Φ',
  '\\chi': 'χ',
  '\\psi': 'ψ',
  '\\Psi': 'Ψ',
  '\\omega': 'ω',
  '\\Omega': 'Ω',
  '\\partial': '∂',
  '\\eth': 'ð',
  '\\hbar': 'ℏ',
  '\\imath': 'ı',
  '\\jmath': 'ȷ',
  '\\ell': 'ℓ',
  '\\Re': 'ℜ',
  '\\Im': 'ℑ',
  '\\wp': '℘',
  '\\nabla': '∇',
  '\\infty': '∞',
  '\\aleph': 'ℵ',
  '\\beth': 'ℶ',
  '\\gimel': 'ℷ'
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _$$$$$$$$$$$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_$$$$$$$$$$$ = {
  '+': '+',
  '-': '-',
  '=': '=',
  '<': '<',
  '>': '>',
  '|': '|',
  '\%': '%',
  ',': ',',
  '.': '.',
  '$': '$',
  '(': '(',
  ')': ')',
  '[': '[',
  ']': ']',
  '!': '!',
  '\\leq': '≤',
  '\\geq': '≥',
  '\\ll': '≪',
  '\\gg': '≫',
  '\\subset': '⊂',
  '\\supset': '⊃',
  '\\subseteq': '⊆',
  '\\supseteq': '⊇',
  '\\nsubseteq': '⊈',
  '\\nsupseteq': '⊉',
  '\\sqsubset': '⊏',
  '\\sqsupset': '⊐',
  '\\sqsubseteq': '⊑',
  '\\sqsupseteq': '⊒',
  '\\preceq': '⪯',
  '\\succeq': '⪰',
  '\\doteq': '≐',
  '\\equiv': '≡',
  '\\approx': '≈',
  '\\cong': '≅',
  '\\simeq': '≃',
  '\\sim': '∼',
  '\\propto': '∝',
  '\\neq': '≠',
  '\\parallel': '∥',
  '\\asymp': '≍',
  '\\vdash': '⊢',
  '\\in': '∈',
  '\\smile': '⌣',
  '\\models': '⊨',
  '\\perp': '⊥',
  '\\prec': '≺',
  '\\sphericalangle': '∢',
  '\\nparallel': '∦',
  '\\bowtie': '⋈',
  '\\dashv': '⊣',
  '\\ni': '∋',
  '\\frown': '⌢',
  '\\notin': '∉',
  '\\mid': '∣',
  '\\succ': '≻',
  '\\measuredangle': '∡',
  '\\pm': '±',
  '\\div': '÷',
  '\\times': '×',
  '\\cdot': '⋅',
  '\\mp': '∓'
}, _defineProperty(_$$$$$$$$$$$, '\\times', '×'), _defineProperty(_$$$$$$$$$$$, '\\ast', '∗'), _defineProperty(_$$$$$$$$$$$, '\\star', '⋆'), _defineProperty(_$$$$$$$$$$$, '\\dagger', '†'), _defineProperty(_$$$$$$$$$$$, '\\ddagger', '‡'), _defineProperty(_$$$$$$$$$$$, '\\cap', '∩'), _defineProperty(_$$$$$$$$$$$, '\\cup', '∪'), _defineProperty(_$$$$$$$$$$$, '\\uplus', '⊎'), _defineProperty(_$$$$$$$$$$$, '\\sqcap', '⊓'), _defineProperty(_$$$$$$$$$$$, '\\sqcup', '⊔'), _defineProperty(_$$$$$$$$$$$, '\\vee', '∨'), _defineProperty(_$$$$$$$$$$$, '\\wedge', '∧'), _defineProperty(_$$$$$$$$$$$, '\\diamond', '⋄'), _defineProperty(_$$$$$$$$$$$, '\\bigtriangleup', '△'), _defineProperty(_$$$$$$$$$$$, '\\bigtriangledown', '▽'), _defineProperty(_$$$$$$$$$$$, '\\triangleleft', '◃'), _defineProperty(_$$$$$$$$$$$, '\\triangleright', '▹'), _defineProperty(_$$$$$$$$$$$, '\\bigcirc', '◯'), _defineProperty(_$$$$$$$$$$$, '\\bullet', '∙'), _defineProperty(_$$$$$$$$$$$, '\\wr', '≀'), _defineProperty(_$$$$$$$$$$$, '\\oplus', '⊕'), _defineProperty(_$$$$$$$$$$$, '\\ominus', '⊖'), _defineProperty(_$$$$$$$$$$$, '\\otimes', '⊗'), _defineProperty(_$$$$$$$$$$$, '\\odot', '⊙'), _defineProperty(_$$$$$$$$$$$, '\\circ', '∘'), _defineProperty(_$$$$$$$$$$$, '\\setminus', '∖'), _defineProperty(_$$$$$$$$$$$, '\\amalg', '⨿'), _defineProperty(_$$$$$$$$$$$, '\\exists', '∃'), _defineProperty(_$$$$$$$$$$$, '\\nexists', '∄'), _defineProperty(_$$$$$$$$$$$, '\\forall', '∀'), _defineProperty(_$$$$$$$$$$$, '\\neg', '¬'), _defineProperty(_$$$$$$$$$$$, '\\land', '∧'), _defineProperty(_$$$$$$$$$$$, '\\lor', '∨'), _defineProperty(_$$$$$$$$$$$, '\\rightarrow', '→'), _defineProperty(_$$$$$$$$$$$, '\\leftarrow', '←'), _defineProperty(_$$$$$$$$$$$, '\\mapsto', '↦'), _defineProperty(_$$$$$$$$$$$, '\\implies', '⟹'), _defineProperty(_$$$$$$$$$$$, '\\Rightarrow', '⇒'), _defineProperty(_$$$$$$$$$$$, '\\leftrightarrow', '↔'), _defineProperty(_$$$$$$$$$$$, '\\iff', '⟺'), _defineProperty(_$$$$$$$$$$$, '\\Leftrightarrow', '⇔'), _defineProperty(_$$$$$$$$$$$, '\\top', '⊤'), _defineProperty(_$$$$$$$$$$$, '\\bot', '⊥'), _defineProperty(_$$$$$$$$$$$, '\\emptyset', '∅'), _defineProperty(_$$$$$$$$$$$, '\\varnothing', '∅'), _defineProperty(_$$$$$$$$$$$, '\\{', '{'), _defineProperty(_$$$$$$$$$$$, '\\uparrow', '↑'), _defineProperty(_$$$$$$$$$$$, '\\downarrow', '↓'), _defineProperty(_$$$$$$$$$$$, '\\|', '‖'), _defineProperty(_$$$$$$$$$$$, '\\}', '}'), _defineProperty(_$$$$$$$$$$$, '\\Uparrow', '⇑'), _defineProperty(_$$$$$$$$$$$, '\\Downarrow', '⇓'), _defineProperty(_$$$$$$$$$$$, '/', '/'), _defineProperty(_$$$$$$$$$$$, '\\angle', '∠'), _defineProperty(_$$$$$$$$$$$, '\\lceil', '⌈'), _defineProperty(_$$$$$$$$$$$, '\\lfloor', '⌊'), _defineProperty(_$$$$$$$$$$$, '\\backslash', '∖'), _defineProperty(_$$$$$$$$$$$, '\\rangle', '⟩'), _defineProperty(_$$$$$$$$$$$, '\\rceil', '⌉'), _defineProperty(_$$$$$$$$$$$, '\\rfloor', '⌋'), _$$$$$$$$$$$);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendElementAfter;
/**
 * Append an element after the referenced element.
 * 
 * @param {HTMLElement} $ref  
 * @param {HTMLElement} $new 
 * 
 * @return {Void}
 */
function appendElementAfter($ref, $new) {
  return $ref.parentNode.insertBefore($new, $ref.nextSibling);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyBackspace;

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _removeElement = __webpack_require__(6);

var _removeElement2 = _interopRequireDefault(_removeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Perform the "backspace" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {HTMLElement} $pos 
 * 
 * @return {Void}
 */
function applyBackspace($value, $pos) {
  if (!$pos) {
    return $pos;
  }

  var $parent = $pos.parentNode;

  switch ((0, _lcc2.default)($pos.tagName)) {
    case 'mrow':
      return applyBackspace($value, $parent);
    case 'math':
      return $pos;
  }

  var $newPos = $pos.previousElementSibling || (!(0, _lcc2.default)($parent.tagName, 'math') ? $parent : null);

  (0, _removeElement2.default)($pos);

  return $newPos;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mathJaxEditor = __webpack_require__(16);

var _mathJaxEditor2 = _interopRequireDefault(_mathJaxEditor);

__webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mathJaxEditor2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editor = __webpack_require__(17);

var _editor2 = _interopRequireDefault(_editor);

var _appendElement = __webpack_require__(5);

var _appendElement2 = _interopRequireDefault(_appendElement);

var _createElement = __webpack_require__(7);

var _createElement2 = _interopRequireDefault(_createElement);

var _extraOperatorList = __webpack_require__(49);

var _extraOperatorList2 = _interopRequireDefault(_extraOperatorList);

var _identifierList = __webpack_require__(10);

var _identifierList2 = _interopRequireDefault(_identifierList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathJaxEditor = function () {
  /**
   * The surface that interacts with the Editor class.
   * 
   * @param {String|Node} selectors 
   * @param {Object} [options]
   * @param {Boolean} [options.allowNewlines=false]
   * @param {String} [options.placeholder="Start typing..."]
   * 
   * @constructor
   */
  function MathJaxEditor(selectors) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MathJaxEditor);

    this.core = new _editor2.default(selectors, options);
    this.version = '2.0.0-beta2';

    this.core.on('@input', this.insert.bind(this));
  }

  /**
   * Insert a number in the editor.
   * 
   * @param {Number} n
   * 
   * @return {Void}
   */


  _createClass(MathJaxEditor, [{
    key: 'insertNumber',
    value: function insertNumber(n) {
      if (n < 0 || n > 9) {
        throw new RangeError('MathjaxEditor: The number must be 0 or up to 9.');
      }

      var $mn = (0, _createElement2.default)('mn', { _html: n });
      this.core.insert($mn);
    }

    /**
     * Insert a identifier in the editor.
     * 
     * @param {String} i
     * 
     * @return {Void}
     */

  }, {
    key: 'insertIdentifier',
    value: function insertIdentifier(i) {
      if (typeof i !== 'string' && !i.match(/^[a-zA-Z\\]+$/)) {
        throw new RangeError('MathjaxEditor: A string with alphabetic characters should be given.');
      }
      if (!_identifierList2.default[i]) {
        if (i[0] !== '\\') {
          return this.insertIdentifier('\\' + i);
        } else {
          i = i.substr(1);
        }
      } else {
        i = _identifierList2.default[i];
      }

      var $mi = (0, _createElement2.default)('mi', { _html: i });

      this.core.insert($mi);
    }

    /**
     * Insert a fraction in the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertFraction',
    value: function insertFraction() {
      var $mfrac = (0, _createElement2.default)('mfrac');
      var $mrowNum = (0, _createElement2.default)('mrow');
      var $mrowDen = (0, _createElement2.default)('mrow');

      (0, _appendElement2.default)($mfrac, $mrowNum, $mrowDen);

      this.core.insert($mfrac, $mrowNum);
    }

    /**
     * Insert a square root on the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertSqrt',
    value: function insertSqrt() {
      var $msqrt = (0, _createElement2.default)('msqrt');
      var $mrow = (0, _createElement2.default)('mrow');

      (0, _appendElement2.default)($msqrt, $mrow);

      this.core.insert($msqrt, $mrow);
    }

    /**
     * Insert a nth root on the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertRoot',
    value: function insertRoot() {
      var $mroot = (0, _createElement2.default)('mroot');
      var $mrowRadicand = (0, _createElement2.default)('mrow');
      var $mrowIndex = (0, _createElement2.default)('mrow');

      (0, _appendElement2.default)($mroot, $mrowRadicand, $mrowIndex);

      this.core.insert($mroot, $mrowRadicand, $mrowIndex);
    }

    /**
     * Insert a operator in the editor.
     * 
     * @param {String} o
     * 
     * @return {Void}
     */

  }, {
    key: 'insertOperator',
    value: function insertOperator(o) {
      if (!_extraOperatorList2.default[o]) {
        if (o[0] !== '\\\\') {
          return this.insertOperator('\\' + o);
        }
        throw new TypeError('MathjaxEditor: Unknown operator "' + o + '"');
      }

      var $mo = (0, _createElement2.default)('mo', {
        _html: _extraOperatorList2.default[o]
      });

      this.core.insert($mo);
    }

    /**
     * Insert a superscript in the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertSuperscript',
    value: function insertSuperscript() {
      var $msup = (0, _createElement2.default)('msup');
      var $mrowBase = (0, _createElement2.default)('mrow');
      var $mrowPower = (0, _createElement2.default)('mrow');

      (0, _appendElement2.default)($msup, $mrowBase, $mrowPower);

      this.core.insert($msup, $mrowBase);
    }

    /**
     * Insert a subscript in the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertSubscript',
    value: function insertSubscript() {
      var $msub = (0, _createElement2.default)('msub');
      var $mrowBase = (0, _createElement2.default)('mrow');
      var $mrowSequence = (0, _createElement2.default)('mrow');

      (0, _appendElement2.default)($msub, $mrowBase, $mrowSequence);

      this.core.insert($msub, $mrowBase);
    }

    /**
     * Insert a newline in the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertNewline',
    value: function insertNewline() {
      return this.core.insertNewline();
    }

    /**
     * This method is not actually meant to be used, it is here to
     * handle the @input event when the user types in the editor's
     * input element.
     * 
     * @param {String} what 
     * 
     * @return {Void}
     */

  }, {
    key: 'insert',
    value: function insert(what) {
      if (what.match(/^[0-9]$/)) {
        return this.insertNumber(parseInt(what, 10));
      }
      if (what.match(/^[a-zA-Z\\]+$/)) {
        return this.insertIdentifier(what);
      }
      if (_extraOperatorList2.default[what]) {
        return this.insertOperator(what);
      }
      console.warn('MathjaxEditor: insert: unknown "' + what + '"');
    }

    /**
     * Move the cursor to the left.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveCursorLeft',
    value: function moveCursorLeft() {
      return this.core.cursor.moveLeft();
    }

    /**
     * Move the cursor to the right.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveCursorRight',
    value: function moveCursorRight() {
      return this.core.cursor.moveRight();
    }

    /**
     * Get the value of the editor as string.
     * 
     * @return {String}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.core.toString();
    }

    /**
     * Get the value of the editor as a tex string.
     * 
     * @return {String}
     */

  }, {
    key: 'toTex',
    value: function toTex() {
      return this.core.toTex();
    }

    /**
     * Get the value of the editor (a copy).
     * 
     * @return {HTMLElement}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.core.getValue();
    }

    /**
     * Set the value of the editor.
     * 
     * @param {HTMLElement} $value
     * 
     * @return {Void}
     */

  }, {
    key: 'setValue',
    value: function setValue($value) {
      return this.core.setValue($value);
    }

    /**
     * Focus the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'focus',
    value: function focus() {
      return this.core.focus();
    }

    /**
     * Listen to an editor event.
     * 
     * @param {String} type 
     * @param {Function} listener 
     */

  }, {
    key: 'on',
    value: function on(type, listener) {
      return this.core.on(type, listener);
    }

    /**
     * Perform a "backspace" deletion.
     * 
     * @return {Void}
     */

  }, {
    key: 'backspaceRemove',
    value: function backspaceRemove() {
      return this.core.backspaceRemove();
    }

    /**
     * Perform a "delete" deletion.
     * 
     * @return {Void}
     */

  }, {
    key: 'deleteRemove',
    value: function deleteRemove() {
      return this.core.deleteRemove();
    }

    /**
     * Remove the editor element and event listeners.
     * 
     * @return {Void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      return this.core.destroy();
    }
  }]);

  return MathJaxEditor;
}();

exports.default = MathJaxEditor;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debounce = __webpack_require__(18);

var _debounce2 = _interopRequireDefault(_debounce);

var _blinker = __webpack_require__(19);

var _blinker2 = _interopRequireDefault(_blinker);

var _cursor = __webpack_require__(20);

var _cursor2 = _interopRequireDefault(_cursor);

var _cursorMover = __webpack_require__(21);

var _cursorMover2 = _interopRequireDefault(_cursorMover);

var _eventEmitter = __webpack_require__(22);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _rendered = __webpack_require__(23);

var _rendered2 = _interopRequireDefault(_rendered);

var _tree = __webpack_require__(26);

var _tree2 = _interopRequireDefault(_tree);

var _mml2tex = __webpack_require__(27);

var _mml2tex2 = _interopRequireDefault(_mml2tex);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

var _addClass = __webpack_require__(2);

var _addClass2 = _interopRequireDefault(_addClass);

var _appendElement = __webpack_require__(5);

var _appendElement2 = _interopRequireDefault(_appendElement);

var _appendElementAfter = __webpack_require__(13);

var _appendElementAfter2 = _interopRequireDefault(_appendElementAfter);

var _applyDelete = __webpack_require__(33);

var _applyDelete2 = _interopRequireDefault(_applyDelete);

var _applyBackspace = __webpack_require__(14);

var _applyBackspace2 = _interopRequireDefault(_applyBackspace);

var _createElement = __webpack_require__(7);

var _createElement2 = _interopRequireDefault(_createElement);

var _findTextarea = __webpack_require__(34);

var _findTextarea2 = _interopRequireDefault(_findTextarea);

var _getElementJax = __webpack_require__(35);

var _getElementJax2 = _interopRequireDefault(_getElementJax);

var _getCleanCopy = __webpack_require__(39);

var _getCleanCopy2 = _interopRequireDefault(_getCleanCopy);

var _hideElement = __webpack_require__(40);

var _hideElement2 = _interopRequireDefault(_hideElement);

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _listenElement = __webpack_require__(41);

var _listenElement2 = _interopRequireDefault(_listenElement);

var _px = __webpack_require__(9);

var _px2 = _interopRequireDefault(_px);

var _prependElement = __webpack_require__(42);

var _prependElement2 = _interopRequireDefault(_prependElement);

var _removeClass = __webpack_require__(8);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _removeElement = __webpack_require__(6);

var _removeElement2 = _interopRequireDefault(_removeElement);

var _showElement = __webpack_require__(43);

var _showElement2 = _interopRequireDefault(_showElement);

var _scrollTo = __webpack_require__(44);

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _toDisplay = __webpack_require__(45);

var _toDisplay2 = _interopRequireDefault(_toDisplay);

var _toDom = __webpack_require__(47);

var _toDom2 = _interopRequireDefault(_toDom);

var _unlistenElement = __webpack_require__(48);

var _unlistenElement2 = _interopRequireDefault(_unlistenElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Editor = function () {
  /**
   * This is the main class of the Editor. 
   * 
   * @param {String|HTMLElement} selectors 
   * @param {Object} [options] 
   * @param {Boolean} [options.allowNewlines=false]
   * @param {String} [options.placeholder="Start typing..."]
   * 
   * @constructor
   */
  function Editor(selectors) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Editor);

    this.$el = (0, _findTextarea2.default)(selectors);
    this.$value = (0, _createElement2.default)('math');
    this.$input = (0, _createElement2.default)('input', 'mathjax-editor-input');
    this.$container = (0, _createElement2.default)('div', 'mathjax-editor-container');
    this.$display = (0, _createElement2.default)('div', 'mathjax-editor-display');
    this.$wrapper = (0, _createElement2.default)('div');
    this.$caret = (0, _createElement2.default)('div', 'mathjax-editor-caret');
    this.focused = false;
    this.mouseAtDisplay = false;
    this.emitter = new _eventEmitter2.default();
    this.tree = new _tree2.default(this.$value);
    this.rendered = new _rendered2.default(this.$display, this.tree);
    this.cursor = new _cursor2.default(this.tree, this.rendered, this.$caret);
    this.cursorMover = new _cursorMover2.default(this.tree, this.rendered, this.cursor);
    this.blinker = new _blinker2.default(this.$caret);
    this.placeholder = options.placeholder || 'Start typing...';
    this.allowNewlines = options.allowNewlines || false;
    this.handleResize = (0, _debounce2.default)(this.handleResize.bind(this), 25);
    this.scrollToCaret = this.scrollToCaret.bind(this);

    (0, _hideElement2.default)(this.$caret);
    (0, _hideElement2.default)(this.$el);
    (0, _appendElement2.default)(this.$wrapper, this.$value);
    (0, _appendElement2.default)(this.$display, this.$wrapper, this.$caret);
    (0, _appendElement2.default)(this.$container, this.$display, this.$input);
    (0, _appendElementAfter2.default)(this.$el, this.$container);
    (0, _getElementJax2.default)(this.$display).then(function (elementJax) {
      _this.elementJax = elementJax;
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
    (0, _listenElement2.default)(this.$display, 'scroll', this.handleResize);
    (0, _listenElement2.default)(window, 'resize', this.handleResize);
  }

  /**
   * Handle the click event on the display.
   * 
   * @param {e} ClickEvent
   * 
   * @return {Void}
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

    /**
     * Handle the focus event on the input.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.emitter.emit('focus');
      this.focused = true;
      (0, _addClass2.default)(this.$display, 'is-focused');
      (0, _showElement2.default)(this.$caret);
    }

    /**
     * Handle the blur event on the input.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      if (this.mouseAtDisplay) {
        return;
      }
      this.emitter.emit('blur');
      this.focused = false;
      (0, _removeClass2.default)(this.$display, 'is-focused');
      (0, _hideElement2.default)(this.$caret);
    }

    /**
     * Handle the keyup/keydown event on the input.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleInput',
    value: function handleInput() {
      var input = this.$input.value.trim();
      this.$input.value = '';
      if (input.length) {
        this.emitter.emit('@input', input);
      }
    }

    /**
     * Handle the mouseenter event on the display.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleMouseenter',
    value: function handleMouseenter() {
      this.mouseAtDisplay = true;
    }

    /**
     * Handle the mouseleave event on the display.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleMouseleave',
    value: function handleMouseleave() {
      this.mouseAtDisplay = false;
    }

    /**
     * Handle the keydown event in the input.
     * 
     * @param {KeyboardEvent} e
     * 
     * @return {Void}
     */

  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      switch (e.which) {
        case 8:
          return this.backspaceRemove();
        case 13:
          return this.insertNewline();
        case 37:
          return this.cursor.moveLeft();
        case 39:
          return this.cursor.moveRight();
        case 46:
          return this.deleteRemove();
        // default: console.log(e.which)
      }
    }

    /**
     * Update the editor when the window is resized.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleResize',
    value: function handleResize() {
      this.update();
    }

    /**
     * Scroll the editor display to where the caret element is located.
     * 
     * @return {Void}
     */

  }, {
    key: 'scrollToCaret',
    value: function scrollToCaret() {
      (0, _scrollTo2.default)(this.$display, this.$caret);
    }

    /**
     * Update the editor tree, display, and cursor stuff.
     * 
     * @return {Promise}
     */

  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      return new _promise2.default(function (resolve) {
        if (!_this2.elementJax) {
          return resolve();
        }
        var value = _this2.getValue().outerHTML;
        _this2.$wrapper.style.width = (0, _px2.default)(_this2.$wrapper.clientWidth);
        _this2.$wrapper.style.height = (0, _px2.default)(_this2.$wrapper.clientHeight);
        _this2.$el.value = value;
        _this2.emitter.emit('update', value);
        _this2.tree.setValue(_this2.$value);
        _this2.tree.update();
        _this2.elementJax.setValue((0, _toDisplay2.default)(_this2.$value, _this2.placeholder)).update().then(function () {
          _this2.$wrapper.style.width = null;
          _this2.$wrapper.style.height = null;
          _this2.rendered.update();
          _this2.cursor.update();
          resolve();
        });
      });
    }

    /**
     * Apply a "backspace" deletion.
     * 
     * @return {Void}
     */

  }, {
    key: 'backspaceRemove',
    value: function backspaceRemove() {
      this.cursor.setPosition((0, _applyBackspace2.default)(this.$value, this.cursor.getPosition()));
      this.update().then(this.scrollToCaret);
    }

    /**
     * Apply a "delete" deletion.
     * 
     * @return {Void}
     */

  }, {
    key: 'deleteRemove',
    value: function deleteRemove() {
      this.cursor.setPosition((0, _applyDelete2.default)(this.$value, this.cursor.getPosition()));
      this.update().then(this.scrollToCaret);
    }

    /**
     * Insert an element at current cursor position.
     * 
     * @param {HTMLElement} $el  
     * @param {HTMLElement} [$moveTo]
     * 
     * @return {Void}
     */

  }, {
    key: 'insert',
    value: function insert($el) {
      var $moveTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var $position = this.cursor.getPosition();

      if (!$position) {
        (0, _prependElement2.default)(this.$value, $el);
      } else {
        switch ((0, _lcc2.default)($position.tagName)) {
          case 'mrow':
            (0, _prependElement2.default)($position, $el);break;
          case 'math':
            (0, _appendElement2.default)(this.$value, $el);break;
          default:
            (0, _appendElementAfter2.default)($position, $el);
        }
      }

      this.cursor.setPosition($moveTo || $el);
      this.focus();
      this.update().then(this.scrollToCaret);
    }

    /**
     * Insert a newline in the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'insertNewline',
    value: function insertNewline() {
      if (!this.allowNewlines) {
        return;
      }
      var $position = this.cursor.getPosition();
      if ($position && !(0, _lcc2.default)($position.tagName, 'math') && !(0, _lcc2.default)($position.parentNode.tagName, 'math')) {
        return;
      }

      var $mspace = (0, _createElement2.default)('mspace', {
        linebreak: 'newline'
      });

      this.insert($mspace);
    }

    /**
     * Listen to an event of the editor.
     * 
     * @param {String} type 
     * @param {Function} listener
     * 
     * @return {Void}
     */

  }, {
    key: 'on',
    value: function on(type, listener) {
      return this.emitter.on(type, listener);
    }

    /**
     * Focus the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'focus',
    value: function focus() {
      return this.$input.focus();
    }

    /**
     * Get the value of the editor as string.
     * 
     * @return {String}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.getValue().outerHTML;
    }

    /**
     * Get the value of the editor as a tex string.
     * 
     * @return {String}
     */

  }, {
    key: 'toTex',
    value: function toTex() {
      return (0, _mml2tex2.default)(this.$value);
    }

    /**
     * Get the value of the editor (a copy).
     * 
     * @return {HTMLElement}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return (0, _getCleanCopy2.default)(this.$value);
    }

    /**
     * Set the value of the editor.
     * 
     * @param {HTMLElement} $value
     * 
     * @return {Void}
     */

  }, {
    key: 'setValue',
    value: function setValue($value) {
      if (typeof $value === 'string') {
        $value = (0, _toDom2.default)($value);
      }
      if ($value.nodeType !== 1 || !(0, _lcc2.default)($value.tagName, 'math')) {
        throw new Error('MathjaxEditor: the value must be an <math> element.');
      }
      this.$value = $value;
      this.cursor.setPosition(null);
      this.update();
    }

    /**
     * Remove the editor element and event listeners.
     * 
     * @return {Void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.blinker.destroy();
      (0, _removeElement2.default)(this.$container);
      (0, _unlistenElement2.default)(window, 'resize', this.handleResize);
    }
  }]);

  return Editor;
}();

exports.default = Editor;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addClass = __webpack_require__(2);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(8);

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blinker = function () {
  /**
   * This class handles the animation of the caret element.
   * 
   * @param {HTMLElement} $caret
   * 
   * @constructor
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

  /**
   * Stops the animation.
   * 
   * @return {Void}
   */


  _createClass(Blinker, [{
    key: 'destroy',
    value: function destroy() {
      clearInterval(this.id);
    }

    /**
     * Freezes the animation temporarily.
     * 
     * @return {Void}
     */

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _px = __webpack_require__(9);

var _px2 = _interopRequireDefault(_px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function () {
  /**
   * This class handles the cursor positioning.
   * 
   * @param {Tree} tree 
   * @param {Rendered} rendered 
   * @param {HTMLElement} $caret
   * 
   * @constructor
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
   * Get the client rect bounding of the caret element.
   * 
   * @return {ClientRect}
   */


  _createClass(Cursor, [{
    key: 'getCaretBounding',
    value: function getCaretBounding() {
      return this.$caret.getBoundingClientRect();
    }

    /**
     * Get current cursor position.
     * 
     * @return {HTMLElement}
     */

  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.$position;
    }

    /**
     * Set the cursor position.
     * 
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

    /**
     * Get the element of the left side of the cursor.
     * 
     * @return {HTMLElement}
     */

  }, {
    key: 'getLeft',
    value: function getLeft() {
      if (!this.$position) {
        return null;
      }
      var path = this.tree.getPath();
      var index = path.indexOf(this.$position);
      return path[index - 1];
    }

    /**
     * Get the element of the right side of the cursor.
     * 
     * @return {HTMLElement}
     */

  }, {
    key: 'getRight',
    value: function getRight() {
      var path = this.tree.getPath();
      if (!this.$position) {
        var $first = path[1];
        if (!(0, _lcc2.default)($first.tagName, 'math')) {
          return $first;
        }
      } else {
        var index = path.indexOf(this.$position);
        var $next = path[index + 1];
        var isMath = (0, _lcc2.default)($next.tagName, 'math');
        var isParent = this.$position.parentNode === $next;
        if ($next && !(isMath && isParent)) {
          return $next;
        }
      }
      return this.$position;
    }

    /**
     * Move the cursor to the left.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      if (!this.$position) {
        return this.update();
      }
      this.$position = this.getLeft();
      this.update();
    }

    /**
     * Move the cursor to the right.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveRight',
    value: function moveRight() {
      this.$position = this.getRight();
      this.update();
    }

    /**
     * Update the caret element position on the display.
     * 
     * @return {Void}
     */

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CursorMover = function () {
  /**
   * This class handles where the cursor should be placed
   * when the user clicks the display.
   * 
   * @param {Tree} tree
   * @param {Rendered} rendered
   * @param {Cursor} cursor
   * 
   * @constructor
   */
  function CursorMover(tree, rendered, cursor) {
    _classCallCheck(this, CursorMover);

    /** @type {Tree} */
    this.tree = tree;
    /** @type {Rendered} */
    this.rendered = rendered;
    /** @type {Cursor} */
    this.cursor = cursor;
  }

  /**
   * Perform the calculation to determine where the cursor
   * should be placed.
   * 
   * @param {Number} x
   * @param {Number} y
   * 
   * @return {Void}
   */


  _createClass(CursorMover, [{
    key: 'click',
    value: function click(x, y) {
      var shortest = Infinity;
      var $set = null;

      // Here we check if the (x, y) is outside the boundings
      // of the lines, so the cursor can be placed at the first element
      // or last element of a line.

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

        // Dunno how much expensive getBoundingClientRect is, but
        // this seems to be the best solution I had to deal with
        // proper cursor placement without doing tricky code.

        // We basically set the cursor to every possible place it
        // can be at, then we calculate its distance to the given
        // x and y. The shortest to that coordinate will determine
        // where it should be placed.
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

          if ($el && (0, _lcc2.default)($el.tagName, 'math')) {
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  /**
   * This class is a simple event emitter.
   * 
   * @constructor
   */
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.listeners = {};
  }

  /**
   * Listen to an event.
   * 
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
     * Emit an event.
     * 
     * @param {String} type 
     * @param {...*} rest
     * 
     * @return {Void}
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = __webpack_require__(24);

var _element2 = _interopRequireDefault(_element);

var _line = __webpack_require__(25);

var _line2 = _interopRequireDefault(_line);

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _toArray = __webpack_require__(1);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rendered = function () {
  /**
   * This class matches every element of the editor's value to its
   * rendered element by MathJax.
   * 
   * @param {HTMLElement} $display
   * @param {Tree} tree
   * 
   * @constructor
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
   * Get the lines.
   * 
   * @return {Array}
   */


  _createClass(Rendered, [{
    key: 'getLines',
    value: function getLines() {
      return this.lines;
    }

    /**
     * Get the elements.
     * 
     * @return {Array}
     */

  }, {
    key: 'getElements',
    value: function getElements() {
      return this.elements;
    }

    /**
     * Find the rendered line elements.
     * 
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
     * Find a rendered element.
     * 
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
     * Find an element.
     * 
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

    /**
     * Catch all rendered elements and lines of the display.
     * 
     * @return {Void}
     */

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

          if ($el && (0, _lcc2.default)($el.tagName, 'mspace')) {
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
  /**
   * This class makes a connection between an actual element
   * of the editor's value and the rendered element by MathJax.
   * 
   * @param {HTMLElement}  $el
   * @param {HTMLElement}  $rendered
   * 
   * @constructor
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
   * Get the element.
   * 
   * @return {HTMLElement}
   */


  _createClass(Element, [{
    key: 'getElement',
    value: function getElement() {
      return this.$el;
    }

    /**
     * Get the tag name of the element.
     * 
     * @return {String}
     */

  }, {
    key: 'getTagName',
    value: function getTagName() {
      if (!this.$el) {
        return 'null';
      }
      return (0, _lcc2.default)(this.$el.tagName);
    }

    /**
     * Check the element's tag name.
     * 
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
     * Check if the element has children.
     * 
     * @return {Boolean}
     */

  }, {
    key: 'hasChildren',
    value: function hasChildren() {
      return !!this.$el.children.length;
    }

    /**
     * Get the last child of the element.
     * 
     * @return {Null|HTMLElement}
     */

  }, {
    key: 'getLastChild',
    value: function getLastChild() {
      return this.$el.children[this.$el.children.length - 1];
    }

    /**
     * Determines the position of the caret on the display based
     * on the position of this rendered element on the display.
     * 
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

      if (this.isTagName('mrow')) {
        var styles = window.getComputedStyle(this.$rendered);
        var paddingLeft = parseFloat(styles.paddingLeft);
        return {
          top: 0,
          left: paddingLeft,
          height: this.height,
          $parent: this.$rendered
        };
      }
      if ((0, _lcc2.default)(this.$el.parentNode.tagName, 'mrow')) {
        var parent = this.rendered.findElement(this.$el.parentNode);
        height = parent.$rendered.clientHeight;
      }
      return {
        top: 0,
        left: this.left + this.width,
        height: height,
        $parent: this.$rendered.parentNode
      };
    }
  }]);

  return Element;
}();

exports.default = Element;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
  /**
   * This class represents a line of the editor.
   * 
   * @constructor
   */
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
   * Set the rendered line.
   * 
   * @param {HTMLElement} $rendered
   * 
   * @return {Void}
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
     * Get the first element of this line.
     * 
     * @return {Element}
     */

  }, {
    key: 'getFirstElement',
    value: function getFirstElement() {
      return this.elements[0];
    }

    /**
     * Get the last element of this line.
     * 
     * @return {Element}
     */

  }, {
    key: 'getLastElement',
    value: function getLastElement() {
      var element = void 0;
      var i = this.elements.length - 1;
      while (element = this.elements[i--]) {
        if (!element.isTagName('math')) {
          return element;
        }
      }
      return null;
    }

    /**
     * Check if the given y is between this line y1 and y2.
     * 
     * @param {Number} y
     * 
     * @return {Boolean}
     */

  }, {
    key: 'betweenYAxis',
    value: function betweenYAxis(y) {
      return y > this.y1 && y < this.y2;
    }

    /**
     * Check if the given x is between this line x1 and x2.
     * 
     * @param {Number} x
     * 
     * @return {Boolean}
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _toArray = __webpack_require__(1);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  /**
   * This class walks through the editor's value and creates
   * a path for the cursor. Also, it sets an id for each
   * element of the value, so we can find them later on Rendered class.
   * 
   * @param {HTMLElement} $value 
   * 
   * @constructor
   */
  function Tree($value) {
    _classCallCheck(this, Tree);

    this.$value = $value;
    this.path = [];
    this.nextId = 0;

    this.update();
  }

  /**
   * Change the value of the tree.
   * 
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
     * Get the cursor path.
     * 
     * @return {Array}
     */

  }, {
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }

    /**
     * Walk through the valeu and set an id to the elements
     * that don't have one.
     * 
     * @return {Void}
     */

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

        if (children.length && !(0, _lcc2.default)($el.tagName, 'mrow')) {
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mml2Tex;

var _identifierList = __webpack_require__(10);

var _identifierList2 = _interopRequireDefault(_identifierList);

var _operatorList = __webpack_require__(11);

var _operatorList2 = _interopRequireDefault(_operatorList);

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _reverseObject = __webpack_require__(28);

var _reverseObject2 = _interopRequireDefault(_reverseObject);

var _toArray = __webpack_require__(1);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REVERSE_IDENTIFIER_LIST = (0, _reverseObject2.default)(_identifierList2.default);
var REVERSE_OPERATOR_LIST = (0, _reverseObject2.default)(_operatorList2.default);

/**
 * A basic basic basic MathML to Tex conversor.
 * 
 * @param {HTMLElement}  
 * 
 * @return {String}
 */
function mml2Tex($value) {
  var output = '';

  /** @param {HTMLElement} $el */
  var walk = function walk($el) {
    var children = $el.children;
    var innerValue = $el.innerHTML;
    var tagName = (0, _lcc2.default)($el.tagName);
    var fromList = void 0;

    switch (tagName) {
      case 'math':
      case 'msup':
      case 'msub':
        break;
      case 'mn':
        output += innerValue;
        break;
      case 'mi':
        if (fromList = REVERSE_IDENTIFIER_LIST[innerValue]) {
          output += fromList + (fromList[0] === '\\' ? ' ' : '');
        } else {
          output += innerValue;
        }
        break;
      case 'mo':
        if (fromList = REVERSE_OPERATOR_LIST[innerValue]) {
          output += fromList + (fromList[0] === '\\' ? ' ' : '');
        } else {
          output += '?';
        }
        break;
      case 'mrow':
        output = output.trim() + '{';
        break;
      case 'mspace':
        switch ($el.getAttribute('linebreak')) {
          case 'newline':
            output += '\\\\';
            break;
        }
        break;
      case 'mroot':
        output += '\\sqrt';
        break;
      default:
        output += '\\' + tagName.substr(1) + ' ';
        break;
    }

    switch (tagName) {
      case 'mroot':
        output += '[';
        walk(children[1]);
        output += ']';
        walk(children[0]);
        break;
      default:
        (0, _toArray2.default)(children).forEach(function ($child) {
          return walk($child);
        });
    }

    switch (tagName) {
      case 'mrow':
        output += '}';

        if ($el.parentNode.firstElementChild === $el) {
          switch ((0, _lcc2.default)($el.parentNode.tagName)) {
            case 'msup':
              output += '^';
              break;
            case 'msub':
              output += '_';
              break;
          }
        }
        break;
    }
  };

  walk($value);

  return output;
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverseObject;
/**
 * Keys trade places with values. So a key will turn into a value,
 * and its value will be its key.
 * 
 * @param {Object} obj 
 * 
 * @return {Object}
 */
function reverseObject(obj) {
  var keys = Object.keys(obj);
  var output = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = obj[key];
      output[value] = key;
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

  return output;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/**@license MIT-promiscuous-©Ruben Verborgh*/
(function (func, obj) {
  // Type checking utility function
  function is(type, item) { return (typeof item)[0] == type; }

  // Creates a promise, calling callback(resolve, reject), ignoring other parameters.
  function Promise(callback, handler) {
    // The `handler` variable points to the function that will
    // 1) handle a .then(resolved, rejected) call
    // 2) handle a resolve or reject call (if the first argument === `is`)
    // Before 2), `handler` holds a queue of callbacks.
    // After 2), `handler` is a finalized .then handler.
    handler = function pendingHandler(resolved, rejected, value, queue, then, i) {
      queue = pendingHandler.q;

      // Case 1) handle a .then(resolved, rejected) call
      if (resolved != is) {
        return Promise(function (resolve, reject) {
          queue.push({ p: this, r: resolve, j: reject, 1: resolved, 0: rejected });
        });
      }

      // Case 2) handle a resolve or reject call
      // (`resolved` === `is` acts as a sentinel)
      // The actual function signature is
      // .re[ject|solve](<is>, success, value)

      // Check if the value is a promise and try to obtain its `then` method
      if (value && (is(func, value) | is(obj, value))) {
        try { then = value.then; }
        catch (reason) { rejected = 0; value = reason; }
      }
      // If the value is a promise, take over its state
      if (is(func, then)) {
        try { then.call(value, transferState(1), rejected = transferState(0)); }
        catch (reason) { rejected(reason); }
      }
      // The value is not a promise; handle resolve/reject
      else {
        // Replace this handler with a finalized resolved/rejected handler
        handler = function (Resolved, Rejected) {
          // If the Resolved or Rejected parameter is not a function,
          // return the original promise (now stored in the `callback` variable)
          if (!is(func, (Resolved = rejected ? Resolved : Rejected)))
            return callback;
          // Otherwise, return a finalized promise, transforming the value with the function
          return Promise(function (resolve, reject) { finalize(this, resolve, reject, value, Resolved); });
        };
        // Resolve/reject pending callbacks
        i = 0;
        while (i < queue.length) {
          then = queue[i++];
          // If no callback, just resolve/reject the promise
          if (!is(func, resolved = then[rejected]))
            (rejected ? then.r : then.j)(value);
          // Otherwise, resolve/reject the promise with the result of the callback
          else
            finalize(then.p, then.r, then.j, value, resolved);
        }
      }
      // Returns a function that transfers the state of the promise
      function transferState(resolved) {
        return function (value) { then && (then = 0, pendingHandler(is, resolved, value)); };
      }
    };
    // The queue of pending callbacks; garbage-collected when handler is resolved/rejected
    handler.q = [];

    // Create and return the promise (reusing the callback variable)
    callback.call(callback = { then:    function (resolved, rejected) { return handler(resolved, rejected); },
                               "catch": function (rejected)           { return handler(0,        rejected); } },
                  function (value)  { handler(is, 1,  value); },
                  function (reason) { handler(is, 0, reason); });
    return callback;
  }

  // Finalizes the promise by resolving/rejecting it with the transformed value
  function finalize(promise, resolve, reject, value, transform) {
    setImmediate(function () {
      try {
        // Transform the value through and check whether it's a promise
        value = transform(value);
        transform = value && (is(obj, value) | is(func, value)) && value.then;
        // Return the result if it's not a promise
        if (!is(func, transform))
          resolve(value);
        // If it's a promise, make sure it's not circular
        else if (value == promise)
          reject(TypeError());
        // Take over the promise's state
        else
          transform.call(value, resolve, reject);
      }
      catch (error) { reject(error); }
    });
  }

  // Export the main module
  module.exports = Promise;

  // Creates a resolved promise
  Promise.resolve = ResolvedPromise;
  function ResolvedPromise(value) { return Promise(function (resolve) { resolve(value); }); }

  // Creates a rejected promise
  Promise.reject = function (reason) { return Promise(function (resolve, reject) { reject(reason); }); };

  // Transforms an array of promises into a promise for an array
  Promise.all = function (promises) {
    return Promise(function (resolve, reject, count, values) {
      // Array of collected values
      values = [];
      // Resolve immediately if there are no promises
      count = promises.length || resolve(values);
      // Transform all elements (`map` is shorter than `forEach`)
      promises.map(function (promise, index) {
        ResolvedPromise(promise).then(
          // Store the value and resolve if it was the last
          function (value) {
            values[index] = value;
            --count || resolve(values);
          },
          // Reject if one element fails
          reject);
      });
    });
  };

  // Returns a promise that resolves or rejects as soon as one promise in the array does
  Promise.race = function (promises) {
    return Promise(function (resolve, reject) {
      // Register to all promises in the array
      promises.map(function (promise) {
        ResolvedPromise(promise).then(resolve, reject);
      });
    });
  };
})('f', 'o');

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30).setImmediate))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(31);
var global = __webpack_require__(32);
exports.setImmediate = global.setImmediate;
exports.clearImmediate = global.clearImmediate;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(12)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyDelete;

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _removeElement = __webpack_require__(6);

var _removeElement2 = _interopRequireDefault(_removeElement);

var _applyBackspace = __webpack_require__(14);

var _applyBackspace2 = _interopRequireDefault(_applyBackspace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Perform the "delete" deletion on the given value and
 * current cursor position.
 * 
 * @param {HTMLElement} $value
 * @param {HTMLElement} $pos 
 * 
 * @return {Void}
 */
function applyDelete($value, $pos) {
  if (!$pos) {
    return (0, _applyBackspace2.default)($value, $value.firstElementChild);
  }

  var $parent = $pos.parentNode;

  switch ((0, _lcc2.default)($pos.tagName)) {
    case 'mrow':
      return (0, _applyBackspace2.default)($value, $pos.firstElementChild || $parent);
  }

  if (!$pos.nextElementSibling) {
    if ((0, _lcc2.default)($parent.tagName, 'math')) {
      return $pos;
    }
    return (0, _applyBackspace2.default)($value, $parent);
  }

  (0, _removeElement2.default)($pos.nextElementSibling);

  return $pos;
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTextarea;
/**
 * Find the textarea with the given selector. Just one textarea will be
 * picked by this function, so the first found one.
 * 
 * @param {String|HTMLElement} selectors
 * 
 * @return {HTMLElement}
 */
function findTextarea(selectors) {
  var $el = typeof selectors === 'string' ? document.querySelector(selectors) : selectors.nodeType === 1 ? selectors : null;

  if (!$el) {
    throw new ReferenceError('MathjaxEditor: Target TEXTAREA was not found.');
  }

  if ($el.tagName !== 'TEXTAREA') {
    throw new TypeError('MathjaxEditor: Target element must be a TEXTAREA.');
  }

  return $el;
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getElementJax;

var _elementJax = __webpack_require__(36);

var _elementJax2 = _interopRequireDefault(_elementJax);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function will catch the MathJax's ElementJax inside the
 * editor's display, so we can quickly update the math.
 * 
 * @see http://docs.mathjax.org/en/latest/api/elementjax.html
 * 
 * @param {HTMLElement} $el
 * @param {Function} callback
 * 
 * @return {Void}
 */
function getElementJax($el, callback) {
  var placeholder = '<math><mo>...</mo></math>';

  return new _promise2.default(function (resolve) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $el, function () {
      var jax = MathJax.Hub.getAllJax($el)[0];
      jax.Text(placeholder, function () {
        return resolve(new _elementJax2.default(jax));
      });
    }]);
  });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = __webpack_require__(37);

var _raf2 = _interopRequireDefault(_raf);

var _promise = __webpack_require__(3);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementJax = function () {
  /**
   * This class is a wrapper around MathJax's ElementJax.
   * 
   * @see http://docs.mathjax.org/en/latest/api/elementjax.html
   * 
   * @param {MathJax's ElementJax} jax
   * 
   * @constructor
   */
  function ElementJax(jax) {
    _classCallCheck(this, ElementJax);

    /** @type {MathJax's ElementJax} */
    this.jax = jax;
    /** @type {String} */
    this.value = '';
  }

  /**
   * Change the value of ElementJax.
   * 
   * @param {String} value 
   * 
   * @return {this}
   */


  _createClass(ElementJax, [{
    key: 'setValue',
    value: function setValue(value) {
      this.value = value;
      return this;
    }

    /**
     * Update ElementJax to the current value, so the math
     * will be reprocessed by MathJax.
     * 
     * @return {Promise}
     */

  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      return new _promise2.default(function (resolve) {

        // Use requestAnimationFrame to ensure that the browser really finished
        // rendering the mathematics. Without using it, the caret could be placed
        // in the wrong top and left pos when inserting multiple square roots at once.

        _this.jax.Text(_this.value, function () {
          return (0, _raf2.default)(function () {
            return resolve();
          });
        });
      });
    }
  }]);

  return ElementJax;
}();

exports.default = ElementJax;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(38)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCleanCopy;

var _toArray = __webpack_require__(1);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get a clean copy of editor's value.
 * 
 * @param {HTMLElement}  $value
 * 
 * @return {HTMLElement}
 */
function getCleanCopy($value) {
  var $clone = $value.cloneNode(true);
  /** @param {HTMLElement} $el */
  var walk = function walk($el) {
    $el.removeAttribute('id');
    $el.removeAttribute('class');
    (0, _toArray2.default)($el.children).forEach(function ($child) {
      return walk($child);
    });
  };
  walk($clone);
  return $clone;
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hideElement;
/**
 * Hide the given element.
 * 
 * @param {HTMLElement}  
 * 
 * @return {Void}
 */
function hideElement($el) {
  $el.style.display = 'none';
}

/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prependElement;
/**
 * Insert an element at the beginning of the parent element.
 * 
 * @param {HTMLElement}  
 * @param {HTMLElement}
 * 
 * @return {Void}  
 */
function prependElement($parent, $el) {
  return $parent.insertBefore($el, $parent.firstElementChild);
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showElement;
/**
 * Show a element.
 * 
 * @param {HTMLElement} $el  
 * 
 * @return {Void}
 */
function showElement($el) {
  $el.style.display = 'block';
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTo;
/**
 * Scroll the $view to the $target element.
 * 
 * @param {HTMLElement}  $view
 * @param {HTMLElement}  $target
 */
function scrollTo($view, $target) {
  $view.scrollTop = $target.parentNode.offsetTop;
  $view.scrollLeft = $target.offsetLeft;
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDisplay;

var _addClass = __webpack_require__(2);

var _addClass2 = _interopRequireDefault(_addClass);

var _appendElement = __webpack_require__(5);

var _appendElement2 = _interopRequireDefault(_appendElement);

var _appendElementAfter = __webpack_require__(13);

var _appendElementAfter2 = _interopRequireDefault(_appendElementAfter);

var _appendElementBefore = __webpack_require__(46);

var _appendElementBefore2 = _interopRequireDefault(_appendElementBefore);

var _createElement = __webpack_require__(7);

var _createElement2 = _interopRequireDefault(_createElement);

var _lcc = __webpack_require__(0);

var _lcc2 = _interopRequireDefault(_lcc);

var _toArray = __webpack_require__(1);

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a thin space.
 * 
 * @return {HTMLElement}
 */
function createThinSpace() {
  return (0, _createElement2.default)('mspace', 'mathjax-editor-helper', {
    width: 'thinmathspace'
  });
}

/**
 * Create a placeholder for empty <mrow>s.
 * 
 * @return {HTMLElement}
 */
function createPlaceholder() {
  return (0, _createElement2.default)('mo', 'mathjax-editor-placeholder', {
    _html: '?'
  });
}

/**
 * Create a placeholder for empty lines.
 * 
 * @return {HTMLElement}
 */
function createNewlinePlaceholder() {
  return (0, _createElement2.default)('mo', 'mathjax-editor-newline-empty', {
    _html: '⏎'
  });
}

/**
 * This function will add some visual stuff to the editor's current
 * value after cloning it, then will return the final markup to be set
 * on the display.
 * 
 * @param {HTMLElement} $value
 * @param {String} [placeholder] 
 * 
 * @return {String}
 */
function toDisplay($value) {
  var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var $clone = $value.cloneNode(true);

  if (!$clone.children.length) {
    $clone.innerHTML = '<mtext class="mathjax-editor-placeholder">' + placeholder + '</mtext>';
  }

  (0, _toArray2.default)($clone.querySelectorAll('mrow')).forEach(function ($mrow) {
    (0, _addClass2.default)($mrow, 'mathjax-editor-mrow');

    if (!$mrow.children.length) {
      return (0, _appendElement2.default)($mrow, createPlaceholder());
    }

    switch ((0, _lcc2.default)($mrow.parentNode.tagName)) {
      case 'msqrt':
        (0, _appendElement2.default)($mrow, createThinSpace());
        break;
      case 'mroot':
        if ($mrow.parentNode.firstElementChild === $mrow) {
          (0, _appendElement2.default)($mrow, createThinSpace());
        }
        break;
    }
  });

  (0, _toArray2.default)($clone.querySelectorAll('mspace')).forEach(function ($mspace) {
    if ($mspace.getAttribute('linebreak') !== 'newline') {
      return;
    }

    // Newlines are allowed only as child of the <math> element.

    var $math = $mspace.parentNode;
    var $previous = $mspace.previousElementSibling;
    var $next = $mspace.nextElementSibling;

    if (!$next || (0, _lcc2.default)($next.tagName, 'math')) {
      (0, _appendElementAfter2.default)($mspace, createNewlinePlaceholder());
    }

    if (!(!$previous || (0, _lcc2.default)($previous.tagName, 'mspace'))) {
      return;
    }
    (0, _appendElementBefore2.default)($mspace, createNewlinePlaceholder());
  });

  return $clone.outerHTML;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendElementBefore;
/**
 * Append an element before the referenced element.
 * 
 * @param {HTMLElement} $ref  
 * @param {HTMLElement} $new 
 * 
 * @return {Void}
 */
function appendElementBefore($ref, $new) {
  return $ref.parentNode.insertBefore($new, $ref);
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDom;
/**
 * Parse a MathML string and returns the element.
 * 
 * @param {String} html
 * 
 * @return {HTMLElement}
 */
function toDom(source) {
  var doc = void 0;
  try {
    doc = new DOMParser().parseFromString(source, 'text/html');
  } catch (e) {
    doc = document.implementation.createHTMLDocument('');
    doc.body.innerHTML = source;
  }
  return doc.body.firstChild;
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unlistenElement;
/**
 * Unlisten an event of an element.
 * 
 * @param {HTMLElement}  $el
 * @param {String} type
 * @param {Function} listener
 * 
 * @return {Void}
 */
function unlistenElement($el, type, listener) {
  return $el.removeEventListener($el, type, listener);
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operatorList = __webpack_require__(11);

var _operatorList2 = _interopRequireDefault(_operatorList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign({}, _operatorList2.default, {
  '*': '⋅',
  '/': '÷'
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _styles = __webpack_require__(51);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file will use MathJax.Ajax.Styles method to apply the styles
 * of the editor. Also, it sets MathJax.Hub.processSectionDelay to
 * `0` in order to the editor display feel fast.
 * 
 * Maybe could we set this property to `0` only when the user is
 * actually using the editor and avoid rewriting the user's MathJax
 * configuration?
 */
window.addEventListener('load', function () {
  if (!MathJax) {
    throw new Error('MathjaxEditor: MathJax is missing.');
  }

  MathJax.Hub.processSectionDelay = 0;
  MathJax.Ajax.Styles(_styles2.default);
});

/***/ }),
/* 51 */
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

  '.mathjax-editor-display .mjx-block > .mjx-box': {
    'position': 'relative'
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
  },

  '.mathjax-editor-mrow': {
    'position': 'relative'
  }
};

/***/ })
/******/ ])["default"];
});