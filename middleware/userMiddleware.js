const Joi = require('joi');

module.exports = {
  createUser(req) {
    const schema = {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      phone: Joi.number().min(9).max(9999999999).required(),
      isAdmin: Joi.boolean(),
      email: Joi.string().email().min(5).max(100).required(),
      password: Joi.string().min(6).max(100).required(),
      gender: Joi.string()
    };

    const { error } = Joi.validate(req, schema)
    if (error) {
      throw new Error(error.details[0].message)
    }
  },

  editUser(req, res, next) {
    const schema = {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      phone: Joi.number().min(9).max(9999999999).required(),
      isAdmin: Joi.boolean()
    };

    const { error } = Joi.validate(req.body, schema)
    if (error) {
      throw new Error(error.details[0].message)
    }
  },

  changeUserActivationStatus(req, res, next) {
    const schema = { enabled: Joi.boolean().required() }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      throw new Error(error.details[0].message)
    } else {
      next()
    }
  },
}