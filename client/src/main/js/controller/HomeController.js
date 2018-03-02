angular.module('sos-redacao').controller('HomeController', ['$state', function ($state) {
    var self = this;

    console.log("chegou aqui");

    self.entrarAluno = function() {
        console.log("rota redator");
        $state.go('redator');
    };

    self.entrarCorretor = function() {
        console.log("rota corretor");
        $state.go('corretor');
    }

}]);