require('./Topic.scss');

var _ = require('lodash');

var HTTP = undefined;
var ROOT = undefined;

class TopicCtrl {
    constructor($http, $rootScope, $stateParams, catData) {
        this.category = catData.data;
        this.topic = _.find(this.category.topics, {_id: $stateParams.topicId});
        this.id = this.topic._id;
        this.title = this.topic.title;
        this.description = this.topic.description;
        this.questions = this.topic.questions;
        this.question = _.find(this.questions, {_id: $stateParams.questionId});
        this.topHeader = this.question.top_headings;
        this.sideHeader = this.question.side_headings;
        this.current = $stateParams.part ? $stateParams.part : 'tutorial'; // Can be tool, tutorial or test
        HTTP = $http;
        ROOT = $rootScope;

    }

    addQuestion() {
        var example = {
            title: "New Question",
            question: "New Question",
            topHeader: true,
            sideHeader: true,
            table: [["Example", "Data"], ["Test", 1], ["Data", 2]]};

        HTTP.post("/question", example)
            .then(res => {
                example._id = res.data._id;
                this.questions.add(example);
                ROOT.app.showToast("Create Question Failed: Server Crash");
            }, err => {
                if (err.status === 500) {
                    ROOT.app.showToast("Create Question Failed: Server Crash");
                } else if (err.status == 418) {
                    ROOT.app.showToast("Create Question Failed: New Question already exists");
                } else {
                    ROOT.app.showToast("Create Question Failed: " + err.status);
                }
            });
    }

    remove() {
        HTTP.delete("/topic", {id: this.id})
            .then(res => this.topics.remove({id: this.id}),
                err => console.log(err))
    }

    save() {
        this.topic.title = ROOT.edit['Title'];
        this.topic.description = ROOT.edit['Description'];
        HTTP.put("/topic", this.topic)
            .then(res => _.map(this.topics, top => top.id === top.id ? res.data : top),
                err => console.log(err));
        ROOT.app.editable = false;
    }

    checkAnswer() {

    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("topic" , {
                url: 'topic/?categoryId?topicId?questionId?part',
                views: {
                    '': {
                        template: require('./topic.html'),
                        controller: TopicCtrl,
                        controllerAs: "top"
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    catData: ($http, $stateParams) => $http.get("/category/" + $stateParams.categoryId),
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            })
    });