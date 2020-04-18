const { celebrate, Joi } = require('celebrate');

const name = Joi.string().required().min(2).max(30);
const email = Joi.string().required().email();
const password = Joi.string().required();

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name, email, password,
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email, password,
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
};
