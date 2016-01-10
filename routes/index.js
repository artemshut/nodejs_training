var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectId = require('mongodb').ObjectId;

module.exports = function(app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    });

    app.get('/user/:id', function (req, res, next) {
        try {
            var id = new ObjectId(req.params.id);
        } catch (e) {
            return next(404);
        }
        User.findById(id, function (err, user) {
            if (err) return next(err);
            if (!user) {
                next(new HttpError(404, "User not found"));
            }
            res.json(user);
        });
    });

};

