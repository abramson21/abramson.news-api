const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { validateEmail, handleEmailError } = require('../utils/model-validate-service');
const UnauthorizedError = require('../errors/error-unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: handleEmailError,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error();
          }

          return user;
        });
    })
    .catch(() => {
      throw new UnauthorizedError('Неправильные почта или пароль');
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
