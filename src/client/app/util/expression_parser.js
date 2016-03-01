
var _ = require('lodash');

var math = require('mathjs');

module.exports = {
    calculate: calculate,
    parseRange: _parseRange
};

class Failure {
    constructor(tooltip) {
        this.tooltip = tooltip;
        this.value = "Invalid"
    }
}

class Success {
    constructor(value) {
        this.value = value;
    }
}

function calculate(expression, table) {
    if (_.isUndefined(expression) || _.isUndefined(table)) {
        console.error("Table or expression undefined");
        console.error(table);
        console.error(expression)
    } else if (/^[a-zA-Z\s]+$/.test(expression)) {
        return new Success(expression);
    } else if (/^\d+$/.test(expression)) {
        return new Success(expression);
    } else if (expression.trim() === "") {
        return new Success("Empty");
    } else {
        return _parseExpression(expression, table);
    }
}

function _parseExpression(expression, table) {
    var words = _.words(expression);
    if ((words.length === 3 || words.length === 5) && words[1].match(/to/i)) {
        return _parseRange(words);
    } else if (words.length === 3 && words[0].match(/sum/i)) {
        return _parseSum(words, table);
    } else if (words.length === 3 && words[0].match(/avg/i)) {
        return _parseAverage(words, table);
    } else if (/^-?(\d|\.)+$/.test(math.eval(expression))) {
        return new Success(math.eval(expression))
    } else {
        return new Failure("Unknown Expression. Look at the help");
    }
}

function _parseAverage(words, table) {
    var values = _getList(words, table).value();
    if (_.all(values, v => /^\d+$/.test(v))) {
        return new Success(_.sum(values) / values.length);
    } else {
        return new Failure("The Row/Col does contains invalid numbers");
    }

}

function _parseSum(words, table) {
    console.log("Sum");
    var values = _getList(words, table).value();
    console.log(values);
    if (_.all(values, v => /^\d+$/.test(v))) {
        return new Success(_.sum(values));
    } else {
        return new Failure("The Row/Col does contains invalid numbers");
    }
}

function _parseRange(words) {

    var start = _.parseInt(words[0]);
    var end = _.parseInt(words[2]);
    var inc = _.parseInt(words[4]);

    if (start > end) {
        return new Failure("End is greater than start")
    }

    if (inc > start) {
        return new Failure("Increment not small enough")
    }

    if (!!words[4]) {
        var numbers = [];
        for(var n = _.parseInt(words[0]); n <= _.parseInt(words[2]); n += _.parseInt([words[4]])) {
            numbers.push(n);
        }

        var randomIndex = Math.floor(Math.random() * numbers.length);
        return new Success(numbers[randomIndex])
    } else {
        return new Success(_.random(start, end))
    }
}

function _getList(words, table) {
    if (words[1].match(/col/i)) {
        return new Success(_getCol(table, words[2]))
    } else if (words[1].match(/row/i)) {
        return new Success(_getRow(table, words[2]))
    }
    return new Failure("Either row or col must follow the sum/avg keywords");
}

function _getCol(table, key) {
    var index = _.indexOf(table[' '], key);
    console.log(index);
    if (~index) {
        return _(table)
            .map((v, k) => table[k][index])
            .value().pop().map(v => calculate(v, table).value);
    }
}

function _getRow(table, key) {
    return _.get(table, key).map(f => calculate(f, table).value)
}