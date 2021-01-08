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
var crud = require('./db/crud');
var app = express_1.default();
var port = 8080;
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
// interface ResponseError extends Error {
//   status?: number;
// }
// app.get('/api', (req: express.Request, res: express.Response) => {
//   res.send(`${new Date()}`);
// });
// app.get('/api/users', (req: express.Request, res: express.Response) => {
//   res.send(['Aang', 'Katara', 'Momo', 'Sokka', 'Appa']);
// });
app.post('/sign_up', function (req, res) {
    var firstName = req.body["firstName"];
    var lastName = req.body["lastName"];
    var email = req.body["email"];
    var password = req.body["password"];
    crud.createUser(firstName, lastName, email, password);
    res.send('success');
});
// catch 404 and forward to error handler
// app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
//   next(createError(404));
// });
// error handler
// app.use(function (err: ResponseError, req: express.Request, res: express.Response, next: express.NextFunction) {
// set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: err,
//   });
// });
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port);
});
module.exports = app;
