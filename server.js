const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');

const { socket } = require('./app/modules');
const { errorHandler, corsHandler } = require('./app/middleware');
const port = process.env.PORT || 8000; 

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

require('./app/routes')(app);

app.use(errorHandler);

socket.init(app);

app.listen(port);
console.log(`========== Server is running on port ${port} ==========`);


exports = module.exports = app;