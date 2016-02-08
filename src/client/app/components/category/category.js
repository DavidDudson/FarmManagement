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
        var example = {title: "New Topic", description: "New Description", category: ROOT.category._id};
        HTTP.post('/topic', example)
            .then(res => {
                    example._id = res.data._id;
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

    save() {

        var newTitle = !!ROOT.edit['Title'] ? ROOT.edit["Title"] : ROOT.category.title;
        var newDescription = !!ROOT.edit['Description'] ? ROOT.edit["Description"] : ROOT.category.description;

        HTTP.put('category/' + ROOT.category._id, {title: newTitle, description: newDescription})
            .then(res => {
                ROOT.app.showToast("Topic: " + ROOT.category.title + " saved successfully")
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

    remove() {
        HTTP.delete('category/' + ROOT.category._id, {id: ROOT.category._id})
            .then(() => _.remove(ROOT.nav.categories, {id: ROOT.category._id},
                err => console.log(err)))
    }
}

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
                    catData: ($http, $stateParams) => $http.get("/category/" + $stateParams.id),
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            });
    });