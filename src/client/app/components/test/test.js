class TestCtrl {
    constructor($stateParams) {
        this.id = $stateParams;
        // Todo retrieve test based on ID,
        // which will probably just be which element in the list it is
    }
}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("test:id" , {
                url:'/test',
                template: require('./test.html'),
                controller: TestCtrl
            })
    });