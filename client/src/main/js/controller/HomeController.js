angular.module('sos-redacao').controller('HomeController', ['$state', function ($state) {
    var self = this;

    self.redatorSrc = 'view/assets/redator.jpg';
    self.corretorSrc = 'view/assets/corretor.jpg';

    self.entrarAluno = function() {
        console.log("rota redator");
        $state.go('redator');
    };

    self.entrarCorretor = function() {
        console.log("rota corretor");
        $state.go('corretor');
    }

}]);