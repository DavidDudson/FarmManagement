require('./category.scss');

var _ = require('lodash');

var HTTP = undefined;
var ROOT = undefined;

class CategoryCtrl {
    constructor($http, $rootScope, catData) {
        $rootScope.category = catData.data;
        HTTP = $http;
        ROOT = $rootScope;
    }

    addTopic() {

        if (ROOT.app.editable === false) {
            console.log("Tried to make modifications while not editable");
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
            console.log("Tried to make modifications while not editable");
            return
        }
        $event.preventDefault();
        HTTP.delete('cat/' + id, {id: id})
            .then(res => {
                _.remove(ROOT.nav.categories, {_id: id});
                ROOT.app.showToast("Delete Topic Succeeded");
            }, err => {
                if (err.status === 500) {
                    ROOT.app.showToast("Delete Topic Failed: Server Crash");
                } else if (err.status == 400) {
                    ROOT.app.showToast("Delete Topic Failed: Category already deleted");
                } else {
                    ROOT.app.showToast("Delete Topic Failed: " + err.status);
                }
            });
    }

    save(data) {

        if (!!data['Title'] && !!data['Description']) {
            ROOT.app.showToast("No changes detected on save");
            return
        }

        if (data['Title'] === ROOT.category.title && data['Description'] === ROOT.category.description) {
            ROOT.app.showToast("Changes identical to what was already there");

            return
        }

        if (ROOT.app.editable === false) {
            console.log("Tried to make modifications while not editable");
            ROOT.app.showToast("Tried to save while not editable");
            return
        }

        console.log(data);
        var newTitle = !!data['Title'] ? data['Title'] : ROOT.category.title;
        var newDescription = data["Description"];

        console.log(newTitle);
        console.log(newDescription);

        HTTP.put('cat/' + ROOT.category._id, {title: newTitle, description: newDescription})
            .then(res => {
                ROOT.app.showToast("Topic: " + ROOT.category.title + " saved successfully");
                ROOT.category.title = newTitle;
                ROOT.category.description = newDescription;
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
                    catData: ($http, $stateParams) => $http.get("/cat/" + $stateParams.id),
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            });
    });