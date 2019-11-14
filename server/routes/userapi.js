const express = require('express');
const UserController = require('../controller/UserController');

const router = express.Router();

/**
 *  Route for fetching the questions of an event
 * @param {Object} req Request of get with the id of the event stored in its parameters
 * @param {Object} res Response of get
 */
router.get('/questions/:id', function(req, res){
    var event = req.params.id;
    UserController.fetchEventQuestions(event, function(questions) {
        res.send(questions);
    });
})

module.exports = router;