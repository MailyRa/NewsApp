//Connecting to Database  
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    'db', 'root', 'password', 
    {
    host: 'localhost',
    dialect: 'mysql',
    },
)
sequelize
  .authenticate()
  .then(function(err: Error) {
    console.log(err)
    console.log('Connection has been established successfully.');
  })
  .catch(function (err: Error) {
    console.log(err)
    console.log('Unable to connect to the database:', err);
  });

//User Table 
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING(64),
    }
}, {
    sequelize,
    modelName: 'User'
});
User.sync({ alter: true })
console.log(User === sequelize.models.User);

//Category Table
const Category = sequelize.define('Category', {
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Category'
});
Category.sync({alter: true});
console.log(Category === sequelize.models.Category);

//Saved Articles
const SavedArticles = sequelize.define('SavedArticles', {
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
    sequelize,
    modelName: 'SavedArticles'
});
SavedArticles.sync({ alter: true });
console.log(SavedArticles === sequelize.models.SavedArticles);

export {
    User,
    Category,
    SavedArticles
}