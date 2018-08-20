const http = require('http');

var server = http.createServer(function(request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end('This is running from a server');
});
server.listen(3000);
