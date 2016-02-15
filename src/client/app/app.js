require('normalize');

require('jquery');

var angular = require('angular');

var ngAnimate = require('angular-animate');

require('accordion');
require('accordion_css');


require("bootstrap_css");

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

require('angular-ui-router');

require('xedit');
require('xedit_css');

require('angular-material-data-table');
require("angular_data_table_css");

require("angular_chart_css");
require("angular_chart");


var uibs = require('angular-ui-bootstrap');

require("./app.scss");

var _ = require('lodash');
var ROOT = undefined;
var TOAST = undefined;



class AppCtrl {
    constructor($rootScope, $mdToast) {
        this.name = 'farmFINANZ';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2016;
        this.editable = false;
        this.isMobile = false;
        this.isAdmin = true;
        this.images = [require('images/Cows.jpg'), require('images/CowshedDude.jpg')];
        $rootScope.app = this;
        TOAST = $mdToast;
        ROOT = $rootScope;
        $rootScope.getVector = s => require(`../vector/${s}.svg`);
    }

    showToast(text) {
        TOAST.show(
            TOAST.simple()
                .textContent(text)
                .position("Top Left")
                .hideDelay(1000)
        );
    }

    resetEdit() {
        ROOT.edit = {};
        ROOT.editingName = undefined;
        ROOT.app.editable = false;
    }
}

AppCtrl.$inject = ['$rootScope', '$mdToast'];

angular.module('app', [ngAnimate, ngMaterial, 'ui.router', 'md.data.table', 'vAccordion', 'chart.js', 'xeditable', uibs])
    .controller('AppCtrl', AppCtrl)
    .run((editableOptions) => editableOptions.theme = 'default')
    .config((ChartJsProvider) => {
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