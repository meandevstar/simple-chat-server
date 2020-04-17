const router = require('express').Router()
const { socket } = require('../modules');

router.get('/v1/messages', (req, res, next) => {
  res.json({
    ok: true,
    data: []
  })
});


module.exports = router;