const Admin = require('./../models/User');
const Event = require('./../models/Event');

var AdminController = {};

/**
 *  Function that creates and stores a new event in the database
 *  @param {String} name Name of the event
 *  @param {Date} start_date Date of the start of the event
 *  @param {Date} end_date Date of the end of the event
 *  @param {Function} callback Function to perform after record has (or not) been recorded
 */
AdminController.registerEvent = function(name, start_date, end_date, callback) {
    var event = new Event();
    event.name = name;
    event.start_date = start_date;
    event.end_date = end_date;
    event.save()
     .then(function(record){
         callback(record);
     })
     .catch(function(error){
         console.log(error);
     });
};

/**
 *  Function that returns an error if the provided name is not available (already exists)
 *  @param {String} name Name of the event
 *  @param {Function} callback Function to perform after record has (or not) been found
 */
AdminController.fetchEventAvailability = function(name, callback) {
    Event.findByName(name)
     .then(function(record){
         if(record) callback({error: true});
         callback();
     })
     .catch(function(error){
        console.log(error);
     });
};

AdminController.fetchAllRecords = function(callback) {
    Event.fetchAll()
     .then(function(records) {
         callback(records);
     })
     .catch(function(error) {
         console.log(error);
     });
}

module.exports = AdminController;