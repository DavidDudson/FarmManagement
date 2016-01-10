require('./Topic.scss');

var _ = require('lodash');

class TopicCtrl {
    constructor($rootScope, $stateParams) {
        var topic =  _.find($rootScope.app.topics, {id: _.parseInt($stateParams.id)});
        console.log($rootScope.app.topics);
        console.log($stateParams.id);
        console.log(topic);
        this.title = topic.title;
        this.description = topic.description;
        this.tutorial = topic.example;
        this.test = topic.test;
        this.tool = topic.tool;
        this.current = undefined; // Can be undefined, tool, tutorial or test
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("topic" , {
                url: '/topic/{id}',
                template: require('./topic.html'),
                controller: TopicCtrl,
                controllerAs: "topic",
                resolve: {
                    categoryCheck: ($rootScope, $location) => {
                        if (!$rootScope.app.categories) $location.path('/home');
                    }
                }
            })
    });