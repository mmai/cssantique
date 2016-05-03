var CSSAntique =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./cssantique.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.filterStyles = filterStyles;
	exports.findStyleSheet = findStyleSheet;
	
	var _browserData = __webpack_require__(/*! browser-data */ 1);
	
	function filterStyles() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? { ignore: [], browser: { name: 'Firefox', version: '3' } } : arguments[0];
	
	  // This new css sheet will replace the originals with rules containing only allowed properties
	  var newSheet = createNewSheet();
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = Object.keys(document.styleSheets)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var sheetId = _step.value;
	
	      var sheet = document.styleSheets[sheetId];
	      if (!isIgnoredSheet(options.ignore, sheet)) {
	        parseRulesIntoSheet(options.browser, sheet.rules, newSheet);
	        sheet.disabled = true; // Disable the original css sheet
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
	
	function isIgnoredSheet(ignore, sheet) {
	  if (sheet.href) {
	    var filename = sheet.href.slice(sheet.href.lastIndexOf('/') + 1);
	    return ignore.indexOf(filename) !== -1;
	  }
	  return false;
	}
	
	function parseRulesIntoSheet(browser, rules, newSheet) {
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    var _loop = function _loop() {
	      var ruleId = _step2.value;
	
	      var rule = rules[ruleId];
	      if (rule instanceof window.CSSImportRule) {
	        parseRulesIntoSheet(rule.styleSheet.rules, newSheet);
	      } else if (rule instanceof window.CSSMediaRule) {
	        // TODO implement media rules
	        console.log('@media rule not implemented');
	      } else if (_typeof(rule.style) !== 'object') {
	        console.error(rule);
	      } else {
	        var newRuleProperties = Object.keys(rule.style)
	        // Defined properties are indexed by numbers
	        .filter(function (key) {
	          return !isNaN(parseInt(key, 10));
	        })
	        // Keep only properties supported by the targeted browser
	        .filter(function (k) {
	          return (0, _browserData.browserSupport)(browser, rule.style[k]);
	        }).map(function (k) {
	          var attribute = rule.style[k];
	          return attribute + ': ' + rule.style[attribute];
	        });
	
	        // Add cleaned rule on the new css sheet
	        if (newRuleProperties.length > 0) {
	          newSheet.addRule(rule.selectorText, newRuleProperties.join(', '));
	        }
	      }
	    };
	
	    for (var _iterator2 = Object.keys(rules)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      _loop();
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
	
	function createNewSheet() {
	  var style = document.createElement('style');
	  document.head.appendChild(style);
	  return style.sheet;
	}
	
	function findStyleSheet(filename) {
	  var stylesheets = window.document.styleSheets;
	
	  return Object.keys(stylesheets).map(function (k) {
	    return stylesheets[k];
	  }).filter(function (s) {
	    return s.href !== null && s.href.indexOf(filename) > -1;
	  });
	}

/***/ },
/* 1 */
/*!****************************************!*\
  !*** ./~/browser-data/browser-data.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var propertiesDb = __webpack_require__(/*! ./engineSupportDb */ 2);
	var browsersDb = __webpack_require__(/*! ./browsersDb */ 3);
	
	var browsers = Object.keys(browsersDb);
	
	var getEngine = function getEngine(browser) {
	  if (browsers.indexOf(browser.name) === -1) {
	    return undefined;
	  }
	  var browserData = browsersDb[browser.name];
	  var browserVersion = findLastVersion(Object.keys(browserData), browser.version);
	  return browserData[browserVersion];
	};
	
	function findLastVersion(versions, version) {
	  if (versions.indexOf(version) > -1) {
	    return version;
	  } else {
	    // Return the previous version
	    versions.push(version);
	    versions.sort(compareVersions);
	    var idx = versions.indexOf(version);
	    if (idx === 0) {
	      return undefined;
	    }
	    return versions[idx - 1];
	  }
	  return undefined;
	}
	
	function compareVersions(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var a_components = a.split('.').map(function (s) {
	    return parseInt(s, 10);
	  });
	  var b_components = b.split('.').map(function (s) {
	    return parseInt(s, 10);
	  });
	
	  var len = Math.min(a_components.length, b_components.length);
	  for (var i = 0; i < len; i++) {
	    if (a_components[i] !== b_components[i]) {
	      return a_components[i] - b_components[i];
	    }
	  }
	
	  return a_components.length - b_components.length;
	}
	
	var browserSupport = function browserSupport(browser, property) {
	  var engine = getEngine(browser);
	  return engineSupport(engine, property);
	};
	
	var engineSupport = function engineSupport(engine, property) {
	  if (!propertiesDb.hasOwnProperty(property)) {
	    console.log('property not in database: ' + property);
	    return undefined;
	  }
	  if (!propertiesDb[property].hasOwnProperty(engine.name)) {
	    console.log(engine.name + ' not in database for property ' + property);
	    console.log(propertiesDb[property]);
	    return undefined;
	  }
	
	  var support = propertiesDb[property][engine.name].toLowerCase();
	  switch (support) {
	    case 'yes':
	      return true;
	    case 'no':
	      return false;
	    default:
	      return support <= engine.version;
	  }
	  return undefined;
	};
	
	module.exports = {
	  getEngine: getEngine,
	  browserSupport: browserSupport,
	  engineSupport: engineSupport
	};

/***/ },
/* 2 */
/*!*********************************************!*\
  !*** ./~/browser-data/engineSupportDb.json ***!
  \*********************************************/
