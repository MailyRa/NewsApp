var createError = require('http-errors');
//var express = require('express');
import express from 'express';

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/crud');

var app = express();
const port = 8080;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');

interface ResponseError extends Error {
  status?: number;
}

app.get('/api', (req: express.Request, res: express.Response) => {
  res.send(`${new Date()}`);
});

app.get('/api/users', (req: express.Request, res: express.Response) => {
  res.send(['Aang', 'Katara', 'Momo', 'Sokka', 'Appa']);
});

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: ResponseError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
