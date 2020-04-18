const allowedCors = [
  'https://ratilainen.ru',
  'http://ratilainen.ru',
  'http://localhost:8080',
];

const corsChecker = (req, res, next) => {
  const { origin } = req.headers;

    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.status(200);
    }

    next();
};

module.exports = { corsChecker };
