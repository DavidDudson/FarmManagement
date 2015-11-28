var angular = require('angular');

var ngMaterial = require('angular-material');
require('angular_material_css');

var ngAnimate = require('angular-animate');

var ngTable = require('angular-material-data-table');

require("angular_data_table_css");

require("./app.sass");

angular.module('app', [ngTable, ngAnimate, ngMaterial])
    .controller('AppCtrl', ($scope) => {

        $scope.examples = [
            {title : 'SomeTitle', value : 35000},
            {title : 'SomeTitle2', value : 33000},
            {title : 'SomeTotal', value : 68000}
        ]
    });
