class LineDirective {
    constructor() {
        this.template = require('./line.html');
        this.restrict = 'E';
        this.scope = {
            labels : '=',
            title : '=',
            data : '='
        }
    }
}

angular.module('app')
    .directive('lineChart', () => new LineDirective());