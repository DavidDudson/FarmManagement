var _ = require('lodash');

var HTTP = undefined;

class CategoryCtrl {
    constructor($http, $rootScope, topics, $stateParams) {
        this.category = _.find($rootScope.app.categories, {id: _.parseInt($stateParams.id)});
        this.title = this.category.title;
        this.id = this.category.id;
        this.description = this.category.description;
        this.topics = topics;
        HTTP = $http;
        $rootScope.app.topics = this.topics;
    }

    add() {
        HTTP.post('categories', {name: "New Category"})
            .then(res => this.categories.push(res.data),
                err => console.log(err))
    }

    save() {
        HTTP.put('categories', {category: this.category})
            .then(res => _.map(this.categories, cat => cat.id === this.category.id ? res.data : cat),
                err => console.log(err))
    }

    remove() {
        HTTP.delete('categories', {id: this.category.id})
            .then(() => _.remove(this.categories, {id: this.category.id},
                err => console.log(err)))
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("top", {
                url: '/category/{id}',
                template: require('./category.html'),
                controller: CategoryCtrl,
                controllerAs: "category",
                resolve: {
                    topics: ($http, $stateParams) => $http.get("/category?id=" + $stateParams.id)
                        .then(res => res.data, err => console.log(err))
                }
            })
    });