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
        HTTP = $http;
        ROOT = $rootScope;
        $rootScope.category = this.category;
    }

    add() {
        HTTP.post('categories', {name: "New Category"})
            .then(res => ROOT.categories.push(res.data),
                err => console.log(err))
    }

    save() {
        HTTP.put('categories', {category: this.category})
            .then(res => _.map(ROOT.categories, cat => cat.id === this.category.id ? res.data : cat),
                err => console.log(err));
            ROOT.app.editable = false;
    }

    remove() {
        HTTP.delete('categories', {id: this.category.id})
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