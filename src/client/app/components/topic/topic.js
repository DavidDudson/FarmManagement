require('./Topic.scss');

var _ = require('lodash');

class TopicCtrl {
    constructor($rootScope, $stateParams) {
        var category = _.find($rootScope.app.categories, {id: _.parseInt($stateParams.top)});
        var topic =  _.find(category.Topics, {id: _.parseInt($stateParams.id)});
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
                url: '/topic/{top}/{id}',
                template: require('./topic.html'),
                controller: TopicCtrl,
                controllerAs: "topic"
            })
    });