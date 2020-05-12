const validatePhoneNumber = require('validate-phone-number-node-js');
const result = validatePhoneNumber.validate('a');
console.log(result)