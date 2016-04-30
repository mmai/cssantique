/* eslint-env mocha */

var expect = window.chai.expect
var filterStyles = window.CSSAntique.filterStyles

describe('filterStyles', function () {
  it('should ignore specified stylesheet files', function () {
    let mochacss = window.CSSAntique.findStyleSheet('mocha.css')[0]
    filterStyles({ignore: ['mocha.css']})
    expect(mochacss.disabled).to.be.false
  })
})
