angular.module('sos-redacao').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './view/home.html',
            controller: 'HomeController as ctrl'
        })

        .state('redator', {
            url: '/redator',
            templateUrl: './view/redator.html',
            controller: 'RedatorController as ctrl',
            resolve: {
                redacoesList: function (RedacaoService) {
                    return RedacaoService.getAll(function (result) {
                        return result.data;
                    });
                }

            }
        })

        .state('redacao', {
            url: '/redacao/:redacaoId',
            templateUrl: './view/redacao.html',
            controller: 'RedacaoController as ctrl',
            resolve: {
                redacao: function ($stateParams, RedacaoService) {
                    return RedacaoService.getById($stateParams.redacaoId).then(function(result){
                        return result.data;
                    });
                }
            }
        })


        // .state('redacao.redacaoId.info', {
        //     url: 'redacao/:redacaoId',
        //     templateUrl: './view/redacao.html',
        //     controller: 'RedacaoController as ctrl',
        //     access : {
        //         restricted: true
        //     },
        //     resolve: {
        //         redacao: function ($stateParams, RedacaoService) {
        //             return RedacaoService.getById($stateParams.redacaoId).then(info => info.data);
        //         }
        //     }
        // })

}])
    .constant('_', window._)
    /**
     * Auth config
     */
    .config(['$urlRouterProvider', '$provide', '$httpProvider',
        function ($urlRouterProvider, $provide, $httpProvider) {

            /**
             * Adiciona watchers para open e close requests. Enquanto tiver um
             * open request o indicador de carregamento continua visível.
             */
            function loadingInterceptor($rootScope, $q) {
                var _openRequests_ = 0;

                return {
                    request: function (config) {
                        _openRequests_++;
                        $rootScope.$broadcast('loading_show');
                        return config || $q.when(config);
                    },
                    response: function (response) {
                        if (!(--_openRequests_)) {
                            $rootScope.$broadcast('loading_hide');
                        }
                        return response || $q.when(response);
                    },
                    responseError: function (response) {
                        if (!(--_openRequests_)) {
                            $rootScope.$broadcast('loading_hide');
                        }
                        return $q.reject(response);
                    }
                };
            }

            $provide.factory('loadingInterceptor', ['$rootScope', '$q', loadingInterceptor]);

            $urlRouterProvider.otherwise('/app/');

            $httpProvider.interceptors.push('loadingInterceptor');
        }])
    .run(['$rootScope', 'ModalService', function ($rootScope, ModalService) {
        // Indicador de carregamento
        const _modalResp_ = ModalService.exibirIndicadorCarregamento();
        _modalResp_.attach().then(function () {
            $rootScope.$on('loading_show', function () {
                _modalResp_.show();
            });

            $rootScope.$on('loading_hide', function () {
                _modalResp_.hide();
            });
        });
    }]);
