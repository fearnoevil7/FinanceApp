console.log("********ROUTES******");

const { Router } = require('express');
const UsersController = require('../controllers/users.controller');


module.exports = (app) => {
    app.get('/api/users', UsersController.getAllUsers);
    app.get('/api/user/:id', UsersController.getUser, (req, res) => {res.send(req.params)});
    app.put('/api/user/:id', UsersController.updateUser, (req, res) => {res.send(req.params)});
    app.post('/api/users/create', UsersController.createUser);
    app.post('/api/login', UsersController.signIn);
    app.delete('/api/user/:id', UsersController.deleteUser, (req, res) => {res.send(req.params)});
};