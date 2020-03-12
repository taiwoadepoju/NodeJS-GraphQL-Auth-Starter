const Joi = require('joi');

module.exports = {
  confirmToken(req, res, next) {
    const schema = {
      token: Joi.string().min(8).max(250).required(),
    };

    const { error } = Joi.validate(req.body, schema)
    if (error) {
      throw new Error(error.details[0].message)
    } else {
      next()
    }
  }
  
}