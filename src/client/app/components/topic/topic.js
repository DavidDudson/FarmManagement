require('./topic.scss');

var _ = require('lodash');

var HTTP = undefined;
var ROOT = undefined;

class TopicCtrl {
    constructor($http, $rootScope, $stateParams, catData) {
        this.category = catData.data;
        this.topic = _.find(this.category.topics, {_id: $stateParams.topicId});
        this.question = _.find(this.topic.questions, {_id: $stateParams.questionId});
        this.current = $stateParams.part ? $stateParams.part : 'tutorial'; // Can be tool, tutorial or test
        this.reload = true;
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

        HTTP.post("/que", example)
            .then(res => {
                example._id = res.data;
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

    save() {
        if (ROOT.app.editable === false) {
            console.error("Tried to make modifications while not editable");
            return
        }

        this.topic.title = ROOT.edit['Title'];
        this.topic.description = ROOT.edit['Description'];
        HTTP.put("/top", this.topic)
            .then(res => _.map(this.topics, top => top.id === top.id ? res.data : top),
                err => console.error(err));
        ROOT.app.editable = false;
    }

    checkAnswer() {

    }
}

TopicCtrl.$inject = ['$http',  '$rootScope', '$stateParams', 'catData'];


angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("topic" , {
                url: '/topic?categoryId&topicId&questionId&part',
                views: {
                    '': {
                        template: require('./topic.html'),
                        controller: TopicCtrl,
                        controllerAs: "top"
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    load : ($rootScope) => $rootScope.startLoad(),
                    catData: ($http, $stateParams) => $http.get("/cat/" + $stateParams.categoryId),
                    categories: ($http, $rootScope) => $http.get("/categories")}
            })
    });