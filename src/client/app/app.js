var angular = require('angular');

require('angular-material');

var app = angular.module('StarterApp', []);

app.controller('AppController', ($mdSidenav) => {
    var vm = this;

    vm.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

});