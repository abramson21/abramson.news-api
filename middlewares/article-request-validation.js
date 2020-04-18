const { celebrate, Joi } = require('celebrate');

const { MONGO_OBJECT_ID_PATTERN, URL_PATTENR } = require('../consts');

const keyword = Joi.string().required();
const title = Joi.string().required();
const text = Joi.string().required();
const date = Joi.string().required();
const source = Joi.string().required();
const link = Joi.string().required().pattern(URL_PATTENR);
const image = Joi.string().required().pattern(URL_PATTENR);
const articleId = Joi.string().pattern(MONGO_OBJECT_ID_PATTERN);

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword, title, text, date, source, link, image,
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({ articleId }),
});

module.exports = {
  validateCreateArticle,
  validateArticleId,
};
