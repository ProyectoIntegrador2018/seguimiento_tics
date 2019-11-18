const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
});

module.exports = mongoose.model('Answer', schema);