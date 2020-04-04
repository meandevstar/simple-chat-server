const { socket } = require('../modules');

module.exports = (app) => {
  app.get('/v1/messages', (req, res, next) => {
    res.json({
      ok: true,
      data: []
    })
  });
};