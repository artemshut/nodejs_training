var db = require('db');
var log = require('logger')(module);

function User(name) {
    this.name = name;
}

User.prototype.hello = function(who) {
    log(db.getPhrase("Hello") + who.name);
};

log("user.js is required");

module.exports = User;
