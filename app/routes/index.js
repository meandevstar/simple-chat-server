var userRoutes = require('./users');
var messageRoutes = require('./chats');

module.exports = (app) => {
  app.use(userRoutes);
  app.use(messageRoutes);
};