class TopicCtrl {
    constructor($rootScope, $stateParams) {
        this.topic = $rootScope.app.topics[$stateParams.id];
        this.title = this.topic.title;
        this.description = this.topic.description;
        // Todo retrieve topic based on ID,
        // which will probably just be which element in the list it is
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