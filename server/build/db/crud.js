"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
var model = require('./model');
//Create User function
function createUser(firstName, lastName, email, password) {
    var user = model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
    console.log("User's auto-generated ID", user.id);
}
exports.createUser = createUser;
