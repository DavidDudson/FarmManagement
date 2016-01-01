require('../card.scss');

class CardDirective {
    constructor() {
        this.template = require('./plain-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
    }
}

angular.module('app')
    .directive('plainCard', () => new CardDirective);