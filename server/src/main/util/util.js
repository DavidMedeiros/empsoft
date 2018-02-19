
/**
 * Sim, adiciona features interessantes do lodash e usa como módulo 'util'.
 */
let _ = require('lodash');

_.BAD_REQUEST = 400;
_.NOT_FOUND = 404;
_.FORBIDDEN = 403;
_.UNAUTHORIZED = 401;
_.OK = 200;
_.CREATED = 201;
_.CONFLICT = 409;

_.FIRST_INDEX = 0;
_.INVALID_INDEX = -1;

_.RANDOM_STRING_LENGTH = 1000;

_.API_URI = '/api';

_.ADMIN = 'admin';
_.ERRO_USUARIO_SEM_PERMISSAO = 'Usuário não tem permissão ao recurso.';

/**
 * Dado dois objetos (o target deve ser um objeto mangoose), 
 * soft copia as propriedades de um objeto para outro.
 *
 * @param {Mongoose.Model} toObject   Objeto mongoose que terá novas propriedades
 * @param {Object}         fromObject Objeto para ter as propriedades copiadas
 */
_.updateModel = (toObject, fromObject) => {
    _.each(fromObject, (value, key) => {
        // _id, __v...
        if (_.contains(key, '_')) return;

        // http://stackoverflow.com/questions/15092912/dynamically-updating-a-javascript-object-from-a-string-path
        let keys = key.split('.');
        _.set(toObject, keys, value);
        // https://github.com/Automattic/mongoose/issues/1204
        toObject.markModified(_.first(keys));
    });

    // Remove propriedades que não são mandadas.
    _.each(toObject.toObject(), (value, key) => {
        if (!fromObject.hasOwnProperty(key) && !_.includes(key, '_'))
            toObject[key] = undefined;
    });
};

/**
 * Given a request this function returns the email of the
 * user who made the request.
 * @param request Request to get the email from.
 */
_.getUserEmail = (request) => {
    return _.first(request.user).email;
};

/**
 * Pesquisa um objeto comparando esse objetos por id.
 *
 * @param {Array}  arr            Array de objetos.
 * @param {Object} mongooseObject Objeto a ser pesquisado.
 */
_.containsMongoose = (arr, mongooseObject) =>
    !_.isEmpty(_.filter(arr, obj => JSON.stringify(obj._id) === JSON.stringify(mongooseObject._id)));

/**
 * Once I tried to use the underscore contains function. Didn't work.
 * This one should do the same thing. Well... Should...
 *
 * @param {Array}  arr    Array to have the object searched.
 * @param {Object} object Object to be searched.
 */
_.contains = (arr, object) => arr.indexOf(object) !== _.INVALID_INDEX;

/**
 * Dada a requisição, esta função retorna o token de autorização presente nos headers.
 *
 * @param   {Object} req A requisição.
 * @returns {string} O token dos headers.
 */
_.getToken = req => req.header('access_token') || _.getAuthorizationToken(req);

/**
 * Retorna o token presente na propriedade de autorização do header.
 *
 * @param   {Object} req O request.
 * @returns {String} O token de autorização.
 */
_.getAuthorizationToken = (req) => {
    let authHeader = req.header('Authorization');
    return authHeader.substring(authHeader.indexOf(' ')).trim();
};

/**
 * Gera uma nova string (com probabilidade de repetição muito pequena) dado o tamanho.
 *
 * @param   {Number} size O tamanho da String aleatória.
 * @returns {string} A string aleatória com o tamanho dado
 */
_.generateNewString = size => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

/**
 * Lida com o erro de validação do mangoose.
 *
 * @param   {Object}   err  Objeto de erro mongoose.
 * @param   {Function} next Função callback para redirecionar para a próxima função.
 */
_.handleValidationError = (err, next) => {
    let message = 'Erro de validação: ';
    _.each(err.errors, (value, field) => {
        if (message.indexOf(': ') !== message.length - ': '.length)
            message += ', ';
        message += value.message;
    });
    message += '.';
    return next(new Error(message));
};

/**
 * Retorna um Objeto para retorno da API dado um Mongoose model.
 *
 * @param   {mongoose.model} mongooseObject
 * @returns {Object} Objeto de retorno.
 */
_.mongooseToObject = mongooseObject => {
    const objeto = mongooseObject.toObject();
    delete objeto.__v;
    return objeto;
};

/**
 * Retorna um objeto com a response em caso do erro {@code Not found (404)}.
 *
 * @param  {String} mensagem Mensagem de erro.
 * @return {{[status] : Number, [mensagem] : String}} Objeto de response com status e mensagem.
 */
_.notFoundResponse = mensagem => ({status: _.NOT_FOUND, mensagem});

/**
 * Retorna uma função que vai cuidar da response de erro.
 * Ex.: {@code Promise.catch(_.retornarResponseErro(res))}.
 *
 * @param   {Object}   res Objeto de response do rest.
 * @returns {Function} Função para lidar com a promise rejeitada e rejeitar a response.
 */
_.retornarResponseErro = res =>
    (err => res.status(err.status || _.BAD_REQUEST).json({
        mensagem: err.message || err.mensagem || err
    }));

_.ONE_HOUR = 3600000;
_.TEN_MINUTES = _.ONE_HOUR / 60;

module.exports = _;