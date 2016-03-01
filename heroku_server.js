"use strict";

var fs = require("fs");

var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('nicolive-alert-slack running.');
}).listen(process.env.PORT || 8080);

eval(fs.readFileSync('server.js').toString());

