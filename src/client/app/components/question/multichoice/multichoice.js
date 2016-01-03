class MultichoiceDirective {
    constructor() {
        this.template = require('./multichoice.html');
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            options: '=',
            answer: '='
        }
    }
}

angular.module('app')
    .directive('multichoice', () => new MultichoiceDirective);