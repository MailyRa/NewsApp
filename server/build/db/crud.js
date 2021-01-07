"use strict";
var model = require('./model');
function createUser(firstName, lastName, email, password) {
    var user = model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
    console.log("User's auto-generated ID", user.id);
}
createUser("hello", "world", "newemail", "password");
