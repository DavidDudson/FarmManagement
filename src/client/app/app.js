require('normalize');

var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

var uiRouter = require('angular-ui-router');

var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");

var _ = require('lodash');

class AppCtrl {
    constructor($rootScope) {
        this.name = 'farmFINANZ';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.editable = false;
        this.isMobile = false;
        this.isAdmin = false;
        this.images = [require('images/Cows.jpg'),require('images/CowshedDude.jpg')];
        this.categories = require('./example.json').categories; // Todo Add Call to database which returns example Json if nothing exists
        $rootScope.app = this;
    }

    addCategory(category) {
        this.categories.push(category)
    }

    removeCategory(category) {
        _.remove(this.categories, category)
    }

    getCategory(name) {
        return _.find(this.categories, q => q.name === name)
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial, uiRouter])
    .controller('AppCtrl', AppCtrl);

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./components/', true, /\.js$/));

require("util/preload/preload");