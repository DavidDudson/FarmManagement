class AllCtrl {
    constructor(questions) {
        this.questions = questions.data;
    }
}
    
angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("all", {
                url: '/all',
                views: {
                    '': {
                        template: require('./all.html'),
                        controller: AllCtrl,
                        controllerAs: "all"
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    load : ($rootScope) => $rootScope.startLoad(),
                    questions: ($http, $rootScope) => $http.get("/queSum"),
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            });
    });