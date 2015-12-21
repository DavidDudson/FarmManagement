class LandingCtrl {
    constructor() {
        // Infographics could be pairs of image/description
        // And a nice hover over to show description with negative text
        this.infographics = [];
        this.description = "Some Description"
    }
}


angular.module('app')
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("/landing");

        $stateProvider
            .state("landing" , {
                url:'/landing',
                template: require('./landing.html'),
                controller: LandingCtrl
            })
    });