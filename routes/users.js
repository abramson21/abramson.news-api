const router = require('express').Router();

const { readActiveUser } = require('../controllers/users');

router.get('/me', readActiveUser);

module.exports = router;
