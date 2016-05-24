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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _browserData = __webpack_require__(/*! browser-data */ 1);
	
	var newStylesheets = [];
	var initialStylesheets = [];
	
	var filterStyles = function filterStyles() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? { ignore: [], browser: { name: 'Firefox', version: '3' } } : arguments[0];
	
	  convertRemoteStyles();
	
	  // This new css sheet will replace the originals with rules containing only allowed properties
	  var initialSheets = Object.keys(document.styleSheets).map(function (k) {
	    return document.styleSheets[k];
	  }).filter(function (s) {
	    return !s.disabled;
	  });
	
	  var newStyle = document.createElement('style');
	  document.head.appendChild(newStyle);
	  newStylesheets.push(newStyle); // Keep reference for resetStyles function
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = initialSheets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var sheet = _step.value;
	
	      if (!isIgnoredSheet(options.ignore, sheet)) {
	        parseRulesIntoSheet(options.browser, sheet.cssRules, newStyle.sheet);
	        sheet.disabled = true; // Disable the original css sheet
	        initialStylesheets.push(sheet); // Keep reference for resetStyles function
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
	
	  return newStyle;
	};
	
	/**
	 * convertRemoteStyles
	 * load remote styles with CORS
	 *
	 */
	function convertRemoteStyles() {
	  Object.keys(document.styleSheets).map(function (k) {
	    return document.styleSheets[k];
	  }).filter(function (s) {
	    return !s.disabled && getDomain(s.href) !== window.location.hostname;
	  }).map(function (s) {
	    loadCSSCors(s.href);
	    s.disabled = true;
	  });
	
	  function getDomain(uri) {
	    var l = document.createElement('a');
	    l.href = uri;
	    return l.hostname;
	  }
	}
	
	function loadCSSCors(stylesheet_uri) {
	  var _xhr = window.XMLHttpRequest;
	  var has_cred = false;
	  try {
	    has_cred = _xhr && 'withCredentials' in new _xhr();
	  } catch (e) {}
	  if (!has_cred) {
	    console.error('CORS not supported');
	    return;
	  }
	  var xhr = new _xhr();
	  xhr.open('GET', stylesheet_uri);
	  xhr.onload = function () {
	    xhr.onload = xhr.onerror = null;
	    if (xhr.status < 200 || xhr.status >= 300) {
	      console.error('style failed to load: ' + stylesheet_uri);
	    } else {
	      var style_tag = document.createElement('style');
	      style_tag.appendChild(document.createTextNode(xhr.responseText));
	      document.head.appendChild(style_tag);
	    }
	    xhr.onerror = function () {
	      xhr.onload = xhr.onerror = null;
	      console.error('XHR CORS CSS fail:' + styleURI);
	    };
	    xhr.send();
	  };
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
	    for (var _iterator2 = Object.keys(rules)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var ruleId = _step2.value;
	
	      var rule = rules[ruleId];
	      if (rule instanceof window.CSSImportRule) {
	        parseRulesIntoSheet(browser, rule.styleSheet.cssRules, newSheet);
	      } else if (window.CSSFontFaceRule && rule instanceof window.CSSFontFaceRule) {
	        if ((0, _browserData.browserSupport)(browser, '@font-face')) {
	          newSheet.insertRule(rule.cssText, newSheet.cssRules.length);
	        }
	      } else if (window.CSSKeyframesRule && rule instanceof window.CSSKeyframesRule) {
	        // TODO implement keyframesrule rules
	      } else if (window.CSSMediaRule && rule instanceof window.CSSMediaRule) {
	          if ((0, _browserData.browserSupport)(browser, '@media')) {
	            var cleanedMediaRules = [];
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	              for (var _iterator3 = Object.keys(rule.cssRules)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var mediaRuleId = _step3.value;
	
	                var mediaRule = rule.cssRules[mediaRuleId];
	                var cleanedMediaRule = getCleanedRule(browser, mediaRule);
	                if (cleanedMediaRule !== false) {
	                  cleanedMediaRules.push(cleanedMediaRule);
	                }
	              }
	            } catch (err) {
	              _didIteratorError3 = true;
	              _iteratorError3 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                  _iterator3.return();
	                }
	              } finally {
	                if (_didIteratorError3) {
	                  throw _iteratorError3;
	                }
	              }
	            }
	
	            var cleanedMediaRulesProps = cleanedMediaRules.map(function (r) {
	              return r.rule + ' {' + r.properties + '}';
	            }).join('\n');
	
	            // newSheet.addRule(`@media ${rule.media.mediaText}`, cleanedMediaRulesProps)
	            newSheet.insertRule('@media ' + rule.media.mediaText + ' {' + cleanedMediaRulesProps + '}', newSheet.cssRules.length);
	          }
	        } else if (_typeof(rule.style) !== 'object') {
	          console.error(rule);
	        } else {
	          var cleanedRule = getCleanedRule(browser, rule);
	          // Add cleaned rule on the new css sheet
	          if (cleanedRule !== false) {
	            // newSheet.addRule(cleanedRule.rule, cleanedRule.properties)
	            newSheet.insertRule(cleanedRule.rule + ' {' + cleanedRule.properties + '}', newSheet.cssRules.length);
	          }
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
	
	function getCleanedRule(browser, rule) {
	  var knownProperties = Object.keys(rule.style)
	  // Defined properties are indexed by numbers
	  .filter(function (key) {
	    return !isNaN(parseInt(key, 10));
	  })
	  // Keep only properties supported by the targeted browser
	  .filter(function (k) {
	    var support = (0, _browserData.browserSupport)(browser, rule.style[k]);
	    // if (support === undefined) console.log(rule)
	    return support;
	  }).map(function (k) {
	    var attribute = rule.style[k];
	    return attribute + ': ' + rule.style[attribute];
	  });
	
	  if (knownProperties.length > 0) {
	    return {
	      rule: rule.selectorText,
	      properties: knownProperties.join('; ')
	    };
	  }
	  return false;
	}
	
	var resetStyles = function resetStyles() {
	  newStylesheets.map(function (e) {
	    e.remove();
	  });
	  newStylesheets = [];
	  initialStylesheets.map(function (e) {
	    e.disabled = false;
	  });
	  initialStylesheets = [];
	};
	
	var findStyleSheet = function findStyleSheet(search) {
	  var stylesheets = window.document.styleSheets;
	
	  return Object.keys(stylesheets).map(function (k) {
	    return stylesheets[k];
	  }).filter(function (s) {
	    return s.href !== null && s.href.indexOf(search) > -1;
	  });
	};
	
	module.exports = { browsersDb: _browserData.browsersDb, filterStyles: filterStyles, resetStyles: resetStyles, findStyleSheet: findStyleSheet };

/***/ },
/* 1 */
/*!****************************************!*\
  !*** ./~/browser-data/browser-data.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var wikipediaDb = __webpack_require__(/*! ./db/wikipediaDb */ 2);
	var browsersDb = __webpack_require__(/*! ./db/browsersDb */ 3);
	var mdnDb = __webpack_require__(/*! ./db/mdnDb */ 4);
	var enginesPrefixes = __webpack_require__(/*! ./db/enginesPrefixes */ 5);
	var versionsHelpers = __webpack_require__(/*! ./versionsHelpers */ 6);
	var findLastVersion = versionsHelpers.findLastVersion;
	var compareVersions = versionsHelpers.compareVersions;
	
	var browsers = Object.keys(browsersDb);
	
	/* API */
	
	// Uses engineSupportDb
	var getEngine = function getEngine(browser) {
	  if (browsers.indexOf(browser.name) === -1) {
	    return undefined;
	  }
	  var browserData = browsersDb[browser.name];
	  var browserVersion = findLastVersion(Object.keys(browserData), browser.version);
	  return browserData[browserVersion];
	};
	
	// Uses engineSupportDb
	var browserSupport_ = function browserSupport(browser, property) {
	  var engine = getEngine(browser);
	  return engineSupport(engine, property);
	};
	
	// Uses mdnDb
	var browserSupport = function browserSupport(browser, property) {
	  var splited = splitPrefix(property);
	  var prefix = splited.prefix;
	  var property = splited.property;
	
	  var browsers = {
	    'Firefox': 'f',
	    'Android': 'a',
	    'Safari': 's',
	    'Chrome': 'c',
	    'Opera': 'o',
	    'IE': 'ie',
	    'IEMobile': 'iem'
	  };
	  var browserId = browsers[browser.name];
	  if (!mdnDb.hasOwnProperty(property)) {
	    console.log('property not in database: ' + property);
	  } else {
	    var supports = mdnDb[property].c.bs[browserId];
	    var defaultSupports = supports.filter(function (s) {
	      return s.p === prefix;
	    });
	    if (defaultSupports.length === 0) {
	      return undefined;
	    }
	    var version = defaultSupports[0].v;
	    switch (version) {
	      case 'yes':
	        return true;
	      case 'no':
	        return false;
	      case '-':
	      case '?':
	        return undefined;
	      // case undefined:
	      //   console.log(mdnDb[property])
	      default:
	        return compareVersions(version, browser.version) <= 0;
	    }
	  }
	  return undefined;
	};
	
	// Uses engineSupportDb
	var engineSupport = function engineSupport(engine, property) {
	  var originalProperty = property;
	  property = removePrefix(engine, property);
	  if (!wikipediaDb.hasOwnProperty(property)) {
	    console.log('property not in database: ' + property + ' (' + originalProperty + ')');
	    return undefined;
	  }
	  if (!wikipediaDb[property].hasOwnProperty(engine.name)) {
	    // MSHTML fallback
	    if (engine.name === 'MSHTML' && wikipediaDb[property].hasOwnProperty('Trident')) {
	      engine = { name: 'Trident', version: '3' };
	    } else {
	      console.log(engine.name + ' not in database for property ' + property);
	      console.log(wikipediaDb[property]);
	      return undefined;
	    }
	  }
	  var support = wikipediaDb[property][engine.name].toLowerCase();
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
	
	/* Helpers */
	
	function splitPrefix(property) {
	  var prefixes = ['ms', 'moz', 'webkit', 'apple', 'khtml', 'epub', 'o', 'xv', 'wap'];
	  var prefix = '';
	  prefixes.forEach(function (curPrefix) {
	    var pty = property.replace(new RegExp('^-?' + curPrefix + '-'), '');
	    if (pty !== property) {
	      property = pty;
	      prefix = '-' + curPrefix;
	    }
	  });
	  return { prefix: prefix, property: property };
	}
	
	module.exports = { getEngine: getEngine, browserSupport: browserSupport, engineSupport: engineSupport, browsersDb: browsersDb };

/***/ },
/* 2 */
/*!********************************************!*\
  !*** ./~/browser-data/db/wikipediaDb.json ***!
  \********************************************/
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
		},
		"!important": {
			"Trident": "7.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "?"
		},
		"/*Comment*/": {
			"Trident": "3.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "85",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "?"
		},
		"@import": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "Yes",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "2.1",
			"Martha": "Yes"
		},
		"@charset": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "Yes",
			"KHTML": "4.2.3",
			"Presto": "1.0",
			"Prince": "Yes",
			"Martha": "Incorrect"
		},
		"@media": {
			"Trident": "5.5",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "Yes",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.1",
			"Martha": "Yes"
		},
		"@namespace": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.0",
			"WebKit": "Yes",
			"KHTML": "Yes",
			"Presto": "1.0",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@document": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "6.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@keyframes": {
			"Trident": "10.0",
			"EdgeHTML": "12",
			"Gecko": "16.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"@supports": {
			"Trident": "No",
			"EdgeHTML": "12",
			"Gecko": "22.0",
			"WebKit": "28.0",
			"KHTML": "No",
			"Presto": "2.12",
			"Prince": "No",
			"Martha": "No"
		},
		"@counter-style": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "33.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@viewport": {
			"Trident": "10.0",
			"EdgeHTML": "12.0",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "2.7.62",
			"Prince": "No",
			"Martha": "No"
		},
		"@filter": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "35.0",
			"WebKit": "Experimental",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@page": {
			"Trident": "8.0",
			"EdgeHTML": "12",
			"Gecko": "19.0",
			"WebKit": "Nightly Build",
			"KHTML": "No",
			"Presto": "1.0",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"@top-left-corner": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@top-left": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@top-center": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@top-right": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@top-right-corner": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@bottom-left-corner": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@bottom-left": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@bottom-center": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@bottom-right": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@bottom-right-corner": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@left-top": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@left-middle": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@left-bottom": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@right-top": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@right-middle": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@right-bottom": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "No",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "5.0",
			"Martha": "Yes"
		},
		"@font-face": {
			"Trident": "9.0",
			"EdgeHTML": "12",
			"Gecko": "1.9.1",
			"WebKit": "525",
			"KHTML": "4.3",
			"Presto": "2.2",
			"Prince": "6.0",
			"Martha": "Yes"
		},
		"@font-feature-values": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@annotation": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@styleset": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@swash": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@ornaments": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@stylistic": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		},
		"@character-variant": {
			"Trident": "No",
			"EdgeHTML": "No",
			"Gecko": "34.0",
			"WebKit": "No",
			"KHTML": "No",
			"Presto": "No",
			"Prince": "No",
			"Martha": "No"
		}
	};

