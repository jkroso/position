all: clean build test docs

build: test
	@component build -dv

install:
	@npm install
	@component install --dev

test:
	@bigfile --entry=test/browser.js --write=test/built.js -lb

clean:
	@rm -rf build components node_modules

docs:
	@cat docs/head.md > Readme.md
	@dox --api < src/index.js >> Readme.md
	@cat docs/tail.md >> Readme.md

.PHONY: all build install clean docs test
