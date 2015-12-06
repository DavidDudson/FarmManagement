require('./table.scss');

class TableCtrl {
    constructor(title, description) {
        this.table = {};
        this.title = title;
        this.description = description;
    }

    calculate(value) {
        if (_.isString(value) && value === "") {
            return "";
        } else if (_.isNumber(value)){
            return value;
        } else {
            return "";
        }
    }
}

class TableDirective {
    constructor() {
        this.template = require('./table.html');
        this.restrict = 'E';
        this.replace = true;
    }
}

angular.module('app')
    .controller('TableCtrl', TableCtrl)
    .directive('spreadsheet', () => new TableDirective);
