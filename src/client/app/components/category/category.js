var _ = require('lodash');

class CategoryCtrl {
    constructor($rootScope, $stateParams) {
        var category = _.find($rootScope.app.categories, {id: _.parseInt($stateParams.id)});
        this.title = category.title;
        this.id = category.id;
        this.description = category.description;
        this.Topiczes = category.Topiczes;
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("top" , {
                url:'/category/{id}',
                template: require('./category.html'),
                controller: CategoryCtrl,
                controllerAs: "category"
            })
    });