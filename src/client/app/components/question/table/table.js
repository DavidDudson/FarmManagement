var exprParser = require('util/expression_parser.js');

require('./table.scss');

class TableDirective {
    constructor() {
        this.template = require('./table.html');
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            table : '=',
            answer : '=?'
        };
        this.controller = () => {
            this.calculate = (expr) => exprParser.calculate(expr, this.scope.table)
        };
        this.controllerAs = 'table'
    }
}

angular.module('app')
    .directive('spreadsheet', () => new TableDirective);
