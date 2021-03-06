/* eslint-env mocha */

var expect = window.chai.expect
var filterStyles = window.CSSAntique.filterStyles
var resetStyles = window.CSSAntique.resetStyles
let newStylesElems = []

// *
describe('filterStyles', function () {
  this.timeout(500000)
  before(reset)

  it('should ignore specified stylesheet files', function (done) {
    let mochacss = window.CSSAntique.findStyleSheet('mocha.css')[0]
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
      newStylesElems.push(filterRes.styleElement)
      expect(mochacss.disabled).to.be.false
      done()
    })
  })

  it('should read external stylesheets', function (done) {
    loadStylesheet('./fixtures/css/dummy.css', function (style) {
      let dummycss = window.CSSAntique.findStyleSheet('dummy.css')[0]
      expect(dummycss.disabled).to.be.false
      filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
        newStylesElems.push(filterRes.styleElement)
        expect(dummycss.disabled).to.be.true
        newStylesElems.push(style)
        done()
      })
    })
  })

  it('should read other domain external stylesheets', function (done) {
    setContent('<div class="day-page">.</div>')
    let el = document.getElementsByClassName('day-page')[0]
    loadStylesheet('https://mmai.github.io/poemaze/css/main.css', function (style) {
      let maincss = window.CSSAntique.findStyleSheet('main')[0]
      expect(maincss.disabled).to.be.false
      filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
        newStylesElems.push(filterRes.styleElement)
        expect(maincss.disabled).to.be.true
        expect(window.getComputedStyle(el)['background-color']).to.equal('rgb(190, 207, 195)')
        // expect(filterRes.styleElement.)
        newStylesElems.push(style)
        done()
      })
    })
  })
  // it('should read other domain external stylesheets', function (done) {
  //   setContent('<div class="clc-jobs-multi">.</div>')
  //   let el = document.getElementsByClassName('day-page')[0]
  //   loadStylesheet('http://cdn.sstatic.net/clc/styles/clc/jobs-multi.min.css?v=8ac823724e92', function (style) {
  //     let maincss = window.CSSAntique.findStyleSheet('jobs-multi.min')[0]
  //     expect(maincss.disabled).to.be.false
  //     filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
  //       newStylesElems.push(filterRes.styleElement)
  //       expect(maincss.disabled).to.be.true
  //       expect(window.getComputedStyle(el)['color']).to.equal('rgb(190, 207, 195)')
  //       // expect(filterRes.styleElement.)
  //       newStylesElems.push(style)
  //       done()
  //     })
  //   })
  // })

  it('should read local styles', function (done) {
    setContent('<style>.dummy {}</style>')
    let nbStylesheets = Object.keys(document.styleSheets).length
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
      newStylesElems.push(filterRes.styleElement)
      expect(Object.keys(document.styleSheets).length).to.equal(nbStylesheets + 1)
      done()
    })
  })

  it('should manage @import rules', function (done) {
    setContent('<div class="dummy2">.</div>')
    let style = document.createElement('style')
    style.textContent = '@import url("./fixtures/css/dummy2.css")'
    document.head.appendChild(style)
    newStylesElems.push(style)
    waitForImport(style, function () {
      try {
        let el = document.getElementsByClassName('dummy2')[0]
        expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
        filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
          newStylesElems.push(filterRes.styleElement)
          expect(window.getComputedStyle(el)['flexDirection']).to.equal('row')
          done()
        })
      } catch (e) {
        return done(e)
      }
    })
  })

  it('should return the list of not supported properties', function (done) {
    setContent('<div class="dummy2">.</div>')
    let style = document.createElement('style')
    style.textContent = ' .dummy2 { color: red; flex-direction: column; }'
    document.head.appendChild(style)
    newStylesElems.push(style)
    let el = document.getElementsByClassName('dummy2')[0]

    expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
      expect(window.getComputedStyle(el)['flexDirection']).to.equal('row')
      expect(filterRes.discarded).to.deep.equal(['flex-direction'])
      done()
    })
  })

  it('should keep specified attributes', function (done) {
    setContent('<div class="dummy2">.</div>')
    let style = document.createElement('style')
    style.textContent = ' .dummy2 { color: red; flex-direction: column; }'
    document.head.appendChild(style)
    newStylesElems.push(style)
    let el = document.getElementsByClassName('dummy2')[0]

    expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
    filterStyles({ignore: ['mocha.css'], keepAttributes: ['flex-direction'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
      expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
      expect(filterRes.discarded).to.deep.equal([])
      done()
    })
  })

  it('should manage @keyframe rules')
})

