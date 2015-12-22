var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);

    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        message = urlParsed.query.message;
        res.end(message);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

server.listen(1338, '127.0.0.1');