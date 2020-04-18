const { COOKIE_LIFE_TIME } = require('../consts');

const cookieConfig = {
  maxAge: COOKIE_LIFE_TIME,
  httpOnly: true,
  sameSite: true,
};

module.exports = cookieConfig;
