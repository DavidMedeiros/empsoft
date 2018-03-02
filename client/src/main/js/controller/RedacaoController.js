angular.module('sos-redacao').controller('RedacaoController', ['redacao', '$scope', '$state', 'Redacao',
    'RedacaoService', function (redacao, $scope, $state, Redacao, RedacaoService) {


    var self = this;

    self.redacao = {};
    self.modoCorrecao;

    self.$onInit = function () {
        _.assign(self.redacao, redacao);

        if(self.redacao.status === "0") {
            _initialize();
        }

        self.redacao.nota = soma();

    };

    self.voltar = function() {
        if(!self.modoCorrecao)
            $state.go('redator');
        else
            $state.go('corretor');
    };

    self.excluir = function() {
        RedacaoService.delete(redacao._id).then(function(result) {
            $state.go('redator');
        });
    };

    self.atualizaNota = function() {
        self.redacao.nota = soma();
    };

    self.corrigir = function() {
        self.redacao.status = 1;
        RedacaoService.update(redacao._id, self.redacao).then(function(result){
            $state.go('corretor');
        });
    };

    function soma() {
        var s = parseInt(self.redacao.rateI) +
            parseInt(self.redacao.rateII) +
                parseInt(self.redacao.rateIII) +
                    parseInt(self.redacao.rateIV) +
                        parseInt(self.redacao.rateV);

        return s;
    };

    function _initialize() {

        if(_.isEmpty(self.redacao.comments)) {
            self.redacao.comments = "";
        }

        self.modoCorrecao    = true;
        self.redacao.rateI   = 0;
        self.redacao.rateII  = 0;
        self.redacao.rateIII = 0;
        self.redacao.rateIV  = 0;
        self.redacao.rateV   = 0;
    }

    }]);