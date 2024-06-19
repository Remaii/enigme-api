import config from './config';

export default {
  mongo: {
    uri: config.mongo.uri,
    user: config.mongo.user,
    pwd: config.mongo.pwd,
  },
  jwt: {
    secretKey: config.jwt.secretKey,
  },
};
