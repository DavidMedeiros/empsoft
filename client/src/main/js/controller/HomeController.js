angular.module('sos-redacao').controller('HomeController', ['$state', function ($state) {
    var self = this;

    self.entrarAluno = function() {
        $state.go('redator');
    };

}]);