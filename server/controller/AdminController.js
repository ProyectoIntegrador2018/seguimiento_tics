const Admin = require('./../models/User');
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
AdminController.fetchAllRecords = function(callback) {
    Event.fetchAll()
     .then(function(records) {
         callback(records);
     })
     .catch(function(error) {
         console.log(error);
     });
}

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
 * ************************************************************************
 *                              AUXILIAR FUNCTIONS
 * ************************************************************************
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