require('./category.scss');

var _ = require('lodash');

var HTTP = undefined;
var ROOT = undefined;

class CategoryCtrl {
    constructor($http, $rootScope, catData, $state) {
        $rootScope.category = catData.data;
        HTTP = $http;
        ROOT = $rootScope;
        this.goto = params => $state.go("topic", params);
    }

    addQuestion(topic) {
        var example = {
            title: "New Question",
            question: "New Question Details",
            category: ROOT.category._id,
            topic: topic,
            top_headings: true,
            side_headings: true,
            table: [{row: 1, rowContent: ["Example Content", "0"]},
                {row: 2, rowContent: ["Example Content", "0"]}]
        };

        HTTP.post("/que", example)
            .then(res => {
                example._id = res.data;
                _.find(ROOT.category.topics, {_id: topic}).questions.push(example);
                console.log(example);
                ROOT.app.showToast("Create Question Success");
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

    deleteQuestion(topic, question) {
        if (ROOT.app.editable === false) {
            console.error("Tried to make modifications while not editable");
            return
        }
        HTTP.delete('que/' + question, {id: question})
            .then(res => {
                _.remove(_.find(ROOT.category.topics, {_id: topic}), {_id: question});
                ROOT.app.showToast("Delete Question Succeeded");
            }, err => {
                if (err.status === 500) {
                    ROOT.app.showToast("Delete Question Failed: Server Crash");
                } else if (err.status == 400) {
                    ROOT.app.showToast("Delete Question Failed: Question already deleted");
                } else {
                    ROOT.app.showToast("Delete Question Failed: " + err.status);
                }
            });
    }

    addTopic() {

        if (ROOT.app.editable === false) {
            console.error("Tried to make modifications while not editable");
            return
        }

        var example = {title: "New Topic", description: "New Description", category: ROOT.category._id};
        HTTP.post('/top', example)
            .then(res => {
                    example._id = res.data;
                    if (ROOT.category.topics == null) {
                        ROOT.category.topics = []
                    }
                    ROOT.category.topics.push(example);
                    ROOT.app.showToast("Create Topic Success")
                },
                err => {
                    if (err.status === 500) {
                        ROOT.app.showToast("Create Topic Failed: Server Crash");
                    } else if (err.status == 418) {
                        ROOT.app.showToast("Create Topic Failed: New Topic already exists");
                    } else {
                        ROOT.app.showToast("Create Topic Failed: " + err.status);
                    }
                })
    }


    deleteTopic(id, $event) {
        if (ROOT.app.editable === false) {
            console.error("Tried to make modifications while not editable");
            return
        }
        $event.preventDefault();
        HTTP.delete('top/' + id, {id: id})
            .then(res => {
                _.remove(ROOT.category.topics, {_id: id});
                ROOT.app.showToast("Delete Topic Succeeded");
            }, err => {
                if (err.status === 500) {
                    ROOT.app.showToast("Delete Topic Failed: Server Crash");
                } else if (err.status == 400) {
                    ROOT.app.showToast("Delete Topic Failed: Topic already deleted");
                } else {
                    ROOT.app.showToast("Delete Topic Failed: " + err.status);
                }
            });
    }

    save(data) {

        console.log(data)
        if (!!data['Title'] && !!data['Description']) {
            ROOT.app.showToast("No changes detected on save");
            return
        }

        if (data['Title'] === ROOT.category.title && data['Description'] === ROOT.category.description) {
            ROOT.app.showToast("Changes identical to what was already there");

            return
        }

        if (ROOT.app.editable === false) {
            console.error("Tried to make modifications while not editable");
            ROOT.app.showToast("Tried to save while not editable");
            return
        }

        var newTitle = !!data['Title'] ? data['Title'] : ROOT.category.title;
        var newDescription = data["Description"];

        HTTP.put('cat/' + ROOT.category._id, {title: newTitle, description: newDescription})
            .then(res => {
                ROOT.app.showToast("Topic: " + ROOT.category.title + " saved successfully");
                ROOT.category.title = newTitle;
                ROOT.category.description = newDescription;
                ROOT.app.editable = false;
            }, err => {
                if (err.status === 500) {
                    ROOT.app.showToast("Save Category Failed: Server Crash");
                } else if (err.status == 418) {
                    ROOT.app.showToast("Save Category Failed: New Topic already exists");
                } else {
                    ROOT.app.showToast("Create Topic Failed: " + err.status);
                }
            });
    }
}

CategoryCtrl.$inject = ['$http', '$rootScope',  'catData']


angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("category", {
                url: '/category/:id',
                views: {
                    '': {
                        template: require('./category.html'),
                        controller: CategoryCtrl,
                        controllerAs: "category"
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    load : ($rootScope) => $rootScope.startLoad(),
                    catData: ($http, $stateParams) => $http.get("/cat/" + $stateParams.id),
                    categories: ($http, $rootScope) => $http.get("/categories"),
                    userData: ($http) => $http.get("/local/check").success(n => n.data)
                }
            });
    });