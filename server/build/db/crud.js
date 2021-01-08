"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
var model_1 = require("./model");
var model = require('./model');
//Create User function
function createUser(firstName, lastName, email, password) {
    var user = model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
    console.log("User's auto-generated ID", user.id);
}
exports.createUser = createUser;
function getUserByEmail(email) {
    return model_1.User.findAll({
        where: {
            email: email,
        },
        limit: 1
    });
}
exports.getUserByEmail = getUserByEmail;
