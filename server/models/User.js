const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

schema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, email: this.email, admin: this.admin}, JWT_KEY);
}

//      STATIC FUNCTIONS FOR QUERIES

/**
 * Fetches the record that contains the given email
 * @param {String} email Email of record to search
 * @return {Promise} Promise that contains all the data related to that record
 */
schema.statics.findByEmail = function(email) {
    return this.findOne({ email: email }).exec();
}

module.exports = mongoose.model('User', schema);