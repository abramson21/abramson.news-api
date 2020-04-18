const router = require('express').Router();

const { readArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateCreateArticle, validateArticleId } = require('../middlewares/article-request-validation');

router.get('/', readArticles);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
