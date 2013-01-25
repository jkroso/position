all: test/built.js Readme.md

test/built.js:
	@node_modules/.bin/sourcegraph.js test/browser.js \
		--plugins mocha,nodeish,javascript \
		 | node_modules/.bin/bigfile \
		 	--export null \
		 	--plugins nodeish > test/built.js

Readme.md: src/index.js docs/head.md docs/tail.md
	@cat docs/head.md > Readme.md
	@cat src/index.js\
	 | dox -a | sed s/^\#\#/\#\#\#/ >> Readme.md
	@cat docs/tail.md >> Readme.md

.PHONY: all
