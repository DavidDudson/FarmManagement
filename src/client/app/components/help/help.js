require('./help.scss');


angular.module('app')
    .config(($stateProvider) => {

        $stateProvider
            .state("help", {
                url: '/help',
                views: {
                    '': {
                        template: require('./help.html')
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    categories: ($http, $rootScope) => $http.get("/categories"),
                    userData: ($http) => $http.get("/local/check").success(n => n.data)
                }
            });
    });