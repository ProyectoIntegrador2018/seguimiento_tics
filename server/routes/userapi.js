const express = require("express");
const umw = require("../middleware/UserMiddleware");
const UserController = require("../controller/UserController");

const path = require("path");
const IncomingForm = require("formidable").IncomingForm;

const router = express.Router();

/**
 *  Route that fetches all the stored events
 * @implements {UserMiddleware} Makes sure that the admin is the one making the get request
 * @param {Object} req Contains nothing
 * @param {Object} res Response of get
 */
router.get("/all-events", umw, function(req, res) {
  UserController.fetchAllEventRecords(function(response) {
    res.send(response);
  });
});

/**
 *  Route for fetching the questions of an event
 * @implements {UserMiddleware} Middleware to make sure the user is the one making the request
 * @param {Object} req Request of get with the id of the event stored in its parameters
 * @param {Object} res Response of get
 */
router.get("/questions/:id", umw, function(req, res) {
  var event = req.params.id;
  UserController.fetchEventQuestions(event, function(questions) {
    res.send(questions);
  });
});

/**
 *  Route that fetches all the stored events
 * @implements {AdminMiddleware} Makes sure that the admin is the one making the get request
 * @param {Object} req Contains nothing
 * @param {Object} res Response of get
 */
router.get("/all-events", umw, function(req, res) {
  AdminController.fetchAllEventRecords(function(response) {
    res.send(response);
  });
});

/**
 * Route that fetches the CSV template of an event
 * @implements {UserMiddleware} Middleware to make sure the user is the one making the request
 * @param {Object} req Request of get with the id of the event stored in its parameters
 * @param {Object} res Response of get
 */
router.get("/csv-template/:id", function(req, res) {
  var event = req.params.id;
  UserController.createCSVTemplate(event, function() {
    const csvpath = path.join(__dirname, `../public/templates/${event}.csv`);
    res.download(csvpath);
  });
});

router.post("/upload-csv/:id", umw, function(req, res) {
  var form = new IncomingForm();
  var eventId = req.params.id;
  var storedFile;
  form.parse(req);
  form.on("fileBegin", function(field, file) {
    const filepath = path.join(__dirname, `../public/uploads/${file.name}`);
    file.path = filepath;
    storedFile = file;
  });
  form.on("end", function() {
    UserController.readCSVFile(storedFile, function(fileData) {
      UserController.bulkCSVStudentStorage(fileData, eventId, function(_) {
        UserController.fetchEventQuestions(eventId, function(eventQuestions) {
          if (eventQuestions <= 0) res.send({ success: true });
          UserController.bulkCSVAnswersStorage(
            fileData,
            eventQuestions,
            function(response) {
              res.send(response);
            }
          );
        });
      });
    });
  });
});

router.post("/store-student", umw, function(req, res) {
  const student = req.body;
  console.log(student);
  UserController.storeStudent(student, function(document) {
    res.send(document);
  });
});

router.post("/store-answer", umw, function(req, res) {
  let question = req.body.question_id;
  let text = req.body.text;
  let student = req.body.student_id;
  UserController.storeAnswer(question, text, student, function(document) {
    res.send(document);
  });
});

router.get("/students-data", function(req, res) {
  UserController.fetchAllStudents(function(students) {
    res.send(students);
  });
});

module.exports = router;
