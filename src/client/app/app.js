var angular = require('angular');

var ngAnimate = require('angular-animate');

var ngMaterial = require('angular-material');
require('angular_material_css');


var ngTable = require('angular-material-data-table');
require("angular_data_table_css");

require("./app.scss");

//Require all Components
function requireAll(r) { r.keys().forEach(r) }

// Broken :/
//requireAll(require.context('./components/', true, /\.(js|sass)$/));

class AppCtrl {
    constructor() {
        this.name = 'Farmville 9.0';
        this.authors = ['David J. Dudson', 'Anthony Crowcroft'];
        this.yearOfCreation = 2015;
        this.examples = [
            {title : 'SomeTitle', value : 35000},
            {title : 'SomeTitle2', value : 33000},
            {title : 'SomeTotal', value : 68000}
        ]
    }
}

angular.module('app', [ngTable, ngAnimate, ngMaterial])
    .controller('AppCtrl', AppCtrl);
