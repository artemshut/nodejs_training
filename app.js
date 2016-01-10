var express = require('express')
  , routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var HttpError = require('error').HttpError;
var mongoose = require('libs/mongoose');

var app = express();

// Configuration

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

var MongoStore = require('connect-mongo')(express);

app.use(express.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(function (req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    res.send("Visits: " + req.session.numberOfVisits);
});

app.use(app.router);
app.use(express.static(__dirname + '/public'));

require('routes')(app);
app.use(require('middleware/sendHttpError'));

app.use(function(err, req, res, next){
    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if(app.get('env') == 'development') {
            var errorHandler = express.errorHandler();
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", config.get('port'), app.settings.env);
});
