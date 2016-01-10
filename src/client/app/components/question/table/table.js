var exprParser = require('util/expression_parser.js');

require('./table.scss');

class TableController {
    constructor($scope) {
        this.calculate = (expr) => exprParser.calculate(expr, $scope.data);
        this.getHeadings = () => {
            var sideHeadings = Object.keys($scope.data);
            var topLeft = sideHeadings[sideHeadings.length - 1];
            return [topLeft].concat($scope.data[topLeft])
        };
        this.dataSize = Object.keys($scope.data).length
    }
}

class TableDirective {
    constructor() {
        this.template = require('./table.html');
        this.restrict = 'E';
        this.replace = false;
        this.scope = {
            data : '=',
            answer : '='
        };
        this.controller = TableController;
        this.controllerAs = 'table';
    }
}

angular.module('app')
    .directive('spreadsheet', () => new TableDirective);
