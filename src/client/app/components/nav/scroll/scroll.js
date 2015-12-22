require('angular_carousel_css');

require('./scroll.scss');

class ScrollCtrl {
    constructor() {
    }
}

class ScrollDirective {
    constructor() {
        this.template = require('./scroll.html');
        this.restrict = 'E';
    }
}

angular.module('app')
    .controller('ScrollCtrl', ScrollCtrl)
    .directive('navScroll', () => new ScrollDirective());

