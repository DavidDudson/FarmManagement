var exprParser = require('utilities/expression_parser.js');

var _ = require('lodash');

// Use Topological Sort to correctly order the dependecy graph and detect cycles
var tsort = require('tsort');

require('./table.scss');

class TableController {
    constructor($scope) {
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
        this.convertFromIndex = (row,col) => [String.fromCharCode(row + 65), col + 1].join("");
        this.convertToIndex = s => [this.convertLetterToIndex(s.match(/([A-Z])/)[0]), _.parseInt(s.match(/([0-9])/)[0]) - 1];
        this.convertLetterToIndex = s => s.charCodeAt(0) - 65;
        this.isTutorialExample = s => $scope.mode === 'tutorial' && this.isSpecialCell(s);
        this.isTestInput = s => $scope.mode === 'test' && this.isSpecialCell(s);
        this.isToolInput = s => $scope.mode === 'tool' && !this.isSpecialCell(s);
        this.isSpecialCell = s => s.match(/^\?.*/);
        this.isInput = s => this.isToolInput(s) || this.isTestInput(s);
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
        this.getInitial = (cell) => {
            if (cell.type === "input"){
                return 0;
            } else if (cell.raw.includes(" to ")) {
                return exprParser.parseRange(_.words(cell.raw)).value;
            } else {
                return _.trim(cell.raw, "? ")
            }
        };
        this.generateTable = () => {
            return this.rawTable.map((row, i) =>
                row.map((cell, j) => {

                    var cellData = {
                        raw: cell,
                        dependencies: this.getDependencies(cell),
                        row: i,
                        col: j,
                        index: this.convertFromIndex(j, i),
                        type: this.getType(cell)
                    };

                    cellData.current = this.getInitial(cellData);
                    cellData.calculated = cellData.current;

                    return cellData;
                })
            );
        };
        this.table = this.generateTable();
        this.flatTable = _(this.table).flatten().value();
        this.replaceVars = c => {
            if (_.isString(c.calculated)) {
                console.log("replace");
                console.log(c.calculated);
                c.dependencies.forEach(d => {
                    var find = _.find(this.flatTable, {"index" : d});
                    if (find == undefined) {
                        c.calculated = "Variable not found: " + d
                    } else {
                        c.calculated = c.current.split("[" + d + "]").join(find.calculated)
                    }
                });
            } else {
                console.log("Not String: ");
                console.log(c.current);
            }
        };
        this.refreshValues = () => {
            this.flatTable
                .filter(cell => cell.dependencies.length === 0)
                .forEach(cell => cell.calculated = exprParser.calculate(cell.current, this.table).value);
            this.sortedGraph.forEach(cellIndex => {
                var cell = _.find(this.flatTable, {index: cellIndex});
                this.replaceVars(cell);
                if (cell == undefined) {
                    cell.calculated = "Unknown cell: " + cellIndex
                } else {
                    this.replaceVars(cell);
                    cell.calculated = exprParser.calculate(cell.raw, this.table).value;
                }
            })
        };
        this.getTopHeadings = () => $scope.top == true ? this.table[0] : undefined;
        this.sortTable = () => {
            var graph = tsort();
            _(this.table).flatten()
                .filter(c => c.dependencies != [])
                .forEach(cell => {
                    cell.dependencies.forEach(dep => {
                        graph.add(cell.index, dep);
                    });
                });
            return graph.sort();
        };
        this.sortedGraph = this.sortTable().reverse();
        this.refreshValues();
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
