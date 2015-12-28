class QuizCtrl {
    constructor($rootScope, $stateParams) {
        var topic = $rootScope.app.topics[$stateParams.topic];
        var quiz = topic.quizzes[$stateParams.index];
        this.title = quiz.title;
        this.description = quiz.description;
        this.example = quiz.example;
        this.test = quiz.test;
        this.calculator = quiz.calculator;
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("quiz" , {
                url: '/quiz/:topic/:index',
                template: require('./quiz.html'),
                controller: QuizCtrl,
                controllerAs: "quiz"
            })
    });