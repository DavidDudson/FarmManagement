require('./about.scss');


angular.module('app')
    .config(($stateProvider) => {

        $stateProvider
            .state("about", {
                url: '/about',
                views: {
                    '': {
                        template: require('./about.html'),
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            });
    });