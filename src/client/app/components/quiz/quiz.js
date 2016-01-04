require('./quiz.scss');

var _ = require('lodash');

class QuizCtrl {
    constructor($rootScope, $stateParams) {
        var topic = _.find($rootScope.app.topics, {id: _.parseInt($stateParams.top)});
        var quiz =  _.find(topic.quizzes, {id: _.parseInt($stateParams.id)});
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