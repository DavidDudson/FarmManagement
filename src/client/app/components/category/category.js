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
        HTTP.post('topic', {title: "New Topic", description: "New Description"})
            .then(res => ROOT.categories.push(res.data),
                err => console.log(err))
    }

    save() {
        if(!!ROOT.edit['Title']) {
            ROOT.category.title = ROOT.edit["Title"]
        }
        if(!!ROOT.edit['Description']) {
            ROOT.category.description = ROOT.edit['Description'];
        }
        HTTP.put('category/' + ROOT.category._id, {title: ROOT.category.title, description: ROOT.category.description})
            .then((res, err) => {
                !!err ? console.log(err) : alert("Saved Succesfully");
                ROOT.app.editable = false;
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