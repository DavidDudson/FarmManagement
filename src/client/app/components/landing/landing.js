class LandingCtrl {
    constructor() {
        // Infographics could be pairs of image/description
        // And a nice hover over to show description with negative text
        this.infographics = [];
        this.description = "Some Description"
    }
}


angular.module('app')
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise("/landing");

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state("landing" , {
                url:'/landing',
                template: require('./landing.html'),
                controller: LandingCtrl
            })
    });