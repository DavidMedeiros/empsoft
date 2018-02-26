angular.module('sos-redacao').service('RedacaoService', ['$http', function ($http) {

var self = this;
const API = '/api/redacao';


    self.insere = function(redacao) {
        return $http.post(`${API}`, redacao);
    };


    self.getAll = function() {
        return $http.get(`${API}`);
    };

    self.getById = function(id) {
        return $http.get(`${API}/${id}`);
    };

}]);