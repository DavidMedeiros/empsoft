angular.module('sos-redacao').controller('RedacaoController', ['redacao', '$scope', '$state', 'Redacao',
    'RedacaoService', function (redacao, $scope, $state, Redacao, RedacaoService) {


    var self = this;

    self.redacao = {};

    self.$onInit = function () {
        _.assign(self.redacao, redacao);

        self.redacao.nota = soma();
        self.redacao.comments = ""

    };

    self.voltar = function() {
      $state.go('redator');
    };

    self.excluir = function() {
        RedacaoService.delete(redacao._id).then(function(result) {
            $state.go('redator');
        });
    };

    function soma() {
      return self.redacao.rateI +
          self.redacao.rateII+
          self.redacao.rateIII +
          self.redacao.rateIV +
          self.redacao.rateV;
    };

    }]);