const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');

const User = require('../models/user');
const { SECRET_KEY } = require('../consts');
const NotFoundError = require('../errors/error-not-found');
const { TOKEN_TYPE } = require('../consts');
const { ERR_USER_NOT_FOUND } = require('../consts/errors');
const { jwtConfig, cookieConfig } = require('../configs');

module.exports.readActiveUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError(ERR_USER_NOT_FOUND);
    } else {
      const { name, email } = user;
      res.send({ data: { name, email } });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const escPass = escape(password);

  try {
    const hash = await bcrypt.hash(escPass, 10);
    const user = await User.create({
      name: escape(name),
      email: escape(email),
      password: hash,
    });

    const newUser = {
      _id: user._doc._id,
      name: user._doc.name,
      email: user._doc.email,
    };
    res.send({ data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);

    const userData = {
      _id: user._doc._id,
      name: user._doc.name,
      email: user._doc.email,
    };

    const payload = { _id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, jwtConfig);

    // res.cookie(TOKEN_TYPE, token, cookieConfig);
    res.send({ data: token });
  } catch (error) {
    next(error);
  }
};
