var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');

var rnCarousel = require('angular-carousel');

var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");


class AppCtrl {
    constructor() {
        this.name = 'Farmville 9.0';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.headings = ['', 'Price', 'Quantity'];
        this.examples = [
            ['Lambs', 4450, 90],
            ['Ewe Hoggets', 100, 100],
            ['Two tooths', 140, 115],
            ['MA Ewes', 400, 120],
            ['5+ yr Ewe', 250, 100]
        ]
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial, rnCarousel])
    .controller('AppCtrl', AppCtrl);

require("./components/table/table");
