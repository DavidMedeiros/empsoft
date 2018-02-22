angular.module('sos-redacao').controller('RedatorController', ['$scope', '$state', 'Redacao', 'RedacaoService',
    function ($scope, $state, Redacao, RedacaoService) {
    var self = this;

    self.redacoes = [{name: 'Redacao01', status: 1},{name: 'Redacao02', status: 0},{name: 'Redacao03', status: 1}];
    $scope.imgSrc = '';
    $scope.redacaoImage = '';

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

        var redacao = new Redacao(e.target.result, 0);

        RedacaoService.insere(redacao).then(function(response) {
            console.log(response.data);
        },
            function(err) {
            console.log(err);
        })
    };


}]);