const http = require('http');
const fs = require('fs');
const path = require('path');

var server = http.createServer(function(request, response) {
	console.log(`${request.method} request for ${request.url}`);
	if (request.url === '/' || request.url === '/index') {
		fs.readFile('./public/index.html', 'UTF-8', function(error, contents) {
			if (error) {
				console.log('Error, something went wrong');
				console.log(error);
			} else {
				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.end(contents);
			}
		});
	} else if (request.url === '/about') {
		fs.readFile('./public/about.html', 'UTF-8', function(error, contents) {
			if (error) {
				console.log('Error, something went wrong');
				console.log(error);
			} else {
				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.end(contents);
			}
		});
	} else if (request.url === '/contact') {
		fs.readFile('./public/contact.html', 'UTF-8', function(error, contents) {
			if (error) {
				console.log('Error, something went wrong');
				console.log(error);
			} else {
				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.end(contents);
			}
		});
	} else if (request.url === '/extras') {
		fs.readFile('./public/extras.html', 'UTF-8', function(error, contents) {
			if (error) {
				console.log('Error, something went wrong');
				console.log(error);
			} else {
				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.end(contents);
			}
		});
	} else if (request.url.match(/.css$/)) {
		var cssPath = path.join(__dirname, 'public', request.url);
		var fileStream = fs.createReadStream(cssPath, 'UTF-8');
		response.writeHead(200, { 'Content-Type': 'text/css' });
		fileStream.pipe(response);
	} else if (request.url.match(/.png$/)) {
		var imagePath = path.join(__dirname, 'public', request.url);
		var imageStream = fs.createReadStream(imagePath);
		response.writeHead(200, { 'Content-Type': 'image/png' });
		imageStream.pipe(response);
	} else if (request.url.match(/.jpg$/)) {
		var imagePath = path.join(__dirname, 'public', request.url);
		var imageStream = fs.createReadStream(imagePath);
		response.writeHead(200, { 'Content-Type': 'image/jpeg' });
		imageStream.pipe(response);
	} else if (request.url.match(/.js$/)) {
		var cssPath = path.join(__dirname, 'public', request.url);
		var fileStream = fs.createReadStream(cssPath, 'UTF-8');
		response.writeHead(200, { 'Content-Type': 'text/js' });
		fileStream.pipe(response);
	}
});
server.listen(3000);
