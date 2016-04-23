import {browserSupport} from 'browser-data'

var browser = {name: "Firefox", version: "3"}

for (let sheetId of Object.keys(document.styleSheets)){
  const sheet = document.styleSheets[sheetId]

  //This new css sheet will replace the original with rules containing only allowed properties
  let newSheet = createNewSheet() 

  for (let ruleId of Object.keys(sheet.rules)){
    const rule = sheet.rules[ruleId]
    const newRuleProperties = Object.keys(rule.style).filter(key => !isNaN(parseInt(key, 10)) ) //Defined properties are indexed by numbers
    // .filter(k => allowedProperties.indexOf(rule.style[k]) !== -1) //Keep only allowed properties 
    .filter(k => browserSupport(browser.name, browser.version, rule.style[k])) //Keep only properties supported by the targeted browser 

    .map(k => {
        const attribute = rule.style[k]
        return `${attribute}: ${rule.style[attribute]}` 
      })

    //Add cleaned rule on the new css sheet
    if (newRuleProperties.length > 0){
      newSheet.addRule(rule.selectorText, newRuleProperties.join(', '))
    }
  }

  //Disable the original css sheet
  sheet.disabled = true
}

function createNewSheet(){
  const style = document.createElement("style")
  document.head.appendChild(style)
  return style.sheet
}
