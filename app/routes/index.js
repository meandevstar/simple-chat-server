var userRoutes = require('./users');
var messageRoutes = require('./messages');

module.exports = (app) => {
  app.use(userRoutes);
  app.use(messageRoutes);
};