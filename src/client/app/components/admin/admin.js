class AdminCtrl {
    constructor($rootScope, $http) {
        this.login = function(){
            if (this.user.email && this.user.password) {
                $http.post('/local/login', {
                    "email": this.user.email,
                    "password": this.user.password
                }).then(function (response) {
                    if (response) {
                        if (response.data.user != false) {
                            $rootScope.user = response.data.user;
                            if ($rootScope.user.privilege) {
                                $rootScope.app.isAdmin = true;
                            }
                        }
                    }
                });
            } else {
                console.err("A field did not pass validation");
            }
        };
        this.logout = function() {
            $http.post('/local/logout').then(function(response){
                if(response) {
                    $rootScope.user = undefined;
                    $rootScope.app.isAdmin = false;
                }
            });

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