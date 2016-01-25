require('normalize');

var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

require('angular-ui-router');

require('accordion');
require('accordion_css');

require('angular-material-data-table');
require("angular_data_table_css");

require("angular_chart_css");
require("angular_chart");

require("bootstrap_css");


var uibs = require('angular-ui-bootstrap');

require("./app.scss");

var _ = require('lodash');

class AppCtrl {
    constructor($rootScope) {
        this.name = 'farmFINANZ';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.editable = false;
        this.isMobile = false;
        this.isAdmin = true;
        this.images = [require('images/Cows.jpg'), require('images/CowshedDude.jpg')];
        $rootScope.app = this;
    }
}

angular.module('app', [ngAnimate, ngMaterial, 'ui.router', 'md.data.table', 'vAccordion', 'chart.js', uibs])
    .controller('AppCtrl', AppCtrl)
    .config(ChartJsProvider => {
            ChartJsProvider.setOptions({
                colours: ["#004b8d", "#e4a024", "#c6bc89", "#d95f00", "#983222", "#a2ad00"],
                responsive: true,
                maintainAspectRatio: false,
                datasetFill : false
            })
        });

var requireAll = r => r.keys().forEach(r);

requireAll(require.context('./components/', true, /\.js$/));

require("util/preload/preload");