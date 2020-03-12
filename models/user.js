const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const timeZone = require('../utils/timeZoneUtil');
const constants = require('../config/constants');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: constants.GENDERS },
  email: { type: String, required: true, unique: true },
  emailConfirmed: { type: Boolean, default: false },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  createdDate: { type: Date, default: timeZone() },
  lastUpdatedDate: { type: Date, default: timeZone() }
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign(
    {
       _id: this._id, 
       firstName: this.firstName, 
       lastName: this.lastName, 
       email: this.email
    }, 
    constants.JWT_KEY, 
    {expiresIn: constants.JWT_EXPIRY}
  );
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User; 