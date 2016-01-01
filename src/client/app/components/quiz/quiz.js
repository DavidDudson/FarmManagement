require('./quiz.scss');

class QuizCtrl {
    constructor($rootScope, $stateParams) {
        console.log($stateParams)
        var topic = $rootScope.app.topics[$stateParams.top];
        console.log(topic);
        var quiz = topic.quizzes[$stateParams.id];
        console.log(quiz);
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
                url: '/quiz/{top}/{id}',
                template: require('./quiz.html'),
                controller: QuizCtrl,
                controllerAs: "quiz"
            })
    });