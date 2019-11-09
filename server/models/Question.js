const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    text: {
        type: String,
        unique: true,
        required: true
    }
});

/**
 * Fetches all records whose text already exists in a given array
 * @param {Array} questions Array with all the questions to look up for existance
 * @return {Promise} Promise that cointains every record stored in the database
 */
schema.statics.findManyByText = function(questions) {
    return this.find({ 'text': { '$in': questions } }).exec();
};

module.exports = mongoose.model('Question', schema);