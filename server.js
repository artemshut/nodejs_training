var http  = require('http');
var log = require('winston');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile('index.html', function (err, info) {
            if (err) {
                log.error(err);
                res.statusCode = 500;
                res.end("Internal server error");
                return
            }
            res.end(info);
        });
    } else {
        res.statusCode = 404;
        res.end('Page not found')
    }
}).listen(3000);

