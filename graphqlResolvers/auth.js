const bcrypt = require('bcrypt');
const User = require('../models/user');
const VerificationToken = require('../models/verificationTokens');
const tokenController = require('../controllers/verificationTokenController');
const EmailSender = require('../controllers/emailController');

module.exports = {
  async login(args) {
    const { email, password } = args
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email address.');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password.');
    }

    if (!user.emailConfirmed) {
      throw new Error('User email address has not been confirmed');
    }

    if (!user.enabled) {
      throw new Error('User is disabled');
    }

    user.token = user.generateAuthToken();
    return user;
  },

  async changePassword(args, context) {
    const { currentPassword, newPassword } = args;
    let user = await User.findOne({ _id: context.user._id })
    if (!user) throw new Error('Invalid user Id');
    
    const validCurrentPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validCurrentPassword){ 
      throw new Error('Invalid Password');
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedNewPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(context.user._id, {
      password: encryptedNewPassword
    })

    return user;
  },

  async initiateResetPassword(args) {
    const { email } = args;
    let user = await User.findOne({ email });
    if (!user) throw new Error('Invalid user email address');

    await tokenController.createResetPasswordToken(user);

    return user;
  },

  async completeResetPassword(args) {
    const { token, email, newPassword } = args;
    let user = await User.findOne({ email });
    if (!user) throw new Error('Invalid user Id');

    const verificationToken = await VerificationToken.findOne({ token });
    if (!verificationToken) throw new Error('Invalid token');
    if (verificationToken.activated) throw new Error('Password has already been reset');
    if (Date.now() > verificationToken.expiryDate) throw new Error('Token has expired!');
    if (verificationToken.userId !== user._id) throw new Error('Invalid token');

    const salt = await bcrypt.genSalt(10);
    const encryptedNewPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: encryptedNewPassword
    });

    await VerificationToken.findOneAndUpdate({ token }, {
      activated: true
    }, { useFindAndModify: false });

    EmailSender.successfulPasswordReset(user);
    return user;
  },
}

