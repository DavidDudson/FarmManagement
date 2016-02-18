var exprParser = require('util/expression_parser.js');

var _ = require('lodash');

require('./table.scss');

class TableController {
    constructor($scope) {
        this.calculate = (expr) => {
            var x = exprParser.calculate(expr, this.table);
            console.log("calculate " + x.value);
            return x;
        };
        this.table = $scope.data.map(rowData => rowData.rowContent);
        this.getVars = s => s.match(/(\[[A-Z][0-9]])/g);
        this.dependencyTable = this.table.map((row, i) => row.map((cell, j) => {
            return {contents: cell, dependencies : this.getVars(cell), row : i, col : j};
        }));
        this.calculatedTable = Array.apply(null, new Array(this.table.length)).map(() => []);

        this.parse = s => this.calculate(this.replaceIfNotCyclic(_.trim(s, "? "))).value;
        this.convertToIndex = s => {
            var x = [this.convertLetterToIndex(s.match(/([A-Z])/)[0]), _.parseInt(s.match(/([0-9])/)[0]) - 1];
            console.log("ConvertToIndex: " + x);
            return x;
        };
        this.convertLetterToIndex = s => {
            var x = s.charCodeAt(0) - 65;
            console.log(x);
            return x;
        };
        this.getCell = s => {
            var indices = this.convertToIndex(s);
            console.log("getCell " + s);
            return this.table[indices[1]][indices[0]]
        };
        this.isCyclic = (wanted, current) => {
            var vars = this.getVars(current);
            if (!!vars) {
                return _.some(vars, v => v === wanted)
            } else {
                return false
            }
        };
        this.getVarMapping = s => {
            var x = _.uniq(this.getVars(s)).map(v => [v, this.getCell(v)]);
            console.log("Var Mapping " + x);
            return x;
        };
        this.replaceIfNotCyclic = s => {
            var x = this.isCyclic === true ? undefined : this.replaceVars(s);
            console.log("RINC " + x);
            return x;
        };
        this.replaceVars = s => {
            if(s.includes("[")) {
                var mapping = this.getVarMapping(s);
                console.log("Mapping: " + mapping);
                var re = new RegExp(mapping.map(m => _.escapeRegExp(m[0])).join("|"),"g");
                console.log("Regex " + re);
                s = s.replace(re, m => this.parse(_.find(mapping, v => v[0] === m)[1]));
                console.log("ReplaceVars S " + s);
                return s;
            }
            return s;
        };
        this.getTopHeadings = () => $scope.top == true ? this.table[0] : undefined;
        this.isTutorialExample = s => $scope.mode === 'tutorial' && this.isSpecialCell(s);
        this.isTestInput = s => $scope.mode === 'test' && this.isSpecialCell(s);
        this.isToolInput = s => $scope.mode === 'tool' && !this.isSpecialCell(s);
        this.isSpecialCell = s => s.match(/^\?.*/);
        this.isCalculateable = s => !this.isTutorialExample(s) && !this.isToolInput(s) && !this.isTestInput(s);
        this.computeTableValues = () => {
            console.log("Computing table values");
            var queue = _(this.dependencyTable).flatten().sortBy(o => _.size(o.dependencies)).value();

            console.log(queue);

            while(queue.length > 0){
                var o = queue.shift();
                console.log("Got object:");
                console.log(o);

                var result = this.computeValue(o);
                if (result === false) {
                    console.log("Pushing Back onto queue: " + o.contents);
                    queue.push(o);
                } else {
                    console.log("Adding to calculated: " + result);
                    this.calculatedTable[o.row][o.col] = result;
                }
                console.log(queue);
            }
        };
        this.computeValue = o => {
            if (o.contents.match(/^[A-Za-z ]+$/) !== null) {
                console.log("Compute: Basic " + o.contents);
                return o.contents
            } else {
                var x = (o.dependencies === null || this.dependenciesExist(o)) ? this.parse(o.contents) : false;
                console.log("Compute: " + x);
                console.log("Compute: " +  o.contents);
            }
        };
        this.dependenciesExist = o => _.every(o.dependencies, d => _.some(this.calculatedTable, v => this.convertToIndex(d) === [v.col, v.row]));
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
