require('./home.scss');

class HomeCtrl {
    constructor() {
        this.infographics = [];
        this.description = `Welcome to FarmFINANZ!
            Take your knowledge to the next level.The fundamentals in Farm Management are about getting the maths right.
            We are here to assist you in every aspect of farm finance.We have a series of tutorials, Topiczes and calculators that help you to get or refresh the knowledge you need to meet the challenges of farming today. We can help you to sharpen your maths skills in every field of farm management, ultimately to identify business opportunities and define future goals. Best of all, you’ll be learning from Massey professionals in this field, who developed the Topiczes with you in mind.`;
    }
}


angular.module('app')
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise("/home");

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state("home" , {
                url:'/home',
                template: require('./home.html'),
                replace: true,
                controller: HomeCtrl,
                controllerAs: 'home'
            })
    });