var exprParser = require('utilities/expression_parser.js');

var _ = require('lodash');

// Use Topological Sort to correctly order the dependecy graph and detect cycles
var tsort = require('tsort');

require('./table.scss');

class TableController {
    constructor($scope) {
        this.calculate = (expr) => exprParser.calculate(expr, this.table);
        this.rawTable = $scope.data.map(rowData => rowData.rowContent);
        this.getDependencies = s => {
            var deps = s.match(/(\[[A-Z][0-9]])/g);
            if (deps == null) {
                return [];
            } else {
                return deps.map(d => d.replace(/(\[|])/g,""));
            }
        };


        this.getType = s => {
            if (this.isInput(s)) {
                return "input";
            } else if (this.isTutorialExample(s)) {
                return "hover"
            } else {
                return "computed"
            }
        };
        this.getInitial = cell => cell.type === "input" ? 0 : cell;
        this.parse = s => this.calculate(this.replaceVars(_.trim(s, "? ")));
        this.convertFromIndex = (row,col) => [String.fromCharCode(row + 65), col + 1].join("");
        this.convertToIndex = s => [this.convertLetterToIndex(s.match(/([A-Z])/)[0]), _.parseInt(s.match(/([0-9])/)[0]) - 1];
        this.convertLetterToIndex = s => s.charCodeAt(0) - 65;
        this.replaceVars = c => {
            c.current.map(d => d.replace(/(\[|])/g,""));
            c.dependencies.forEach(d => c.current.replace(d, _.find(this.table, {"index" : d})));
        };
        this.isTutorialExample = s => $scope.mode === 'tutorial' && this.isSpecialCell(s);
        this.isTestInput = s => $scope.mode === 'test' && this.isSpecialCell(s);
        this.isToolInput = s => $scope.mode === 'tool' && !this.isSpecialCell(s);
        this.isSpecialCell = s => s.match(/^\?.*/);
        this.isInput = s => !this.isToolInput(s) && !this.isTestInput(s);
        this.computeTableValues = () => {
            _(this.table).flatten().filter(c => c.dependencies === []).forEach(c => this.computeValue(c));
            console.log(this.sortedGraph);
            //TODO
        };
        this.computeValue = o => {
            if (o.current.match(/^[A-Za-z ]+$/) !== null) {
                console.log("Compute: Basic " + o.current);
                return o.current
            } else {
                var x = (o.dependencies === [] || this.dependenciesExist(o)) ? this.parse(this.replaceVars(o)) : false;
                console.log("Compute: " + x);
                console.log("Compute: " +  o.current);
                return x;
            }
        };
        this.dependenciesExist = o => _.every(o.dependencies, d => _.some(this.table, v => {
            return this.convertToIndex[v.row][v.col].calculated != undefined;
        }));
        this.table = this.rawTable.map((row, i) => row.map((cell, j) => {
            return {
                current: this.getInitial(cell),
                dependencies : this.getDependencies(cell),
                row : i,
                col : j,
                index : this.convertFromIndex(i, j),
                type : this.getType(cell)
            };
        }));
        this.getTopHeadings = () => $scope.top == true ? this.table[0] : undefined;
        this.sortTable = () => {
            var graph = tsort();
            _(this.table).flatten()
                .filter(c => c.dependencies != [])
                .forEach(cell => {
                    console.log(cell);
                    cell.dependencies.forEach(dep => {
                        console.log([cell.index,dep]);
                        graph.add(cell.index, dep);
                    });
                });

            console.log("TSORT GRAPH:");
            console.log(graph);
            graph.sort();
            console.log("Post TSORT: ");
            console.log(graph);
            return graph;
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
