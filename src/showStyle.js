import {browserSupport} from 'browser-data'

var browser = {name: 'Firefox', version: '3'}

export function showStyle (options = { ignore: [] }) {
  // This new css sheet will replace the originals with rules containing only allowed properties
  let newSheet = createNewSheet()

  for (let sheetId of Object.keys(document.styleSheets)) {
    const sheet = document.styleSheets[sheetId]
    if (!isIgnoredSheet(options.ignore, sheet)) {
      parseRulesIntoSheet(sheet.rules, newSheet)
      sheet.disabled = true // Disable the original css sheet
    }
  }
}

function isIgnoredSheet (ignore, sheet) {
  if (sheet.href) {
    let filename = sheet.href.slice(sheet.href.lastIndexOf('/') + 1)
    return ignore.indexOf(filename) !== -1
  }
  return false
}

function parseRulesIntoSheet (rules, newSheet) {
  for (let ruleId of Object.keys(rules)) {
    const rule = rules[ruleId]
    if (rule instanceof window.CSSImportRule) {
      parseRulesIntoSheet(rule.styleSheet.rules, newSheet)
    } else if (rule instanceof window.CSSMediaRule) {
      // TODO implement media rules
      console.log('@media rule not implemented')
    } else if ((typeof rule.style) !== 'object') {
      console.error(rule)
    } else {
      const newRuleProperties = Object.keys(rule.style).filter((key) => !isNaN(parseInt(key, 10))) // Defined properties are indexed by numbers
      // .filter(k => allowedProperties.indexOf(rule.style[k]) !== -1) //Keep only allowed properties
      .filter((k) => browserSupport(browser.name, browser.version, rule.style[k])) // Keep only properties supported by the targeted browser

      .map((k) => {
        const attribute = rule.style[k]
        return `${attribute}: ${rule.style[attribute]}`
      })

      // Add cleaned rule on the new css sheet
      if (newRuleProperties.length > 0) {
        newSheet.addRule(rule.selectorText, newRuleProperties.join(', '))
      }
    }
  }
}

function createNewSheet () {
  const style = document.createElement('style')
  document.head.appendChild(style)
  return style.sheet
}

export function findStyleSheet (findFunction) {
  let stylesheets = window.document.styleSheets

  return Object.keys(stylesheets)
  .filter((k) => findFunction(stylesheets[k]))
  .map((k) => stylesheets[k])
}
