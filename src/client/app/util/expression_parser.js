var _ = require('lodash');

var math = require('mathjs');

export default function calculate(expression) {
    if (expression.trim() === "") {
        return "";
    } else if (/^\d+$/.test(expression)){
        return expression;
    } else {
        return _parseExpression(expression);
    }
}

function _parseExpression(expression){
    var words = _.words(expression);
    console.log(_.parseInt(words[0]));
    if (words.length === 3 && words[1] === 'to') {
        return _.random(_.parseInt(words[0]), _.parseInt(words[2]));
    } else if (words.length === 4 && words[1] === 'to') {
        return _.random(_.parseInt(words[0]), _.parseInt(words[2])) + words[3];
    } else if (words.length === 3 && words[0] === 'sum'){
        return _parseSum(words);
    } else if (words.length === 3 && words[0] === 'avg'){
        return _parseAverage(words);
    } else {
        return math.eval(expression);
    }
}

function _parseAverage(words) {
    _.aerage
}

function _parseSum(words) {
    var value = words[2];
    if (words[1] === 'col'){
        if(_.contains(this.table[''], value)) {
            console.log("summing");
            return _.sum(this.table[value]);
        } else {
            return "Invalid col: " + value;
        }
    } else if ((words[1] === 'col')) {
        if(this.table.hasOwnProperty(value)) {
            console.log("summing");
            return _.sum(this.table[value]);
        } else {
            return "Invalid row: " + value;
        }
    }
}