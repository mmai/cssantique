import { browserSupport, browsersDb } from 'browser-data'
var fp = require('lodash/fp')

let newStylesheets = []
let initialStylesheets = []

/**
 * filterStyles
 *
 * @param options = { ignore: [], browser: {name: 'Firefox', version: '3'} }
 * @return {DOMelement} style DOM element
 */
var filterStyles = function filterStyles (options = { ignore: [], browser: {name: 'Firefox', version: '3'} }) {
  convertRemoteStyles()
  let currentBrowserSupport = fp.curry(browserSupport)(options.browser)
  let initialSheets = fp.filter((s) => !s.disabled, document.styleSheets)

  // This new css sheet will replace the originals with rules containing only allowed properties
  let newStyle = document.createElement('style')
  document.head.appendChild(newStyle)
  newStylesheets.push(newStyle) // Keep reference for resetStyles function

  for (let sheet of initialSheets) {
    if (!isIgnoredSheet(options.ignore, sheet)) {
      parseRulesIntoSheet(currentBrowserSupport, sheet.cssRules, newStyle.sheet)
      sheet.disabled = true // Disable the original css sheet
      initialStylesheets.push(sheet) // Keep reference for resetStyles function
    }
  }
  return newStyle
}

function parseRulesIntoSheet (currentBrowserSupport, rules, newSheet) {
  var toInsert = getParsedRules(currentBrowserSupport, rules)
  toInsert.map((rule) => {
    newSheet.insertRule(rule, newSheet.cssRules.length)
  })
}

/**
 * convertRemoteStyles
 * load remote styles with CORS
 *
 */
function convertRemoteStyles () {
  Object.keys(document.styleSheets)
    .map((k) => document.styleSheets[k])
    .filter((s) => !s.disabled && getDomain(s.href) !== window.location.hostname)
    .map(function (s) {
      loadCSSCors(s.href)
      s.disabled = true
    })

  function getDomain (uri) {
    var l = document.createElement('a')
    l.href = uri
    return l.hostname
  }
}

function loadCSSCors (stylesheet_uri) {
  var _xhr = window.XMLHttpRequest
  var has_cred = false
  try {has_cred = _xhr && ('withCredentials' in (new _xhr()));} catch(e) {}
  if (!has_cred) {
    console.error('CORS not supported')
    return
  }
  var xhr = new _xhr()
  xhr.open('GET', stylesheet_uri)
  xhr.onload = function () {
    xhr.onload = xhr.onerror = null
    if (xhr.status < 200 || xhr.status >= 300) {
      console.error('style failed to load: ' + stylesheet_uri)
    } else {
      var style_tag = document.createElement('style')
      style_tag.appendChild(document.createTextNode(xhr.responseText))
      document.head.appendChild(style_tag)
    }
    xhr.onerror = function () {
      xhr.onload = xhr.onerror = null
      console.error('XHR CORS CSS fail:' + styleURI)
    }
    xhr.send()
  }
}

function isIgnoredSheet (ignore, sheet) {
  if (sheet.href) {
    let filename = sheet.href.slice(sheet.href.lastIndexOf('/') + 1)
    return ignore.indexOf(filename) !== -1
  }
  return false
}

function getParsedRules (currentBrowserSupport, rules) {
  var parsedRules = []
  fp.each((rule) => {
    if (rule instanceof window.CSSImportRule) {
      parsedRules = fp.concat(parsedRules, getParsedRules(currentBrowserSupport, rule.styleSheet.cssRules))
    } else if (window.CSSFontFaceRule && rule instanceof window.CSSFontFaceRule) {
      if (currentBrowserSupport('@font-face')) {
        parsedRules.push(rule.cssText)
      }
    } else if (window.CSSKeyframesRule && rule instanceof window.CSSKeyframesRule) {
      // TODO implement keyframesrule rules
    } else if (window.CSSMediaRule && rule instanceof window.CSSMediaRule) {
      if (currentBrowserSupport('@media')) {
        parsedRules.push(makeCleanMediaRule(currentBrowserSupport, rule))
      }
    } else if ((typeof rule.style) !== 'object') {
      console.error(rule)
    } else {
      const cleanedRule = getCleanedRule(currentBrowserSupport, rule)
      if (cleanedRule !== false) {
        parsedRules.push(`${cleanedRule.rule} {${cleanedRule.properties}}`)
      }
    }
  }, rules)
  return parsedRules
}

function makeCleanMediaRule (currentBrowserSupport, cssMediaRule) {
  let cleanedMediaRules = []
  fp.each((mediaRule) => {
    const cleanedMediaRule = getCleanedRule(currentBrowserSupport, mediaRule)
    if (cleanedMediaRule !== false) {
      cleanedMediaRules.push(cleanedMediaRule)
    }
  }, cssMediaRule.cssRules)

  let cleanedMediaRulesProps = cleanedMediaRules.map(
    (r) => `${r.rule} {${r.properties}}`
  ).join('\n')

  return `@media ${cssMediaRule.media.mediaText} {${cleanedMediaRulesProps}}`
}

function getCleanedRule (currentBrowserSupport, rule) {
  var attributes = getAttributes(rule.style.cssText)
  var segregatedAttributes = fp.groupBy(currentBrowserSupport, attributes) // -> {true:[...], false:[...], undefined: [...]}

  if (fp.has('true', segregatedAttributes)) {
    var properties = segregatedAttributes.true.map(
      (attribute) => `${attribute}: ${rule.style[attribute]}`
    ).join('; ')
    return { rule: rule.selectorText, properties}
  }
  return false
}

function getAttributes (cssText) {
  // Remove properties content in order to bypass delimiter characters conflicts
  cssText = cssText.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '')
  var begin = cssText.indexOf('{') + 1
  var end = cssText.indexOf('}')
  return cssText.slice(begin, end).split(';')
    .map((dec) => dec.split(':')[0].trim())
    .filter((attr) => attr !== '')
}

var resetStyles = function resetStyles () {
  newStylesheets.map(function (e) { e.remove() })
  newStylesheets = []
  initialStylesheets.map(function (e) { e.disabled = false })
  initialStylesheets = []
}

var findStyleSheet = function findStyleSheet (search) {
  let stylesheets = window.document.styleSheets

  return Object.keys(stylesheets)
    .map((k) => stylesheets[k])
    .filter((s) => s.href !== null && s.href.indexOf(search) > -1)
}

module.exports = { browsersDb, filterStyles, resetStyles, findStyleSheet}
