const User = require('../models/User');

var UserController = {};

UserController.passwordLogin = function(email, password, callback) {
    User.findByEmail(email)
     .then(function(record) {
         if(!record || !record.unhashPassword(password)) {
             var authError = { error: true, message: 'Contraseña y/o correo incorrecto' };
             callback(authError);
         }
         var token = record.generateAuthToken();
         var user = record.toJSON();
         user.token = token;
         delete user.password;
         
         callback(user);
     });
}

module.exports = UserController;