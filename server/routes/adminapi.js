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

module.exports = router;