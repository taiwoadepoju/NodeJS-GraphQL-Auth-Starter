const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const utils = require('../utils');

module.exports = function (context) {
  if (!context.header(constants.BEARER_TOKEN)) throw new Error('Access denied. No token provided.');
  const token = utils.resolveBearerToken(context.header(constants.BEARER_TOKEN));

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    context.user = decoded; 
    return context.user;
  }

  catch (ex) {
    console.log(ex)
    throw new Error('Access denied. Invalid token.')
  }
}