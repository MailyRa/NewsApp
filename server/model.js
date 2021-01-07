


const { Sequelize } = require('sequelize');
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