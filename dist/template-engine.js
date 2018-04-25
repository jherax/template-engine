/*! template-engine@v0.1.0. Jherax 2018. Visit https://github.com/jherax/template-engine */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["getTemplate"] = factory();
	else
		root["getTemplate"] = factory();
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTemplate;
var CACHE = {};
var SPACES = /[\s\t\r\n]+/g;
var CLOSING = /((^|%>)[^\t]*)"/g;
var EQUALS = /\t=(.*?)%>/g;

var funcBody = function funcBody(template) {
  return ['function print() { p.push().apply(p, arguments) }', 'var p = [];',
  // introduce the data as local-variable
  'with(data) {', 'p.push("', template, '");', '}', 'return p.join("");'].join('');
};

// TODO: enable read from URL
// const isURL = /.+/;

/**
 * Gets a template from a HTML-string or form a URL.
 *
 * @param {String} sourceTemplate: is the template source. It could be a HTML-string or an URL
 * @returns {Function} the function will receive the data as argument in order to fill the template
 */
function getTemplate(sourceTemplate) {
  /* eslint newline-per-chained-call: 0 */
  var key = sourceTemplate.replace(SPACES, ' ').trim();
  if (key in CACHE) return CACHE[key];

  // Convert the template into pure JavaScript-string
  sourceTemplate = key.split('<%').join('\t').replace(CLOSING, '$1\r').replace(EQUALS, '", $1, "').split('\t').join('");').split('%>').join('p.push("').split('\r').join('\\"');

  // Generate a reusable function that will compile the data with the template
  CACHE[key] = new Function('data', funcBody(sourceTemplate));
  return CACHE[key];
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});