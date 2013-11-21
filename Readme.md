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

Run 

	$ make test/built.js

Then open the test directory in your browser

## Contributing
Please do!

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Jakeb Rosoman

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
