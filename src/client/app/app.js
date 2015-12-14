var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");


class AppCtrl {
    constructor() {
        this.name = 'Farmville 9.0';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.parsed = "Default";
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial])
    .controller('AppCtrl', AppCtrl);

require("./components/table/table");
