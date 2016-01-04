var _ = require('lodash');

class TopicCtrl {
    constructor($rootScope, $stateParams) {
        var topic = _.find($rootScope.app.topics, {id: _.parseInt($stateParams.id)});
        this.title = topic.title;
        this.id = topic.id;
        this.description = topic.description;
        this.quizzes = topic.quizzes;
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("top" , {
                url:'/topic/{id}',
                template: require('./topic.html'),
                controller: TopicCtrl,
                controllerAs: "topic"
            })
    });