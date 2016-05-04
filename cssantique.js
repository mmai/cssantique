import { browserSupport } from 'browser-data'

export function filterStyles (options = { ignore: [], browser: {name: 'Firefox', version: '3'} }) {
  // This new css sheet will replace the originals with rules containing only allowed properties
  let newSheet = createNewSheet()

  for (let sheetId of Object.keys(document.styleSheets)) {
    const sheet = document.styleSheets[sheetId]
    if (!isIgnoredSheet(options.ignore, sheet)) {
      parseRulesIntoSheet(options.browser, sheet.rules, newSheet)
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

function parseRulesIntoSheet (browser, rules, newSheet) {
  for (let ruleId of Object.keys(rules)) {
    const rule = rules[ruleId]
    if (rule instanceof window.CSSImportRule) {
      parseRulesIntoSheet(browser, rule.styleSheet.rules, newSheet)
    } else if (rule instanceof window.CSSKeyframesRule) {
      // TODO implement keyframesrule rules
      console.log('@keyframe rule not implemented')
    } else if (rule instanceof window.CSSMediaRule) {
      // TODO implement media rules
      console.log('@media rule not implemented')
    } else if ((typeof rule.style) !== 'object') {
      console.error(rule)
    } else {
      const newRuleProperties = Object.keys(rule.style)
        // Defined properties are indexed by numbers
        .filter((key) => !isNaN(parseInt(key, 10)))
        // Keep only properties supported by the targeted browser
        .filter((k) => browserSupport(browser, rule.style[k]))
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

export function findStyleSheet (filename) {
  let stylesheets = window.document.styleSheets

  return Object.keys(stylesheets)
    .map((k) => stylesheets[k])
    .filter((s) => s.href !== null && s.href.indexOf(filename) > -1)
}
