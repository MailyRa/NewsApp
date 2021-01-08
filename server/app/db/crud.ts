import { Model } from "sequelize/types";
import { User } from "./model";

var model = require('./model');


//Create User function
function createUser(firstName: string, lastName: string, email: string, password: string) {
    const user = model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
    console.log("User's auto-generated ID", user.id )
}

function getUserByEmail(email: string) {
    return User.findAll({
        where: {
            email: email,
            
        },
        limit: 1
    }) 
    
}



export {
    createUser
}

