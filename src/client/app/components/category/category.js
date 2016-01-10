var _ = require('lodash');

class CategoryCtrl {
    constructor($rootScope, topics, $stateParams) {
        var category = _.find($rootScope.app.categories, {id: _.parseInt($stateParams.id)});
        this.title = category.title;
        this.id = category.id;
        this.description = category.description;
        this.topics = topics;
        $rootScope.app.topics = this.topics;
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