describe('resetStyles', function () {
  before(reset)

  it('should reset styles to initial state', function (done) {
    setContent('<div class="dummy2">.</div>')
    let style = document.createElement('style')
    style.textContent = ' .dummy2 { flex-direction: column; }'
    document.head.appendChild(style)
    newStylesElems.push(style)
    let el = document.getElementsByClassName('dummy2')[0]

    let nbStyles = document.styleSheets.length
    expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (res) {
      expect(document.styleSheets.length).to.equal(nbStyles + 1)
      expect(window.getComputedStyle(el)['flexDirection']).to.equal('row')
      resetStyles()
      expect(document.styleSheets.length).to.equal(nbStyles)
      expect(window.getComputedStyle(el)['flexDirection']).to.equal('column')
      done()
    })
  })

  it('should reset remote styles to initial state', function (done) {
    loadStylesheet('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700', function (style) {
      let googlecss = window.CSSAntique.findStyleSheet('googleapis')[0]
      expect(googlecss.disabled).to.be.false
      let nbStyles = document.styleSheets.length
      filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
        expect(googlecss.disabled).to.be.true
        // expect(document.styleSheets.length).to.not.equal(nbStyles)
        resetStyles()
        expect(googlecss.disabled).to.be.false
        expect(document.styleSheets.length).to.equal(nbStyles)
        newStylesElems.push(style)
        done()
      })
    })
  })
})

describe('filterStyles @media rules', function () {
  // this.timeout(4000)

  var mediaStyle

  before(function (done) {
    loadStylesheet('./fixtures/css/media.css', function (style) {
      mediaStyle = style
      done()
    })
  })

  after(function () {
    newStylesElems.push(mediaStyle)
  })

  beforeEach(function () {
    reset()
    mediaStyle.sheet.disabled = false
    setContent('<div class="mediarules">.</div>')
  })

  it('should check @media support', function (done) {
    let el = document.getElementsByClassName('mediarules')[0]
    expect(window.getComputedStyle(el)['font-size']).to.equal('24px')
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Opera', version: '8'}}, function (filterRes) {
      newStylesElems.push(filterRes.styleElement)
      expect(window.getComputedStyle(el)['font-size']).to.equal('10px')
      done()
    })
  })

  it('should parse internal rules of @media rule', function (done) {
    let el = document.getElementsByClassName('mediarules')[0]
    expect(window.getComputedStyle(el)['font-size']).to.equal('24px')
    expect(window.getComputedStyle(el)['flex-direction']).to.equal('column')
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
      newStylesElems.push(filterRes.styleElement)
      expect(window.getComputedStyle(el)['font-size']).to.equal('24px')
      expect(window.getComputedStyle(el)['flex-direction']).to.equal('row')
      expect(filterRes.discarded).to.deep.equal(['flex-direction'])
      done()
    })
  })

  it('should inject current browser @media values', function (done) {
    let el = document.getElementsByClassName('mediarules')[0]
    expect(window.getComputedStyle(el)['border-top-style']).to.equal('solid')
    filterStyles({ignore: ['mocha.css'], browser: {name: 'Firefox', version: '3'}}, function (filterRes) {
      newStylesElems.push(filterRes.styleElement)
      expect(window.getComputedStyle(el)['border-top-style']).to.equal('solid')
      done()
    })
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
  resetStyles()
}
