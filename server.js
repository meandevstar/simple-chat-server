const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const { connect }    = require('./app/database/db')
const { socket }     = require('./app/modules');
const { errorHandler, corsHandler } = require('./app/middlewares');
const routes         = require('./app/routes');

(async () => {
  const port = process.env.PORT || 8000;
  app.use(corsHandler);
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  routes(app);
  app.use(errorHandler);

  socket.init(app);

  await connect();

  app.listen(port, '0.0.0.0', () => {
    console.log(`========== Server is running on port ${port} ==========`)
  });
})();