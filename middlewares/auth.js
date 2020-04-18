const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/error-unauthorized');
const { SECRET_KEY } = require('../consts');
const { ERR_NOT_SIGNED_IN } = require('../consts/errors');

const auth = (req, res, next) => {
  let payload;

  try {
    // payload = jwt.verify(req.cookies.jwt, SECRET_KEY);
    const token = req.header('authorization');
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(ERR_NOT_SIGNED_IN);
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
