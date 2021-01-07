"use strict";
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
User.sync({ alter: true });
console.log(User === sequelize.models.User);
