var _ = require('lodash');

var math = require('mathjs');

export default function calculate(expression, table) {
    if (expression.trim() === "") {
        return "";
    } else if (/^\d+$/.test(expression)) {
        return expression;
    } else {
        return _parseExpression(expression, table);
    }
}

function _parseExpression(expression, table) {
    var words = _.words(expression);
    if (words.length === 3 || words.length === 4 && words[1].match(/to/i)) {
        return _parseRange(words);
   } else if (words.length === 3 && words[0].match(/sum/i)) {
        return _parseSum(words, table);
    } else if (words.length === 3 && words[0].match(/avg/i)) {
        return _parseAverage(words, table);
    } else if (/^\d+$/.test(math.eval(expression))) {
        return math.eval(expression)
    } else {
        return "Invalid"
    }
}

function _parseAverage(words, table) {
    var values = _getList(words, table);
    console.log(values);
    if (!_.isNull(values)) {
        return _.sum(values) / values.length;
    } else {
        return "Invalid"
    }

}

function _parseSum(words, table) {
    var values = _getList(words, table);
    console.log(values);
    if (!_.isNull(values)) {
        return _.sum(values)
    } else {
        return "Invalid"
    }
}

function _parseRange(words) {
    return _.random(_.parseInt(words[0]), _.parseInt(words[2]))
}

function _getList(words, table) {
    if (words[1].match(/col/i)) {
        return _getCol(table, words[2])
    } else if (words[1].match(/row/i)) {
        return _getRow(table, words[2])
    }
    return "Invalid";
}

function _getCol(table, key) {
    var index = _.indexOf(table[''], key);
    if (~index) {
        return _(table).map((v, k) => table[k][index]).value();
    }
}

function _getRow(table, key) {
    return _.get(table, key)
}

class Failure {
    constructor(tooltip) {
        this.tooltip = tooltip;
        this.value = "Invalid"
    }
}

class Success {
    constructor(type, value) {
        this.value = value;
    }
}