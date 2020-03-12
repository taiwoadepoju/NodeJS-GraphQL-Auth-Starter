const mongoose = require('mongoose');
const timeZone = require('../utils/timeZoneUtil');
const moment = require('moment');

const VerificationToken = mongoose.model('VerificationToken', new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
  expiryDate: { type: Date, default: moment(timeZone()).add(24, 'hours') },
  activated: { type: Boolean, required: true, default: false },
  expired: { type: Boolean, default: false },
  lastUpdatedDate: { type: Date, default: timeZone() }
}));

module.exports = VerificationToken;
