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

module.exports = mongoose.model('Event', schema);