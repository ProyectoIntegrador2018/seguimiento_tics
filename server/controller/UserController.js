const User = require('../models/User');
const Event = require('../models/Event')
const Question = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const parser = require('csv-parser');

var UserController = {};

/**
 *  Function that performs a password login by finding the record by it's email
 *  and validating that the password matches the record
 *  @param {String} email Email of the record to look
 *  @param {String} password Password of the record
 *  @param {Function} callback Function to perform after record has (or not) been found
 */

UserController.passwordLogin = function (email, password, callback) {
  User.findByEmail(email).then(function (record) {
    if (!record || !record.unhashPassword(password)) {
      var authError = {
        error: true,
        message: "Contraseña y/o correo incorrecto"
      };
      callback(authError);
    }
    else {
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
UserController.fetchAllEventRecords = function (callback) {
  Event.fetchAll()
    .then(function (records) {
      callback(records);
    })
    .catch(function (error) {
      console.log(error);
    });
}


/**
 *  Function that fetches the Questions records corresponding to an event given its id
 *  @param {String} eventId Id corresponding to the event whose questions we are trying to fetch
 *  @param {Function} callback Function to perform after records have been fetched
 */
UserController.fetchEventQuestions = function (eventId, callback) {
  Event.fetchQuestions(eventId)
    .then(function (eventDocuments) {
      var questionsIds = eventDocuments[0].questions;
      Question.findManyInIds(questionsIds)
        .then(function (questionsDocuments) {
          callback(questionsDocuments);
        })
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 *  Function that creates a CSV template with the required, and non required, questions of an event
 *  @param {String} eventId Id corresponding to the event whose template we are trying to create
 *  @param {Function} callback Function to perform after the template has been created
 */
UserController.createCSVTemplate = function (eventId, callback) {
  this.fetchEventQuestions(eventId, function (questions) {
    const storagePath = `./server/public/templates/${eventId}.csv`;
    var csvHeaders = [];
    questions = fetchRequiredQuestions().concat(questions);

    questions.forEach(question => {
      csvHeaders.push({
        id: question._id,
        title: question.text
      });
    });

    const csvwriter = createCsvWriter({
      path: storagePath,
      header: csvHeaders
    });

    csvwriter
      .writeRecords([])
      .then(function () {
        console.log('CSV file written successfully');
        callback();
      })
      .catch(function (error) {
        console.log('ERROR with CSV file write');
        console.log(error);
      })

  })
};

UserController.readCSVFile = function (file, eventId, callback) {
  var path = file.path;
  var csvData = [];
  fs.createReadStream(path)
   .pipe(parser())
   .on('data', function(row) {
     csvData.push(row);
   })
   .on('end', () => {
    this.bulkCSVStorage(csvData, eventId, callback);
  });
}

UserController.bulkCSVStorage = function(fileData, eventId, callback) {
  var students = [];
  var requiredQuestions = fetchRequiredQuestions();
  fileData.forEach(function(row) {
    var student = new Student();
    student.name = row[requiredQuestions[0].text];
    student.last_name = row[requiredQuestions[1].text];
    student.second_last_name = row[requiredQuestions[2].text];
    student.birth_date = row[requiredQuestions[3].text];
    student.birth_place = row[requiredQuestions[4].text];
    student.gender = row[requiredQuestions[5].text];
    student.email = row[requiredQuestions[6].text];
    student.curp = student.generateCURP();
    student.event = eventId;

    students.push(student);
  });

  Student.insertMany(students)
   .then(function(documents) {
     console.log(documents);
   })
   .catch(function(error){
     console.log(error);
   });
}

/**
 *  Function that fetches all the Event records from the database
 *  @param {Function} callback Function to perform after the records were fetched
 */
UserController.fetchAllEventRecords = function (callback) {
  Event.fetchAll()
    .then(function (records) {
      callback(records);
    })
    .catch(function (error) {
      console.log(error);
    });
}

UserController.storeStudent = function (studentInfo, callback) {
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

  student.save()
    .then(function (record) {
      callback(record);
    })
    .catch(function (error) {
      console.log(error);
    });
}

UserController.storeAnswer = function (questionId, text, studentId, callback) {
  answer = new Answer();
  answer.text = text;
  answer.question_id = questionId;
  answer.student_id = studentId;
  answer.save()
    .then(function (record) {
      callback(record);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * ************************************************************************
 *                              AUXILIAR FUNCTIONS
 * ************************************************************************
 */

/**
 * Function that creates an array, similar to a Question object, with all the required questions
 */
fetchRequiredQuestions = function () {
  var questions = ['Nombre(s)', 'Apellido paterno', 'Apellido materno', 'Fecha de nacimiento', 'Lugar de nacimiento', 'Sexo ', 'Email '];
  var response = [];

  questions.forEach(question => {
    response.push({
      _id: question,
      text: question
    })
  });

  return response;
}

module.exports = UserController;
