var exprParser = require('util/expression_parser.js');

require('./table.scss');

class TableController {
    constructor($scope) {
        this.calculate = (expr) => exprParser.calculate(expr, this.table);
        this.table = $scope.data.map(rowData => rowData.rowContent);
        this.getTopHeadings = () => $scope.top == true ? this.table[0] : undefined;
    }
}

class TableDirective {
    constructor() {
        this.template = require('./table.html');
        this.restrict = 'E';
        this.replace = false;
        this.scope = {
            data : '=',
            mode : '=',
            top : '=',
            side : '='
        };
        this.controller = TableController;
        this.controllerAs = 'table';
    }
}

angular.module('app')
    .directive('spreadsheet', () => new TableDirective);
