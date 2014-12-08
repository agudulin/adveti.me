var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var UserSchema = new Schema({
  role: String,
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
