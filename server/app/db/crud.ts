import { Model, Sequelize } from "sequelize/types";
import { User } from "./model";

var model = require('./model');


//Create User function
function createUser(firstName: string, lastName: string, email: string, password: string) {
    return model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password })
}

function getUserByEmail(email: string)  {
    return User.findAll({
        where: {
            email: email,
        },
        limit: 1
    });
}



export {
    createUser,
    getUserByEmail
}

