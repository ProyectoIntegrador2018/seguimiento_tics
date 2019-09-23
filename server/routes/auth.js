const express = require('express');
const userController = require('../controller/UserController');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    userController.passwordLogin(email, password, function(response) {
        res.send(response);
    });
});

module.exports = router;