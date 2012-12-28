var style = require('computed-style')

exports = module.exports = position

/**
 * Get the location of the element relative to the top left of the documentElement
 *
 * @param {Element} element
 * @return {Object} {top, right, bottom, left} in pixels
 */
function position (element) {
	var box = element.getBoundingClientRect()
	  , scrollTop = window.scrollY
	  , scrollLeft = window.scrollX
	// Has to be copied since ClientRects is immutable and thats unusual
	return {
		top: box.top + scrollTop,
		right: box.right + scrollLeft,
		left: box.left + scrollLeft,
		bottom: box.bottom + scrollTop,
		width: box.width,
		height: box.height
	}
}

/**
 * Get the position of one element relative to another
 *
 *   offset(child)
 *   offset(child, parent)
 *   
 * @param {Element} child the subject element
 * @param {Element} [parent] 
 *        offset will be calculated relative to this element. This parameter is 
 *        optional and will be defaulted to the offsetparent of the `child` element
 * @return {Object} {x, y} in pixels
 */
exports.relative = 
exports.offset = offset 
function offset (child, parent) {
	// default to comparing with the offsetparent
	parent || (parent = offsetParent(child))
	if (!parent) {
		parent = position(child)
		return {
			x: parent.left,
			y: parent.top
		}
	}

	var offset = position(child)
	  , parentOffset = position(parent)
	  , css = style(child)

	// Subtract element margins
	offset.top  -= parseFloat(css.marginTop)  || 0
	offset.left -= parseFloat(css.marginLeft) || 0

	// Allow for the offsetparent's border
	offset.top  -= parent.clientTop
	offset.left -= parent.clientLeft

	// Subtract the two offsets
	return {
		x: offset.left - parentOffset.left,
		y:  offset.top  - parentOffset.top
	}
}
// Alternative way of calculating offset perhaps its cheaper
// function offset (el) {
// 	var x = el.offsetLeft, y = el.offsetTop
// 	while (el = el.offsetParent) {
// 		x += el.offsetLeft + el.clientLeft
// 		y += el.offsetTop + el.clientTop
// 	}
// 	return {left: x, top: y}
// }

/**
 * Determine the conaining block of an element
 *
 * @param {Element} child
 * @param {Element} [container] will default to offsetParent
 */
exports.container = container
function container (child, container) {
	// default to comparing with the offsetparent
	container || (container = offsetParent(child))
	if (!container) {
		container = child.ownerDocument.documentElement
		// The outer edges of the document
		return {
			top   : 0,
			left  : 0,
			right : container.offsetWidth,
			bottom: container.offsetHeight,
			width : container.offsetWidth,
			height: container.offsetHeight
		}
	}

	var offset = position(container)
	  , css = style(container)

	// Remove its border
	offset.top    += parseFloat(css.borderTopWidth) || 0
	offset.left   += parseFloat(css.borderLeftWidth)|| 0
	offset.right  -= parseFloat(css.borderRightWidth) || 0
	offset.bottom -= parseFloat(css.borderBottomWidth) || 0
	offset.width   = offset.right - offset.left
	offset.height  = offset.bottom - offset.top

	return offset
}

/**
 * Get the element that serves as the base for this ones positioning.
 * That means either the nearest positioned parent. Note if no parents are
 * postioned this function will return undefined. It therefore breaks from 
 * the w3c definition of an offsetparent 
 * 
 * @param {Element} element
 * @return {Element} if a positioned parent exists
 */
exports.offsetParent = offsetParent
function offsetParent (element) {
	var parent = element.offsetParent
	while (parent && style(parent).position === "static") parent = parent.offsetParent
	return parent
}
