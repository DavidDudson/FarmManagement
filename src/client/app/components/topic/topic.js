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
        this.getCSSClass = () => {
            if (_.isUndefined($rootScope.spreadsheet.answeredCorrectly)) {
                return ""
            } else if ($rootScope.spreadsheet.answeredCorrectly === true) {
                return 'add'
            } else {
                return 'delete'
            }

        };
        this.getCheckText = () => {
            if (_.isUndefined($rootScope.spreadsheet.answeredCorrectly)) {
                return "Check Answer"
            } else if ($rootScope.spreadsheet.answeredCorrectly === true) {
                return "Answered Correctly"
            } else {
                return "Try Again"
            }
        };
        this.save = (edits) => {
            if (ROOT.app.editable === false) {
                console.error("Tried to make modifications while not editable");
                return
            }

            this.topic.title = edits['Title'];
            this.topic.description = edits['Description'];
            HTTP.put("/top", this.topic)
                .then(res => console.log("Success"),
                    err => console.error(err));
            $rootScope.spreadsheet.save();
            ROOT.app.editable = false;
        };
        HTTP = $http;
        ROOT = $rootScope;
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
                    load: ($rootScope) => $rootScope.startLoad(),
                    catData: ($http, $stateParams) => $http.get("/cat/" + $stateParams.categoryId),
                    categories: ($http, $rootScope) => $http.get("/categories"),
                    userData: ($http) => $http.get("/local/check").success(n => n.data)
                }
            })
    });