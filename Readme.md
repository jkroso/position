# position

DOM element position utilities

## API

```javascript
var position = require('position')
```
  - [position()](#position)
  - [offset()](#offset)
  - [containerBox()](#containerbox)
  - [offsetParent()](#offsetparent)

### position()

  Get the location of the element relative to the top left of the documentElement
  
  `-> {top, right, bottom, left, width, height}` in pixels

### offset()

  Get the position of one element relative to another
  
```js
offset(child)
offset(child, parent) -> {x, y}
```

### containerBox()

  Determine the perimeter of an elements containing block. This is the box that
  determines the childs positioning. The container cords are relative to the 
  document element not the viewport; so take into account scrolling.

### offsetParent()

  Get the element that serves as the base for this ones positioning.
  If no parents are postioned it will return undefined which isn't 
  what you might expect if you know the offsetparent spec or have 
  used `jQuery.offsetParent`

## Running the tests

  Run `make`