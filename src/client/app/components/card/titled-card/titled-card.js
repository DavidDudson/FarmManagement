require('../card.scss');

class CardDirective {
    constructor() {
        this.template = require('./titled-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.scope = {
            title: '=',
            description: '='
        }
    }
}

angular.module('app')
    .directive('titledCard', () => new CardDirective);