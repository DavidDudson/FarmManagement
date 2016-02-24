var exprParser = require('utilities/expression_parser.js');

var _ = require('lodash');

// Use Topological Sort to correctly order the dependecy graph and detect cycles
var tsort = require('tsort');

require('./table.scss');

class TableController {
    constructor($scope) {
        this.calculate = (expr) => exprParser.calculate(expr, this.table);
        this.rawTable = $scope.data.map(rowData => rowData.rowContent);
        this.getVars = s => s.match(/(\[[A-Z][0-9]])/g);
        this.getInitial = cell => (this.isToolInput(cell) || this.isTestInput()) ? 0 : cell;
        this.parse = s => this.calculate(this.replaceVars(_.trim(s, "? ")));
        this.convertFromIndex = (row,col) => [String.fromCharCode(row + 65), col + 1];
        this.convertToIndex = s => [this.convertLetterToIndex(s.match(/([A-Z])/)[0]), _.parseInt(s.match(/([0-9])/)[0]) - 1];
        this.convertLetterToIndex = s => s.charCodeAt(0) - 65;
        this.replaceVars = s => s.replace(new RegExp(this.getVarMapp.map(m => _.escapeRegExp(m[0])).join("|"),"g"), m => table);
        this.isTutorialExample = s => $scope.mode === 'tutorial' && this.isSpecialCell(s);
        this.isTestInput = s => $scope.mode === 'test' && this.isSpecialCell(s);
        this.isToolInput = s => $scope.mode === 'tool' && !this.isSpecialCell(s);
        this.isSpecialCell = s => s.match(/^\?.*/);
        this.isCalculateable = s => !this.isToolInput(s) && !this.isTestInput(s);
        this.computeTableValues = () => {
            console.log("Computing table values");
            var queue = _(this.table).flatten().sortBy(o => _.size(o.dependencies)).value();

            console.log(queue);

            while(queue.length > 0){
                var o = queue.shift();
                console.log("Got object:");
                console.log(o);

                var result = this.computeValue(o);
                if (result === false) {
                    console.log("Pushing Back onto queue: " + o.current);
                        // queue.push(o);
                } else {
                    console.log("Adding to calculated: " + result);
                    o.calculated = result;
                }
                console.log(queue);
            }
        };
        this.computeValue = o => {
            if (o.current.match(/^[A-Za-z ]+$/) !== null) {
                console.log("Compute: Basic " + o.current);
                return o.current
            } else {
                var x = (o.dependencies === null || this.dependenciesExist(o)) ? this.parse(this.replaceVars(o)) : false;
                console.log("Compute: " + x);
                console.log("Compute: " +  o.current);
                return x;
            }
        };
        this.dependenciesExist = o => _.every(o.dependencies, d => _.some(this.table, v => {
            return this.convertToIndex[v.row][v.col].calculated != undefined;
        }));
        this.table = this.rawTable.map((row, i) => row.map((cell, j) => {
            return {current: this.getInitial(cell), dependencies : this.getVars(cell), row : i, col : j};
        }));
        this.getTopHeadings = () => $scope.top == true ? this.table[0] : undefined;
        this.sortTable = () => {
            var graph = tsort();
            this.table
                .filter(c => c.dependencies != null && c.dependencies != undefined)
                .forEach(cell => {
                    var humanReadibleIndex = this.convertFromIndex(cell.row, cell.col);
                    cell.dependencies.forEach(dep => graph.add(humanReadibleIndex, dep));
                });

            console.log(graph.sort());
        };
        this.sortedGraph = this.sortTable();

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
