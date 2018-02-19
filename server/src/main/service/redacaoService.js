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


redacaoService.getById = function(id, callback){
    getById(id, function (err, result) {
        if(err) return callback(err, null);
        if(_.isEmpty(result)) return callback(err, null);
        return callback(err, result);
    });
};

redacaoService.delete = function (id, callback) {
    return Category.remove({_id: id}, function (err, result) {
        if(err){
            return callback("Erro ao deletar redacao.", null);
        }
        return callback(err, result);
    });
};

function getById(id, callback) {
    return Redacao.findById(id, callback);
}

module.exports = redacaoService;