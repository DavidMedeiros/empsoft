const _ = require('../util/util');
const routesMiddleware = {};
const redacaoRouter = require('../router/redacaoRouter');

//login requirements
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

/**
 * Configura a aplicação para as rotas de requisições
 *
 * @param {Object} app - Objeto que encapsula a aplicação Express
 */

routesMiddleware.set = function(app) {

//bodyparser middleware
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cookieParser());

//express session
    app.use(session({
        secret: 'senha-super-dificil',
        saveUninitialized: true,
        resave: true,
        rolling: true,
        cookie: {maxAge: 60 * 1000 * 60 * 24 * 400}
    }));


//flash connect
    app.use(flash());
    app.use('/api/redacao', redacaoRouter);
};

module.exports = routesMiddleware;