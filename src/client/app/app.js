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
        this.parsed = "Default";
        this.table = {
            '': ['Price', 'Quantity'],
            'Lambs': [4450, 90],
            'Ewe Hoggets': [100, 100],
            'Two Tooths': [140, 115],
            'MA Ewes': [400, 120],
            '5+ Year Ewes': [400, 120]
        };
        this.calculate = (expression, table) => {
            var result = calculate(expression, table);
            if (result instanceof Success) {
                return result.value
            } else {
                return result.value
            }
        }
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial])
    .controller('AppCtrl', AppCtrl);

require("./components/table/table");
