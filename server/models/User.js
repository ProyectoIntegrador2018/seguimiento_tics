const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  },
  __v: {
    type: Number,
    select: false
  }
});

//     INSTANCE METHODS

/**
 * Generates the JWT token for the given user
 * @return {String} JWT token
 */
schema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, email: this.email, admin: this.admin },
    JWT_KEY
  );
};

/**
 * Unhashes the given password in a sync way
 * @param {String} password Password to unhash
 * @return {Boolean} True or false if the password matches
 */
schema.methods.unhashPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//      STATIC METHODS

/**
 * Hashes the given password in a sync way
 * @param {String} password Password to hash
 * @return {String} Hashed password
 */
schema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//      STATIC METHODS FOR QUERIES

/**
 * Fetches the record that contains the given email
 * @param {String} email Email of record to search
 * @return {Promise} Promise that contains all the data related to that record
 */
schema.statics.findByEmail = function(email) {
  return this.findOne({ email: email }).exec();
};

module.exports = mongoose.model("User", schema);
