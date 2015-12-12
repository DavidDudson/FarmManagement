var calculate = require('util/expression_parser.js');

require('./table.scss');

class TableCtrl {
    constructor(title, description) {
        this.table = {
            '': ['Price', 'Quantity'],
            'Lambs': [4450, 90],
            'Ewe Hoggets': [100, 100],
            'Two Tooths': [140, 115],
            'MA Ewes': [400, 120],
            '5+ Year Ewes': [400, 120]
        };

        this.title = title;
        this.description = description;
    }
}

class TableDirective {
    constructor() {
        this.template = require('./table.html');
        this.restrict = 'E';
        this.replace = true;
    }
}

angular.module('app')
    .controller('TableCtrl', TableCtrl)
    .directive('spreadsheet', () => new TableDirective);
