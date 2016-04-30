build:
	webpack -p
dev:
	webpack -d -w
tests:
	http-server &
	chromium-browser http://localhost:8080/test/
