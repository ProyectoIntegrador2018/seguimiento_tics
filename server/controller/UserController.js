const User = require("../models/User");
const Event = require("../models/Event");
const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");
const required_questions = require("../constants/required");

const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const parser = require("csv-parser");

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
    } else {
      var token = record.generateAuthToken();
      var user = record.toJSON();
      user.token = token;
      delete user.password;
      callback(user);
    }
  });
};

/**
 *  Function that fetches all the Event records from the database
 *  @param {Function} callback Function to perform after the records were fetched
 */
UserController.fetchAllEventRecords = function(callback) {
  Event.fetchAll()
    .then(function(records) {
      callback(records);
    })
    .catch(function(error) {
      console.log(error);
    });
};

UserController.fetchNonRequiredEventQuestions = function(eventId, callback) {
  Event.fetchQuestions(eventId)
   .then(function(documents) {
      var questionsIds = documents[0].questions;
      Question.findManyInIdsNotRequired(questionsIds, required_questions).then(function(questionsDocuments) {
        callback(questionsDocuments);
      });
   })
};

/**
 *  Function that fetches the Questions records corresponding to an event given its id
 *  @param {String} eventId Id corresponding to the event whose questions we are trying to fetch
 *  @param {Function} callback Function to perform after records have been fetched
 */
UserController.fetchEventQuestions = function(eventId, callback) {
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
 *  Function that creates a CSV template with the required, and non required, questions of an event
 *  @param {String} eventId Id corresponding to the event whose template we are trying to create
 *  @param {Function} callback Function to perform after the template has been created
 */
UserController.createCSVTemplate = function(eventId, callback) {
  this.fetchEventQuestions(eventId, function(questions) {
    const storagePath = path.join(__dirname,'../','public','templates',`${eventId}.csv`);//`./server/public/templates/${eventId}.csv`;
    var csvHeaders = [];
    questions = fetchRequiredQuestions(false).concat(questions);

    questions.forEach(question => {
      csvHeaders.push({
        id: question._id,
        title: question.text
      });
    });

    const csvwriter = createCsvWriter({
      path: storagePath,
      header: csvHeaders,
    });

    csvwriter
      .writeRecords([])
      .then(function() {
        console.log("CSV file written successfully");
        callback();
      })
      .catch(function(error) {
        console.log("ERROR with CSV file write");
        console.log(error);
      });
  });
};

/**
 *  Function that reads a CVS file given the file itself
 *  @param {File} file File object obtained from the frontend
 *  @param {Function} callback Function to perform after the array of objects from the CVS file has been read
 */
UserController.readCSVFile = function(file, callback) {
  var path = file.path;
  var csvData = [];
  fs.createReadStream(path)
    .pipe(parser())
    .on("data", function(row) {
      csvData.push(row);
    })
    .on("end", () => {
      callback(csvData);
    });
};

/**
 *  Function that stores in bulk each row corresponding to a student, student is composed by the required questions
 *  @param {Array} fileData Array of Objects with each item representing each row in the csv and each object attribute corresponding to each csv column
 *  @param {String} eventId Id of the event whose records are being stored
 *  @param {Function} callback Function to perform after the objects have been inserted
 */
UserController.bulkCSVStudentStorage = function(fileData, eventId, callback) {
  var students = [];
  var requiredQuestions = fetchRequiredQuestions(false);
  fileData.forEach(function(row) {
    var student = buildUserFromCSVRow(row, requiredQuestions);
    student.event = eventId;
    students.push(student);
  });

  Student.insertMany(students)
    .then(function(documents) {
      callback(documents);
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 *  Function that stores in bulk the answers of each question from each student
 *  @param {Array} fileData Array of Objects with each item representing each row in the csv and each object attribute corresponding to each csv column
 *  @param {Array} questions Questions corresponding to the event
 *  @param {Function} callback Function to perform after the objects have been inserted
 */
UserController.bulkCSVAnswersStorage = async function(fileData, questions, callback) {
  var answers = [];
  var required = fetchRequiredQuestions(true);

  for (const row of fileData) {
    var student = buildUserFromCSVRow(row, required);
    const studentRecord = await Student.findByCURP(student.curp);

    questions.forEach(function(eventQuestion) {
      if(!row[eventQuestion.text]) return;
      var answertxt = row[eventQuestion.text];
      var answer = new Answer();
      answer.text = answertxt;
      answer.question_id = eventQuestion._id;
      answer.student_id = studentRecord._id;

      answers.push(answer);
    });
  }

  Answer.insertMany(answers)
    .then(function(documents) {
      callback({ success: true });
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 *  Function that fetches all the Event records from the database
 *  @param {Function} callback Function to perform after the records were fetched
 */
UserController.fetchAllEventRecords = function(callback) {
  Event.fetchAll()
    .then(function(records) {
      callback(records);
    })
    .catch(function(error) {
      console.log(error);
    });
};

UserController.fetchAllStudents = function(callback) {
  Student.find({})
    .then(function(documents) {
      callback(documents);
    })
    .catch(function(error) {
      console.log(error);
    });
};

UserController.fetchStudentsAnswers = function(students, callback) {
  console.log(students);
};

UserController.storeStudent = function(studentInfo, callback) {
  let student = new Student();
  student.name = studentInfo.name;
  student.last_name = studentInfo.last_name;
  student.second_last_name = studentInfo.second_last_name;
  student.birth_date = studentInfo.birth_date;
  student.birth_place = studentInfo.birth_place;
  student.gender = studentInfo.gender;
  student.curp = student.generateCURP();
  student.email = studentInfo.email;
  student.event = studentInfo.event;

  student
    .save()
    .then(function(record) {
      callback(record);
    })
    .catch(function(error) {
      console.log(error);
    });
};

UserController.storeAnswer = function(questionId, text, studentId, callback) {
  answer = new Answer();
  answer.text = text;
  answer.question_id = questionId;
  answer.student_id = studentId;
  answer
    .save()
    .then(function(record) {
      callback(record);
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
 * Function that creates an array, similar to a Question object, with all the required questions
 */
fetchRequiredQuestions = function(required) {
  var questions = [
    "Nombre(s)",
    "Apellido paterno",
    "Apellido materno",
    "Fecha de nacimiento",
    "Lugar de nacimiento",
    "Sexo ",
    "Email "
  ];
  if(required)questions = questions.concat(required_questions);
  var response = [];

  questions.forEach(question => {
    response.push({
      _id: question,
      text: question
    });
  });

  return response;
};

buildUserFromCSVRow = function(row, requiredQuestions) {
  var student = new Student();

  student.name = row[requiredQuestions[0].text] ? row[requiredQuestions[0].text]: "";
  student.last_name = row[requiredQuestions[1].text] ? row[requiredQuestions[1].text] : "";
  student.second_last_name = row[requiredQuestions[2].text] ? row[requiredQuestions[2].text]: "";
  student.birth_date = row[requiredQuestions[3].text] ? row[requiredQuestions[3].text]: "";
  student.birth_place = row[requiredQuestions[4].text] ? row[requiredQuestions[4].text]: "";
  student.gender = row[requiredQuestions[5].text] ? row[requiredQuestions[5].text]: "";
  student.email = row[requiredQuestions[6].text] ? row[requiredQuestions[6].text]: "";
  student.curp = student.generateCURP();

  return student;
};

module.exports = UserController;
