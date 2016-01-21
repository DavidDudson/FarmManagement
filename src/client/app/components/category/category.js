require('./category.scss');

var _ = require('lodash');

var HTTP = undefined;
var ROOT = undefined;

class CategoryCtrl {
    constructor($http, $rootScope, $stateParams) {
        this.category = _.find($rootScope.app.categories, {title: $stateParams.title});
        this.title = this.category.title;
        this.id = this.category.id;
        this.description = this.category.description;
        this.topics = topics;
        HTTP = $http;
        ROOT = $rootScope;
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
            .then(() => _.remove(ROOT.categories, {id: this.category.id},
                err => console.log(err)))
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("main.category", {
                url: '/category/{title}',
                template: require('./category.html'),
                controller: CategoryCtrl,
                controllerAs: "category",
                resolve: {
                    topics: ($http, $rootScope, $stateParams) => $http.get("/category/" + $stateParams.title)
                        .then(res => $rootScope.app.categories[$stateParams.title].topics = res.data, err => console.log(err))
                }
            })
    });