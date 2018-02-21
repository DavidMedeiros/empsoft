angular.module('sos-redacao').controller('RedatorController', ['$scope', '$state', 'Upload', function ($scope, $state, Upload) {
    var self = this;

    self.files;

    self.redacoes = [{name: 'a', status: 1},{name: 'b', status: 0},{name: 'c', status: 1}];


    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if(files)
            console.log(files.name);
    };


}]);