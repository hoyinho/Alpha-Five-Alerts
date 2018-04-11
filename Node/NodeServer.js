// include the http module
var http = require('http');

// create a webserver
http.createServer(function (req, res) {

    // respond to any incoming http request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Handle HTTP Here\n');

}).listen(6767, '127.0.0.1');

// log what that we started listening on localhost:6767
console.log('Server running at 127.0.0.1:6767');

module.exports = {
	http
}