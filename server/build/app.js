"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crud = require('./db/crud');
var newsAPI = require('./newsapi');
var app = express_1.default();
var port = 8080;
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
var session = require('express-session');
require('dotenv').config();
//Create User
app.post('/sign_up', function (req, res) {
    var firstName = req.body["firstName"];
    var lastName = req.body["lastName"];
    var email = req.body["email"];
    var password = req.body["password"];
    crud.createUser(firstName, lastName, email, password);
    res.send('success');
});
//Handle Login
app.post('/handle_login', function (req, res) {
    var userEmail = req.body["email"];
    var userPassword = req.body["password"];
    var users = crud.getUserByEmail(userEmail).then(function (users) {
        if (users.length === 0 || users[0].password !== userPassword) {
            res.send(JSON.stringify({ "error": "Incorrect Password or Username" }));
        }
        else {
            session["currentUser"] = users[0].userId;
            res.send(JSON.stringify({ userEmail: "email" }));
        }
    });
});
//NewsAPI Route
app.get('/news_feed', function (req, res) {
    newsAPI.getHeadlines().then(function (apiResponse) {
        console.log(apiResponse);
        res.send(JSON.stringify(apiResponse));
    });
});
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port);
});
module.exports = app;
