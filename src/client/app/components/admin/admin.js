class AdminCtrl {
    constructor() {
        this.data = undefined;
    }

}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("admin", {
                url: '/home',
                views: {
                    'home': {
                        template: require('./admin.html'),
                        replace: true,
                        controller: AdminCtrl,
                        controllerAs: 'admin'
                    }
                }
            });
    });