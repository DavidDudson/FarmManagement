require('./quiz.scss');

class QuizCtrl {
    constructor($rootScope, $stateParams) {
        var topic = $rootScope.app.topics[$stateParams.top];
        var quiz = topic.quizzes[$stateParams.id];
        this.title = quiz.title;
        this.description = quiz.description;
        this.tutorial = quiz.example;
        this.test = quiz.test;
        this.tool = quiz.tool;
        this.current = undefined; // Can be undefined, tool, tutorial or test
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("quiz" , {
                url: '/quiz/{top}/{id}',
                template: require('./quiz.html'),
                controller: QuizCtrl,
                controllerAs: "quiz"
            })
    });