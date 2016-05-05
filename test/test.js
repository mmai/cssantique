/* eslint-env mocha */

var expect = window.chai.expect
var filterStyles = window.CSSAntique.filterStyles
let newStylesElems = []

// *
describe('filterStyles', function () {
  // this.timeout(500000)
  before(reset)
  it('should ignore specified stylesheet files', function () {
    let mochacss = window.CSSAntique.findStyleSheet('mocha.css')[0]
    newStylesElems.push(filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}))
    expect(mochacss.disabled).to.be.false
  })

  it('should read external stylesheets', function (done) {
    loadStylesheet('./fixtures/css/dummy.css', function (style) {
      let dummycss = window.CSSAntique.findStyleSheet('dummy.css')[0]
      expect(dummycss.disabled).to.be.false
      newStylesElems.push(filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}))
      expect(dummycss.disabled).to.be.true
      done()
    })
  })

  it('should read local styles', function () {
    setContent('<style>.dummy {}</style>')
    let nbStylesheets = Object.keys(document.styleSheets).length
    newStylesElems.push(filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}))
    expect(Object.keys(document.styleSheets).length).to.equal(nbStylesheets + 1)
  })

  it('should manage @import rules', function (done) {
    setContent('<div class="dummy2">.</div>')
    let style = document.createElement('style')
    style.textContent = '@import url("./fixtures/css/dummy2.css")'
    document.head.appendChild(style)
    waitForImport(style, function () {
      try {
        let el = document.getElementsByClassName('dummy2')[0]
        expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
        newStylesElems.push(filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}))
        expect(window.getComputedStyle(el)['flexDirection']).to.equal('row')
        done()
      } catch (e) {
        return done(e)
      }
    })
  })

  it('should manage @keyframe rules')
})
// */

// *
describe('filterStyles @media rules', function () {
  // this.timeout(500000)

  var mediaStyle

  before(function (done) {
    loadStylesheet('./fixtures/css/media.css', function (style) {
      mediaStyle = style
      done()
    })
  })

  beforeEach(function () {
    reset()
    mediaStyle.sheet.disabled = false
    setContent('<div class="mediarules">.</div>')
  })

  it('should check @media support', function () {
    let el = document.getElementsByClassName('mediarules')[0]
    expect(window.getComputedStyle(el)['font-size']).to.equal('24px')
    newStylesElems.push(filterStyles({ignore: ['mocha.css'], browser: {name: 'IEMobile', version: '9'}}))
    expect(window.getComputedStyle(el)['font-size']).to.equal('10px')
  })

  it('should parse internal rules of @media rule', function () {
    let el = document.getElementsByClassName('mediarules')[0]
    expect(window.getComputedStyle(el)['font-size']).to.equal('24px')
    newStylesElems.push(filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}))
    expect(window.getComputedStyle(el)['font-size']).to.equal('24px')
  })

  it('should inject current browser @media values', function () {
    let el = document.getElementsByClassName('mediarules')[0]
    expect(window.getComputedStyle(el)['border-style']).to.equal('solid')
    let newStyle = filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}})
    newStylesElems.push(newStyle)
    expect(window.getComputedStyle(el)['border-style']).to.equal('solid')
  })
})
// */

function setContent (content) {
  window.document.getElementById('content').innerHTML = content
}

function waitForImport (style, callback) {
  let ti = setInterval(function () {
    try {
      // console.log('imported', style.sheet.cssRules)
      style.sheet.cssRules
      clearInterval(ti)
      callback()
    } catch (e) {}
  }, 10)
}

function loadStylesheet (href, callback) {
  let finished = false
  let css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = href
  css.onload = css.onreadystatechange = function () {
    if (!finished && (!this.readyState || this.readyState === 'complete')) {
      finished = true
      callback(css)
    }
  }
  let tag = document.getElementById('content')
  tag.parentNode.insertBefore(css, tag)
}

function reset () {
  setContent('')
  newStylesElems.map(function (e) { e.remove() })
  newStylesElems = []
}
