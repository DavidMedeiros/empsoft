let redacaoService = {};
let Redacao = require('../model/Redacao');
let _ = require('../util/util');

redacaoService.getAll = function(callback){
    return Redacao.find({}, function (err, result) {
        if(err) return callback(err, null);
        if(_.isEmpty(result)) return callback(err, []);
        return callback(err, result);
    })
};

redacaoService.create = function(redacao, callback){
    try {
        let novaRedacao = new Redacao(redacao);

        return novaRedacao.save(function (err, result) {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    } catch (err){
        callback(err, null);
    }
};

redacaoService.update = function(id, redacao, callback)  {
    return getById(id, function (err, result) {
        if(err) return callback(err, null);
        let oldRedacao = result;
        _.updateModel(oldRedacao, redacao);
        return persistModel(oldRedacao, callback);
    });
};


redacaoService.getById = function(id, callback){
    getById(id, function (err, result) {
        if(err) return callback(err, null);
        if(_.isEmpty(result)) return callback(err, null);
        return callback(err, result);
    });
};

redacaoService.getByStatus = function(status, callback) {
    return Redacao.find({status: status}, function(err, result) {
        if(err) return callback(err, null);
        if(_.isEmpty(result)) return callback(err, []);
        return callback(err, result);
    });
}

redacaoService.delete = function (id, callback) {
    return Redacao.remove({_id: id}, function (err, result) {
        if(err){
            return callback("Erro ao deletar redacao.", null);
        }
        return callback(err, result);
    });
};

function getById(id, callback) {
    return Redacao.findById(id, callback);
}

function persistModel(redacao, callback) {
    return redacao.save(function (err, result) {
        if(err) return callback(err, null);
        if(_.isEmpty(result)) return callback(err, null);
        return callback(err, result.toObject());
    })
}

module.exports = redacaoService;