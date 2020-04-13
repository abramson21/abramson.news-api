<<<<<<< HEAD:middlewars/auth.js
const jwt = require('jsonwebtoken');

const AccessError = require('../errors/access-error');
const { devSecret } = require('../scripts/config');
const { accessErrMsg } = require('../scripts/errors-success-msg');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new AccessError(accessErrMsg);
  }
  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
    req.user = payload;
  } catch (err) {
    throw new AccessError(accessErrMsg);
  }
  next();
};
=======
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/error_not_found');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new NotFoundError('Доступ запрещен. Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    throw new NotFoundError('Доступ запрещен. Необходима авторизация');
  }

  next();
};
>>>>>>> 81d0d0d665671b5d419e36358d6604e750d254ca:middlewares/auth.js
