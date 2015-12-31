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
        this.images = [require('images/Cows.jpg'),require('images/CowshedDude.jpg')];
        this.topics = require('./example.json').topics; // Todo Add Call to database which returns example Json if nothing exists
        $rootScope.app = this;
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

angular.module('app', [ngTable, ngAnimate, ngMaterial, uiRouter])
    .controller('AppCtrl', AppCtrl);

require("./components/home/home");

require("./components/table/table");

require("./components/nav/scroll/scroll");

require("./components/nav/bottom/bottom");

require("./components/card/card");

require("./components/topic/topic");

require("./components/quiz/quiz");