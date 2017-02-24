
var requiredStringValidator = [
  function (val) {
    var testVal = val.trim();
    return (testVal.length > 0);
  },
  // Custom error text
  '{PATH} cannot be empty.'
];

var requiredNumberValidator = [
  function (val) {
    return (testVal > 0);
  },
  '{PATH} cannot be size of 0.'
];

module.exports = { requiredStringValidator, requiredNumberValidator };