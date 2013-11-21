
var should = require('chai').should()
var position = require('..')
var css = require('css')

var html = document.getElementsByTagName('html')[0]
var static = document.querySelector('#static')
var test = document.querySelector('#test')
var child = test.firstElementChild

describe('offsetParent', function () {
	it('should return undefined if no positioned parents are present', function () {
		should.not.exist(position.offsetParent(static.firstChild))
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

	it('should not be affected by scolling', function () {
		window.scrollTo(0,100)
		position(test).should.deep.equal({
			top:50,
			left:50,
			width:200,
			height:100,
			right:250,
			bottom:150
		})
		window.scrollTo(0,0)
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
		css(child, {border:'10px solid'})
		position.relative(child).should.deep.equal({
			x:100,
			y:50
		})
		css(child, {border:'none'})
	})
})

describe('offset(child, parent)', function () {
	it('should return the difference between the two', function () {
		position.relative(test, html).should.deep.equal({
			x:45,
			y:45
		})
		position.relative(child, test).should.deep.equal({
			x:100,
			y:50
		})
	})
})

describe('container(child)', function () {
	it('should return the offsetparent\'s containing block', function () {
		position.container(child).should.deep.equal({
			top:50,
			left:50,
			width:200,
			height:100,
			right:250,
			bottom:150
		})
	})

	it('should allow for border width', function () {
		css(test,{border:'10px solid'})
		position.container(child).should.deep.equal({
			top:60,
			left:60,
			width:200,
			height:100,
			right:260,
			bottom:160
		})
		css(test,{border:'none'})
	})

	it('if there isn\'t an offsetParent it should return the size of the document', function () {
		var width = html.offsetWidth
		var height = html.offsetHeight
		position.container(test).should.deep.equal({
			top:0,
			left:0,
			width:width,
			height:height,
			right:width,
			bottom:height
		})
	})
})
