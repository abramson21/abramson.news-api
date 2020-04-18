const validator = require('validator');

const { VALIDATION_ERROR } = require('../consts');
const { ERR_INVALID_EMAIL, ERR_INVALID_URL } = require('../consts/errors');

function validateURL(value) {
  return validator.isURL(value);
}

function validateEmail(value) {
  return validator.isEmail(value);
}

function handleURLError(props) {
  return `${VALIDATION_ERROR} ${props.value} ${ERR_INVALID_EMAIL}`;
}

function handleEmailError(props) {
  return `${VALIDATION_ERROR} ${props.value} ${ERR_INVALID_URL}`;
}

module.exports = {
  validateURL,
  validateEmail,
  handleURLError,
  handleEmailError,
};
