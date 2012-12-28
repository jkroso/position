var mocha = require('mocha')

mocha.setup('bdd')

require('./index.test.js')

mocha.run(function () {
	window.scrollTo(0,0)
   console.log('Done!')
})