angular.module('sos-redacao').service('RedacaoService', ['$http', function ($http) {

var self = this;
const API = '/api/redacao';


    self.insere = function(redacao) {
        console.log("asljdasd");
        return $http.post(`${API}`, redacao);
    };


}]);