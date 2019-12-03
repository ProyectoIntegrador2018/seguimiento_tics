const User = require("./../models/User");
const Event = require("./../models/Event");
const Question = require("./../models/Question");
const required_questions = require("./../constants/required");

var AdminController = {};

/**
 *  Function that creates and stores a new event in the database
 *  @param {String} name Name of the event
 *  @param {Date} start_date Date of the start of the event
 *  @param {Date} end_date Date of the end of the event
 *  @param {Function} callback Function to perform after record has (or not) been recorded
 */
AdminController.registerEvent = function(name, edition, start_date, end_date, callback) {
  Question.findManyByText(required_questions)
    .then(function(documents) {
      let event = new Event();
      event.name = `${name} ${edition}`;
      event.start_date = start_date;
      event.end_date = end_date;
      event.questions = recordsToIdArray(documents);
      
      event
      .save()
      .then(function(record) {
        callback(record);
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
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
    .then(function(record) {
      if (record) callback({ error: true });
      callback();
    })
    .catch(function(error) {
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
};

/**
 * Function that stores all the questions corresponding to an event and checks that the questions havent been created before
 * @param {Array} questions Array of Strings that represent the questions
 * @param {String} event_id String of the event's id
 * @param {Function} callback Function to perform after the questions have been stored
 */
AdminController.storeQuestionsForEvent = function(questions, event_id, callback) {
  questions = cleanQuestionsTxt(questions);

  Question.findManyByText(questions)
    .then(function(repeatedQuestions) {
      var questionsToStore = fetchUniqueQuestionsFromQuestions(questions,repeatedQuestions);

      Question.insertMany(questionsToStore)
        .then(function(newlyStoredQuestions) {
          var allQuestions = repeatedQuestions.concat(newlyStoredQuestions);
          var questionsId = recordsToIdArray(allQuestions);

          Event.findById(event_id)
           .then(function(curr_event) {
             let event_q = curr_event.questions;
             event_q = event_q.concat(questionsId);

             Event.update(
              { _id: event_id },
              { $set: { questions: event_q } },
              callback
            );
           })
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * Function that fetches all the User records
 * @param {Object} callback Function to perform after the records were fetched
 */
AdminController.fetchAllUserRecords = function(callback) {
  User.fetchAll()
    .then(function(documents) {
      callback(documents);
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * Function that stores a new User
 * @param {String} email Email of the user
 * @param {String} password Password of the user
 * @param {Function} callback Function to perform after the record is stored
 */
AdminController.storeUser = function(email, password, callback) {
  var user = new User();
  user.email = email;
  user.password = User.hashPassword(password);
  console.log(user.password);
  user
    .save()
    .then(function(record) {
      callback(record);
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 *  Function that fetches the Questions records corresponding to an event given its id
 *  @param {String} eventId Id corresponding to the event whose questions we are trying to fetch
 *  @param {Function} callback Function to perform after records have been fetched
 */
AdminController.fetchEventQuestions = function(eventId, callback) {
  Event.fetchQuestions(eventId)
    .then(function(eventDocuments) {
      var questionsIds = eventDocuments[0].questions;
      Question.findManyInIds(questionsIds).then(function(questionsDocuments) {
        callback(questionsDocuments);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 *  Function that returns whether a user exists or not
 *  @param {String} email Email corresponding to the user to search
 *  @param {Function} callback Function to perform after record has been fetched
 */
AdminController.fetchUser = function(email, callback) {
  User.findByEmail(email)
   .then(function(document){
     let response = { wasFound: document ? true : false};
     callback(response);
   })
   .catch(function(error) {
     console.log(error);
   });
};

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
    for (var i = 0; i < repeatedQuestions.length; i++) {
      if (repeatedQuestions[i].text == question) {
        isRepeated = true;
        break;
      }
    }
    if (!isRepeated) {
      var record = new Question();
      record.text = question;
      nonRepeatedQuestions.push(record);
    }
  });
  return nonRepeatedQuestions;
};

recordsToIdArray = function(records) {
  var ids = [];
  for (var i = 0; i < records.length; i++) {
    ids.push(records[i]._id);
  }
  return ids;
};


/**
 * Function that removes all special characters from the string, this is due to csv write problem
 * @param {Array} questions Array of Strings with questions to store
 */
cleanQuestionsTxt = function(questions) {
  for(let i = 0; i < questions.length; i++) {
    questions[i] = questions[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    questions[i] = questions[i].replace(/[^\w\s]/gi,'');
  }
  return questions;
}

module.exports = AdminController;
