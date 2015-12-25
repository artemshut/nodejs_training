var http  = require('http');
var log = require('winston');

var server = http.createServer();

server.on('request', require('./request'));

server.listen(1338);

log.info("server is running");