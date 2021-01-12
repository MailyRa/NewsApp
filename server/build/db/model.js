"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedArticles = exports.Category = exports.User = void 0;
//Connecting to Database  
var _a = require('sequelize'), Sequelize = _a.Sequelize, DataTypes = _a.DataTypes;
var sequelize = new Sequelize('db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});
sequelize
    .authenticate()
    .then(function (err) {
    console.log(err);
    console.log('Connection has been established successfully.');
})
    .catch(function (err) {
    console.log(err);
    console.log('Unable to connect to the database:', err);
});
//User Table 
var User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING(64),
    }
}, {
    sequelize: sequelize,
    modelName: 'User'
});
exports.User = User;
User.sync({ alter: true });
console.log(User === sequelize.models.User);
//Category Table
var Category = sequelize.define('Category', {
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    modelName: 'Category'
});
exports.Category = Category;
Category.sync({ alter: true });
console.log(Category === sequelize.models.Category);
//Saved Articles
var SavedArticles = sequelize.define('SavedArticles', {
    articleAuthor: {
        type: DataTypes.STRING,
    },
    articleTitle: {
        type: DataTypes.STRING,
    },
    articleImg: {
        type: DataTypes.STRING,
    },
    articleDescription: {
        type: DataTypes.STRING,
    },
    articleUrl: {
        type: DataTypes.STRING,
    },
    articleContent: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize: sequelize,
    modelName: 'SavedArticles'
});
exports.SavedArticles = SavedArticles;
SavedArticles.sync({ alter: true });
console.log(SavedArticles === sequelize.models.SavedArticles);
