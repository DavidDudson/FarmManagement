require('./bottom.scss');

class BottomDirective {
    constructor() {
        this.template = require('./bottom.html');
        this.restrict = 'E';
    }
}

angular.module('app')
    .directive('bottomNav', () => new BottomDirective());