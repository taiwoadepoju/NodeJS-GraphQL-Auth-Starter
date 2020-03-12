const Joi = require('joi');

module.exports = {
  login(req, res, next) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      throw new Error(error.details[0].message)
    } else {
      next()
    }
  },

  changePassword(req, res, next) {
    const schema = {
      currentPassword: Joi.string().min(5).max(255).required(),
      newPassword: Joi.string().min(5).max(255).required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      throw new Error(error.details[0].message)
    } else {
      next()
    }
  },

  initiateResetPassword(req, res, next) {
    const schema = {
      email: Joi.string().required().email()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      throw new Error(error.details[0].message)
    } else {
      next()
    }
  },

  completeResetPassword(req, res, next) {
    const schema = {
      newPassword: Joi.string().min(5).max(255).required(),
      token: Joi.string().min(5).max(255).required(),
      email: Joi.email().required()
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      throw new Error(error.details[0].message)
    } else {
      next()
    }
  }
  
  
}