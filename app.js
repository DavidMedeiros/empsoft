var express = require('express');
const morgan = require('morgan');

require('./server/src/main/config/dbConfig.js')();
var routesMiddlware = require('./server/src/main/middleware/routesMiddleware');
var bootstrapMiddleware = require('./server/src/main/middleware/bootstrapMiddleware'); 

// Cria um objeto Application do Express
var app = express();

app.use(morgan('combined'));


routesMiddlware.set(app);
bootstrapMiddleware.set(app);

module.exports = app;