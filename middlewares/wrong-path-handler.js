const NotFoundError = require('../errors/error-not-found');
const { ERR_NOT_FOUND } = require('../consts/errors');

const handleWrongPath = () => {
  throw new NotFoundError(ERR_NOT_FOUND);
};

module.exports = { handleWrongPath };
