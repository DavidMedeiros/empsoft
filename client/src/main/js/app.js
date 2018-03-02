let app =angular.module('sos-redacao', ['ngMaterial', 'ngAnimate', 'ui.router', 'ngCookies', 'ngFileUpload']);

app.run(function ($rootScope, $state, $transitions) {

    return $transitions.onStart({}, function (trans) {

        let nextState = trans.to();
        let fromState = trans.from();
        let stateParams = trans.params();
        return $state.go(nextState, stateParams);
    });
});