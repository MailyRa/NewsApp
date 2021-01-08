var createError = require('http-errors');
//var express = require('express');
import express from 'express';

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crud = require('./db/crud');

var app = express();
const port = 8080;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
var session = require('express-session')


app.post('/sign_up', (req: express.Request, res: express.Response) => {

  const firstName: string  = req.body["firstName"]
  const lastName: string = req.body["lastName"]
  const email: string  = req.body["email"]
  const password: string  = req.body["password"]

  crud.createUser(firstName, lastName, email, password)
  res.send('success')

})

app.post('/handle_login', (req:express.Request, res: express.Response) => {

    const userEmail: string = req.body["email"]
    const userPassword: string = req.body["password"]

   const user = crud.getUserByEmail(userEmail)

    if ( user && userPassword === user.password){
        session["currentUser"] = user.userId
        res.end(JSON.stringify({userEmail: "email"})); 
    } else {
        res.end(JSON.stringify({"error": "Incorrect Password or Username"}))

    }
}

)


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