/***/ },
/* 3 */
/*!*******************************************!*\
  !*** ./~/browser-data/db/browsersDb.json ***!
  \*******************************************/
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
				"name": "WebKit",
				"version": "525.13"
			},
			"0.3": {
				"name": "WebKit",
				"version": "525.19"
			},
			"1.0": {
				"name": "WebKit",
				"version": "525.19"
			},
			"2.0": {
				"name": "WebKit",
				"version": "528.8"
			},
			"2.0.172": {
				"name": "WebKit",
				"version": "530.5"
			},
			"3.0": {
				"name": "WebKit",
				"version": "531.0"
			},
			"3.0.195": {
				"name": "WebKit",
				"version": "532.0"
			},
			"4.0": {
				"name": "WebKit",
				"version": "532.0"
			},
			"4.0.213": {
				"name": "WebKit",
				"version": "532.1"
			},
			"4.1": {
				"name": "WebKit",
				"version": "532.5"
			},
			"5.0": {
				"name": "WebKit",
				"version": "532.9"
			},
			"5.0.342": {
				"name": "WebKit",
				"version": "533.22"
			},
			"6.0": {
				"name": "WebKit",
				"version": "533.8"
			},
			"7.0": {
				"name": "WebKit",
				"version": "534.6"
			},
			"8.0": {
				"name": "WebKit",
				"version": "534.10"
			},
			"9.0": {
				"name": "WebKit",
				"version": "534.12"
			},
			"10.0": {
				"name": "WebKit",
				"version": "534.14"
			},
			"11.0": {
				"name": "WebKit",
				"version": "534.17"
			},
			"12.0": {
				"name": "WebKit",
				"version": "534.24"
			},
			"13.0": {
				"name": "WebKit",
				"version": "534.31"
			},
			"14.0": {
				"name": "WebKit",
				"version": "535.1"
			},
			"15.0": {
				"name": "WebKit",
				"version": "535.2"
			},
			"16.0": {
				"name": "WebKit",
				"version": "535.7"
			},
			"17.0": {
				"name": "WebKit",
				"version": "535.11"
			},
			"18.0": {
				"name": "WebKit",
				"version": "535.19"
			},
			"19.0": {
				"name": "WebKit",
				"version": "535.21"
			},
			"20.0": {
				"name": "WebKit",
				"version": "536.6"
			},
			"22.0": {
				"name": "WebKit",
				"version": "537.1"
			},
			"23.0": {
				"name": "WebKit",
				"version": "537.11"
			},
			"24.0": {
				"name": "WebKit",
				"version": "537.13"
			},
			"27.0": {
				"name": "WebKit",
				"version": "537.36"
			},
			"28.0": {
				"name": "WebKit",
				"version": "537.36"
			},
			"29.0": {
				"name": "WebKit",
				"version": "537.36"
			},
			"30.0": {
				"name": "WebKit",
				"version": "537.36"
			},
			"40.0": {
				"name": "WebKit",
				"version": "537.36"
			},
			"49.0": {
				"name": "WebKit",
				"version": "537.36"
			}
		},
		"Safari": {
			"1.0": {
				"name": "WebKit",
				"version": "85"
			},
			"1.0.3": {
				"name": "WebKit",
				"version": "85.8.5"
			},
			"1.1": {
				"name": "WebKit",
				"version": "100"
			},
			"1.2": {
				"name": "WebKit",
				"version": "125"
			},
			"1.3": {
				"name": "WebKit",
				"version": "312"
			},
			"1.3.1": {
				"name": "WebKit",
				"version": "312.3"
			},
			"1.3.2": {
				"name": "WebKit",
				"version": "312.6"
			},
			"2.0": {
				"name": "WebKit",
				"version": "412"
			},
			"2.0.2": {
				"name": "WebKit",
				"version": "416.11"
			},
			"2.0.4": {
				"name": "WebKit",
				"version": "419.3"
			},
			"3.0": {
				"name": "WebKit",
				"version": "522.11"
			},
			"3.0.2": {
				"name": "WebKit",
				"version": "522.12"
			},
			"3.0.3": {
				"name": "WebKit",
				"version": "522.12.1"
			},
			"3.0.4": {
				"name": "WebKit",
				"version": "523.10"
			},
			"3.1": {
				"name": "WebKit",
				"version": "525.13"
			},
			"3.1.1": {
				"name": "WebKit",
				"version": "525.17"
			},
			"3.1.2": {
				"name": "WebKit",
				"version": "525.21"
			},
			"3.2": {
				"name": "WebKit",
				"version": "525.26"
			},
			"3.2.1": {
				"name": "WebKit",
				"version": "525.27"
			},
			"3.2.3": {
				"name": "WebKit",
				"version": "525.28"
			},
			"4.0": {
				"name": "WebKit",
				"version": "530.17"
			},
			"4.0.1": {
				"name": "WebKit",
				"version": "530.18"
			},
			"4.0.2": {
				"name": "WebKit",
				"version": "530.19"
			},
			"4.0.3": {
				"name": "WebKit",
				"version": "531.9"
			},
			"4.0.4": {
				"name": "WebKit",
				"version": "531.21.10"
			},
			"4.0.5": {
				"name": "WebKit",
				"version": "531.22.7"
			},
			"4.1": {
				"name": "WebKit",
				"version": "533.16"
			},
			"4.1.1": {
				"name": "WebKit",
				"version": "533.17.8"
			},
			"4.1.2": {
				"name": "WebKit",
				"version": "533.18.5"
			},
			"4.1.3": {
				"name": "WebKit",
				"version": "533.19.4"
			},
			"5.0": {
				"name": "WebKit",
				"version": "533.16"
			},
			"5.0.1": {
				"name": "WebKit",
				"version": "533.17.8"
			},
			"5.0.2": {
				"name": "WebKit",
				"version": "533.18.5"
			},
			"5.0.3": {
				"name": "WebKit",
				"version": "533.19.4"
			},
			"5.0.4": {
				"name": "WebKit",
				"version": "533.20.27"
			},
			"5.0.5": {
				"name": "WebKit",
				"version": "533.21.1"
			},
			"5.0.6": {
				"name": "WebKit",
				"version": "533.22.3"
			},
			"5.1": {
				"name": "WebKit",
				"version": "534.48.3"
			},
			"5.1.1": {
				"name": "WebKit",
				"version": "534.51.22"
			},
			"5.1.2": {
				"name": "WebKit",
				"version": "534.52.7"
			},
			"5.1.3": {
				"name": "WebKit",
				"version": "534.53.10"
			},
			"5.1.4": {
				"name": "WebKit",
				"version": "534.54.16"
			},
			"5.1.5": {
				"name": "WebKit",
				"version": "534.55.3"
			},
			"5.1.6": {
				"name": "WebKit",
				"version": "534.56.5"
			},
			"5.1.7": {
				"name": "WebKit",
				"version": "534.57.2"
			},
			"5.1.8": {
				"name": "WebKit",
				"version": "534.58.2"
			},
			"5.1.9": {
				"name": "WebKit",
				"version": "534.59.8"
			},
			"5.1.10": {
				"name": "WebKit",
				"version": "534.59.10"
			},
			"6.0": {
				"name": "WebKit",
				"version": "536.25"
			},
			"6.0.1": {
				"name": "WebKit",
				"version": "536.26"
			},
			"6.0.2": {
				"name": "WebKit",
				"version": "536.26.17"
			},
			"6.0.3": {
				"name": "WebKit",
				"version": "536.28.10"
			},
			"6.0.4": {
				"name": "WebKit",
				"version": "536.29.13"
			},
			"6.0.5": {
				"name": "WebKit",
				"version": "536.30.1"
			},
			"6.1": {
				"name": "WebKit",
				"version": "537.43.58"
			},
			"6.1.1": {
				"name": "WebKit",
				"version": "537.73.11"
			},
			"6.1.6": {
				"name": "WebKit",
				"version": "537.78.2"
			},
			"6.2.8": {
				"name": "WebKit",
				"version": "537.85.17"
			},
			"7.0": {
				"name": "WebKit",
				"version": "537.71"
			},
			"7.0.1": {
				"name": "WebKit",
				"version": "537.73.11"
			},
			"7.0.3": {
				"name": "WebKit",
				"version": "537.75.14"
			},
			"7.0.4": {
				"name": "WebKit",
				"version": "537.76.4"
			},
			"7.0.5": {
				"name": "WebKit",
				"version": "537.77.4"
			},
			"7.0.6": {
				"name": "WebKit",
				"version": "537.78.2"
			},
			"7.1.8": {
				"name": "WebKit",
				"version": "537.85.17"
			},
			"8.0": {
				"name": "WebKit",
				"version": "538.35.8"
			},
			"8.0.6": {
				"name": "WebKit",
				"version": "600.6.3"
			},
			"8.0.7": {
				"name": "WebKit",
				"version": "600.7.12"
			},
			"9.0.1": {
				"name": "WebKit",
				"version": "601.2.7"
			},
			"9.0.2": {
				"name": "WebKit",
				"version": "601.3.9"
			},
			"9.0.3": {
				"name": "WebKit",
				"version": "601.4.4"
			},
			"9.1": {
				"name": "WebKit",
				"version": "601.5.17"
			}
		},
		"Android": {
			"1.5": {
				"name": "WebKit",
				"version": "528.5",
				"api": "3"
			},
			"1.6": {
				"name": "WebKit",
				"version": "528.5",
				"api": "4"
			},
			"2.0": {
				"name": "WebKit",
				"version": "530.17",
				"api": "5"
			},
			"2.0.1": {
				"name": "WebKit",
				"version": "530.17",
				"api": "6"
			},
			"2.1": {
				"name": "WebKit",
				"version": "530.17",
				"api": "7"
			},
			"2.2": {
				"name": "WebKit",
				"version": "533.1",
				"api": "8"
			},
			"2.3": {
				"name": "WebKit",
				"version": "533.1",
				"api": "9"
			},
			"2.3.3": {
				"name": "WebKit",
				"version": "533.1",
				"api": "10"
			},
			"3.0": {
				"name": "WebKit",
				"version": "534.13",
				"api": "11"
			},
			"3.1": {
				"name": "WebKit",
				"version": "534.13",
				"api": "12"
			},
			"3.2": {
				"name": "WebKit",
				"version": "534.13",
				"api": "13"
			},
			"4.0": {
				"name": "WebKit",
				"version": "534.30",
				"api": "14"
			},
			"4.0.3": {
				"name": "WebKit",
				"version": "534.30",
				"api": "15"
			},
			"4.1": {
				"name": "WebKit",
				"version": "534.30",
				"api": "16"
			},
			"4.2": {
				"name": "WebKit",
				"version": "534.30",
				"api": "17"
			},
			"4.3": {
				"name": "WebKit",
				"version": "534.30",
				"api": "18"
			},
			"4.4": {
				"name": "WebKit",
				"version": "537.36",
				"api": "19"
			},
			"5.0": {
				"name": "WebKit",
				"version": "537.36"
			}
		},
		"Opera": {
			"15": {
				"name": "WebKit",
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

/***/ },
/* 4 */
/*!**************************************!*\
  !*** ./~/browser-data/db/mdnDb.json ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = {
		":active": {
			"n": ":active",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"Support on non-<a> elements": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"additive-symbols": {
			"n": "additive-symbols",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":after": {
			"n": ":after",
			"t": [
				"CSS Pseudo-element",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"::after": {
			"n": "::after",
			"t": [
				"CSS Pseudo-element",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"align-content": {
			"n": "align-content",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"align-items": {
			"n": "align-items",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					]
				}
			}
		},
		"align-self": {
			"n": "align-self",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"all": {
			"n": "all",
			"t": [
				"CSS Cascade",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "37"
						}
					],
					"f": [
						{
							"p": "",
							"v": "27"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "24"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "27.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"revert": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9.3"
						}
					]
				}
			}
		},
		"<angle>": {
			"n": "<angle>",
			"t": [
				"CSS Data Type",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"turn unit": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-bottom-right-radius": {
			"n": "border-bottom-right-radius",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Percentages": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Elliptical corners": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-bottom-left-radius": {
			"n": "border-bottom-left-radius",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Percentages": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Elliptical corners": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-bottom-color": {
			"n": "border-bottom-color",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"border-bottom": {
			"n": "border-bottom",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-block-start-width": {
			"n": "border-block-start-width",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-start-style": {
			"n": "border-block-start-style",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-start-color": {
			"n": "border-block-start-color",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-start": {
			"n": "border-block-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-end-width": {
			"n": "border-block-end-width",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-end-style": {
			"n": "border-block-end-style",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-end-color": {
			"n": "border-block-end-color",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-block-end": {
			"n": "border-block-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border": {
			"n": "border",
			"t": [
				"CSS Borders",
				"CSS Property",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"block-size": {
			"n": "block-size",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"filter": {
			"n": "filter",
			"t": [
				"CSS Property",
				"SVG",
				"SVG Filter"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "18.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "35"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.4"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "35"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "22.0"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "6.0"
						}
					]
				},
				"On SVG Elements": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "35"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "35"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<blend-mode>": {
			"n": "<blend-mode>",
			"t": [
				"Blend modes",
				"Compositing",
				"CSS Compositing",
				"CSS Data Type",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "35"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":before": {
			"n": ":before",
			"t": [
				"CSS Pseudo-element",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"::before": {
			"n": "::before",
			"t": [
				"CSS Pseudo-element",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.1"
						}
					]
				}
			}
		},
		"<basic-shape>": {
			"n": "<basic-shape>",
			"t": [
				"CSS Data Type",
				"CSS Shapes",
				"NeedsExample",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"\\xx": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"background-size": {
			"n": "background-size",
			"t": [
				"CSS Background",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "3.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.6"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						},
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "9.5"
						},
						{
							"p": "",
							"v": "-"
						},
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "-"
						},
						{
							"p": "",
							"v": "4.1"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.1"
						}
					]
				},
				"Support for\n    contain and cover": {
					"c": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.1"
						},
						{
							"p": "",
							"v": "4.1"
						},
						{
							"p": "",
							"v": "4.1"
						}
					]
				},
				"Support for SVG backgrounds": {
					"c": [
						{
							"p": "",
							"v": "44.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						},
						{
							"p": "",
							"v": "?"
						},
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"background-repeat": {
			"n": "background-repeat",
			"t": [
				"CSS Background",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Multiple backgrounds": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Different values for X & Y directions (two-value syntax)": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"round and space keywords": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"background-position": {
			"n": "background-position",
			"t": [
				"CSS Background",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Multiple backgrounds": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Four-value syntax (support for offsets from any edge)": {
					"c": [
						{
							"p": "",
							"v": "25"
						}
					],
					"f": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		"background-origin": {
			"n": "background-origin",
			"t": [
				"CSS Background",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"content-box": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"background-image": {
			"n": "background-image",
			"t": [
				"CSS Background",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Multiple backgrounds": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Gradients": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"SVG images": {
					"c": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"element": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-moz",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"image-rect": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-moz",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Any <image> value.": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"background-color": {
			"n": "background-color",
			"t": [
				"CSS Background",
				"CSS Property",
				"Graphics",
				"Layout"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"background-clip": {
			"n": "background-clip",
			"t": [
				"CSS Background",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"content-box": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"text ": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"background-blend-mode": {
			"n": "background-blend-mode",
			"t": [
				"CSS Compositing",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "35"
						}
					],
					"f": [
						{
							"p": "",
							"v": "30.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "22"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "30.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "22"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "8"
						}
					]
				}
			}
		},
		"background-attachment": {
			"n": "background-attachment",
			"t": [
				"CSS Background",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				},
				"Multiple backgrounds": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				},
				"local": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "25"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "25.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"background": {
			"n": "background",
			"t": [
				"CSS Background",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				},
				"Multiple backgrounds": {
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				},
				"SVG image as background": {
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "4.2"
						}
					]
				},
				"Support for background-size": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "4.0"
						}
					]
				},
				"Support for background-origin and background-clip": {
					"f": [
						{
							"p": "",
							"v": "22.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "22.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "4.0"
						}
					]
				}
			}
		},
		"backface-visibility": {
			"n": "backface-visibility",
			"t": [
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "12"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.1"
						},
						{
							"p": "-webkit",
							"v": "11"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				}
			}
		},
		"attr": {
			"n": "attr",
			"t": [
				"CSS Function",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				},
				"Usage in other properties than content and with non-string values   ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"::backdrop": {
			"n": "::backdrop",
			"t": [
				"CSS Pseudo-element",
				"Full-screen",
				"Layout",
				"NeedsContent",
				"Pseudo-element"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "webkit",
							"v": "32.0"
						},
						{
							"p": "",
							"v": "37.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "47"
						}
					],
					"ie": [
						{
							"p": "ms",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "47.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"on <dialog>": {
					"c": [
						{
							"p": "webkit",
							"v": "32.0"
						},
						{
							"p": "",
							"v": "37.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"on fullscreen": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "47"
						}
					],
					"ie": [
						{
							"p": "ms",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "47.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"font-variant-alternates": {
			"n": "font-variant-alternates",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation-timing-function": {
			"n": "animation-timing-function",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "12"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation-play-state": {
			"n": "animation-play-state",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation-name": {
			"n": "animation-name",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation-iteration-count": {
			"n": "animation-iteration-count",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "43.0"
						},
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		"@font-feature-values": {
			"n": "@font-feature-values",
			"t": [
				"At-rule",
				"Fonts"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation-fill-mode": {
			"n": "animation-fill-mode",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation-duration": {
			"n": "animation-duration",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "4.2"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "43.0"
						}
					]
				}
			}
		},
		"animation-direction": {
			"n": "animation-direction",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.50"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"reverse": {
					"c": [
						{
							"p": "",
							"v": "19"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"alternate-reverse": {
					"c": [
						{
							"p": "",
							"v": "19"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "43.0"
						}
					]
				}
			}
		},
		"animation-delay": {
			"n": "animation-delay",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "12"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"animation": {
			"n": "animation",
			"t": [
				"CSS Animations",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"Supported w/ prefix": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					]
				},
				"Unprefixed support": {
					"c": [
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.50"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.50"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		":checked": {
			"n": ":checked",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"clear": {
			"n": "clear",
			"t": [
				"CSS Positioning",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"inline-start, inline-end": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "45"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "45.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "2.5"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"clip": {
			"n": "clip",
			"t": [
				"CSS Property",
				"Deprecated",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"clip-path": {
			"n": "clip-path",
			"t": [
				"CSS Property",
				"Experimental",
				"Layout",
				"NeedsBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"HTML elements": {
					"c": [
						{
							"p": "-webkit",
							"v": "24"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"<length>": {
			"n": "<length>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"ch": {
					"c": [
						{
							"p": "",
							"v": "27"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.8"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.1.1"
						}
					]
				},
				"ex": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"rem": {
					"c": [
						{
							"p": "",
							"v": "4"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.6"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "4.0"
						}
					]
				},
				"vh, vw": {
					"c": [
						{
							"p": "",
							"v": "20"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6.0"
						}
					]
				},
				"vmin": {
					"c": [
						{
							"p": "",
							"v": "20"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6.0"
						}
					]
				},
				"vmax": {
					"c": [
						{
							"p": "",
							"v": "26"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "20.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "4.0"
						}
					]
				},
				"Viewport-percentage lengths invalid in @page": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "21"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"mozmm  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"1in always is 96dpi": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"color": {
			"n": "color",
			"t": [
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"<color>": {
			"n": "<color>",
			"t": [
				"CSS Data Type",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"keywords colors": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"#RRGGBB, #RGB": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"rgb()": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"hsl()": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				},
				"rgba()": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"hsla()": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				},
				"currentColor": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					]
				},
				"transparent": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				},
				"rebeccapurple": {
					"c": [
						{
							"p": "",
							"v": "38.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "25.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "8"
						}
					]
				},
				"#RRGGBBAA, #RGBA": {
					"c": [
						{
							"p": "",
							"v": "-"
						}
					],
					"f": [
						{
							"p": "",
							"v": "49"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "49.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"::first-line (:first-line)": {
			"n": "::first-line (:first-line)",
			"t": [
				"CSS Pseudo-element",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Old one-colon syntax (:first-line)": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"::first-letter (:first-letter)": {
			"n": "::first-letter (:first-letter)",
			"t": [
				"CSS Pseudo-element",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Old one-colon syntax (:first-letter)": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Support for the Dutch digraph IJ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":first-child": {
			"n": ":first-child",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		":first": {
			"n": ":first",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsLiveSample",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"fallback": {
			"n": "fallback",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":enabled": {
			"n": ":enabled",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"empty-cells": {
			"n": "empty-cells",
			"t": [
				"CSS Property",
				"CSS Tables",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		":empty": {
			"n": ":empty",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"element": {
			"n": "element",
			"t": [
				"CSS Function",
				"CSS4-images",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<resolution>": {
			"n": "<resolution>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"dppx": {
					"c": [
						{
							"p": "",
							"v": "29"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"display": {
			"n": "display",
			"t": [
				"CSS Positioning",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"none, inline and block": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"inline-block": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"list-item": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"inline-list-item": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"run-in  ": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						},
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						},
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "5.0"
						}
					]
				},
				"inline-table": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"table, table-cell, table-column, table-column-group, table-header-group, table-row-group, table-footer-group, table-row, and table-caption": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"flex": {
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.50"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					]
				},
				"inline-flex": {
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.50"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					]
				},
				"grid  ": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"inline-grid  ": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"ruby, ruby-base, ruby-text, ruby-base-container, ruby-text-container  ": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"contents  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "37"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "-webkit",
							"v": "6.1"
						}
					]
				}
			}
		},
		":disabled": {
			"n": ":disabled",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"direction": {
			"n": "direction",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6"
						}
					],
					"om": [
						{
							"p": "",
							"v": "8"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		":dir()": {
			"n": ":dir()",
			"t": [
				"CSS Pseudo-class",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "17"
						},
						{
							"p": "",
							"v": "49"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "17.0"
						},
						{
							"p": "",
							"v": "49.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":default": {
			"n": ":default",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				}
			}
		},
		"<custom-ident>": {
			"n": "<custom-ident>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {}
		},
		"cursor": {
			"n": "cursor",
			"t": [
				"CSS Property",
				"Cursor",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"auto, crosshair, default, move, text, wait, help,\n    n-resize, e-resize, s-resize, w-resize,\n    ne-resize, nw-resize, se-resize, sw-resize": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"pointer, progress": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"url()": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Positioning syntax for url() values  ": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"not-allowed, no-drop, vertical-text, all-scroll,\n    col-resize, row-resize": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.6"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"alias, cell, copy,\n    ew-resize, ns-resize, nesw-resize, nwse-resize": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.6"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"context-menu": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.6"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"none": {
					"c": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"inherit": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"zoom-in, zoom-out": {
					"c": [
						{
							"p": "-webkit-",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "37"
						}
					],
					"f": [
						{
							"p": "-moz-",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "24.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.6"
						},
						{
							"p": "-webkit-",
							"v": "15-23"
						},
						{
							"p": "",
							"v": "24"
						}
					],
					"s": [
						{
							"p": "-webkit-",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "9"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"grab, grabbing": {
					"c": [
						{
							"p": "-webkit-",
							"v": "1.0"
						},
						{
							"p": "-webkit-",
							"v": "22.0"
						}
					],
					"f": [
						{
							"p": "-moz-",
							"v": "1.5"
						},
						{
							"p": "",
							"v": "27.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit-",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "-webkit-",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "-moz-",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						},
						{
							"p": "-webkit-",
							"v": "15-23"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						},
						{
							"p": "-webkit-",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"<timing-function>": {
			"n": "<timing-function>",
			"t": [
				"CSS Data Type",
				"CSS Reference",
				"Layout"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "2.0"
						}
					]
				},
				"cubic-bezier() w/ ordinate ∉ [0,1]": {
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"steps()": {
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				}
			}
		},
		"@counter-style": {
			"n": "@counter-style",
			"t": [
				"At-rule",
				"counter",
				"Styles"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"counter-reset": {
			"n": "counter-reset",
			"t": [
				"CSS List",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "25.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		"counter-increment": {
			"n": "counter-increment",
			"t": [
				"CSS List",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"Using CSS counters": {
			"n": "Using CSS counters",
			"t": [
				"Advanced",
				"CSS List",
				"CSS Value",
				"Guide",
				"Layout"
			],
			"c": {}
		},
		"content": {
			"n": "content",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"url() support": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"columns": {
			"n": "columns",
			"t": [
				"CSS Multi-columns",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "9"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "22.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "11.5"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"on display: table-caption": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "37"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "37.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-width": {
			"n": "column-width",
			"t": [
				"CSS Multi-columns",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Intrinsic sizes": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"on display: table-on, display: table-caption": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "37"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "37.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		"column-span": {
			"n": "column-span",
			"t": [
				"CSS Multi-columns",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-rule-width": {
			"n": "column-rule-width",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-rule-style": {
			"n": "column-rule-style",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-rule-color": {
			"n": "column-rule-color",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-gap": {
			"n": "column-gap",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-rule": {
			"n": "column-rule",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		"column-fill": {
			"n": "column-fill",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "13.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "13.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"column-count": {
			"n": "column-count",
			"t": [
				"CSS Multi-columns",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"on display: table-caption": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "37"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "37.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unprefixed": {
					"c": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "50.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "-"
						}
					],
					"om": [
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "50.0"
						}
					]
				}
			}
		},
		":first-of-type": {
			"n": ":first-of-type",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		"flex": {
			"n": "flex",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						},
						{
							"p": "",
							"v": "28.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						},
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						},
						{
							"p": "",
							"v": "9.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "11"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "7.1"
						}
					]
				}
			}
		},
		"flex-basis": {
			"n": "flex-basis",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "22.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"e": [
						{
							"p": "",
							"v": "12"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"auto": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"e": [
						{
							"p": "",
							"v": "12"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					]
				},
				"content": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "12"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"flex-direction": {
			"n": "flex-direction",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						},
						{
							"p": "",
							"v": "28.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10"
						},
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"flex-flow": {
			"n": "flex-flow",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						},
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "11"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "7.1"
						}
					]
				}
			}
		},
		"flex-shrink": {
			"n": "flex-shrink",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "32.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "8.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "32.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"flex-grow": {
			"n": "flex-grow",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"< 0 animate": {
					"f": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "49.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"flex-wrap": {
			"n": "flex-wrap",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					]
				}
			}
		},
		"grid-auto-rows": {
			"n": "grid-auto-rows",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-column-start": {
			"n": "grid-column-start",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-auto-flow": {
			"n": "grid-auto-flow",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-column-gap": {
			"n": "grid-column-gap",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-auto-columns": {
			"n": "grid-auto-columns",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-area": {
			"n": "grid-area",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-column-end": {
			"n": "grid-column-end",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-column": {
			"n": "grid-column",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid": {
			"n": "grid",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<gradient>": {
			"n": "<gradient>",
			"t": [
				"CSS Data Type",
				"Graphics",
				"Layout"
			],
			"c": {}
		},
		":fullscreen": {
			"n": ":fullscreen",
			"t": [
				"CSS Pseudo-class",
				"Experimental",
				"Full-screen",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"e": [
						{
							"p": "",
							"v": "12"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Select all elements in the fullscreen stack": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"e": [
						{
							"p": "",
							"v": "12"
						}
					],
					"f": [
						{
							"p": "",
							"v": "43"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "43.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"<frequency>": {
			"n": "<frequency>",
			"t": [
				"CSS Data Types",
				"CSS Unit",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"font-weight": {
			"n": "font-weight",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"font-variant-position": {
			"n": "font-variant-position",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"font-variant-numeric": {
			"n": "font-variant-numeric",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "52"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"font-variant-ligatures": {
			"n": "font-variant-ligatures",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"CSS Reference",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "31"
						},
						{
							"p": "",
							"v": "34"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "19.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.4"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					]
				}
			}
		},
		"font-variant-east-asian": {
			"n": "font-variant-east-asian",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"font-variant-caps": {
			"n": "font-variant-caps",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"Not Found": {
			"n": "Not Found",
			"t": [],
			"c": {}
		},
		"font-variant": {
			"n": "font-variant",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"ß → SS": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"i → İ and ı → I": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "14"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Greek accented letters": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"CSS Font L3 version (shorthand)": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9.3"
						}
					]
				}
			}
		},
		"font-synthesis": {
			"n": "font-synthesis",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"font-style": {
			"n": "font-style",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"font"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"font-stretch": {
			"n": "font-stretch",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "35.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"font-size-adjust": {
			"n": "font-size-adjust",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "44.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "42.0"
						}
					]
				}
			}
		},
		"font-size": {
			"n": "font-size",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"Rem values": {
					"c": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						},
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.1"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "42"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"font-language-override": {
			"n": "font-language-override",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "34"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"font-kerning": {
			"n": "font-kerning",
			"t": [
				"CSS Property",
				"Fonts",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "32"
						}
					],
					"f": [
						{
							"p": "",
							"v": "34"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7"
						}
					]
				}
			}
		},
		"font-feature-settings": {
			"n": "font-feature-settings",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "16.0"
						},
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "-moz",
							"v": "29.0"
						},
						{
							"p": "",
							"v": "34.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "-moz",
							"v": "29.0"
						},
						{
							"p": "",
							"v": "34.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "24"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"font-family": {
			"n": "font-family",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"@font-face": {
			"n": "@font-face",
			"t": [
				"At-rule",
				"Fonts"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"WOFF": {
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"c": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				},
				"WOFF2": {
					"f": [
						{
							"p": "",
							"v": "39"
						}
					],
					"c": [
						{
							"p": "",
							"v": "38"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "24"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"SVG Fonts[2]": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"unicode-range": {
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "36.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"font": {
			"n": "font",
			"t": [
				"CSS Fonts",
				"CSS Property"
			],
			"c": {
				"Shorthand": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"System fonts": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"Support of font-stretch values": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "43"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "43"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "43"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":focus": {
			"n": ":focus",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"float": {
			"n": "float",
			"t": [
				"CSS Positioning",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"inline-start, inline-end": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "45"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "45.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "2.5"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-gap": {
			"n": "grid-gap",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-row": {
			"n": "grid-row",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-row-end": {
			"n": "grid-row-end",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-row-gap": {
			"n": "grid-row-gap",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-row-start": {
			"n": "grid-row-start",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-template": {
			"n": "grid-template",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-template-areas": {
			"n": "grid-template-areas",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"grid-template-columns": {
			"n": "grid-template-columns",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"list-style": {
			"n": "list-style",
			"t": [
				"CSS List",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		":link": {
			"n": ":link",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		"linear-gradient()": {
			"n": "linear-gradient()",
			"t": [
				"CSS Function",
				"CSS Image",
				"Graphics",
				"Layout",
				"NeedsNewCompatTable"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "16"
						},
						{
							"p": "",
							"v": "26"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"On border-radius": {
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"On any other property that accepts <image>": {
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Legacy webkit syntax ": {
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Legacy 'from' syntax (without to) ": {
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Standard syntax (using the to keyword)": {
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Interpolation hints (a percent without a color)": {
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Unitless 0 for <angle>": {
					"f": [
						{
							"p": "-moz",
							"v": "46"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"line-height": {
			"n": "line-height",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"line-break": {
			"n": "line-break",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsExample",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"letter-spacing": {
			"n": "letter-spacing",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsMobileBrowserCompatibility",
				"SVG"
			],
			"c": {
				"HTML support": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"SVG support": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":left": {
			"n": ":left",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"left": {
			"n": "left",
			"t": [
				"CSS Positioning",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		":last-of-type": {
			"n": ":last-of-type",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		":last-child": {
			"n": ":last-child",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		":lang": {
			"n": ":lang",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"@keyframes": {
			"n": "@keyframes",
			"t": [
				"animations",
				"Animations",
				"At-rule",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"ignore !important declarations": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"justify-content": {
			"n": "justify-content",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"isolation": {
			"n": "isolation",
			"t": [
				"CSS Compositing",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "30"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "36.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "36"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "8.0"
						}
					]
				}
			}
		},
		":invalid": {
			"n": ":invalid",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				},
				"Apply it to <form>": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "13"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"<integer>": {
			"n": "<integer>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"basic": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"inline-size": {
			"n": "inline-size",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"initial": {
			"n": "initial",
			"t": [
				"CSS Cascade",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						},
						{
							"p": "",
							"v": "19.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"inherit": {
			"n": "inherit",
			"t": [
				"CSS Cascade",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		":indeterminate": {
			"n": ":indeterminate",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"type=\"checkbox\"": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.60"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"<progress>": {
					"c": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.60"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":in-range": {
			"n": ":in-range",
			"t": [
				"CSS Pseudo-class"
			],
			"c": {
				"Support on <input>": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"@import": {
			"n": "@import",
			"t": [
				"At-rule"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"ime-mode": {
			"n": "ime-mode",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"image-rendering": {
			"n": "image-rendering",
			"t": [
				"CSS Image",
				"CSS Property",
				"Experimental",
				"NeedsMobileBrowserCompatibility",
				"SVG"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.60"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"crisp-edges": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.60"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"pixelated": {
					"c": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"optimizeQuality, optimizeSpeed ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.60"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"image-orientation": {
			"n": "image-orientation",
			"t": [
				"CSS Image",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "26"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"from-image": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "26"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"flip": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "26"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<image>": {
			"n": "<image>",
			"t": [
				"CSS Data Type",
				"CSS Image",
				"Graphics",
				"Layout"
			],
			"c": {
				"<uri>": {
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"<gradient>": {
					"f": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"element()": {
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"f": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-ms",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-o",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"hyphens": {
			"n": "hyphens",
			"t": [
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "13"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "43.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "4.2"
						}
					]
				},
				"Hyphenation dictionary for Afrikaans (af, af-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Bulgarian (bg, bg-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Catalan (ca, ca-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Croatian (hr, hr-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Czech (cs, cs-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Danish (da, da-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Dutch (nl, nl-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for English (en, en-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Esperanto (eo, eo-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Estonian (et, et-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Finnish (fi, fi-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for French (fr, fr-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Galician (gl, gl-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for German, Traditional Orthography of 1901 (de-1901, de-AT-1901, de-DE-1901)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for German, Reformed Orthography of 1996 (de, de-1996, de-DE, de-AT, de-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for German, Swiss Orthography (de-CH, de-CH-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Hungarian (hu, hu-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Icelandic (is, is-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Interlingua (ia, ia-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Italian (it, it-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Kurmanji (kmr, kmr-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Latin (la, la-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Lithuanian (lt, lt-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Mongolian (mn, mn-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Norwegian (Bokmål) (no, no-*, nb, nb-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Norwegian (Nynorsk) (nn, nn-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Polish (pl, pl-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Portuguese (pt, pt-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Brazilian Portuguese (pt-BR)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": []
				},
				"Hyphenation dictionary for Russian (ru, ru-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Serbian, Bosnian, Serbo-Croatian (sh, sh-*, sr, sr-*, bs, bs-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Slovenian (sl, sl-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Spanish (es, es-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Swedish (sv, sv-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Turkish (tr, tr-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Ukrainian (uk, uk-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Upper Sorbian (hsb, hsb-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for Welsh (cy, cy-*)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Hyphenation dictionary for other languages": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":hover": {
			"n": ":hover",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Référence"
			],
			"c": {
				"for <a> elements": {
					"c": [
						{
							"p": "",
							"v": "0.2"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "2.0.4"
						},
						{
							"p": "",
							"v": "-"
						}
					]
				},
				"for all elements": {
					"c": [
						{
							"p": "",
							"v": "0.2"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "2.0.4"
						},
						{
							"p": "",
							"v": "-"
						}
					]
				},
				"for pseudo-element": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "28"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "0.2"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		"height": {
			"n": "height",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"grid-template-rows": {
			"n": "grid-template-rows",
			"t": [
				"CSS Grid",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "-ms",
							"v": "20"
						}
					],
					"o": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"list-style-image": {
			"n": "list-style-image",
			"t": [
				"CSS List",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"list-style-position": {
			"n": "list-style-position",
			"t": [
				"CSS List",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"list-style-type": {
			"n": "list-style-type",
			"t": [
				"CSS List",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"lower-latin, upper-latin, lower-greek, armenian, georgian": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"decimal-leading-zero": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"hebrew, cjk-ideographic, hiragana, hiragana-iroha, katakana, katakana-iroha  ": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						},
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0-1.2"
						}
					]
				},
				"japanese-formal, japanese-informal, simp-chinese-formal, trad-chinese-formal, simp-chinese-informal, trad-chinese-informal  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "28.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"korean-hangul-formal, korean-hanja-informal, korean-hanja-formal, cjk-decimal  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"ethiopic-numeric, persian, arabic-indic, devanagari, bengali, gurmukhi, gujarati, oriya, tamil, telugu, kannada, malayalam, thai, lao, myanmar, khmer, cjk-heavenly-stem, cjk-earthly-branch  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "33.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"disclosure-open, disclosure-closed, mongolian  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"<string>": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"margin": {
			"n": "margin",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"auto value": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"margin-block-end": {
			"n": "margin-block-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"margin-block-start": {
			"n": "margin-block-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"margin-bottom": {
			"n": "margin-bottom",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"auto value": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"margin-inline-end": {
			"n": "margin-inline-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":nth-of-type": {
			"n": ":nth-of-type",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		":nth-last-of-type": {
			"n": ":nth-last-of-type",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		":nth-last-child": {
			"n": ":nth-last-child",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		":nth-child": {
			"n": ":nth-child",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		":not()": {
			"n": ":not()",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				},
				"Extended arguments": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"negative": {
			"n": "negative",
			"t": [
				"@counter-style",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"@namespace": {
			"n": "@namespace",
			"t": [
				"At-rule",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Namespace selector (|)": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				}
			}
		},
		"<time>": {
			"n": "<time>",
			"t": [
				"CSS Data Type",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"mix-blend-mode": {
			"n": "mix-blend-mode",
			"t": [
				"CSS Compositing",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "8.0"
						}
					]
				},
				"SVG": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"min-zoom": {
			"n": "min-zoom",
			"t": [
				"CSS Descriptor",
				"NeedsBrowserCompatibility",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"min-width": {
			"n": "min-width",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "2.0.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"applies to <table> [1]": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"max-content, min-content, fit-content, and fill-available  ": {
					"c": [
						{
							"p": "-webkit",
							"v": "24.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"auto": {
					"c": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						},
						{
							"p": "",
							"v": "-"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"auto as initial value ": {
					"c": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"min-inline-size": {
			"n": "min-inline-size",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"min-height": {
			"n": "min-height",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "2.0.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9"
						}
					]
				},
				"applies to <table> [1]": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"max-content, min-content, fit-content, and fill-available  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9"
						}
					]
				},
				"autoObsolete since Gecko 22": {
					"c": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"auto as initial valueObsolete since Gecko 22": {
					"c": [
						{
							"p": "",
							"v": "21.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"min-block-size": {
			"n": "min-block-size",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"@media": {
			"n": "@media",
			"t": [
				"At-rule"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				},
				"speech": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Media features": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				},
				"display-mode media feature": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "47"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"max-zoom": {
			"n": "max-zoom",
			"t": [
				"CSS Descriptor",
				"NeedsBrowserCompatibility",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"max-width": {
			"n": "max-width",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "2.0.2"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"applies to <table> [1]": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"max-content, min-content, fit-content, and fill-available  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"max-inline-size": {
			"n": "max-inline-size",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"max-height": {
			"n": "max-height",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"applies to <table> [1]": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"max-content, min-content, and fit-content  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9"
						}
					]
				},
				"fill-available  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"max-block-size": {
			"n": "max-block-size",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<transform-function>": {
			"n": "<transform-function>",
			"t": [
				"CSS Data Type",
				"CSS Reference",
				"CSS Transforms",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				},
				"3D Support": {
					"c": [
						{
							"p": "",
							"v": "12.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "22"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		"mask-type": {
			"n": "mask-type",
			"t": [
				"CSS Masks",
				"CSS Property",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility",
				"SVG"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "24.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "35.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "35.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Applies to HTML elements": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "35.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"mask-size": {
			"n": "mask-size",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Experimental",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"mask-repeat": {
			"n": "mask-repeat",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Experimental",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"mask-position": {
			"n": "mask-position",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Experimental",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"mask-origin": {
			"n": "mask-origin",
			"t": [
				"CSS Masks",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"fill-box, stroke-box, view-box": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"content, padding, border ": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"mask-mode": {
			"n": "mask-mode",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Non-standard"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"mask-image": {
			"n": "mask-image",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Experimental",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				},
				"Multiple mask images": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"SVG masks": {
					"c": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"e": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				}
			}
		},
		"mask-composite": {
			"n": "mask-composite",
			"t": [
				"CSS Masks",
				"CSS Property",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility",
				"Non-standard"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"mask-clip": {
			"n": "mask-clip",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"border, padding, content, text ": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"mask": {
			"n": "mask",
			"t": [
				"CSS Masks",
				"CSS Property",
				"Layout",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility",
				"SVG"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				},
				"Applies to HTML Elements": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Shorthand for mask-* properties": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"margin-top": {
			"n": "margin-top",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"auto value": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"margin-right": {
			"n": "margin-right",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"auto value": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"margin-inline-start": {
			"n": "margin-inline-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"margin-left": {
			"n": "margin-left",
			"t": [
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"auto value": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"<number>": {
			"n": "<number>",
			"t": [
				"CSS Data Type",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Scientific notation": {
					"c": [
						{
							"p": "",
							"v": "43.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"object-fit": {
			"n": "object-fit",
			"t": [
				"CSS Image",
				"CSS Property",
				"polyfill"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.60"
						},
						{
							"p": "",
							"v": "19.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4.4"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "36"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "11.5"
						},
						{
							"p": "",
							"v": "24"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"object-position": {
			"n": "object-position",
			"t": [
				"CSS Image",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "31.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.60"
						},
						{
							"p": "",
							"v": "19.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4.4"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "36"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "11.5"
						},
						{
							"p": "",
							"v": "24"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"offset-block-end": {
			"n": "offset-block-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"offset-block-start": {
			"n": "offset-block-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"offset-inline-end": {
			"n": "offset-inline-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"offset-inline-start": {
			"n": "offset-inline-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":only-child": {
			"n": ":only-child",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		"<position>": {
			"n": "<position>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Combination of a keyword and a <length> or <percentage>": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Four-value syntax (support for offset from any edge)  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"position": {
			"n": "position",
			"t": [
				"CSS Property",
				"Positioning",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit-",
							"v": "7.0"
						}
					]
				},
				"fixed value": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"sticky value": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit-",
							"v": "6.1"
						}
					]
				}
			}
		},
		"pointer-events": {
			"n": "pointer-events",
			"t": [
				"CSS Property",
				"NeedsExample",
				"NeedsMobileBrowserCompatibility",
				"SVG"
			],
			"c": {
				"SVG support": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				},
				"HTML/XML content": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				}
			}
		},
		"perspective-origin": {
			"n": "perspective-origin",
			"t": [
				"CSS Property",
				"CSS Transforms",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "12"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.1"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				}
			}
		},
		"perspective": {
			"n": "perspective",
			"t": [
				"CSS Property",
				"CSS Transforms",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1210"
						},
						{
							"p": "",
							"v": "45"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.1"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				}
			}
		},
		"<percentage>": {
			"n": "<percentage>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"page-break-inside": {
			"n": "page-break-inside",
			"t": [
				"CSS Property",
				"Page Breaks"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"page-break-before": {
			"n": "page-break-before",
			"t": [
				"CSS Property",
				"Page Breaks"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"avoid, left, right": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"page-break-after": {
			"n": "page-break-after",
			"t": [
				"CSS Property",
				"Page Breaks"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"avoid, left, right": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"@page": {
			"n": "@page",
			"t": [
				"At-rule",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"padding-top": {
			"n": "padding-top",
			"t": [
				"CSS Padding",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"padding-right": {
			"n": "padding-right",
			"t": [
				"CSS Padding",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"padding-left": {
			"n": "padding-left",
			"t": [
				"CSS Padding",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"padding-inline-start": {
			"n": "padding-inline-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"padding-inline-end": {
			"n": "padding-inline-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"padding-bottom": {
			"n": "padding-bottom",
			"t": [
				"CSS Padding",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"padding-block-start": {
			"n": "padding-block-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"padding-block-end": {
			"n": "padding-block-end",
			"t": [
				"CSS Logical Property",
				"CSS Padding",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"padding": {
			"n": "padding",
			"t": [
				"CSS Padding",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"pad": {
			"n": "pad",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"overflow-y": {
			"n": "overflow-y",
			"t": [
				"CSS Box Model",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"overflow-x": {
			"n": "overflow-x",
			"t": [
				"CSS Box Model",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"word-wrap": {
			"n": "word-wrap",
			"t": [
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"overflow": {
			"n": "overflow",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"outline-width": {
			"n": "outline-width",
			"t": [
				"CSS Outline",
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"outline-style": {
			"n": "outline-style",
			"t": [
				"CSS Outline",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"auto": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"outline-offset": {
			"n": "outline-offset",
			"t": [
				"CSS Outline",
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"outline-color": {
			"n": "outline-color",
			"t": [
				"CSS Outline",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"invert value": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"outline": {
			"n": "outline",
			"t": [
				"CSS Outline",
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					]
				}
			}
		},
		":out-of-range": {
			"n": ":out-of-range",
			"t": [
				"CSS Pseudo-class",
				"CSS Reference",
				"Layout"
			],
			"c": {
				"Support on <input>": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"orphans": {
			"n": "orphans",
			"t": [
				"CSS Fragmentation",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "25.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "25.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"orientation": {
			"n": "orientation",
			"t": [
				"CSS Descriptor",
				"NeedsBrowserCompatibility",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "8"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"order": {
			"n": "order",
			"t": [
				"CSS Flexible Boxes",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "21.0"
						},
						{
							"p": "",
							"v": "29"
						}
					],
					"f": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						},
						{
							"p": "",
							"v": "28"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7"
						},
						{
							"p": "",
							"v": "9"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "18.0"
						},
						{
							"p": "",
							"v": "20.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "7"
						},
						{
							"p": "",
							"v": "9"
						}
					]
				}
			}
		},
		":optional": {
			"n": ":optional",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				}
			}
		},
		"opacity": {
			"n": "opacity",
			"t": [
				"CSS Property",
				"CSS3",
				"css3-color",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						},
						{
							"p": "",
							"v": "8.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						},
						{
							"p": "",
							"v": "8.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		":only-of-type": {
			"n": ":only-of-type",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.2"
						}
					]
				}
			}
		},
		"prefix": {
			"n": "prefix",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"quotes": {
			"n": "quotes",
			"t": [
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "11"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"radial-gradient()": {
			"n": "radial-gradient()",
			"t": [
				"CSS Function",
				"CSS Image",
				"Graphics",
				"Layout",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "3.6"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "10.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.60"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"On border-image": {
					"f": [
						{
							"p": "",
							"v": "29"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"On any other property that accept <image>": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Legacy webkit syntax  ": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "3"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"at syntax (final standard syntax)": {
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"c": [
						{
							"p": "",
							"v": "26"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.60"
						},
						{
							"p": "",
							"v": "2.12"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "10"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Interpolation hints (a percent without a color)": {
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"c": [
						{
							"p": "",
							"v": "40"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "27"
						}
					],
					"s": [
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		"range": {
			"n": "range",
			"t": [
				"@counter-style",
				"CSS Descriptor",
				"CSS Lists"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<ratio>": {
			"n": "<ratio>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"shape-outside": {
			"n": "shape-outside",
			"t": [
				"CSS Property",
				"CSS Shapes",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "37"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "24"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "8.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "8.0"
						}
					]
				}
			}
		},
		"shape-margin": {
			"n": "shape-margin",
			"t": [
				"CSS Property",
				"CSS Shapes",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"<shape>": {
			"n": "<shape>",
			"t": [
				"CSS Data Type",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"::selection": {
			"n": "::selection",
			"t": [
				"CSS Pseudo-element",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"scroll-snap-type": {
			"n": "scroll-snap-type",
			"t": [
				"CSS Property",
				"CSS Scroll Snap Points",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"ie": [
						{
							"p": "-ms-",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit-",
							"v": "9"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit-",
							"v": "9"
						}
					]
				}
			}
		},
		"shape-image-threshold": {
			"n": "shape-image-threshold",
			"t": [
				"CSS Property",
				"CSS Shapes",
				"Experimental",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"scroll-snap-destination": {
			"n": "scroll-snap-destination",
			"t": [
				"CSS Property",
				"CSS Scroll Snap Points",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"scroll-snap-coordinate": {
			"n": "scroll-snap-coordinate",
			"t": [
				"CSS Property",
				"CSS Scroll Snap Points",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"fo": [
						{
							"p": "",
							"v": "39.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"scroll-behavior": {
			"n": "scroll-behavior",
			"t": [
				"CSS Property",
				"CSSOM View",
				"NeedsBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "36"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":scope": {
			"n": ":scope",
			"t": [
				"CSS Pseudo-class",
				"Experimental",
				"Expérimental",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "20"
						}
					],
					"f": [
						{
							"p": "",
							"v": "21"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "25"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.0"
						}
					]
				},
				"In .querySelector/.querySelectorAll": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.0"
						}
					]
				}
			}
		},
		"ruby-position": {
			"n": "ruby-position",
			"t": [
				"CSS Ruby",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "38"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "38.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"inter-character": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"ruby-align": {
			"n": "ruby-align",
			"t": [
				"CSS Reference",
				"CSS Ruby",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "38"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "38.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":root": {
			"n": ":root",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"right": {
			"n": "right",
			"t": [
				"CSS Positioning",
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		":right": {
			"n": ":right",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"revert": {
			"n": "revert",
			"t": [
				"CSS Cascade",
				"Layout",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9.3"
						}
					]
				}
			}
		},
		"resize": {
			"n": "resize",
			"t": [
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"On any block-level and replaced element, table cell, and inline block element (unless overflow is visible)": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":required": {
			"n": ":required",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				}
			}
		},
		"repeating-radial-gradient()": {
			"n": "repeating-radial-gradient()",
			"t": [
				"CSS Function",
				"CSS Image",
				"Graphics",
				"Layout",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "10"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.6"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "12"
						},
						{
							"p": "",
							"v": "12.5"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"On border-image": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"On any other property that accept <image>": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Interpolation hints (a percent without a color)": {
					"c": [
						{
							"p": "",
							"v": "40"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"repeating-linear-gradient()": {
			"n": "repeating-linear-gradient()",
			"t": [
				"CSS Function",
				"CSS Image",
				"css3-images",
				"Graphics",
				"Layout"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "16"
						},
						{
							"p": "",
							"v": "26"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"On border-radius": {
					"f": [
						{
							"p": "",
							"v": "29"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"On any other property that accept <image>": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Legacy webkit syntax ": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "3"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					]
				},
				"Legacy from syntax (without to) ": {
					"f": [
						{
							"p": "-moz",
							"v": "3.6"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "10.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "5.1"
						}
					]
				},
				"to syntax": {
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"c": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.60"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Interpolation hint (a percent without a color)": {
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"c": [
						{
							"p": "",
							"v": "40"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "27"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		":read-write": {
			"n": ":read-write",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Editable element (except to text input fields)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		":read-only": {
			"n": ":read-only",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Editable element (except to text input fields)": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "-"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"speak-as": {
			"n": "speak-as",
			"t": [
				"@counter-style",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"<string>": {
			"n": "<string>",
			"t": [
				"CSS Data Type",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"\\xx": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"transition-duration": {
			"n": "transition-duration",
			"t": [
				"CSS Property",
				"CSS Transitions",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.6"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"transition-delay": {
			"n": "transition-delay",
			"t": [
				"CSS Property",
				"CSS Transitions",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.6"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"transition": {
			"n": "transition",
			"t": [
				"CSS Property",
				"CSS Transitions",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "26.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "10.1"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "6.1"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"transform-style": {
			"n": "transform-style",
			"t": [
				"CSS Property",
				"CSS Transforms",
				"CSS3",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "12"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				}
			}
		},
		"transform-box": {
			"n": "transform-box",
			"t": [
				"CSS Property",
				"CSS Transforms",
				"Experimental",
				"NeedsBrowserCompatibility",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"transform-origin": {
			"n": "transform-origin",
			"t": [
				"CSS Property",
				"CSS Transforms",
				"Experimental",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "9.0"
						},
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "10.5"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "-webkit",
							"v": "8.1"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Three-value syntax": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						},
						{
							"p": "-ms",
							"v": "9.0"
						},
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Support in SVG": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41"
						},
						{
							"p": "",
							"v": "43"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "41"
						},
						{
							"p": "",
							"v": "43"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"text-underline-position": {
			"n": "text-underline-position",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "33.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"under": {
					"c": [
						{
							"p": "",
							"v": "33.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"left, right": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"above, below ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"auto-pos ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"transform": {
			"n": "transform",
			"t": [
				"CSS Property",
				"Experimental",
				"NeedsBrowserCompatibility",
				"Property",
				"Transforms"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "36"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "9.0"
						},
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "10.5"
						},
						{
							"p": "",
							"v": "12.10"
						},
						{
							"p": "-webkit",
							"v": "15.0"
						},
						{
							"p": "",
							"v": "23"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "-webkit",
							"v": "11.0"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "11.5"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				},
				"3D Support": {
					"c": [
						{
							"p": "-webkit",
							"v": "12.0"
						},
						{
							"p": "",
							"v": "36"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						},
						{
							"p": "",
							"v": "23"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "22"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					]
				}
			}
		},
		"touch-action": {
			"n": "touch-action",
			"t": [
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "36.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10.0"
						},
						{
							"p": "",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "37.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "-"
						}
					]
				}
			}
		},
		"top": {
			"n": "top",
			"t": [
				"CSS Positioning",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"text-transform": {
			"n": "text-transform",
			"t": [
				"CSS Property",
				"Layout",
				"NeedsLiveSample",
				"Property",
				"Text"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"capitalize (CSS3 version)": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "14"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"full-size-kana": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"full-width": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"ß → SS": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"i → İ and ı → I": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "14"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Dutch IJ digraph": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "14"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Greek accented letters": {
					"c": [
						{
							"p": "",
							"v": "30"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"Σ → σ or word-final ς": {
					"c": [
						{
							"p": "",
							"v": "30"
						}
					],
					"f": [
						{
							"p": "",
							"v": "14"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"text-shadow": {
			"n": "text-shadow",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsMobileBrowserCompatibility",
				"Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"text-rendering": {
			"n": "text-rendering",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsLiveSample",
				"NeedsMobileBrowserCompatibility",
				"SVG"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"auto": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"geometricPrecision": {
					"c": [
						{
							"p": "",
							"v": "13"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"text-overflow": {
			"n": "text-overflow",
			"t": [
				"CSS Property",
				"NeedsLiveSample",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "9"
						},
						{
							"p": "",
							"v": "11.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Two-value syntax  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"String value ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"text-orientation": {
			"n": "text-orientation",
			"t": [
				"CSS Property",
				"CSS Writing Modes",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"sideways": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "44"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "44.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"text-indent": {
			"n": "text-indent",
			"t": [
				"CSS Property",
				"CSS Text",
				"Layout"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"hanging": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"each-line": {
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"text-emphasis-style": {
			"n": "text-emphasis-style",
			"t": [
				"CSS Text Decoration",
				"Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "46"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "25.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						},
						{
							"p": "",
							"v": "7.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "46"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.4"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "33"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.1"
						}
					]
				}
			}
		},
		"text-emphasis-position": {
			"n": "text-emphasis-position",
			"t": [
				"CSS Text Decoration",
				"Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "46"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "25.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						},
						{
							"p": "",
							"v": "7.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "46"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.4"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "33"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.1"
						}
					]
				},
				"left and right": {
					"f": [
						{
							"p": "",
							"v": "46"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.1"
						}
					]
				}
			}
		},
		"text-emphasis-color": {
			"n": "text-emphasis-color",
			"t": [
				"CSS Text Decoration",
				"Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "46"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "25.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						},
						{
							"p": "",
							"v": "7.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "46"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.4"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "33"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.1"
						}
					]
				}
			}
		},
		"text-emphasis": {
			"n": "text-emphasis",
			"t": [
				"CSS Text Decoration",
				"Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "46"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "25.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						},
						{
							"p": "",
							"v": "7.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "46"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.4"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "-webkit",
							"v": "33"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.1"
						}
					]
				}
			}
		},
		"text-decoration-style": {
			"n": "text-decoration-style",
			"t": [
				"CSS Property",
				"CSS Text",
				"Layout"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"wavy": {
					"f": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"text-decoration-line": {
			"n": "text-decoration-line",
			"t": [
				"CSS Property",
				"CSS Text"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.1"
						}
					]
				},
				"blink": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "26.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"text-decoration-color": {
			"n": "text-decoration-color",
			"t": [
				"CSS Property",
				"CSS Text"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "7.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "8"
						}
					]
				}
			}
		},
		"text-decoration": {
			"n": "text-decoration",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"blink value": {
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "23.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "23.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Shorthand property": {
					"f": [
						{
							"p": "",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "6.0"
						},
						{
							"p": "",
							"v": "36.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "8"
						}
					]
				}
			}
		},
		"text-combine-upright": {
			"n": "text-combine-upright",
			"t": [
				"CSS Property",
				"CSS Writing Modes",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"digits": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "11.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"text-align-last": {
			"n": "text-align-last",
			"t": [
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "35"
						},
						{
							"p": "",
							"v": "47"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "12.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "12.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"text-align": {
			"n": "text-align",
			"t": [
				"CSS Property",
				"CSS Text"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Block alignment values  ": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-khtml",
							"v": "1.0"
						},
						{
							"p": "-webkit",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"start  ": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"end  ": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.6"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"match-parent ": {
					"c": [
						{
							"p": "",
							"v": "16"
						}
					],
					"f": [
						{
							"p": "",
							"v": "40"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "40.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		":target": {
			"n": ":target",
			"t": [
				"CSS Pseudo-class",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "2.0"
						}
					]
				}
			}
		},
		"table-layout": {
			"n": "table-layout",
			"t": [
				"CSS Property",
				"CSS Tables",
				"NeedsLiveSample",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"tab-size": {
			"n": "tab-size",
			"t": [
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "21"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "10.60"
						},
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6.1"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "7.1"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "11.5"
						},
						{
							"p": "",
							"v": "24"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					]
				},
				"<length>": {
					"c": [
						{
							"p": "",
							"v": "42"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"system": {
			"n": "system",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"symbols()": {
			"n": "symbols()",
			"t": [
				"CSS Counter Styles",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "35"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "35.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"symbols": {
			"n": "symbols",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"@supports": {
			"n": "@supports",
			"t": [
				"At-rule",
				"CSS3",
				"CSS3-conditionals",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "28.0"
						}
					],
					"e": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "22"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "22.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "12.1"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "28.0"
						}
					]
				}
			}
		},
		"suffix": {
			"n": "suffix",
			"t": [
				"@counter-style",
				"CSS Counter Styles",
				"CSS Descriptor"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "33"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "33"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"transition-property": {
			"n": "transition-property",
			"t": [
				"CSS Property",
				"CSS Transitions",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.6"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"IDENT value": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"transition-timing-function": {
			"n": "transition-timing-function",
			"t": [
				"CSS Property",
				"CSS Transitions",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "11.6"
						},
						{
							"p": "",
							"v": "12.10"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				}
			}
		},
		"Custom properties (--*)": {
			"n": "Custom properties (--*)",
			"t": [
				"CSS Variables",
				"Property"
			],
			"c": {}
		},
		"zoom": {
			"n": "zoom",
			"t": [
				"CSS Descriptor",
				"Graphics",
				"Layout",
				"NeedsBrowserCompatibility",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"z-index": {
			"n": "z-index",
			"t": [
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Negative values (CSS2.1 behavior, not allowed in the obsolete CSS2 spec)": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"writing-mode": {
			"n": "writing-mode",
			"t": [
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "8"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "3"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "-webkit",
							"v": "47"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "5.1"
						}
					]
				},
				"SVG 1.1 values lr, lr-tb, rl, tb, tb-rl": {
					"c": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "43"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "43.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"sideways-rl,sideways-lr": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "43"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"word-spacing": {
			"n": "word-spacing",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsLiveSample",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Percentages": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "45.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "45.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"word-break": {
			"n": "word-break",
			"t": [
				"CSS Property",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"keep-all": {
					"c": [
						{
							"p": "",
							"v": "44"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "31"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9"
						}
					]
				}
			}
		},
		"will-change": {
			"n": "will-change",
			"t": [
				"CSS Property",
				"CSS Will-change"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "36"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "24"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "37"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "36.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9.3"
						}
					]
				}
			}
		},
		"width": {
			"n": "width",
			"t": [
				"CSS Property",
				"NeedsBrowserCompatibility",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"Animatability ": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"max-content ": {
					"c": [
						{
							"p": "-webkit",
							"v": "22.0"
						},
						{
							"p": "",
							"v": "46.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "2.0"
						},
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "46.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "46.0"
						}
					]
				},
				"min-content ": {
					"c": [
						{
							"p": "-webkit",
							"v": "22.0"
						},
						{
							"p": "",
							"v": "46.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "2.0"
						},
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "46.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "46.0"
						}
					]
				},
				"available ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"fill-available ": {
					"c": [
						{
							"p": "-webkit",
							"v": "22.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "46.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "46.0"
						}
					]
				},
				"fit-content ": {
					"c": [
						{
							"p": "-webkit",
							"v": "22.0"
						},
						{
							"p": "",
							"v": "46.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-webkit",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6.1"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "46.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "46.0"
						}
					]
				},
				"border-box and content-box ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"widows": {
			"n": "widows",
			"t": [
				"CSS Fragmentation",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "25"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"white-space": {
			"n": "white-space",
			"t": [
				"CSS Property",
				"CSS Text",
				"NeedsLiveSample",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"pre": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				},
				"pre-wrap": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "3.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				},
				"pre-line": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				},
				"Support on <textarea>": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "36"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		":visited": {
			"n": ":visited",
			"t": [
				"CSS Pseudo-class",
				"CSS3",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Restrictions in CSS properties allowed in a statement using :visited": {
					"c": [
						{
							"p": "",
							"v": "6"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				}
			}
		},
		"visibility": {
			"n": "visibility",
			"t": [
				"CSS Positioning",
				"CSS Property",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"@viewport": {
			"n": "@viewport",
			"t": [
				"Adaptation",
				"At-rule",
				"Device",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "29"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "-ms",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						},
						{
							"p": "",
							"v": "-"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.4"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "29"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "-ms",
							"v": "10"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11.10"
						},
						{
							"p": "",
							"v": "-"
						},
						{
							"p": "",
							"v": "-"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"vertical-align": {
			"n": "vertical-align",
			"t": [
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"var()": {
			"n": "var()",
			"t": [],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "48"
						},
						{
							"p": "",
							"v": "49"
						}
					],
					"f": [
						{
							"p": "",
							"v": "29"
						},
						{
							"p": "",
							"v": "31"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "29"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9.3"
						}
					]
				}
			}
		},
		":valid": {
			"n": ":valid",
			"t": [
				"CSS Pseudo-class",
				"Layout",
				"NeedsMobileBrowserCompatibility",
				"Pseudo-class"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						}
					]
				}
			}
		},
		"user-zoom": {
			"n": "user-zoom",
			"t": [
				"CSS Descriptor",
				"Graphics",
				"Layout",
				"NeedsBrowserCompatibility",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"<url>": {
			"n": "<url>",
			"t": [
				"data",
				"Layout",
				"Référence",
				"Type",
				"URI",
				"URL",
				"urn"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"unset": {
			"n": "unset",
			"t": [
				"CSS Cascade",
				"Keyword",
				"Layout",
				"NeedsLiveSample",
				"Référence"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "41"
						}
					],
					"f": [
						{
							"p": "",
							"v": "27"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "-"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "27.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"unicode-range": {
			"n": "unicode-range",
			"t": [
				"CSS Fonts",
				"CSS Property",
				"Experimental",
				"Layout"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "",
							"v": "44"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "44.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"unicode-bidi": {
			"n": "unicode-bidi",
			"t": [
				"CSS Property",
				"NeedsLiveSample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.3"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6"
						}
					],
					"om": [
						{
							"p": "",
							"v": "8"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.1"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					]
				},
				"isolate ": {
					"c": [
						{
							"p": "-webkit",
							"v": "16"
						},
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "-"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					]
				},
				"plaintext ": {
					"c": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "10"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "10.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					]
				},
				"isolate-override ": {
					"c": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "17"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"aw": [
						{
							"p": "",
							"v": "48.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "17.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "48.0"
						}
					]
				}
			}
		},
		"border-bottom-style": {
			"n": "border-bottom-style",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-bottom-width": {
			"n": "border-bottom-width",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-collapse": {
			"n": "border-collapse",
			"t": [
				"CSS Borders",
				"CSS Property",
				"CSS Tables"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.2"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				}
			}
		},
		"border-color": {
			"n": "border-color",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"border-image": {
			"n": "border-image",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "3.5"
						},
						{
							"p": "",
							"v": "15"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "7.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "10.5"
						},
						{
							"p": "",
							"v": "15.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "6.0"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "3.5"
						},
						{
							"p": "",
							"v": "15"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						},
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "-o",
							"v": "11.0"
						}
					]
				},
				"optional <border-image-slice>": {
					"f": [
						{
							"p": "",
							"v": "15"
						}
					],
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"fill keyword": {
					"f": [
						{
							"p": "",
							"v": "15"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6"
						}
					],
					"a": [
						{
							"p": "",
							"v": "18.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "6"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"<gradient>": {
					"f": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "29.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-image-outset": {
			"n": "border-image-outset",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-image-repeat": {
			"n": "border-image-repeat",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "9.3"
						}
					]
				},
				"space": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.1"
						}
					]
				},
				"round": {
					"c": [
						{
							"p": "",
							"v": "30"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "9.1"
						}
					]
				}
			}
		},
		"border-image-slice": {
			"n": "border-image-slice",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "4.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"@charset": {
			"n": "@charset",
			"t": [
				"At-rule",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9"
						}
					],
					"s": [
						{
							"p": "",
							"v": "4"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.1"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "10.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "4"
						}
					]
				}
			}
		},
		"caption-side": {
			"n": "caption-side",
			"t": [
				"CSS Property",
				"CSS Tables"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"left, right, top-outside and bottom-outside  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"top and bottom are relative to the writing-mode value  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "42"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "42.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"calc()": {
			"n": "calc()",
			"t": [
				"CSS Function",
				"Layout"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "19"
						},
						{
							"p": "",
							"v": "26"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6"
						},
						{
							"p": "",
							"v": "7"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "4.0"
						},
						{
							"p": "",
							"v": "16.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "6"
						},
						{
							"p": "",
							"v": "7"
						}
					]
				},
				"On gradients' color stops": {
					"c": [
						{
							"p": "-webkit",
							"v": "19"
						},
						{
							"p": "",
							"v": "26"
						}
					],
					"f": [
						{
							"p": "",
							"v": "19"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "6"
						},
						{
							"p": "",
							"v": "7"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "19.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"nested calc()": {
					"c": [
						{
							"p": "",
							"v": "51"
						}
					],
					"f": [
						{
							"p": "",
							"v": "48"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "51"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "48"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Support for <number> values": {
					"c": [
						{
							"p": "",
							"v": "?"
						}
					],
					"f": [
						{
							"p": "",
							"v": "48"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "48"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"break-inside": {
			"n": "break-inside",
			"t": [
				"CSS Fragmentation",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"column, avoid-column": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"recto, verso  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"region, avoid-region  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"break-before": {
			"n": "break-before",
			"t": [
				"CSS Fragmentation",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"column, avoid-column": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"recto, verso  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"region, avoid-region  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"break-after": {
			"n": "break-after",
			"t": [
				"CSS Fragmentation",
				"CSS Property",
				"NeedsExample"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"column, avoid-column": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "10"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.10"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"recto, verso  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"region, avoid-region  ": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "no"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"box-sizing": {
			"n": "box-sizing",
			"t": [
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "10.0"
						}
					],
					"e": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "29.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "5.1"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"fm": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "29.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"box-shadow": {
			"n": "box-shadow",
			"t": [
				"CSS Background",
				"CSS Property",
				"CSS3",
				"css3-background"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						},
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						},
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						},
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					]
				},
				"Multiple shadows": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						},
						{
							"p": "-webkit",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						},
						{
							"p": "-webkit",
							"v": "3.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						},
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"inset keyword": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						},
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						},
						{
							"p": "-webkit",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						},
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Spread radius": {
					"c": [
						{
							"p": "",
							"v": "10.0"
						},
						{
							"p": "-webkit",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "4.0"
						},
						{
							"p": "-moz",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						},
						{
							"p": "-webkit",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "5.0"
						},
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"box-decoration-break": {
			"n": "box-decoration-break",
			"t": [
				"CSS Fragmentation",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"Support on inline elements": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Support on non-inline element": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				},
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "yes"
						},
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "?"
						}
					],
					"o": [
						{
							"p": "-o",
							"v": "yes"
						},
						{
							"p": "",
							"v": "?"
						}
					],
					"s": [
						{
							"p": "",
							"v": "?"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "32.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"bottom": {
			"n": "bottom",
			"t": [
				"CSS Positioning",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "6"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-width": {
			"n": "border-width",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				}
			}
		},
		"border-top-width": {
			"n": "border-top-width",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-top-right-radius": {
			"n": "border-top-right-radius",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Percentages": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Elliptical corners": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-top-style": {
			"n": "border-top-style",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-top-left-radius": {
			"n": "border-top-left-radius",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Percentages": {
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Elliptical corners": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "3.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-top-color": {
			"n": "border-top-color",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"border-top": {
			"n": "border-top",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-style": {
			"n": "border-style",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.6"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "3.0"
						}
					]
				}
			}
		},
		"border-spacing": {
			"n": "border-spacing",
			"t": [
				"CSS Property",
				"CSS Tables"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "8.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-right-width": {
			"n": "border-right-width",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"border-right-style": {
			"n": "border-right-style",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-right-color": {
			"n": "border-right-color",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"border-right": {
			"n": "border-right",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-left-width": {
			"n": "border-left-width",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-left-style": {
			"n": "border-left-style",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "5.5"
						}
					],
					"o": [
						{
							"p": "",
							"v": "9.2"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "2.3"
						}
					],
					"ca": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "14"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "7.0"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-radius": {
			"n": "border-radius",
			"t": [
				"CSS Borders",
				"CSS Property",
				"NeedsMobileBrowserCompatibility"
			],
			"c": {
				"bs": {
					"f": [
						{
							"p": "-moz",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "-webkit",
							"v": "1.0"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "9.0"
						}
					],
					"o": [
						{
							"p": "",
							"v": "10.5"
						}
					],
					"s": [
						{
							"p": "-webkit",
							"v": "3.0"
						},
						{
							"p": "",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "-webkit",
							"v": "3.2"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "-webkit",
							"v": "2.1"
						}
					]
				},
				"Elliptical borders": {
					"f": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"4 values for 4 corners": {
					"f": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"c": [
						{
							"p": "",
							"v": "4.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.0"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					]
				},
				"Percentages": {
					"f": [
						{
							"p": "",
							"v": "yes"
						},
						{
							"p": "",
							"v": "4.0"
						}
					],
					"c": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"o": [
						{
							"p": "",
							"v": "11.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "5.1"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-left-color": {
			"n": "border-left-color",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "6.5"
						}
					],
					"om": [
						{
							"p": "",
							"v": "11"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "1.0"
						}
					]
				}
			}
		},
		"border-left": {
			"n": "border-left",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "4"
						}
					],
					"o": [
						{
							"p": "",
							"v": "3.5"
						}
					],
					"s": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"a": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "1.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"om": [
						{
							"p": "",
							"v": "yes"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "yes"
						}
					]
				}
			}
		},
		"border-inline-start-width": {
			"n": "border-inline-start-width",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-start-style": {
			"n": "border-inline-start-style",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-start-color": {
			"n": "border-inline-start-color",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-start": {
			"n": "border-inline-start",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-end-width": {
			"n": "border-inline-end-width",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-end-style": {
			"n": "border-inline-end-style",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-end-color": {
			"n": "border-inline-end-color",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental",
				"NeedsContent"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-inline-end": {
			"n": "border-inline-end",
			"t": [
				"CSS Logical Property",
				"CSS Property",
				"Experimental"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "no"
						}
					],
					"f": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "no"
						}
					],
					"o": [
						{
							"p": "",
							"v": "no"
						}
					],
					"s": [
						{
							"p": "",
							"v": "no"
						}
					],
					"a": [
						{
							"p": "",
							"v": "no"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "41.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "no"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "no"
						}
					]
				}
			}
		},
		"border-image-width": {
			"n": "border-image-width",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "13.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		},
		"border-image-source": {
			"n": "border-image-source",
			"t": [
				"CSS Borders",
				"CSS Property"
			],
			"c": {
				"bs": {
					"c": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"f": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"ie": [
						{
							"p": "",
							"v": "11"
						}
					],
					"o": [
						{
							"p": "",
							"v": "15"
						}
					],
					"s": [
						{
							"p": "",
							"v": "6"
						}
					],
					"a": [
						{
							"p": "",
							"v": "?"
						}
					],
					"fm": [
						{
							"p": "",
							"v": "15.0"
						}
					],
					"iem": [
						{
							"p": "",
							"v": "no"
						}
					],
					"om": [
						{
							"p": "",
							"v": "?"
						}
					],
					"sm": [
						{
							"p": "",
							"v": "?"
						}
					]
				}
			}
		}
	};

/***/ },
/* 5 */
/*!************************************************!*\
  !*** ./~/browser-data/db/enginesPrefixes.json ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
		"Gecko": [
			"-moz-",
			"-webkit-"
		],
		"WebKit": [
			"-webkit-",
			"-apple-",
			"-khtml-",
			"-epub-"
		],
		"Presto": [
			"-o-",
			"-xv-",
			"-wap-",
			"-webkit-"
		],
		"Elektra": [
			"-o-"
		],
		"Trident": [
			"-ms-"
		],
		"MSHTML": [
			"-ms-"
		]
	};

/***/ },
/* 6 */
/*!*******************************************!*\
  !*** ./~/browser-data/versionsHelpers.js ***!
  \*******************************************/
/***/ function(module, exports) {

	'use strict';
	
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
	
	module.exports = { findLastVersion: findLastVersion, compareVersions: compareVersions };

/***/ }
/******/ ]);
//# sourceMappingURL=cssantique-browser.js.map