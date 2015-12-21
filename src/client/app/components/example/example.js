class ExampleCtrl {
    constructor($stateParams) {
        this.id = $stateParams;
        // Todo retrieve example based on ID,
        // which will probably just be which element in the list it is
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("example:id" , {
                url:'/example',
                template: require('./example.html'),
                controller: ExampleCtrl
            })
    });