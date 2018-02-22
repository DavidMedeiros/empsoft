const express = require('express');
const _ = require('../util/util.js');
let redacaoService = require('../service/redacaoService');


/**
 * Roteamento para redacoes.
 *
 * Endpoint: '/'
 * @author: Filipe Ramalho
 */
const redacaoRouter = express.Router();

/**
 * Seleciona todas as redacoes
 */
redacaoRouter.get('/', function (request, response) {
    redacaoService.getAll(function (err, result) {
        if(err){
            return response.status(err.status || _.BAD_REQUEST).json(err.message || err);
        }
        return response.status(_.OK).json(result);
    });
});

/**
 * Seleciona redacao por ID
 * @returns {*} A json with the requested category if the request is successful, error otherwise.
 */
redacaoRouter.get('/:id', function (request, response) {
    redacaoService.getById(request.params.id, function (err, result) {
        if(err) {
            return response.status(err.status || _.BAD_REQUEST).json(err.message || err);
        }
        return response.status(_.OK).json(result);
    });
});


/**
 * Salva uma nova redacao
 * @returns {*} A json with the created category if the request is successful, error otherwise.
 */
redacaoRouter.post('/', function (request, response) {
    console.log("CHEGOOOOOOOU");
    redacaoService.create(request.body, function (err, result) {
        if(err) {
            return response.status(err.status || _.BAD_REQUEST).json(err.message || err);
        }
        return response.status(_.CREATED).json(result);
    });
});

/**
 * Deleta uma redacao por id
 *
 */
redacaoRouter.delete('/:id', function (request, response) {
    redacaoService.delete(request.params.id, function (err, result) {
       if(err){
           return response.status(err.status || _.BAD_REQUEST).json(err.message || err);
       }
        return response.status(_.OK).json(result);
    });
});

module.exports = redacaoRouter;
