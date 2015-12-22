require('angular_carousel_css');

require('./scroll.scss');

class ScrollDirective {
    constructor() {
        this.template = require('./scroll.html');
        this.restrict = 'E';
    }
}

angular.module('app')
    .directive('navScroll', () => new ScrollDirective());

