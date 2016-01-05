require('./Topic.scss');

var _ = require('lodash');

class TopicCtrl {
    constructor($rootScope, $stateParams) {
        var category = _.find($rootScope.app.categories, {id: _.parseInt($stateParams.top)});
        var Topic =  _.find(category.Topiczes, {id: _.parseInt($stateParams.id)});
        this.title = Topic.title;
        this.description = Topic.description;
        this.tutorial = Topic.example;
        this.test = Topic.test;
        this.tool = Topic.tool;
        this.current = undefined; // Can be undefined, tool, tutorial or test
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("Topic" , {
                url: '/Topic/{top}/{id}',
                template: require('./Topic.html'),
                controller: TopicCtrl,
                controllerAs: "Topic"
            })
    });