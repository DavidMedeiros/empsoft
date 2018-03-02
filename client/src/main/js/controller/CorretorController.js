angular.module('sos-redacao').controller('CorretorController', ['redacoesList', '$scope', '$state', 'Redacao',
    'RedacaoService', 'ToastService', function (redacoesList, $scope, $state, Redacao, RedacaoService, ToastService) {
    var self = this;

    self.redacoes = [];
    $scope.imgSrc = '';
    $scope.redacaoImage = '';

    self.$onInit = function () {
        self.redacoes = angular.copy(redacoesList);
        console.log(self.redacoes);
    };

    self.atualizar = function() {
        RedacaoService.getByStatus(0).then(function(response){
           self.redacoes = angular.copy(response.data);

           if(self.redacoes.length === 0) {
                ToastService.showActionToast("Por enquanto não existem redações a serem corrigidas!");
           }

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

        let name = $scope.redacaoImage.name.slice(0, -4);
        var redacao = new Redacao(e.target.result, 0, name);

        RedacaoService.insert(redacao).then(function(response) {
            RedacaoService.getAll().then(function(response){
               self.redacoes = angular.copy(response.data);
            });
        },
            function(err) {
            console.log(err);
        });
    };

}]);