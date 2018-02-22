angular.module('sos-redacao').controller('RedatorController', ['$scope', '$state', 'Upload', function ($scope, $state, Upload) {
    var self = this;

    self.redacoes = [{name: 'Redacao01', status: 1},{name: 'Redacao02', status: 0},{name: 'Redacao03', status: 1}];

    $scope.$watch('redacaoImage', function () {
        $scope.imageUpload($scope.files);
    });

    $scope.imageUpload = function (redacaoImage) {
        if(!redacaoImage) return;

        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(redacaoImage);

    };

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            // $scope.imgSrc =  e.target.result;
            //TODO: POST DE REDACAO
        });
    };


}]);