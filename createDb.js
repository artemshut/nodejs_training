var User = require('models/user').User;

var user = new User({
    username: 'Tes2t',
    password: 'secret1'
});

user.save(function (err, user, affected) {
    if (err) throw err;

    User.findOne({username: 'Test'}, function (err, test) {
        console.log(test);
    });
});