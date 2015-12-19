var user = require("./user");

var petya = new user.User("petya");
var vasya = new user.User("vasya");

vasya.hello(petya);
