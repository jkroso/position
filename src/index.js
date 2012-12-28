var style = require('computed-style')

/**
 * Get the location of the element relative to the documentElement
 *
 * @param {Element} element
 * @return {Object} {top, right, bottom, left} in pixels
 */

exports = module.exports = position
function position (element) {
	var box = element.getBoundingClientRect()
	// Has to be copied since ClientRects is immutable and thats unusual
	return {
		top: box.top,
		right: box.right,
		left: box.left,
		bottom: box.bottom,
		width: box.width,
		height: box.height
	}
}

/**
 * Get the position of one element relative to another
 * 
 * @param {Element} child the subject element
 * @param {Element} [parent] 
 *        offset will be calculated relative to this element. This parameter is 
 *        optional and will be defaulted to the offsetparent of the `child` element
 * @return {Object} {x, y} in pixels
 */

exports.relative = offset 
function offset (child, parent) {
	// default to comparing with the offsetparent
	parent || (parent = offsetParent(child))

	var offset = position(child)
	  , parentOffset = position(parent)
	  , css = style(child)

	// Subtract element margins
	offset.top  -= parseFloat(css.marginTop)  || 0
	offset.left -= parseFloat(css.marginLeft) || 0

	// Allow for the offsetparent's border
	css = style(parent)
	offset.top  -= parseFloat(css.borderTopWidth) || 0
	offset.left -= parseFloat(css.borderLeftWidth)|| 0

	// Subtract the two offsets
	return {
		x: offset.left - parentOffset.left,
		y:  offset.top  - parentOffset.top
	}
}

/**
 * Get the element that serves as the base for this ones positioning.
 * That means either the nearest positioned parent or the documentElement 
 * 
 * @param {Element} element
 * @return {Element} if a positioned parent exists
 */

exports.offsetParent = offsetParent
function offsetParent (element) {
	var parent = element.offsetParent
	while (parent && style(parent).position === "static") parent = parent.offsetParent
	return parent || element.ownerDocument.documentElement
}
