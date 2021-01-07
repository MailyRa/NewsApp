
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    'db', 'root', 'password', 
    {
    host: 'localhost',
    dialect: 'mysql',
    },
);
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

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
