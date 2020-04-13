const devMongooseUrl = 'mongodb://localhost:27017/news_api';
const devSecret = 'dev-secret';
const { NODE_ENV, MONGOOSE_BASEURL } = process.env;
const mongoUrl = NODE_ENV === 'production' ? MONGOOSE_BASEURL : devMongooseUrl;

module.exports = {
  devSecret,
  mongoUrl,
};
