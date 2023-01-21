console.log("********CONTROLLERS******");

const { response, request } = require('express');
const Users = require('../models/users.model');


module.exports.getAllUsers = (request, response) => {
    Users.find({})
        .then(users => {
            console.log("Testing...", users);
            response.json(users);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getUser = (request, response) => {
    console.log("Params Test", request.params);
    Users.findOne({_id: request.params.id})
        .then(user => {
            console.log("User!!!", user);
            response.json(user);
        })
        .catch(err => console.log(err));
};

module.exports.createUser = (request, response) => {
    Users.create(request.body)
        .then(user => response.json({"message" : "User successfully created!!!!!  ", "New_User" : user}))
        .catch(err => response.json({"message" : "Error user could not be created!!!!"}));
};

module.exports.updateUser = (request, response) => {
    Users.findOne({_id: request.params.id})
        .then(user => {
            request.body.firstName ? user.firstName = request.body.firstName : "";
            request.body.lastName ? user.lastName = request.body.lastName : "" ;
            request.body.email ? user.email = request.body.email : "";
            request.body.password ? user.password = request.body.password : "";
            request.body.access_token ? user.access_token = request.body.access_token : null;
            user.save();
            response.json({"message" : "User successfully updated!", "user" : user});
        });
};

module.exports.deleteUser = (request, response) => {
    Users.deleteOne({_id: request.params.id})
        .then(response.json({"message" : "User successfully deleted!!!"}))
        .catch(response.json({"message" : "Error unable to delete user!!"}));
}

module.exports.signIn = (request, response) => {
    Users.find({email: request.body.email})
        .then(user => {
            console.log("Back end test", user, "Request body test", request.body.password, user[0].password, request.body.password === user[0].password);
            user[0].password == request.body.password ? response.json(user) : response.json({"errorMessage" : "Password is invalid."});
        })
        .catch(err => response.json(err));
};