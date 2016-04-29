/* eslint-env mocha */

var expect = window.chai.expect
var showStyle = window.ShowStyle.showStyle

describe('showStyle', function () {
  it('should ignore specified stylesheet files', function () {
    let mochacss = window.ShowStyle.findStyleSheet((s) => s.href.indexOf('mocha.css') > -1)[0]
    showStyle({ignore: ['mocha.css']})
    expect(mochacss.disabled).to.be.false
  })
})
