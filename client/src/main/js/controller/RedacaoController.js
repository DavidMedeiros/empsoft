angular.module('sos-redacao').controller('RedacaoController', ['redacao', '$scope', '$state', 'Redacao',
    'RedacaoService', function (redacao, $scope, $state, Redacao, RedacaoService) {


    var self = this;

    self.redacao = {};

    self.$onInit = function () {
        _.assign(self.redacao, redacao);
    };

    }]);