const User = require('./../models/User');
const Event = require('./../models/Event');
const Question = require('./../models/Question');

var AdminController = {};

/**
 *  Function that creates and stores a new event in the database
 *  @param {String} name Name of the event
 *  @param {Date} start_date Date of the start of the event
 *  @param {Date} end_date Date of the end of the event
 *  @param {Function} callback Function to perform after record has (or not) been recorded
 */
AdminController.registerEvent = function(name, start_date, end_date, callback) {
    var event = new Event();
    event.name = name;
    event.start_date = start_date;
    event.end_date = end_date;
    event.save()
     .then(function(record){
         callback(record);
     })
     .catch(function(error){
         console.log(error);
     });
};

/**
 *  Function that returns an error if the provided Event name is not available (already exists)
 *  @param {String} name Name of the event
 *  @param {Function} callback Function to perform after record has (or not) been found
 */
AdminController.fetchEventAvailability = function(name, callback) {
    Event.findByName(name)
     .then(function(record){
         if(record) callback({error: true});
         callback();
     })
     .catch(function(error){
        console.log(error);
     });
};

/**
 *  Function that fetches all the Event records from the database
 *  @param {Function} callback Function to perform after the records were fetched
 */
AdminController.fetchAllEventRecords = function(callback) {
    Event.fetchAll()
     .then(function(records) {
         callback(records);
     })
     .catch(function(error) {
         console.log(error);
     });
}

/**
 * Function that stores all the questions corresponding to an event and checks that the questions havent been created before
 * @param {Array} questions Array of Strings that represent the questions
 * @param {String} event_id String of the event's id
 * @param {Function} callback Function to perform after the questions have been stored
 */
AdminController.storeQuestionsForEvent = function(questions, event_id, callback) {
    Question.findManyByText(questions)
     .then(function(repeatedQuestions) {
         var questionsToStore = fetchUniqueQuestionsFromQuestions(questions, repeatedQuestions);

         Question.insertMany(questionsToStore)
          .then(function(newlyStoredQuestions){
              var allQuestions = repeatedQuestions.concat(newlyStoredQuestions);
              var questionsId = recordsToIdArray(allQuestions);

              Event.update({ _id: event_id },{ $set: {questions: questionsId}}, callback);
          })
          .catch(function(error) {
              console.log(error);
          });
     })
     .catch(function(error) {
         console.log(error);
     });
}

/**
 * Function that fetches all the User records
 * @param {Object} callback Function to perform after the records were fetched
 */
AdminController.fetchAllUserRecords = function(callback) {
    User.fetchAll()
     .then(function(documents){
         callback(documents);
     })
     .catch(function(error){
         console.log(error);
     });
}

/**
 * Function that stores a new User
 * @param {String} email Email of the user
 * @param {String} password Password of the user
 * @param {Function} callback Function to perform after the record is stored
 */
AdminController.storeUser = function(email, password, callback) {
    var user = new User();
    user.email = email;
    user.password = password;

    user.save()
     .then(function(record) {
         callback(record);
     })
     .catch(function(error){
         console.log(error);
     });
}

/**
 * ************************************************************************
 *                              AUXILIAR FUNCTIONS
 * ************************************************************************
 */

/**
 * Function that removes the already existing questions with the questions corresponding to the event
 * Useful for when the user wants to register questions to an event that have been previously created for other event(s)
 * @param {Array} questions Array of Strings that represent the questions of the event
 * @param {Array} repeatedQuestions Array of Question object that represent the repeated questions that the user wants to store to the event
 * @return {Array} Array with all the unique questions
 */
fetchUniqueQuestionsFromQuestions = function(questions, repeatedQuestions) {
    var nonRepeatedQuestions = [];
    questions.forEach(function(question) {
        var isRepeated = false;
        for(var i = 0 ; i < repeatedQuestions.length ; i++) {
            if(repeatedQuestions[i].text == question) {
                isRepeated = true;
                break;
            }
        }
        if(!isRepeated) {
            var record = new Question();
            record.text = question;
            nonRepeatedQuestions.push(record);
        }
    });
    return nonRepeatedQuestions;
}

recordsToIdArray = function(records) {
    var ids = [];
    for(var i = 0; i < records.length; i++) {
        ids.push(records[i]._id);
    }
    return ids;
}

module.exports = AdminController;