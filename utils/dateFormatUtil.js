const moment = require('moment');

module.exports = function(date) {
  return moment(date).format('YYYY-MM-DD hh:mm a');
}