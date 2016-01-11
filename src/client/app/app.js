require('normalize');

var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

require('angular-ui-router');
require('angular-material-data-table');

require("angular_data_table_css");

require("./app.scss");

var _ = require('lodash');

class AppCtrl {
    constructor($http, $rootScope) {
        this.name = 'farmFINANZ';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.editable = false;
        this.isMobile = false;
        this.isAdmin = true;
        this.images = [require('images/Cows.jpg'), require('images/CowshedDude.jpg')];
        this.categoryPromise = $http.get("/category");
        this.categories = this.categoryPromise.then(r => this.categories = r.data.categories, err => console.log(err));
        $rootScope.app = this;
    }

    save() {
        console.log("Saved"); //Todo
        this.editable = false;
    }

    help() {
        console.log("Help");
    }
}

angular.module('app', [ngAnimate, ngMaterial, 'ui.router', 'md.data.table'])
    .controller('AppCtrl', AppCtrl);

var requireAll = r => r.keys().forEach(r);

requireAll(require.context('./components/', true, /\.js$/));

require("util/preload/preload");