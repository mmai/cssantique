build:
	webpack -p
dev:
	webpack -d -w
tests:
	python -m SimpleHTTPServer &
	chromium-browser http://localhost:8000/test/index.html
