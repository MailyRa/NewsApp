"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require('http-errors');
//var express = require('express');
var express_1 = __importDefault(require("express"));
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/crud');
var app = express_1.default();
var port = 8080;
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
app.get('/api', function (req, res) {
    res.send("" + new Date());
});
app.get('/api/users', function (req, res) {
    res.send(['Aang', 'Katara', 'Momo', 'Sokka', 'Appa']);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
    });
});
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port);
});
module.exports = app;
