build:
	webpack -p
dev:
	webpack -d -w
supportdb:
	node tools/wikipediaScraper.js
