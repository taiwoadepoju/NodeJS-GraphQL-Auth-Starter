module.exports = function() {
  let utc = new Date();
  utc.setHours(utc.getHours());
  return utc;
}