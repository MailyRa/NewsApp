import { Model, Sequelize } from "sequelize/types";
import { User, SavedArticles } from "./model";

var model = require('./model');


//Create User function
function createUser(firstName: string, lastName: string, email: string, hashedPassword: string) {
    return model.User.create({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword })
}

//Get User by email function
function getUserByEmail(email: string)  {
    return User.findAll({
        where: {
            email: email,
        },
        limit: 1
    });
}

//Create SavedArticles function 
function createSavedArticle(articleAuthor:string, articleTitle: string, articleImg: string, articleDescription: string, articleUrl: string, articleContent:string, userId: number) {
    return SavedArticles.create({
        articleAuthor: articleAuthor, 
        articleTitle: articleTitle, 
        articleImg: articleImg, 
        articleDescription: articleDescription, 
        articleContent: articleContent,
        articleUrl: articleUrl, 
        userId: userId
    })
}


//Get articles by user id 
function getArticlesByUserId(userId: number) {
    return SavedArticles.findAll({
        where: {
            userId: userId,
        },
    }); 
}



export {
    createUser,
    getUserByEmail,
    getArticlesByUserId,
    createSavedArticle
}

