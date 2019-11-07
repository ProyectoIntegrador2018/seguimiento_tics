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
    AdminController.fetchAllRecords(function(response) {
        res.send(response);
    });
});


router.post('/store-questions', adminmw, function(req, res) {
    
});

module.exports = router;