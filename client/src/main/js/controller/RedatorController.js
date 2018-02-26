angular.module('sos-redacao').controller('RedatorController', ['redacoesList', '$scope', '$state', 'Redacao',
    'RedacaoService', function (redacoesList, $scope, $state, Redacao, RedacaoService) {
    var self = this;

    self.redacoes = [];
    $scope.imgSrc = '';
    $scope.redacaoImage = '';

    self.$onInit = function () {
        self.redacoes = angular.copy(redacoesList.data);
    };

    self.atualizar = function() {
        RedacaoService.getAll().then(function(response){
           self.redacoes = angular.copy(response.data);
        });
    };

    self.visualizar = function(id) {
        $state.go('redacao', {redacaoId: id} );
    };

    $scope.$watch('redacaoImage', function () {
        $scope.imageUpload($scope.redacaoImage);
    });

    $scope.imageUpload = function (redacaoImage) {
        if(!redacaoImage) return;

        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(redacaoImage);

    };

    $scope.imageIsLoaded = function(e){

        var redacao = new Redacao(e.target.result, 0, $scope.redacaoImage.name);

        RedacaoService.insere(redacao).then(function(response) {
            RedacaoService.getAll().then(function(response){
               self.redacoes = angular.copy(response.data);
               console.log(self.redacoes[0].status);
            });
        },
            function(err) {
            console.log(err);
        });
    };

}]);