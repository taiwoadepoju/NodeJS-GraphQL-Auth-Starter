const winston = require('winston');

module.exports = function(err){
  winston.error(err.message, err);
  
  throw new Error(err.message);
}