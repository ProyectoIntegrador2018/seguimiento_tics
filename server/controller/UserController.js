const User = require('../models/User');
const Event = require('../models/Event')
const Question = require('../models/Question');

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

/**
 *  Function that fetches the Questions records corresponding to an event given its id
 *  @param {String} eventId Id corresponding to the event whose questions we are trying to fetch
 *  @param {Function} callback Function to perform after records have been fetched
 */
UserController.fetchEventQuestions = function(eventId, callback) {
  console.log(typeof(eventId));
  Event.fetchQuestions(eventId)
   .then(function(eventDocuments) {
    var questionsIds = eventDocuments[0].questions;
     Question.findManyInIds(questionsIds)
      .then(function(questionsDocuments) {
        callback(questionsDocuments);
      })
   })
   .catch(function(error) {
     console.log(error);
   });
}

module.exports = UserController;
