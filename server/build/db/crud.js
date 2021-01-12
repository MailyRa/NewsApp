"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSavedArticle = exports.getArticlesByUserId = exports.getUserByEmail = exports.createUser = void 0;
var model_1 = require("./model");
var model = require('./model');
//Create User function
function createUser(firstName, lastName, email, password) {
    return model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
}
exports.createUser = createUser;
//Get User by email function
function getUserByEmail(email) {
    return model_1.User.findAll({
        where: {
            email: email,
        },
        limit: 1
    });
}
exports.getUserByEmail = getUserByEmail;
//Create SavedArticles function 
function createSavedArticle(articleAuthor, articleTitle, articleImg, articleDescription, articleUrl, articleContent, userId) {
    return model_1.SavedArticles.create({
        articleAuthor: articleAuthor,
        articleTitle: articleTitle,
        articleImg: articleImg,
        articleDescription: articleDescription,
        articleContent: articleContent,
        articleUrl: articleUrl,
        userId: userId
    });
}
exports.createSavedArticle = createSavedArticle;
//Get articles by user id 
function getArticlesByUserId(userId) {
    return model_1.SavedArticles.findAll({
        where: {
            userId: userId,
        },
    });
}
exports.getArticlesByUserId = getArticlesByUserId;
