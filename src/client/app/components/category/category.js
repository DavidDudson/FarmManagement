require('./category.scss');

var _ = require('lodash');

var HTTP = undefined;
var ROOT = undefined;

class CategoryCtrl {
    constructor($http, $rootScope, catData) {
        this.category = catData.data;
        this.title = this.category.title;
        this.id = this.category._id;
        this.description = this.category.description;
        this.topics = this.category.topics;
        $rootScope.category = this.category;
        HTTP = $http;
        ROOT = $rootScope;
    }

    add() {
        HTTP.post('category', {name: "New Category"})
            .then(res => ROOT.categories.push(res.data),
                err => console.log(err))
    }

    save() {
        ROOT.category.title = ROOT.edit['Title'];
        ROOT.category.description = ROOT.edit['Description'];
        HTTP.put('category', ROOT.category).then((res, err) => err ? console.log(err) : alert("Saved Succesfully"));
        ROOT.app.editable = false;
    }

    remove() {
        HTTP.delete('category', {id: this.category.id})
            .then(() => _.remove(ROOT.categories, {id: this.category._id},
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