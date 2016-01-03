var express = require('express')
  , routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set('port', config.get('port'));
http.createServer(app).listen(config.get('port'), function () {
    log.info('Express port listening ' + config.get('port'));
});

// Middleware

app.use(function (req, res, next) {
   res.end("Hello");
});

app.use(function (req, res, next) {
    if (req.url == '/test') {
        next(new Error('wops, denied'));
    } else {
        next();
    }
});

app.use(function (req, res) {
    res.send(404, '404 error');
});

app.use(function (req, res, next, err) {
    if (app.get('env') == 'development') {
        var errorHandler = app.use(express.errorHandler());
        errorHandler(err, req, res, next);
    } else {
        res.send(500);
    }
});

//var app = module.exports = express.createServer();

// Configuration

//app.configure(function(){
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'jade');
//  app.use(express.bodyParser());
//  app.use(express.methodOverride());
//  app.use(express.cookieParser());
//  app.use(express.session({ secret: 'your secret here' }));
//  app.use(app.router);
//  app.use(express.static(__dirname + '/public'));
//});
//
//app.configure('development', function(){
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//});
//
//app.configure('production', function(){
//  app.use(express.errorHandler());
//});
//
//// Routes
//
//app.get('/', routes.index);
//
//app.listen(3000, function(){
//  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
//});
