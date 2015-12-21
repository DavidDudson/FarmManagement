require('angular_carousel_css');

require('./scroll.scss');

class ScrollCtrl {
    constructor() {
    }
}

class ScrollDirective {
    constructor() {
        this.template = `
        <nav ng-controller="ScrollCtrl as scroll">
            <ul rn-carousel rn-carousel-auto-slide>
                <li ng-repeat="topic in app.topics track by $index">
                     <md-button class="md-raised"  ui-sref="topic({id: $index})">{{topic.title}}</md-button>
                </li>
            </ul>
        </nav>`;
        this.restrict = 'E';
    }
}

angular.module('app')
    .controller('ScrollCtrl', ScrollCtrl)
    .directive('navScroll', () => new ScrollDirective());

