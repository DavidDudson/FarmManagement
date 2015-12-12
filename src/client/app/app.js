var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');

import calculate from 'util/expression_parser'
var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");


class AppCtrl {
    constructor() {
        this.name = 'Farmville 9.0';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.calculate = (expression) => {
            var value = calculate(expression);
            console.log(value);
            return value;
        }
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial])
    .controller('AppCtrl', AppCtrl);

require("./components/table/table");
