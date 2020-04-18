require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const { handleWrongPath } = require('./middlewares/wrong-path-handler');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');
const { mongooseConfig } = require('./configs');
const cors = require('cors');
const { corsChecker } = require('./middlewares/cors');
const { MONGO_URIS } = require('./consts');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(MONGO_URIS, mongooseConfig);

app.use(cors());
app.use(corsChecker);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);


app.use('/', router);
app.use(handleWrongPath);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
