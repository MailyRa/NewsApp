var model = require('./model');


//Create User function
function createUser(firstName: string, lastName: string, email: string, password: string) {
    const user = model.User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
    console.log("User's auto-generated ID", user.id )
}

export {
    createUser
}

