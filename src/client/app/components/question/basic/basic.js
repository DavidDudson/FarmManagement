class BasicDirective {
    constructor() {
        this.template = require('./basic.html');
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            answer: '='
        }
    }
}

angular.module('app')
    .directive('basic', () => new BasicDirective);