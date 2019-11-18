const User = require('../models/User');
const Event = require('../models/Event')
const Question = require('../models/Question');
const Student = require('../models/Student');
const Answer = require('../models/Answer');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
  student.curp = calculateCurp(studentInfo.last_name, studentInfo.second_last_name, studentInfo.name, studentInfo.birth_date, studentInfo.gender, studentInfo.birth_place);
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
  var questions = ['Nombre(s)', 'Apellido paterno', 'Apellido materno', 'Fecha de nacimiento', 'Lugar de nacimiento', 'Sexo', 'Email'];
  var response = [];

  questions.forEach(question => {
    response.push({
      _id: question,
      text: question
    })
  });

  return response;
}

calculateCurp = function (lastName, secondLastName, name, birthDate, gender, state, ) {
  const first = lastName[0];
  const second = getFirstVocal(lastName.substring(1, lastName.length - 1));
  const third = secondLastName[0];
  if (name.length > 4) {
    if (name.substring(0, 4) === 'Jose' || name.substring(0, 4) === 'jose' || name.substring(0, 4) === 'JOSE') {
      name = name.substring(5);
    }
  }
  const fourth = name[0];
  const fifth = birthDate.replace(/-/g, '').substring(2);
  console.log(gender);
  const sixth = gender.toUpperCase();
  const seventh = getStateCode(state);
  const eighth = getFirstInternalConsonant(lastName);
  const nineth = getFirstInternalConsonant(secondLastName);
  const tenth = getFirstInternalConsonant(name);
  return (first + second + third + fourth + fifth + sixth + seventh + eighth + nineth + tenth);
}
getFirstVocal = function (word) {
  let vocal;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
      vocal = word[i];
      break;
    }
  }
  return vocal;
}

getFirstInternalConsonant = function (word) {
  let consonant;
  for (let i = 1; i < word.length - 1; i++) {
    if (word[i] !== 'a' && word[i] !== 'e' && word[i] !== 'i' && word[i] !== 'o' && word[i] !== 'u') {
      consonant = word[i];
      break;
    }
  }
  return consonant;
}
getStateCode = function (state) {
  const states = {
    aguascalientes: '51',
    bajacalifornia: '52',
    bajacaliforniasur: '53',
    campeche: '54',
    coahuila: '55',
    colima: '56',
    chiapas: '57',
    chihuahua: '58',
    distritofederal: '59',
    durango: '60',
    guanajuato: '61',
    guerrero: '62',
    hidalgo: '63',
    jalisco: '64',
    estadodemexico: '65',
    michoacan: '66',
    morelos: '67',
    nayarit: '68',
    nuevoleon: '69',
    oaxaca: '70',
    puebla: '71',
    queretaro: '72',
    quintanaroo: '73',
    sanluispotosi: '74',
    sinaloa: '75',
    sonora: '76',
    tabasco: '77',
    tamaulipas: '78',
    tlaxcala: '79',
    veracruz: '80',
    yucatan: '81',
    zacatecas: '82'
  }
  let answer = states[state.replace(/ /g, '').toLowerCase()];
  if (answer === undefined)
    return '00';
  else return answer;
}
module.exports = UserController;
