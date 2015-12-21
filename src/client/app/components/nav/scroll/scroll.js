require('angular_carousel_css');

require('./scroll.scss');

class ScrollCtrl {
    constructor(topics) {
        this.topics = topics;
    }
}

class ScrollDirective {
    constructor() {
        this.template = `
        <nav>
            <ul rn-carousel rn-carousel-auto-slide>
                <li>slide #1</li>
                <li>slide #2</li>
                <li>slide #3</li>
            </ul>
        </nav>`;
        this.restrict = 'E';
    }
}

angular.module('app')
    .controller('ScrollCtrl', ScrollCtrl)
    .directive('navScroll', () => new ScrollDirective());

