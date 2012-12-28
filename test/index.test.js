var should = require('chai').should()
  , position = require('../src')
  , html = document.getElementsByTagName('html')[0]
  , test = document.querySelector('#test')
  , child = test.firstElementChild
  , static = document.querySelector('#static')
  , css = require('component-css')

describe('position', function () {

	describe('offsetParent', function () {
		it('should return the document element if no positioned parents are present', function () {
			position.offsetParent(static.firstChild).should.equal(html)
		})
		it('should return the nearest positioned element', function () {
			position.offsetParent(child).should.equal(test)
			position.offsetParent(child.firstElementChild).should.equal(child)
		})
	})

	describe('position', function () {
		it('should return a description of the elements position', function () {
			position(test).should.deep.equal({
				top:50,
				left:50,
				width:200,
				height:100,
				right:250,
				bottom:150
			})
		})
	})

	describe('offset(child)', function () {
		it('should return the position relative to its offsetParent', function () {
			position.relative(test).should.deep.equal({
				x:50,
				y:50
			})
		})
		it('should remove this childs margin', function () {
			css(child, {margin:10})
			position.relative(child).should.deep.equal({
				x:100,
				y:50
			})
			css(child, {margin:0})
		})
		it('should remove the offset parents border', function () {
			css(child, {border:10})
			position.relative(child).should.deep.equal({
				x:100,
				y:50
			})
			css(child, {border:10})
		})
	})

	describe('offset(child, parent)', function () {
		it('should return the difference between the two', function () {
			position.relative(test, html).should.deep.equal({
				x:50,
				y:50
			})
			position.relative(child, test).should.deep.equal({
				x:100,
				y:50
			})
		})
	})
})