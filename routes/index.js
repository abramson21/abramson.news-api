const router = require('express').Router();

const articlesRoutes = require('./articles');
const usersRoutes = require('./users');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/user-request-validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);

module.exports = router;
