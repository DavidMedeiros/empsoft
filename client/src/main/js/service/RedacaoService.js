angular.module('sos-redacao').service('RedacaoService', ['$http', function ($http) {

var self = this;
const API = '/api/redacao';


    self.insert = function(redacao) {
        return $http.post(`${API}`, redacao);
    };

    self.getAll = function() {
        return $http.get(`${API}`);
    };

    self.getById = function(id) {
        return $http.get(`${API}/${id}`);
    };

    self.getByStatus = function(status) {
        return $http.get(`${API}/status/${status}` );
    };

    self.update = function(id, redacao) {
        return $http.patch(`${API}/${id}`, redacao);
    };

    self.delete = function(id) {
      return $http.delete(`${API}/${id}`);
    };

}]);