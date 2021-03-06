import { browserSupport, browsers } from 'browser-data'
import loadCSSCors from './loadCSSCors'
var fp = require('lodash/fp')

let newStylesheets = []
let initialStylesheets = []

/**
 * filterStyles
 *
 * @param options = { ignore: [], browser: {name: 'Firefox', version: '3'} }
 * @param {function} callback with object parameter {styleElement, discarded} (DOMelement, Array of Strings)
 */
var filterStyles = function filterStyles (options = { ignore: [], keepAttributes: [], browser: {name: 'Firefox', version: '3'} } , callback) {
  options.ignore = options.ignore || []
  options.keepAttributes = options.keepAttributes || []
  convertRemoteStyles().then((stylesRemote) => {
    let currentBrowserSupport = fp.curry(browserSupport)(options.browser)
    let initialSheets = fp.filter((s) => !s.disabled, document.styleSheets)

    // This new css sheet will replace the originals with rules containing only allowed properties
    let styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
    // Keep reference for resetStyles function
    newStylesheets.push(styleElement)
    // Keep reference of new styles from convertRemoteStyles
    Array.prototype.push.apply(newStylesheets, stylesRemote.map((s) => s.newStyle))

    let discarded = []
    for (let sheet of initialSheets) {
      if (!isIgnoredSheet(options.ignore, sheet)) {
        let {parsed, ignored} = getParsedRules(currentBrowserSupport, sheet.cssRules, options.keepAttributes)
        discarded = fp.uniq(fp.concat(discarded, ignored))
        updateSheet(parsed, styleElement.sheet)
        sheet.disabled = true // Disable the original css sheet
        initialStylesheets.push(sheet) // Keep reference for resetStyles function
      }
    }
    // Keep reference of initial styles from convertRemoteStyles for resetStyles
    Array.prototype.push.apply(initialStylesheets, stylesRemote.map((s) => s.initialStyle))
    callback({styleElement, discarded})
  })
}

/**
 * updateSheet
 *
 * @param newRules
 * @param newSheet
 */
function updateSheet (newRules, newSheet) {
  newRules.map((rule) => {
    newSheet.insertRule(rule, newSheet.cssRules.length)
  })
}

/**
 * convertRemoteStyles
 * load remote styles with CORS
 *
 */
function convertRemoteStyles () {
  let promises = Object.keys(document.styleSheets)
    .map((k) => document.styleSheets[k])
    .filter((s) => !s.disabled && getDomain(s.href) !== window.location.hostname)
    .map((s) => {
      return loadCSSCors(s.href)
        .then((style_tag) => {
          s.disabled = true
          return {initialStyle: s, newStyle: style_tag}
        })
        .catch((e) => {
          console.log('could not convert remote style : ', e)
          reject(e)
        })
    })

  return Promise.all(promises)

  function getDomain (uri) {
    var l = document.createElement('a')
    l.href = uri
    return l.hostname
  }
}

function isIgnoredSheet (ignore, sheet) {
  if (sheet.href) {
    let filename = sheet.href.slice(sheet.href.lastIndexOf('/') + 1)
    return ignore.indexOf(filename) !== -1
  }
  return false
}

function getParsedRules (currentBrowserSupport, rules, keepAttributes = []) {
  var parsedRules = {parsed: [], ignored: []}
  fp.each((rule) => {
    if (rule instanceof window.CSSImportRule) {
      let cssParsedRules = getParsedRules(currentBrowserSupport, rule.styleSheet.cssRules)
      parsedRules = {
        parsed: fp.concat(parsedRules.parsed, cssParsedRules.parsed),
        ignored: fp.concat(parsedRules.ignored, cssParsedRules.ignored)
      }
    } else if (window.CSSFontFaceRule && rule instanceof window.CSSFontFaceRule) {
      if (currentBrowserSupport('@font-face') || fp.includes('@font-face', keepAttributes)) {
        parsedRules.parsed.push(rule.cssText)
      } else {
        parsedRules.ignored.push('@font-face')
      }
    } else if (window.CSSKeyframesRule && rule instanceof window.CSSKeyframesRule) {
      // TODO implement keyframesrule rules
    } else if (window.CSSMediaRule && rule instanceof window.CSSMediaRule) {
      if (currentBrowserSupport('@media') || fp.includes('@media', keepAttributes)) {
        const cleanedMediaRule = getCleanedMediaRule(currentBrowserSupport, rule, keepAttributes)
        parsedRules.ignored = fp.concat(parsedRules.ignored, cleanedMediaRule.ignored)
        parsedRules.parsed.push(cleanedMediaRule.mediaRule)
      } else {
        parsedRules.ignored.push('@media')
      }
    } else if ((typeof rule.style) !== 'object') {
      console.error(rule)
    } else {
      const cleanedRule = getCleanedRule(currentBrowserSupport, rule, keepAttributes)
      parsedRules.ignored = fp.concat(parsedRules.ignored, cleanedRule.ignored)
      if (fp.has('rule', cleanedRule)) {
        parsedRules.parsed.push(`${cleanedRule.rule} {${cleanedRule.properties}}`)
      }
    }
  }, rules)
  return parsedRules
}

function getCleanedMediaRule (currentBrowserSupport, cssMediaRule, keepAttributes = []) {
  let cleanedMediaRules = []
  let ignoredRules = []
  fp.each((mediaRule) => {
    const cleanedMediaRule = getCleanedRule(currentBrowserSupport, mediaRule, keepAttributes)
    if (fp.has('rule', cleanedMediaRule)) {
      cleanedMediaRules.push(cleanedMediaRule)
    }
    ignoredRules = fp.concat(ignoredRules, cleanedMediaRule.ignored)
  }, cssMediaRule.cssRules)

  let cleanedMediaRulesProps = cleanedMediaRules.map(
    (r) => `${r.rule} {${r.properties}}`
  ).join('\n')

  return {
    mediaRule: `@media ${cssMediaRule.media.mediaText} {${cleanedMediaRulesProps}}`,
    ignored: fp.uniq(ignoredRules)
  }
}

function getCleanedRule (currentBrowserSupport, rule, keepAttributes = []) {
  var cleanedRule = {ignored: []}
  var attributes = getAttributes(rule.style.cssText)
  var segregatedAttributes = fp.groupBy(currentBrowserSupport, attributes) // -> {true:[...], false:[...], undefined: [...]}

  segregatedAttributes.true = segregatedAttributes.true || []

  if (fp.has('false', segregatedAttributes)) {
    keepAttributes.map((keep) => {
      if (fp.includes(keep, segregatedAttributes.false)) {
        segregatedAttributes.true.push(keep)
        segregatedAttributes.false = segregatedAttributes.false.filter((e) => e !== keep)
      }
    })
    cleanedRule.ignored = segregatedAttributes.false
  }

  if (fp.has('true', segregatedAttributes)) {
    cleanedRule.rule = rule.selectorText
    cleanedRule.properties = segregatedAttributes.true.map(
      (attribute) => `${attribute}: ${rule.style[attribute]}`
    ).join('; ')
  }

  return cleanedRule
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

module.exports = { browsers, filterStyles, resetStyles, findStyleSheet}
