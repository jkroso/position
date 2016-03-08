serve: node_modules
	@$</serve/bin/serve -Sloj

node_modules: package.json
	@npm install

.PHONY: serve