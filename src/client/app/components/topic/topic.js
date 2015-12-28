class TopicCtrl {
    constructor($rootScope, $stateParams) {
        var topic = $rootScope.app.topics[$stateParams.id];
        this.title = topic.title;
        this.description = topic.description;
        this.quizzes = topic.quizzes;
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("topic" , {
                url:'/topic/{id}',
                template: require('./topic.html'),
                controller: TopicCtrl,
                controllerAs: "topic"
            })
    });