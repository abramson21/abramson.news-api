const escape = require('escape-html');

const Articles = require('../models/article');
const NotFoundError = require('../errors/error-not-found');
const ForbiddenError = require('../errors/error-forbidden');
const { ERR_NOT_FOUND, ERR_ARTICLE_NOT_FOUND, ERR_DELETE_NOT_ALLOWED } = require('../consts/errors');
const { RESOURCE_UPDATED } = require('../consts/messages');

module.exports.readArticles = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const articles = await Articles.find({ owner: _id });
    if (!articles) {
      throw new NotFoundError(ERR_NOT_FOUND);
    }

    res.send({ data: articles });
  } catch (error) {
    next(error);
  }
};

module.exports.createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  try {
    const article = await Articles.create({
      keyword: escape(keyword),
      title: escape(title),
      text: escape(text),
      date: escape(date),
      source: escape(source),
      link: escape(link),
      image: escape(image),
      owner: req.user._id,
    });
    if (!article) {
      throw new NotFoundError(ERR_NOT_FOUND);
    }

    res.send({ data: article });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;

  const { _id } = req.user;
  try {
    const article = await Articles.findById(articleId).select('+owner');
    if (!article) {
      throw new NotFoundError(ERR_ARTICLE_NOT_FOUND);
    }

    const isUserArticleOwner = String(_id) === String(article.owner);

    if (isUserArticleOwner) {
      await Articles.findByIdAndRemove(articleId);
      res.send({ message: RESOURCE_UPDATED, success: true });
    } else {
      throw new ForbiddenError(ERR_DELETE_NOT_ALLOWED);
    }
  } catch (error) {
    next(error);
  }
};