/***/ function(module, exports) {

	module.exports = {
		"all": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "27.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"display": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.9",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"display-inside": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"display-outside": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"display-list": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"box-suppress": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"margin": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"margin-top": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"margin-right": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"margin-bottom": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"margin-left": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"padding": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"padding-top": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"padding-right": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"padding-bottom": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"padding-left": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"width": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.0",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"height": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.0",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"float": {
			"Trident": "5.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"clear": {
			"Trident": "5.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"min-width": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "Partial",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"max-width": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "Partial",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"min-height": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.7",
			"WebKit": "Partial",
			"KHTML": "3.3.2",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"max-height": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.7",
			"WebKit": "Partial",
			"KHTML": "3.3.2",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"visibility": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "Partial",
			"KHTML": "Partial",
			"Presto": "2.5",
			"Prince": "Partial",
			"Martha": "Yes"
		},
		"overflow": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "3.2",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"overflow-x": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "525",
			"KHTML": "3.5.6",
			"Presto": "2.1",
			"Prince": "5.0",
			"Martha": "No"
		},
		"overflow-y": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "525",
			"KHTML": "3.5.6",
			"Presto": "2.1",
			"Prince": "5.0",
			"Martha": "No"
		},
		"max-lines": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-color": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-style": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-width": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-top": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-top-width": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-top-style": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-top-color": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-right": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-right-width": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-right-style": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-right-color": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-bottom": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-bottom-width": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-bottom-style": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-bottom-color": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-left": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-left-width": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-left-style": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-left-color": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.0",
			"Martha": "Yes"
		},
		"border-radius": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "533",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"border-top-left-radius": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "533",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"border-top-right-radius": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "533",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"border-bottom-left-radius": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "533",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"border-bottom-right-radius": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "533",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"border-image": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "15.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.5",
			"Prince": "No",
			"Martha": "No"
		},
		"border-image-source": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "15.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-image-slice": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "15.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-image-width": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "15.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-image-outset": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "15.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-image-repeat": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "15.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"box-shadow": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0\n[g 19]",
			"WebKit": "Yes",
			"KHTML": "No",
			"Presto": "2.5",
			"Prince": "No",
			"Martha": "No"
		},
		"box-decoration-break": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "32.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.7",
			"Prince": "Incorrect",
			"Martha": "No"
		},
		"line-height": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"vertical-align": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"position": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"top": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"right": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"bottom": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"left": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"z-index": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.9",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"align-content": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "28.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"align-items": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "20.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"align-self": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "20.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"justify-content": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "20.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"justify-items": {
			"Trident": "No",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"justify-self": {
			"Trident": "No",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"quotes": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "Yes",
			"WebKit": "412",
			"KHTML": "3.4",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"content": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9",
			"WebKit": "Partial",
			"KHTML": "Yes",
			"Presto": "2.7",
			"Prince": "Partial",
			"Martha": "Partial"
		},
		"counter-increment": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "525",
			"KHTML": "3.4",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"counter-reset": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "525",
			"KHTML": "3.4",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"list-style": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"list-style-image": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"list-style-position": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"list-style-type": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "3.4",
			"Presto": "1.0",
			"Prince": "Partial",
			"Martha": "Yes"
		},
		"color": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.5",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"opacity": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.7",
			"WebKit": "125",
			"KHTML": "4.0",
			"Presto": "2.0",
			"Prince": "6.0",
			"Martha": "No"
		},
		"background": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"background-attachment": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"background-color": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Yes"
		},
		"background-image": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"background-position": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Yes"
		},
		"background-repeat": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Yes"
		},
		"background-repeat-x": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Yes"
		},
		"background-repeat-y": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Yes"
		},
		"background (multiple)": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.2",
			"WebKit": "312",
			"KHTML": "3.5",
			"Presto": "2.5",
			"Prince": "9.0",
			"Martha": "No"
		},
		"background-clip": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "Yes",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "9.0",
			"Martha": "Yes"
		},
		"background-origin": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "Yes",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "9.0",
			"Martha": "Yes"
		},
		"background-size": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "2.0",
			"WebKit": "Yes",
			"KHTML": "Experimental",
			"Presto": "2.5",
			"Prince": "9.0",
			"Martha": "Yes"
		},
		"background-position-x": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"background-position-y": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "Incorrect",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"font-family": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"font-size": {
			"Trident": "3.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Yes"
		},
		"font-style": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"font-variant": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"font-weight": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "Partial",
			"WebKit": "Partial",
			"KHTML": "Yes",
			"Presto": "Incorrect",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"font-size-adjust": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "1.9",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-stretch": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "9.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "6.0",
			"Martha": "No"
		},
		"font-feature-settings": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-kerning": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-language-override": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-synthesis": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-variant-alternates": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-variant-caps": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-variant-east-asian": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-variant-ligatures": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-variant-numeric": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"font-variant-position": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0 [g 23]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"unicode-range": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "38.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "Yes",
			"Martha": "No"
		},
		"text-align": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"text-decoration": {
			"Trident": "Yes",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "3.1",
			"Martha": "Partial"
		},
		"text-indent": {
			"Trident": "3.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"text-transform": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"letter-spacing": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"word-spacing": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "No"
		},
		"white-space": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "522",
			"KHTML": "Yes",
			"Presto": "2.1",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"word-break": {
			"Trident": "Partial",
			"EdgeHTML": "Partial",
			"Gecko": "15.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "10.0",
			"Martha": "No"
		},
		"line-break": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"hyphens": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "6.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"word-wrap": {
			"Trident": "5.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "85",
			"KHTML": "4.3",
			"Presto": "2.5",
			"Prince": "10.0",
			"Martha": "Yes"
		},
		"overflow-wrap": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "10.0",
			"Martha": "Yes"
		},
		"text-align-last": {
			"Trident": "Partial",
			"EdgeHTML": "Partial",
			"Gecko": "12.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "Partial",
			"Martha": "Experimental"
		},
		"text-justify": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "6.0",
			"Martha": "No"
		},
		"text-emphasis": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"hanging-punctuation": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"hyphenate-character": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "Yes"
		},
		"hyphenate-limit-zone": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"hyphenate-limit-chars": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"hyphenate-limit-lines": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"hyphenate-limit-last": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-space-collapse": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-spacing": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-wrap": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-shadow": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "Yes",
			"KHTML": "3.4",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"text-decoration-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0[g 31]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-decoration-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0[g 31]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-decoration-line": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0[g 31]",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-decoration-skip": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-underline-position": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-emphasis-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-emphasis-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-emphasis-position": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"direction": {
			"Trident": "5.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "7.0",
			"Martha": "Yes"
		},
		"unicode-bidi": {
			"Trident": "5.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "525",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "7.0",
			"Martha": "Yes"
		},
		"writing-mode": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Nightly Build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "9.0",
			"Martha": "No"
		},
		"text-combine-horizontal": {
			"Trident": "11.0",
			"EdgeHTML": "12.0",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"text-orientation": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-collapse": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.1",
			"Martha": "Yes"
		},
		"border-spacing": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"caption-side": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.4",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"empty-cells": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"table-layout": {
			"Trident": "5.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"cursor": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "Partial",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"outline": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "Yes"
		},
		"outline-color": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "Yes"
		},
		"outline-style": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "Yes"
		},
		"outline-width": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.8",
			"WebKit": "125",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "Yes"
		},
		"outline-offset": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "1.8",
			"WebKit": "125",
			"KHTML": "3.5",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"box-sizing": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "29.0",
			"WebKit": "Yes",
			"KHTML": "3.3.2",
			"Presto": "1.0",
			"Prince": "7.0",
			"Martha": "No"
		},
		"resize": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "2.0",
			"WebKit": "525",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"appearance": {
			"Trident": "No",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"icon": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"nav-index": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"nav-up": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"nav-right": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"nav-down": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"nav-left": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.1",
			"Prince": "No",
			"Martha": "No"
		},
		"text-overflow": {
			"Trident": "Partial",
			"EdgeHTML": "Partial",
			"Gecko": "7.0",
			"WebKit": "Partial",
			"KHTML": "3.5.6",
			"Presto": "Experimental (Nightly)",
			"Prince": "9.0",
			"Martha": "No"
		},
		"page-break-before": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "Partial",
			"WebKit": "Partial",
			"KHTML": "3.5",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"page-break-after": {
			"Trident": "4.0",
			"EdgeHTML": "12",
			"Gecko": "Partial",
			"WebKit": "Partial",
			"KHTML": "3.5",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"page-break-inside": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "19.0",
			"WebKit": "312",
			"KHTML": "3.5",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"orphans": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "312",
			"KHTML": "3.5",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"widows": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "312",
			"KHTML": "3.5",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"page": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"image-orientation": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "26.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"object-fit": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.7",
			"Prince": "No",
			"Martha": "No"
		},
		"object-position": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.7",
			"Prince": "No",
			"Martha": "No"
		},
		"cue": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"cue-after": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"cue-before": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"pause": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"pause-after": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"pause-before": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"speak": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-family": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-balance": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-duration": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-pitch": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-pitch-range": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-rate": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-stress": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"voice-volume": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"interpret-as": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"phonemes": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"rest": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"rest-after": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"rest-before": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mark": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mark-after": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mark-before": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"device-width": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.0",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"device-height": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.0",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"device-aspect-ratio": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.0",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"color-index": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.5",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"monochrome": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.1",
			"Presto": "2.5",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"resolution": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "No",
			"KHTML": "4.1",
			"Presto": "2.5",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"orientation": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "No",
			"KHTML": "4.2.1",
			"Presto": "No",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"aspect-ratio": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "No",
			"KHTML": "4.2.1",
			"Presto": "2.1",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"grid": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scan": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "Yes",
			"WebKit": "No",
			"KHTML": "4.1",
			"Presto": "2.5",
			"Prince": "Nightly build",
			"Martha": "No"
		},
		"ruby-position": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "38.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"ruby-align": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "38.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"ruby-merge": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"column-count": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"column-width": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"column-gap": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"column-rule": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"columns": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "9.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "Yes",
			"Martha": "Yes"
		},
		"break-before": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "Yes"
		},
		"break-after": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "Yes"
		},
		"break-inside": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "Yes"
		},
		"column-fill": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "14.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"column-span": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.8",
			"Prince": "8.0",
			"Martha": "Yes"
		},
		"grid-template": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-template-columns": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-template-rows": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-template-areas": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-auto-columns": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-auto-rows": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-auto-flow": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-auto-position": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-columns": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-columns-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-columns-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-row": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-row-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-row-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"grid-area": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Experimental",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"animation": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-delay": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-direction": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-duration": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-iteration-count": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-name": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-play-state": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-timing-function": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"animation-fill-mode": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"transform": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "Yes"
		},
		"transform-origin": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "Yes"
		},
		"transform-style": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"perspective": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"perspective-origin": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"backface-visibility": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"transition-property": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"transition-duration": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"transition-timing-function": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"transition-delay": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"transition": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "Experimental",
			"Prince": "No",
			"Martha": "No"
		},
		"flex": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"flex-basis": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"flex-direction": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"flex-flow": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "28.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"flex-grow": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"flex-shrink": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"flex-wrap": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "28.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"order": {
			"Trident": "11.0",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "29.0",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"flow-into": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "Experimental"
		},
		"flow-from": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "Experimental"
		},
		"region-fragment": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"wrap-flow": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"wrap-through": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"shape-margin": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Nightly build",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"shape-outside": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"shape-image-threshold": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"clip": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"clip-path": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "1.9.1",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"clip-rule": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "Partial",
			"WebKit": "Partial",
			"KHTML": "Partial",
			"Presto": "Partial",
			"Prince": "Partial",
			"Martha": "No"
		},
		"mask-box-image": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-box-image-outset": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-box-image-repeat": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-box-image-slice": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-box-image-source": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-box-image-width": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-clip": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-image": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-origin": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-position": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-repeat": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mask-type": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "20.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"mix-blend-mode": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "32.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"isolation": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"background-blend-mode": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "30.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"filter": {
			"Trident": "No",
			"EdgeHTML": "13",
			"Gecko": "35.0",
			"WebKit": "18.0",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"flood-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"flood-opacity": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"color-interpolation-filters": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"lighting-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"pointer-events": {
			"Trident": "11.0",
			"EdgeHTML": "12.0",
			"Gecko": "1.9.2",
			"WebKit": "530",
			"KHTML": "No",
			"Presto": "2.0",
			"Prince": "No",
			"Martha": "No"
		},
		"touch-action": {
			"Trident": "11.0",
			"EdgeHTML": "12.0",
			"Gecko": "29.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"box-snap": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"line-grid": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"line-slack": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"line-snap": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"block-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"inline-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"min-block-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"min-inline-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"max-block-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"max-inline-size": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"margin-block-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"margin-block-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"margin-inline-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"margin-inline-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"offset-block-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"offset-block-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"offset-inline-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"offset-inline-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"padding-block-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"padding-block-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"padding-inline-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"padding-inline-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-start-width": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-end-width": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-start-width": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-end-width": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-start-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-end-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-start-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-end-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-start-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-end-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-start-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-end-color": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-block-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-start": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-inline-end": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "41.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"background-image-transform": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"border-image-transform": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"will-change": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scroll-behavior": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "36.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scroll-snap-type": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "39.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scroll-snap-points-x": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "39.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scroll-snap-points-y": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "39.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scroll-snap-destination": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "39.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"scroll-snap-coordinate": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "39.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		}
	};

/***/ },
/* 3 */
/*!****************************************!*\
  !*** ./~/browser-data/browsersDb.json ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = {
		"Firefox": {
			"2": {
				"name": "Gecko",
				"version": "1.8.1"
			},
			"3": {
				"name": "Gecko",
				"version": "1.9"
			},
			"4": {
				"name": "Gecko",
				"version": "2"
			},
			"5": {
				"name": "Gecko",
				"version": "5"
			},
			"6": {
				"name": "Gecko",
				"version": "6"
			},
			"7": {
				"name": "Gecko",
				"version": "7"
			},
			"8": {
				"name": "Gecko",
				"version": "8"
			},
			"9": {
				"name": "Gecko",
				"version": "9"
			},
			"10": {
				"name": "Gecko",
				"version": "10"
			},
			"11": {
				"name": "Gecko",
				"version": "11"
			},
			"12": {
				"name": "Gecko",
				"version": "12"
			},
			"13": {
				"name": "Gecko",
				"version": "13"
			},
			"14": {
				"name": "Gecko",
				"version": "14"
			},
			"15": {
				"name": "Gecko",
				"version": "15"
			},
			"16": {
				"name": "Gecko",
				"version": "16"
			},
			"17": {
				"name": "Gecko",
				"version": "17"
			},
			"18": {
				"name": "Gecko",
				"version": "18"
			},
			"19": {
				"name": "Gecko",
				"version": "19"
			},
			"20": {
				"name": "Gecko",
				"version": "20"
			},
			"21": {
				"name": "Gecko",
				"version": "21"
			},
			"22": {
				"name": "Gecko",
				"version": "22"
			},
			"23": {
				"name": "Gecko",
				"version": "23"
			},
			"24": {
				"name": "Gecko",
				"version": "24"
			},
			"3.6": {
				"name": "Gecko",
				"version": "1.9.2"
			},
			"3.5": {
				"name": "Gecko",
				"version": "1.9.1"
			},
			"1.5": {
				"name": "Gecko",
				"version": "1.8"
			},
			"1.0": {
				"name": "Gecko",
				"version": "1.7"
			}
		},
		"Chrome": {
			"0.2": {
				"name": "Webkit",
				"version": "525.13"
			},
			"0.3": {
				"name": "Webkit",
				"version": "525.19"
			},
			"1.0": {
				"name": "Webkit",
				"version": "525.19"
			},
			"2.0": {
				"name": "Webkit",
				"version": "528.8"
			},
			"2.0.172": {
				"name": "Webkit",
				"version": "530.5"
			},
			"3.0": {
				"name": "Webkit",
				"version": "531.0"
			},
			"3.0.195": {
				"name": "Webkit",
				"version": "532.0"
			},
			"4.0": {
				"name": "Webkit",
				"version": "532.0"
			},
			"4.0.213": {
				"name": "Webkit",
				"version": "532.1"
			},
			"4.1": {
				"name": "Webkit",
				"version": "532.5"
			},
			"5.0": {
				"name": "Webkit",
				"version": "532.9"
			},
			"5.0.342": {
				"name": "Webkit",
				"version": "533.22"
			},
			"6.0": {
				"name": "Webkit",
				"version": "533.8"
			},
			"7.0": {
				"name": "Webkit",
				"version": "534.6"
			},
			"8.0": {
				"name": "Webkit",
				"version": "534.10"
			},
			"9.0": {
				"name": "Webkit",
				"version": "534.12"
			},
			"10.0": {
				"name": "Webkit",
				"version": "534.14"
			},
			"11.0": {
				"name": "Webkit",
				"version": "534.17"
			},
			"12.0": {
				"name": "Webkit",
				"version": "534.24"
			},
			"13.0": {
				"name": "Webkit",
				"version": "534.31"
			},
			"14.0": {
				"name": "Webkit",
				"version": "535.1"
			},
			"15.0": {
				"name": "Webkit",
				"version": "535.2"
			},
			"16.0": {
				"name": "Webkit",
				"version": "535.7"
			},
			"17.0": {
				"name": "Webkit",
				"version": "535.11"
			},
			"18.0": {
				"name": "Webkit",
				"version": "535.19"
			},
			"19.0": {
				"name": "Webkit",
				"version": "535.21"
			},
			"20.0": {
				"name": "Webkit",
				"version": "536.6"
			},
			"22.0": {
				"name": "Webkit",
				"version": "537.1"
			},
			"23.0": {
				"name": "Webkit",
				"version": "537.11"
			},
			"24.0": {
				"name": "Webkit",
				"version": "537.13"
			},
			"27.0": {
				"name": "Webkit",
				"version": "537.36"
			},
			"28.0": {
				"name": "Webkit",
				"version": "537.36"
			},
			"29.0": {
				"name": "Webkit",
				"version": "537.36"
			},
			"30.0": {
				"name": "Webkit",
				"version": "537.36"
			},
			"40.0": {
				"name": "Webkit",
				"version": "537.36"
			},
			"49.0": {
				"name": "Webkit",
				"version": "537.36"
			}
		},
		"Safari": {
			"1.0": {
				"name": "Webkit",
				"version": "85"
			},
			"1.0.3": {
				"name": "Webkit",
				"version": "85.8.5"
			},
			"1.1": {
				"name": "Webkit",
				"version": "100"
			},
			"1.2": {
				"name": "Webkit",
				"version": "125"
			},
			"1.3": {
				"name": "Webkit",
				"version": "312"
			},
			"1.3.1": {
				"name": "Webkit",
				"version": "312.3"
			},
			"1.3.2": {
				"name": "Webkit",
				"version": "312.6"
			},
			"2.0": {
				"name": "Webkit",
				"version": "412"
			},
			"2.0.2": {
				"name": "Webkit",
				"version": "416.11"
			},
			"2.0.4": {
				"name": "Webkit",
				"version": "419.3"
			},
			"3.0": {
				"name": "Webkit",
				"version": "522.11"
			},
			"3.0.2": {
				"name": "Webkit",
				"version": "522.12"
			},
			"3.0.3": {
				"name": "Webkit",
				"version": "522.12.1"
			},
			"3.0.4": {
				"name": "Webkit",
				"version": "523.10"
			},
			"3.1": {
				"name": "Webkit",
				"version": "525.13"
			},
			"3.1.1": {
				"name": "Webkit",
				"version": "525.17"
			},
			"3.1.2": {
				"name": "Webkit",
				"version": "525.21"
			},
			"3.2": {
				"name": "Webkit",
				"version": "525.26"
			},
			"3.2.1": {
				"name": "Webkit",
				"version": "525.27"
			},
			"3.2.3": {
				"name": "Webkit",
				"version": "525.28"
			},
			"4.0": {
				"name": "Webkit",
				"version": "530.17"
			},
			"4.0.1": {
				"name": "Webkit",
				"version": "530.18"
			},
			"4.0.2": {
				"name": "Webkit",
				"version": "530.19"
			},
			"4.0.3": {
				"name": "Webkit",
				"version": "531.9"
			},
			"4.0.4": {
				"name": "Webkit",
				"version": "531.21.10"
			},
			"4.0.5": {
				"name": "Webkit",
				"version": "531.22.7"
			},
			"4.1": {
				"name": "Webkit",
				"version": "533.16"
			},
			"4.1.1": {
				"name": "Webkit",
				"version": "533.17.8"
			},
			"4.1.2": {
				"name": "Webkit",
				"version": "533.18.5"
			},
			"4.1.3": {
				"name": "Webkit",
				"version": "533.19.4"
			},
			"5.0": {
				"name": "Webkit",
				"version": "533.16"
			},
			"5.0.1": {
				"name": "Webkit",
				"version": "533.17.8"
			},
			"5.0.2": {
				"name": "Webkit",
				"version": "533.18.5"
			},
			"5.0.3": {
				"name": "Webkit",
				"version": "533.19.4"
			},
			"5.0.4": {
				"name": "Webkit",
				"version": "533.20.27"
			},
			"5.0.5": {
				"name": "Webkit",
				"version": "533.21.1"
			},
			"5.0.6": {
				"name": "Webkit",
				"version": "533.22.3"
			},
			"5.1": {
				"name": "Webkit",
				"version": "534.48.3"
			},
			"5.1.1": {
				"name": "Webkit",
				"version": "534.51.22"
			},
			"5.1.2": {
				"name": "Webkit",
				"version": "534.52.7"
			},
			"5.1.3": {
				"name": "Webkit",
				"version": "534.53.10"
			},
			"5.1.4": {
				"name": "Webkit",
				"version": "534.54.16"
			},
			"5.1.5": {
				"name": "Webkit",
				"version": "534.55.3"
			},
			"5.1.6": {
				"name": "Webkit",
				"version": "534.56.5"
			},
			"5.1.7": {
				"name": "Webkit",
				"version": "534.57.2"
			},
			"5.1.8": {
				"name": "Webkit",
				"version": "534.58.2"
			},
			"5.1.9": {
				"name": "Webkit",
				"version": "534.59.8"
			},
			"5.1.10": {
				"name": "Webkit",
				"version": "534.59.10"
			},
			"6.0": {
				"name": "Webkit",
				"version": "536.25"
			},
			"6.0.1": {
				"name": "Webkit",
				"version": "536.26"
			},
			"6.0.2": {
				"name": "Webkit",
				"version": "536.26.17"
			},
			"6.0.3": {
				"name": "Webkit",
				"version": "536.28.10"
			},
			"6.0.4": {
				"name": "Webkit",
				"version": "536.29.13"
			},
			"6.0.5": {
				"name": "Webkit",
				"version": "536.30.1"
			},
			"6.1": {
				"name": "Webkit",
				"version": "537.43.58"
			},
			"6.1.1": {
				"name": "Webkit",
				"version": "537.73.11"
			},
			"6.1.6": {
				"name": "Webkit",
				"version": "537.78.2"
			},
			"6.2.8": {
				"name": "Webkit",
				"version": "537.85.17"
			},
			"7.0": {
				"name": "Webkit",
				"version": "537.71"
			},
			"7.0.1": {
				"name": "Webkit",
				"version": "537.73.11"
			},
			"7.0.3": {
				"name": "Webkit",
				"version": "537.75.14"
			},
			"7.0.4": {
				"name": "Webkit",
				"version": "537.76.4"
			},
			"7.0.5": {
				"name": "Webkit",
				"version": "537.77.4"
			},
			"7.0.6": {
				"name": "Webkit",
				"version": "537.78.2"
			},
			"7.1.8": {
				"name": "Webkit",
				"version": "537.85.17"
			},
			"8.0": {
				"name": "Webkit",
				"version": "538.35.8"
			},
			"8.0.6": {
				"name": "Webkit",
				"version": "600.6.3"
			},
			"8.0.7": {
				"name": "Webkit",
				"version": "600.7.12"
			},
			"9.0.1": {
				"name": "Webkit",
				"version": "601.2.7"
			},
			"9.0.2": {
				"name": "Webkit",
				"version": "601.3.9"
			},
			"9.0.3": {
				"name": "Webkit",
				"version": "601.4.4"
			},
			"9.1": {
				"name": "Webkit",
				"version": "601.5.17"
			}
		},
		"Android": {
			"1.5": {
				"name": "Webkit",
				"version": "528.5",
				"api": "3"
			},
			"1.6": {
				"name": "Webkit",
				"version": "528.5",
				"api": "4"
			},
			"2.0": {
				"name": "Webkit",
				"version": "530.17",
				"api": "5"
			},
			"2.0.1": {
				"name": "Webkit",
				"version": "530.17",
				"api": "6"
			},
			"2.1": {
				"name": "Webkit",
				"version": "530.17",
				"api": "7"
			},
			"2.2": {
				"name": "Webkit",
				"version": "533.1",
				"api": "8"
			},
			"2.3": {
				"name": "Webkit",
				"version": "533.1",
				"api": "9"
			},
			"2.3.3": {
				"name": "Webkit",
				"version": "533.1",
				"api": "10"
			},
			"3.0": {
				"name": "Webkit",
				"version": "534.13",
				"api": "11"
			},
			"3.1": {
				"name": "Webkit",
				"version": "534.13",
				"api": "12"
			},
			"3.2": {
				"name": "Webkit",
				"version": "534.13",
				"api": "13"
			},
			"4.0": {
				"name": "Webkit",
				"version": "534.30",
				"api": "14"
			},
			"4.0.3": {
				"name": "Webkit",
				"version": "534.30",
				"api": "15"
			},
			"4.1": {
				"name": "Webkit",
				"version": "534.30",
				"api": "16"
			},
			"4.2": {
				"name": "Webkit",
				"version": "534.30",
				"api": "17"
			},
			"4.3": {
				"name": "Webkit",
				"version": "534.30",
				"api": "18"
			},
			"4.4": {
				"name": "Webkit",
				"version": "537.36",
				"api": "19"
			},
			"5.0": {
				"name": "Webkit",
				"version": "537.36"
			}
		},
		"Opera": {
			"15": {
				"name": "Webkit",
				"version": "537.36"
			},
			"12.15": {
				"name": "Presto",
				"version": "2.12"
			},
			"12.10": {
				"name": "Presto",
				"version": "2.12"
			},
			"12.00": {
				"name": "Presto",
				"version": "2.10"
			},
			"11.60": {
				"name": "Presto",
				"version": "2.10"
			},
			"11.50": {
				"name": "Presto",
				"version": "2.9"
			},
			"11.10": {
				"name": "Presto",
				"version": "2.8"
			},
			"11.00": {
				"name": "Presto",
				"version": "2.7"
			},
			"10.60": {
				"name": "Presto",
				"version": "2.6"
			},
			"10.50": {
				"name": "Presto",
				"version": "2.5"
			},
			"10.00": {
				"name": "Presto",
				"version": "2.2"
			},
			"9.60": {
				"name": "Presto",
				"version": "2.1.1"
			},
			"9.50": {
				"name": "Presto",
				"version": "2.1"
			},
			"9.00": {
				"name": "Presto",
				"version": "2.0"
			},
			"8.00": {
				"name": "Presto",
				"version": "1.0"
			},
			"7.00": {
				"name": "Presto",
				"version": "1.0"
			},
			"6.00": {
				"name": "Elektra",
				"version": "0"
			},
			"3.50": {
				"name": "Elektra",
				"version": "0"
			}
		},
		"IEMobile": {
			"6": {
				"name": "MSHTML",
				"version": "6.0"
			},
			"7": {
				"name": "Trident",
				"version": "3.1"
			},
			"9": {
				"name": "Trident",
				"version": "5.0"
			},
			"10": {
				"name": "Trident",
				"version": "6.0"
			},
			"11": {
				"name": "Trident",
				"version": "7.0"
			}
		},
		"IE": {
			"4": {
				"name": "MSHTML",
				"version": "4"
			},
			"5": {
				"name": "MSHTML",
				"version": "5"
			},
			"6": {
				"name": "MSHTML",
				"version": "6.0"
			},
			"7": {
				"name": "MSHTML",
				"version": "7.0"
			},
			"8": {
				"name": "Trident",
				"version": "4.0"
			},
			"9": {
				"name": "Trident",
				"version": "5.0"
			},
			"10": {
				"name": "Trident",
				"version": "6.0"
			},
			"11": {
				"name": "Trident",
				"version": "7.0"
			},
			"5.5": {
				"name": "MSHTML",
				"version": "5.5"
			}
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=cssantique-browser.js.map