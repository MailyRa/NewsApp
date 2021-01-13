import express from 'express';
import { Model } from 'sequelize/types';
var session = require('express-session')
var crud = require('./db/crud');
import { SavedArticles, User,  } from './db/model';
var newsAPI = require('./newsapi')
import INewsApiResponse from 'ts-newsapi'

const bcrypt = require('bcrypt');
const saltRounds = 10;

var app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret : 'MySecret',
  resave : false,
  saveUninitialized : false,
}));

app.set('view engine', 'html');
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
      hashPassword(password, function(err: Error, hashedPassword: string) {
        crud.createUser(firstName, lastName, email, hashedPassword).then(function (newUser: typeof User) {
          session.currentUser = newUser.id;
          res.send(JSON.stringify({
            "firstName" : newUser.firstName,
            "lastName": newUser.lastName,
            "email": newUser.email,
            "password": newUser.password,
          }))
        })
      });
    }
  })

})

//Hash Password
function hashPassword(password: string, callback: (error: Error, hash: string) => void) {
  bcrypt.hash(password, saltRounds, function(err: Error, hash: string) {
    return callback(err, hash);
  });
}

//Validate Hash password
function isValidPassword(plainPassword: string, hashedPassword: string, callback: (error: Error, result: boolean) => void) {
  bcrypt.compare(plainPassword, hashedPassword, function(err: Error, result: boolean) {
    return callback(err, result);
  }); 
}


//Handle Login
app.post('/handle_login', (req: express.Request, res: express.Response) => {
  const userEmail: string = req.body["email"]
  const userPassword: string = req.body["password"]

  let users = crud.getUserByEmail(userEmail).then(function (users: Array<typeof User>) {
    if (users.length === 0) {
      res.send(JSON.stringify({"error": "Incorrect Password or Username"}))
    }
    
    isValidPassword(userPassword, users[0].password, function(err: Error, result: boolean) {
      if (result === true) {
        session.currentUser = users[0].id;
        res.send(JSON.stringify({"success": true})); 
      } else {
        res.send(JSON.stringify({"error": "Incorrect Password or Username"}))
      }
    })
  });

})



//NewsAPI Route
app.get('/news_feed', (req:express.Request, res:express.Response) => {

  newsAPI.getHeadlines().then(function (apiResponse: INewsApiResponse) {
    console.log(apiResponse)
    res.send(JSON.stringify(apiResponse))
  })

})



// Create Save Articles 
app.post('/save_article', (req:express.Request, res:express.Response) => {
  const articleAuthor:string = req.body["articleAuthor"]
  const articleTitle:string = req.body["articleTitle"]
  const articleImg:string = req.body["articleImg"]
  const articleDescription:string = req.body["articleDescription"]
  const articleUrl:string = req.body["articleUrl"]
  const articleContent:string = req.body["articleContent"]
  const userId:string = session.currentUser

  crud.createSavedArticle(
    articleAuthor, 
    articleTitle, 
    articleImg, 
    articleDescription, 
    articleUrl, 
    articleContent, 
    userId
  ).then(function(savedArticle: typeof SavedArticles) {
    res.send(JSON.stringify ({
      "success": true
    }))
  })

})



//Display saved articles
app.get('/user_saved_articles', (req:express.Request,res:express.Response) => {
  const currentUser = session.currentUser
  crud.getArticlesByUserId(currentUser).then(function(savedArticles: Array<typeof SavedArticles>) {
    var articlesJson = [];
    for(const savedArticle of savedArticles) {
      articlesJson.push({
        "author": savedArticle.articleAuthor,
        "title": savedArticle.articleTitle,
        "urlToImage": savedArticle.articleImg,
        "description": savedArticle.articleDescription,
        "url": savedArticle.articleUrl
      });
    }
    res.send(JSON.stringify({
      "articles": articlesJson
    }))
  })
})


//Handle logout 
app.post('/handle_logout', (req:express.Request, res: express.Response) => {
  session.currentUser = null;
  res.send(JSON.stringify({
    "success": true
  }))
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
