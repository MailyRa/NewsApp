import express from 'express';
import { Model } from 'sequelize/types';



var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crud = require('./db/crud');
import { SavedArticles, User } from './db/model';
var newsAPI = require('./newsapi')
import INewsApiResponse from 'ts-newsapi'
var today = new Date()


var app = express();
const port = 8080;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
var session = require('express-session')
require('dotenv').config();



//Create User
app.post('/sign_up', (req: express.Request, res: express.Response) => {

  const firstName: string  = req.body["firstName"]
  const lastName: string = req.body["lastName"]
  const email: string  = req.body["email"]
  const password: string  = req.body["password"]

  crud.getUserByEmail(email).then(function (existingUserResult: Array<typeof User>) {
    if (existingUserResult.length > 0) {
      res.send(JSON.stringify({"error": "User already exists"}))
    } else {
      crud.createUser(firstName, lastName, email, password).then(function (newUser: typeof User) {
        res.send(JSON.stringify({
          "firstName" : newUser.firstName,
          "lastName": newUser.lastName,
          "email": newUser.email,
          "password": newUser.password,
        }))
      })

    }
  })

})


//Handle Login
app.post('/handle_login', (req:express.Request, res: express.Response) => {
  const userEmail: string = req.body["email"]
  const userPassword: string = req.body["password"]

  let users = crud.getUserByEmail(userEmail).then(function (users: Array<typeof User>) {
    if (users.length === 0 || users[0].password !== userPassword) {
      res.send(JSON.stringify({"error": "Incorrect Password or Username"}))
    } else {
      session["currentUser"] = users[0].userId
      res.send(JSON.stringify({userEmail: "email"})); 
    }
  });

})


//NewsAPI Route
app.get('/news_feed', (req:express.Request, res:express.Response) => {

  newsAPI.getHeadlines().then(function (apiResponse: INewsApiResponse) {
    console.log(apiResponse)
    res.send(JSON.stringify(apiResponse))
  })

})

// Create Saved Articles 
app.post('/save_articles', (req:express.Request, res:express.Response) => {
  const articleName: string =  req.body["articleName"]
  const articleAuthor:string = req.body["articleAuthor"]
  const articleTitle:string = req.body["articleTitle"]
  const articleImg:string = req.body["articleImg"]
  const articleDescription:string = req.body["articleDescription"]
  const articleUrl:string = req.body["articleUrl"]
  const articleContent:string = req.body["articleContent"]
  const userId:string = req.body["userId"]

  crud.createSavedArticles(articleName, articleAuthor, articleTitle, articleImg, articleDescription, articleUrl, articleContent, userId).then(function(savedArticles: typeof SavedArticles ) {
    res.send(JSON.stringify ({
      "articleName": savedArticles.articleName,
      "articleAuthor": savedArticles.articleAuthor,
      "articleTitle": savedArticles.articleTitle,
      "articleImg": savedArticles.articleImg,
      "articleDescription": savedArticles.articleDescription,
      "articleUrl": savedArticles.articleUrl,
      "articleContent": savedArticles.articleContent,

    }))
  })

})

//Display saved articles






app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
