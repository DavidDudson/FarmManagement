class IntroDirective {
    constructor() {
        this.template = require('./introduction.html');
        this.restrict = 'E';
        this.scope = {
            title: '=title',
            description: '=description'
        }
    }
}

angular.module('app')
    .directive('intro', () => new IntroDirective);