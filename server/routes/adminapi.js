const express = require('express');
const adminmw = require('../middleware/AdminMiddleware');
const AdminController = require('../controller/AdminController');

const router = express.Router();

/**
 *  Route for registering an event
 * @implements {AdminMiddleware} Makes sure that the admin is the one making the post
 * @param {Object} req Request of post with email and password in body
 * @param {Object} res Response of post
 */
router.post('/register-event', adminmw, function(req, res) {
    var name = req.body.name;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    AdminController.registerEvent(name, start_date, end_date, function(response){
        res.send(response);
    });
});

/**
 *  Route for checking if the name of an event is available
 * @implements {AdminMiddleware} Makes sure that the admin is the one making the post request
 * @param {Object} req Request of post with name of event in the body
 * @param {Object} res Response of post
 */
router.post('/availability-event', adminmw, function(req, res) {
    var name = req.body.name;
    AdminController.fetchEventAvailability(name, function(response) {
        res.send(response);
    });
});

/**
 *  Route that fetches all the stored events
 * @implements {AdminMiddleware} Makes sure that the admin is the one making the get request
 * @param {Object} req Contains nothing
 * @param {Object} res Response of get
 */
router.get('/all-events', adminmw, function(req, res) {
    AdminController.fetchAllEventRecords(function(response) {
        res.send(response);
    });
});

/**
 *  Route that stores all given questions to an event given its id
 * @implements {AdminMiddleware} Makes sure that the admin is the one making the get request
 * @param {Object} req Contains an array of questions and an event id
 * @param {Object} res Sends a success if everything went smoothly
 */
router.post('/store-questions', adminmw, function(req, res) {
    var questions = req.body.event_questions;
    var event = req.body.event_id;
    AdminController.storeQuestionsForEvent(questions, event, function(error, documents){
        if(!error) res.send({ succes:true });
    });
});

/**
 *  Route that fetches all the users
 * @param {Object} req Contains nothing
 * @param {Object} res Response of get
 */
router.get('/all-users', adminmw, function(req, res) {
    AdminController.fetchAllUserRecords(function(documents){
        res.send(documents);
    });
});

/**
 *  Route that fetches a user by its email
 * @param {Object} req Contains email
 * @param {Object} res Response of get
 */
router.get('/find-user', adminmw, function(req, res) {
    let email = req.body.email;
    AdminController.fetchUser(email, function(response) {
        res.send(response);
    });
});

/**
 *  Route that stores a user
 * @param {Object} req Contains the email and the password of the user to store
 * @param {Object} res Response of post
 */
router.post('/store-user', adminmw, function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    AdminController.storeUser(email, password, function(document){
        res.send(document);
    });
});

/**
 *  Route for fetching the questions of an event
 * @implements {AdminMiddleware} Middleware to make sure the user is the one making the request
 * @param {Object} req Request of get with the id of the event stored in its parameters
 * @param {Object} res Response of get
 */
router.get('/questions/:id', adminmw, function(req, res) {
    var event = req.params.id;
    AdminController.fetchEventQuestions(event, function(questions) {
        res.send(questions);
    });
});

module.exports = router;