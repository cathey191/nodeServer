const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./data/products');
const qs = require('querystring');

var server = http.createServer(function(request, response) {
	console.log(`${request.method} request for ${request.url}`);

	// GET requests
	if (request.method === 'GET') {
		// HTML pages
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
			// CSS link
		} else if (request.url.match(/.css$/)) {
			var cssPath = path.join(__dirname, 'public', request.url);
			var fileStream = fs.createReadStream(cssPath, 'UTF-8');
			response.writeHead(200, { 'Content-Type': 'text/css' });
			fileStream.pipe(response);
			// JS link
		} else if (request.url.match(/.js$/)) {
			var cssPath = path.join(__dirname, 'public', request.url);
			var fileStream = fs.createReadStream(cssPath, 'UTF-8');
			response.writeHead(200, { 'Content-Type': 'text/js' });
			fileStream.pipe(response);
			// PNG link
		} else if (request.url.match(/.png$/)) {
			var imagePath = path.join(__dirname, 'public', request.url);
			var imageStream = fs.createReadStream(imagePath);
			response.writeHead(200, { 'Content-Type': 'image/png' });
			imageStream.pipe(response);
			// JPG link
		} else if (request.url.match(/.jpg$/)) {
			var imagePath = path.join(__dirname, 'public', request.url);
			var imageStream = fs.createReadStream(imagePath);
			response.writeHead(200, { 'Content-Type': 'image/jpeg' });
			imageStream.pipe(response);
			// get local data
		} else if (request.url === '/allProducts') {
			response.writeHead(200, { 'Content-Type': 'text/json' });
			response.end(JSON.stringify(data));
			// checking data for products in stock
		} else if (request.url === '/inStock') {
			inStock(response);
		} else if (request.url === '/outStock') {
			outStock(response);
		}

		// forms POST
	} else if (request.method === 'POST') {
		if (request.url === '/formSubmit') {
			var body = '';

			request.on('data', function(data) {
				body += data;
			});

			request.on('end', function() {
				var formData = qs.parse(body);
				console.log(body);
			});
		}
	}
});
server.listen(3000);

function inStock(response) {
	var stock = data.filter(function(item) {
		return item.inStock === true;
	});
	response.end(JSON.stringify(stock));
}

function outStock(response) {
	var stock = data.filter(function(item) {
		return item.inStock === false;
	});
	response.end(JSON.stringify(stock));
}
