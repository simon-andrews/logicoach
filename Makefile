.PHONY: all
all: main.js propositions.js tactics.js uiux.js

%.js: %.ts
	tsc $<

.PHONY: clean
clean:
	rm -rf *.js
