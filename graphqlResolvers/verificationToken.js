const VerificationToken = require('../models/verificationTokens');
const User = require('../models/user');
const timeZone = require('../utils/timeZoneUtil');
const moment = require('moment');
const EmailSender = require('../controllers/emailController');
const randomize = require('randomatic');

module.exports = {
  async updateToken(args) {
    const { token } = args;
    const verificationToken = await VerificationToken.findOneAndUpdate({ token }, {
      lastUpdatedDate: timeZone(),
      token: randomize('0', 6),
      expiryDate: moment(timeZone()).add(24, 'hours')
    }, {new: true})

    if(!verificationToken) return res.status(404).send('Token does not exist!')

    const user = await User.findOne({ _id: verificationToken.userId })
    if(!user) throw new Error('User not found')
    
    EmailSender.resendToken(user, verificationToken.token)
    return;
   },

   async confirmToken(args) {
     const { token } = args;
     const verificationToken = await VerificationToken.findOne({ token })
     if(!verificationToken) throw new Error('Invalid Token');

     if(verificationToken.activated) throw new Error('Email has been activated!');

     if(Date.now() > verificationToken.expiryDate) throw new Error('Token has expired!');

     const user = await User.findByIdAndUpdate(verificationToken.userId, {
       enabled: true,
       emailConfirmed: true
     })

     await VerificationToken.findOneAndUpdate({ token }, {
      activated: true
     })

     EmailSender.activatedUser(user)
     return;
   }

}

