const User = require('../models/User');

var UserController = {};

UserController.passwordLogin = function(email, password) {
    User.findByEmail(email)
     .then(function(record) {
         console.log(record);
     });
}

module.exports = UserController;