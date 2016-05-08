import { browserSupport, browsersDb } from 'browser-data'

var filterStyles = function filterStyles (options = { ignore: [], browser: {name: 'Firefox', version: '3'} }) {
  // This new css sheet will replace the originals with rules containing only allowed properties
  let initialSheets = Object.keys(document.styleSheets).map((k) => document.styleSheets[k])

  let newStyle = document.createElement('style')
  document.head.appendChild(newStyle)

  for (let sheet of initialSheets) {
    if (!isIgnoredSheet(options.ignore, sheet)) {
      parseRulesIntoSheet(options.browser, sheet.cssRules, newStyle.sheet)
      sheet.disabled = true // Disable the original css sheet
    }
  }
  return newStyle
}

function isIgnoredSheet (ignore, sheet) {
  if (sheet.href) {
    let filename = sheet.href.slice(sheet.href.lastIndexOf('/') + 1)
    return ignore.indexOf(filename) !== -1
  }
  return false
}

function parseRulesIntoSheet (browser, rules, newSheet) {
  for (let ruleId of Object.keys(rules)) {
    const rule = rules[ruleId]
    if (rule instanceof window.CSSImportRule) {
      parseRulesIntoSheet(browser, rule.styleSheet.cssRules, newSheet)
    } else if (window.CSSKeyframesRule && rule instanceof window.CSSKeyframesRule) {
      // TODO implement keyframesrule rules
    } else if (window.CSSMediaRule && rule instanceof window.CSSMediaRule) {
      if (browserSupport(browser, '@media')) {
        let cleanedMediaRules = []
        for (let mediaRuleId of Object.keys(rule.cssRules)) {
          const mediaRule = rule.cssRules[mediaRuleId]
          const cleanedMediaRule = getCleanedRule(browser, mediaRule)
          if (cleanedMediaRule !== false) {
            cleanedMediaRules.push(cleanedMediaRule)
          }
        }
        let cleanedMediaRulesProps = cleanedMediaRules.map(
          (r) => `${r.rule} {${r.properties}}`
        ).join('\n')

        // newSheet.addRule(`@media ${rule.media.mediaText}`, cleanedMediaRulesProps)
        newSheet.insertRule(`@media ${rule.media.mediaText} {${cleanedMediaRulesProps}}`, newSheet.cssRules.length)
      }
    } else if ((typeof rule.style) !== 'object') {
      console.error(rule)
    } else {
      const cleanedRule = getCleanedRule(browser, rule)
      // Add cleaned rule on the new css sheet
      if (cleanedRule !== false) {
        // newSheet.addRule(cleanedRule.rule, cleanedRule.properties)
        newSheet.insertRule(`${cleanedRule.rule} {${cleanedRule.properties}}`, newSheet.cssRules.length)
      }
    }
  }
}

function getCleanedRule (browser, rule) {
  const knownProperties = Object.keys(rule.style)
    // Defined properties are indexed by numbers
    .filter((key) => !isNaN(parseInt(key, 10)))
    // Keep only properties supported by the targeted browser
    .filter((k) => browserSupport(browser, rule.style[k]))
    .map((k) => {
      const attribute = rule.style[k]
      return `${attribute}: ${rule.style[attribute]}`
    })

  if (knownProperties.length > 0) {
    return {
      rule: rule.selectorText,
      properties: knownProperties.join('; ')
    }
  }
  return false
}

var findStyleSheet = function findStyleSheet (filename) {
  let stylesheets = window.document.styleSheets

  return Object.keys(stylesheets)
    .map((k) => stylesheets[k])
    .filter((s) => s.href !== null && s.href.indexOf(filename) > -1)
}

module.exports = { browsersDb, filterStyles, findStyleSheet}
