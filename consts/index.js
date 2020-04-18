const { NODE_ENV, JWT_SECRET, MONGO_PATH } = process.env;

module.exports.MONGO_OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;
module.exports.URL_PATTENR = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

module.exports.SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
module.exports.TOKEN_TYPE = 'jwt';
module.exports.TOKEN_LIFE_TIME = '7d';
module.exports.COOKIE_LIFE_TIME = 3600000;

module.exports.VALIDATION_ERROR = 'ValidationError';

module.exports.MONGO_URIS = NODE_ENV === 'production' ? MONGO_PATH : 'mongodb://localhost:27017/news-explorer';
