const { socket } = require('../modules');

module.exports = (app) => {
  app.get('/v1/users', (req, res, next) => {
    const data = socket.getUsers();

    res.json({
      ok: true,
      data
    });
  });
};