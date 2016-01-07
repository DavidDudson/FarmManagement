var _ = require('lodash');

class CategoryCtrl {
    constructor($rootScope, $scope ,$stateParams) {
        var category = _.find($rootScope.app.categories, {id: _.parseInt($stateParams.id)});
        this.title = category.title;
        this.id = category.id;
        this.description = category.description;
        this.topics = $scope.topicsPromise.data
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("top" , {
                url:'/category/{id}',
                template: require('./category.html'),
                controller: CategoryCtrl,
                controllerAs: "category",
                resolve: {
                    topicsPromise : ($http, $stateParams) => $http.get("/category?id=" + $stateParams.id)
                }
            })
    });