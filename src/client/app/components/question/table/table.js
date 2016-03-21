var exprParser = require('utilities/expression_parser.js');

var _ = require('lodash');

// Use Topological Sort to correctly order the dependecy graph and detect cycles
var tsort = require('tsort');
require('./table.scss');

class TableController {
    constructor($scope, $rootScope) {
        this.rawTable = $scope.data.map(rowData => rowData.rowContent);
        this.getDependencies = s => {
            var deps = s.match(/(\[[A-Z][0-9]+])/g);
            if (deps == null) {
                return [];
            } else {
                return deps.map(d => d.replace(/(\[|])/g,""));
            }
        };
        this.getType = cell => {
            if ((cell.isQuestion && $scope.mode == 'test') || (!cell.isQuestion && $scope.mode == 'tool')) {
                return "input";
            } else if (cell.isQuestion && $scope.mode == 'tutorial') {
                return "hover"
            } else {
                return "computed"
            }
        };
        this.convertFromIndex = (row,col) => [String.fromCharCode(row + 65), col + 1].join("");
        this.convertLetterToIndex = s => s.charCodeAt(0) - 65;
        this.getInitial = (cell) => {
            if ($scope.mode == 'tool' && cell.type == 'input') {
                return 0;
            } else if (cell.raw.includes(" to ") && cell.raw.match(/[0-9]/)) {
                return exprParser.parseRange(_.words(cell.raw)).value;
            } else {
                return cell.calculated
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
                        isQuestion: cell.includes("?"),
                        isPercentage: cell.includes("%"),
                        isDollar: cell.includes("$")

                    };

                    if (this.flatTable != undefined) {
                        cellData.input = _.find(this.flatTable, {index : cellData.index}).input;
                    }

                    cellData.calculated = _.toString(cellData.raw);

                    cellData.calculated = cellData.calculated.split("?").join("");
                    cellData.calculated = cellData.calculated.split("$").join("");
                    cellData.calculated = cellData.calculated.split("%").join("");
                    //Clear up any whitespace
                    cellData.calculated = _.trim(cellData.calculated);

                    cellData.type =  this.getType(cellData);
                    cellData.current = cellData.raw;

                    cellData.calculated = this.getInitial(cellData);
                    
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
                        if (c.isQuestion && $scope.mode == 'tool' && !!find.input) {
                            c.calculated = c.calculated.split("[" + d + "]").join(find.input);
                            console.log("Used input")
                        } else {
                            c.calculated = c.calculated.split("[" + d + "]").join(find.calculated)
                        }
                    }
                });
                if (c.calculated.match(/\[/)) {
                    console.error("Something is out of whack")
                }
            }
        };
        this.calculateValues = cell => {
            this.replaceVars(cell);
            if (cell == undefined) {
                cell.calculated = "Unknown cell: " + cell.index
            } else {
                this.replaceVars(cell);
                cell.calculated = exprParser.calculate(cell.calculated, this.table).value;
            }
        };
        this.refreshAllValues = () => {
            this.table = this.generateTable();
            this.flatTable = _(this.table).flatten().value();
            this.sortedGraph = this.sortTable();
            this.flatTable
                .filter(cell => cell.dependencies.length === 0)
                .forEach(cell => cell.calculated = exprParser.calculate(cell.calculated, this.table).value);
            this.sortedGraph.forEach(cellIndex => this.calculateValues(_.find(this.flatTable, {index: cellIndex})));
            this.generateQuestion();
        };
        this.updateInput = () => {
            this.refreshAllValues();
            // this.sortedGraph.forEach(cellIndex => this.calculateValues(_.find(this.flatTable, {index: cellIndex})));
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
            this.updateQuestion();
            this.answeredCorrectly = undefined;
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
            if (_.isUndefined($scope.question)) {
                console.log("Question Undefined")
            }
            $rootScope.question = {
                raw: $scope.question,
                calculated : $scope.question,
                dependencies: this.getDependencies($scope.question)
            };
            this.updateQuestion();
        };
        this.answeredCorrectly = undefined;
        this.checkAnswer = () => {
            var correct = _(this.flatTable).filter(c => c.raw.includes("?"))
                .every(c => c.input > c.calculated * 0.95 && c.input < c.calculated * 1.05);
            if (correct) {
                $rootScope.correctQuestions.push($scope.question._id)
            }
            this.answeredCorrectly = correct;
        };
        this.refreshAllValues();
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
