// const config = require('../config/constants');
// const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
// sgMail.setApiKey(config.SENDGRID_API_KEY);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

function sendEmail(message) {
  transporter.sendMail(message, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports = {
  newUser(user, token) {
    const message = {
      to: user.email,
      from: `noreply@nodejsgraphqlstarter.com`,
      subject: 'NodeJs GraphQL Starter App: Confirm your email address',
      html: `
        <h2>Hello ${user.firstName},</h2>
        <p>Your account has been created on the NodeJs GraphQL Starter App. Please use the code below to activate your account</p>
        <h6>
          ${token}
        </h6>
        <p>Cheers.</p>
      `
    }
    sendEmail(message);
  },

  activatedUser(user) {
    const message = {
      to: user.email,
      from: `noreply@nodejsgraphqlstarter.com`,
      subject: 'NodeJs GraphQL Starter App: Activation Successful',
      html: `
        <h2>Hello ${user.firstName},</h2>
        <p>Your account has been activated on the NodeJs GraphQL Starter App.</p>
        <p>Please contact our support team if you have any enquiries</p>
        <p>Cheers!</p>
      `
    }
    sendEmail(message);
  },

  resendToken(user, token) {
    const message = {
      to: user.email,
      from: `noreply@nodejsgraphqlstarter.com`,
      subject: 'NodeJs GraphQL Starter App: New Activation Code',
      html: `
        <h2>Hello ${user.firstName},</h2>
        <p>Please use the code below to activate your account. The code would expire in 24 hours.</p>
        <h6>
          ${token}
        </h6>
        <p>Cheers!</p>
      `
    }
    sendEmail(message);
  },

  resetPasswordToken(user, token) {
    const message = {
      to: user.email,
      from: `noreply@nodejsgraphqlstarter.com`,
      subject: 'NodeJs GraphQL Starter App: Reset Your Password',
      html: `
        <h2>Hello ${user.firstName},</h2>
        <p>Please use the code below to reset your password. The code would expire in 24 hours.</p>
        <p>
          <h6>
            ${token}
          </h6>
        </p>
        <p>Cheers!</p>
      `
    }
    sendEmail(message);
  },

  successfulPasswordReset(user) {
    const message = {
      to: user.email,
      from: `noreply@nodejsgraphqlstarter.com`,
      subject: 'NodeJs GraphQL Starter App: Password Reset Complete',
      html: `
        <h2>Hello ${user.firstName},</h2>
        <p>Your password has just been reset. If you did not initiate the request please contact our support now.</p>
        <p>Cheers!</p>
      `
    }
    sendEmail(message);
  }
}
