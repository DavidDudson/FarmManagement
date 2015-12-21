var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');
require('angular_material_design_icons');

var ngTouch = require('angular-touch');
var carousel = require('angular-carousel');

var uiRouter = require('angular-ui-router');

var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");

var _ = require('lodash');


class AppCtrl {
    constructor() {
        this.name = 'farmFINANZ';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.editable = true;
        this.topics = require('./example.json'); // Todo Add Call to database which returns example Json if nothing exists
    }

    addTopic(topic) {
        this.topics.push(topic)
    }

    removeTopic(topic) {
        _.remove(this.topics, topic)
    }

    getTopic(name) {
        return _.find(this.topics, q => q.name === name)
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial, 'angular-carousel', uiRouter])
    .controller('AppCtrl', AppCtrl);

require("./components/landing/landing");

require("./components/table/table");

require("./components/nav/scroll/scroll");

require("./components/nav/bottom/bottom");

require("./components/introduction/introduction");