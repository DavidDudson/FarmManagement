class AdminCtrl {
    constructor() {
        this.login = function(){
            if (this.user.email && this.user.password) {
                $http.post('/local/login', {
                    "email": this.user.email,
                    "password": this.user.password
                }).then(function (response) {
                    if (response) {
                        if (response.data.user != false) {
                            $rootScope.user = response.data.user;
                        }
                    }
                });
            } else {
                console.log("A field did not pass validation");
            }
        };
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