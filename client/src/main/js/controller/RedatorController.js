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

        var param = {
            redacaoId: id,
            corretor: "false"
        };

        console.log(param);

        $state.go('redacao', param );
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