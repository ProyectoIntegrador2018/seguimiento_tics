const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    questions: [{
        type: String
    }]
});

//      STATIC METHODS FOR QUERIES

/**
 * Fetches the record that contains the given email
 * @param {String} name Name of record to search
 * @return {Promise} Promise that contains all the data related to that record
 */
schema.statics.findByName = function(name) {
    return this.findOne({ name: name }).exec();
};

/**
 * Fetches all stored records
 * @return {Promise} Promise that cointains every record stored in the database
 */
schema.statics.fetchAll = function() {
    return this.find().exec();
};

module.exports = mongoose.model('Event', schema);