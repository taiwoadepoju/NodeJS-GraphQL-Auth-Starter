const VerificationToken = require('../models/verificationTokens');
const timeZone = require('../utils/timeZoneUtil');
const EmailSender = require('./emailController');
const randomize = require('randomatic');

module.exports = {
  async createToken(user) {
   let verificationToken = new VerificationToken({
     userId: user._id,
     lastUpdatedDate: timeZone(),
     token: randomize('0', 6)
   })
   await verificationToken.save()
   EmailSender.newUser(user, verificationToken.token);
  },

  async createResetPasswordToken(user) {
    let verificationToken = new VerificationToken({
      userId: user._id,
      lastUpdatedDate: timeZone(),
      token: randomize('0', 6)
    })
    await verificationToken.save()
    EmailSender.resetPasswordToken(user, verificationToken.token);
   }

}

