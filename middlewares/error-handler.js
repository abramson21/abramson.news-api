const { VALIDATION_ERROR } = require('../consts');
const { ERR_COMMON, ERR_SERVER } = require('../consts/errors');

const SERVER_ERROR_CODE = 500;

const errorHandler = (err, req, res, next) => {
  const isValidationError = err.name.startsWith(VALIDATION_ERROR);

  if (isValidationError) {
    res.status(400).send({ message: `${ERR_COMMON}, ${err}` });
  } else {
    const { statusCode = SERVER_ERROR_CODE } = err;
    const message = statusCode === SERVER_ERROR_CODE ? ERR_SERVER : err.message;

    res
      .status(statusCode)
      .send({ message });
  }

  next();
};

module.exports = { errorHandler };
