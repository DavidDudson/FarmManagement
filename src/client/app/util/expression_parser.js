
var _ = require('lodash');

var math = require('mathjs');

module.exports = {
    calculate: calculate,
    parseRange: _parseRange
};

class Failure {
    constructor(tooltip) {
        this.tooltip = tooltip;
        this.value = 1;
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
    } else if (/^\d+$/.test(expression)) {
        return new Success(expression);
    } else if (expression.trim() === "") {
        return new Success("Empty");
    } else {
        try {
            var result = _parseExpression(expression, table);
            if (result.value == "Invalid") {
                return new Success(expression);
            } else {
                return result
            }
        } catch(err) {

            return new Success(expression);
        }
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
    var values = _getList(words, table).value();
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

    if (end < start) {
        var x = end;
        end = start;
        start = x;
    }

    if (inc > Math.abs(end - start)) {
        return new Failure("Increment not small enough")
    }

    if (!!words[4]) {
        var numbers = [];
        for(var n = start; n <= end; n += inc) {
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
    if (~index) {
        return _(table)
            .map((v, k) => table[k][index])
            .value().pop().map(v => calculate(v, table).value);
    }
}

function _getRow(table, key) {
    return _.get(table, key).map(f => calculate(f, table).value)
}