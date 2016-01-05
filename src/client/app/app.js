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

require("./components/home/home");

require("./components/question/table/table");

require("./components/question/multichoice/multichoice");

require("./components/question/basic/basic");

require("./components/nav/scroll/scroll");

require("./components/nav/bottom/bottom");

require("./components/card/titled-card/titled-card");

require("./components/card/plain-card/plain-card");

require("./components/category/category");

require("./components/topic/topic");

require("util/preload/preload");