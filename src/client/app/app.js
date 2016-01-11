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

    addCategory(name) {
        $http.post('categories', {name: name}).then(res => this.categories.push(res.data), err => console.log(err))
    }

    updateCategory(category) {
        $http.put('categories', {category: category})
            .then(res => _.map(this.categories, cat => cat.id === category.id ? res.data : cat),
                err => console.log(err))
    }

    removeCategory(category) {
        $http.delete('categories', {id: category.id})
            .then(() => _.remove(this.categories, {id: category.id},
                err => console.log(err)))
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial, uiRouter])
    .controller('AppCtrl', AppCtrl);

var requireAll = r => r.keys().forEach(r);

requireAll(require.context('./components/', true, /\.js$/));

require("util/preload/preload");