var exprParser = require('utilities/expression_parser.js');

var _ = require('lodash');

// Use Topological Sort to correctly order the dependecy graph and detect cycles
var tsort = require('tsort');
require('./table.scss');

class TableController {
    constructor($scope, $rootScope) {
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
        this.convertLetterToIndex = s => s.charCodeAt(0) - 65;
        this.isTutorialExample = s => $scope.mode === 'tutorial' && this.isSpecialCell(s);
        this.isTestInput = s => $scope.mode === 'test' && this.isSpecialCell(s);
        this.isToolInput = s => $scope.mode === 'tool' && !this.isSpecialCell(s);
        this.isSpecialCell = s => s.match(/^\?.*/);
        this.isInput = s => this.isToolInput(s) || this.isTestInput(s);
        this.getInitial = (cell) => {
            if (cell.raw.includes(" to ") && cell.raw.match(/[0-9]/)) {
                return exprParser.parseRange(_.words(cell.raw)).value;
            } else {
                return cell.raw
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

                    cellData.current = cellData.raw;
                    cellData.calculated = this.getInitial(cellData);

                    if (_.isString(cellData.calculated) && cellData.calculated.includes("? ")) {
                        cellData.calculated = _.trim(cellData.calculated, "? ")
                    }
                    return cellData;
                })
            );
        };
        this.table = this.generateTable();
        this.flatTable = _(this.table).flatten().value();
        this.replaceVars = c => {
            if (_.isString(c.calculated)) {
                c.dependencies.forEach(d => {
                    var find = _.find(this.flatTable, {"index" : d});
                    if (find == undefined) {
                        c.calculated = "Variable not found: " + d
                    } else {
                        c.calculated = c.calculated.split("[" + d + "]").join(find.calculated)
                    }
                });
                if (c.calculated.match(/\[/)) {
                    console.error("Something is out of whack")
                }
            } else {
                console.log("Not String: ");
                console.log(c.current);
            }
        };
        this.calculateValues = cell => {
            console.log("Calculating " + cell.index);
            this.replaceVars(cell);
            if (cell == undefined) {
                cell.calculated = "Unknown cell: " + cell.index
            } else {
                this.replaceVars(cell);
                cell.calculated = exprParser.calculate(cell.calculated, this.table).value;
            }
        };
        this.refreshAllValues = () => {
            this.flatTable
                .filter(cell => cell.dependencies.length === 0)
                .forEach(cell => cell.calculated = exprParser.calculate(cell.calculated, this.table).value);
            this.sortedGraph.forEach(cellIndex => this.calculateValues(_.find(this.flatTable, {index: cellIndex})));
        };
        this.getTopHeadings = () => $scope.top == true ? this.table[0] : undefined;
        this.sortTable = () => {
            var graph = tsort();
            _(this.table).flatten()
                .filter(c => c.dependencies != [])
                .forEach(cell => cell.dependencies.forEach(dep => graph.add(cell.index, dep)));
            return graph.sort().reverse();
        };
        this.sortedGraph = this.sortTable();
        this.updateCell = cell => {
            this.sortedGraph = this.sortTable();
            var indexOf = _.indexOf(this.sortedGraph, cell.index);
            this.sortedGraph
                .filter(c => _.indexOf(this.sortedGraph, cell.index) >= indexOf)
                .forEach(c => this.calculateValues(c));
            this.updateQuestion()
        };
        this.updateQuestion = () => {
            $rootScope.question.dependencies.forEach(d => {
                var find = _.find(this.flatTable, {"index" : d});
                if (find == undefined) {
                    console.error("Variable not found: " + d);
                } else {
                    $rootScope.question.calculated = $rootScope.question.calculated.split("[" + d + "]").join(find.calculated)
                }
            });
        };
        this.generateQuestion = () => {
            $rootScope.question = {
                raw: $scope.question,
                calculated : $scope.question,
                dependencies: this.getDependencies($scope.question)
            };
            this.updateQuestion();
            console.log("Update")
        };
        this.answeredCorrectly = false;
        this.checkAnswer = () => {
            var correct = _(this.flatTable).filter(c => c.raw.includes("? "))
                .every(c => c.input > c.calculated * 0.95 && c.input < c.calculated * 1.05);
            if (correct) {
                $rootScope.correctQuestions.push($scope.question._id)
            }
            this.answeredCorrectly = correct;
        };
        this.refreshAllValues();
        this.generateQuestion();
        $rootScope.spreadsheet = this;
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
            side : '=',
            question : '='
        };
        this.controller = TableController;
        this.controllerAs = 'table';
    }
}

angular.module('app')
    .directive('spreadsheet', () => new TableDirective);
