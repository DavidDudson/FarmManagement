var exprParser = require('util/expression_parser.js');

require('./table.scss');

class TableCtrl {
    constructor(table) {

        this.table = table;

        this.calculate = (expr) => exprParser.calculate(expr, this.data);
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
