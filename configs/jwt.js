const { TOKEN_LIFE_TIME } = require('../consts');

const jwtConfig = { expiresIn: TOKEN_LIFE_TIME };

module.exports = jwtConfig;
