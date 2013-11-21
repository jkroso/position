REPORTER=dot

serve: node_modules
	@node_modules/serve/bin/serve -Sloj

node_modules: *.json
	@packin install -Re\
		--meta deps.json,package.json,component.json \
		--folder node_modules

.PHONY: serve test