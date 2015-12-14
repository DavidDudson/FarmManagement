var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

var ngTouch = require('angular-touch');
var carousel = require('angular-carousel');

var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");


class AppCtrl {
    constructor() {
        this.name = 'farmFINANZ';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial, 'angular-carousel'])
    .controller('AppCtrl', AppCtrl);

require("./components/table/table");

require("./components/nav/nav");