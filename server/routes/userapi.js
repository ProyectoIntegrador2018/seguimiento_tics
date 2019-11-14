const express = require('express');
const umw = require('../middleware/UserMiddleware');
const UserController = require('../controller/UserController');

const path = require("path");
const router = express.Router();

/**
 *  Route for fetching the questions of an event
 * @implements {UserMiddleware} Middleware to make sure the user is the one making the request
 * @param {Object} req Request of get with the id of the event stored in its parameters
 * @param {Object} res Response of get
 */
router.get('/questions/:id', umw, function(req, res) {
    var event = req.params.id;
    UserController.fetchEventQuestions(event, function(questions) {
        res.send(questions);
    });
});

/**
 * Route that fetches the CSV template of an event
 * @implements {UserMiddleware} Middleware to make sure the user is the one making the request
 * @param {Object} req Request of get with the id of the event stored in its parameters
 * @param {Object} res Response of get
 */
router.get('/csv-template/:id', umw, function(req, res) {
    var event = req.params.id;
    UserController.createCSVTemplate(event, function() {
        const csvpath = path.join(__dirname, `../public/templates/${event}.csv`);
        res.sendFile(csvpath);
    });
});

module.exports = router;