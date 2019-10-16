const User = require("../models/User");

var UserController = {};

/**
 *  Function that performs a password login by finding the record by it's email
 *  and validating that the password matches the record
 *  @param {String} email Email of the record to look
 *  @param {String} password Password of the record
 *  @param {Function} callback Function to perform after record has (or not) been found
 */
UserController.passwordLogin = function(email, password, callback) {
  User.findByEmail(email).then(function(record) {
    if (!record || !record.unhashPassword(password)) {
      var authError = {
        error: true,
        message: "Contraseña y/o correo incorrecto"
      };
      callback(authError);
    }
    var token = record.generateAuthToken();
    var user = record.toJSON();
    user.token = token;
    delete user.password;

    callback(user);
  });
};

module.exports = UserController;
