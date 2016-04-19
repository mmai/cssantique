// import 'babel-polyfill'

for (let sheetId of Object.keys(document.styleSheets)){
  let sheet = document.styleSheets[sheetId]
  console.log('======================')
  console.log(sheet)
  for (let ruleId of Object.keys(sheet.rules)){
    let rule = sheet.rules[ruleId]
    console.log('-------------')
    let definedStyles = Object.keys(rule.style).filter(key => !isNaN(parseInt(key, 10)) )
    definedStyles.map(k => {
        const attribute = rule.style[k]
        console.log(attribute, rule.style[attribute])
      })
  }
}
