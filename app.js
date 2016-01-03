var express = require('express')
  , routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();

//var app = module.exports = express.createServer();

// Configuration

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use('views', __dirname + '/templates');
app.use('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function (req, res, next) {
    res.render('index', {
        body: "<b>Hello</b>>"
    })
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", config.get('port'), app.settings.env);
});
