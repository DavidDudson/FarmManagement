class AdminCtrl {
    constructor() {
        this.data = undefined;
    }

}

angular.module('app')
    .config(($stateProvider) => {
        $stateProvider
            .state("admin", {
                url: '/admin',
                views: {
                    '': {
                        template: require('./admin.html'),
                        replace: true,
                        controller: AdminCtrl,
                        controllerAs: 'admin'
                    },
                    'nav': ''
                }
            });
    });