const mongoose = require('mongoose');
const Article = require('../models/article');

const { ObjectId } = mongoose.Types;

const NotFoundError = require('../errors/error_not_found');

module.exports.getAllArticles = (req, res) => {
  Article.find({})
    .then((article) => {
      if (article.length === 0) {
        throw new NotFoundError('База данных карточек пуста!');
      }
      return res.send({ data: article });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.createArticle = (req, res) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.send({ data: article }))
    .catch(() => res.status(500).send({ message: 'Не удается создать карточку' }));
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  if (!ObjectId.isValid(articleId)) {
    return res.status(404).send({ message: 'not found' });
  }
  Article.findById(req.params.articleId)
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((articleRemove) => res.send({ remove: articleRemove }))
            .catch(next);
        } else {
          next(new NotFoundError('Это не ваша карта'));
        }
      } else {
        next(new NotFoundError('Карта не найдена'));
      }
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};