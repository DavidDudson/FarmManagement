require('./Topic.scss');

var _ = require('lodash');

var HTTP = undefined;
var LOCATION = undefined;
var ROOT = undefined;

class TopicCtrl {
    constructor($location, $http, $rootScope, $stateParams) {
        this.topic =  _.find($rootScope.app.topics, {id: _.parseInt($stateParams.id)});
        this.id = this.topic.id;
        this.title = this.topic.title;
        this.description = this.topic.description;
        this.questions = this.topic.questions;
        this.question = this.topic.questions[_.parseInt($stateParams.questionId)];
        this.current = $stateParams.part ? $stateParams.part : 'tutorial'; // Can be tool, tutorial or test
        HTTP = $http;
        LOCATION = $location;
        ROOT = $rootScope;
    }

    add() {
        var exampleData = {title: "New Topic", description: "New Description"};
        HTTP.post("/topic", exampleData)
            .then(res => {
                this.topics.add(res.data);
                LOCATION.path('/topic/' + res.data.id);
            }, err => console.log(err));
    }

    remove() {
        HTTP.delete("/topic", {id: this.current.id})
            .then(res => this.topics.remove({id: this.id}),
                err => console.log(err))
    }

    save() {
        HTTP.put("/topic", this.topic)
            .then(res => _.map(this.topics, top => top.id === top.id ? res.data : top),
                err => console.log(err));
        ROOT.app.editable = false;

    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("topic" , {
                url: '/topic/:id?questionId?part',
                views: {
                    '': {
                        template: require('./topic.html'),
                        controller: TopicCtrl,
                        controllerAs: "topic"
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    catData: ($http, $stateParams) => $http.get("/category/" + $stateParams.id),
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            })
    });