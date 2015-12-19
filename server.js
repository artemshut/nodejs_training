var log = require('logger')(module);
var db = require('db');
db.connect();

var User = require("./user");

function run() {
    var petya = new User("petya");
    var vasya = new User("vasya");

    vasya.hello(petya);
    log(db.getPhrase("Run successful"));
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}
