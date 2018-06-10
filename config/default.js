module.exports = {
  port: process.env.PORT || 3000,
  secret: 'mysecret',
  mongoose: {
    uri:    process.env.MONGO_URL ||  'mongodb://localhost/grape',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  },
  root: process.cwd()
};
