const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    second_last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    birth_place: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    curp: {
        type: String,
        required: true
    },
    email: { type: String },
    event: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    answers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
});

module.exports = mongoose.model('Student', schema);