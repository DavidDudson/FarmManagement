require('./titled-card.scss');

class CardDirective {
    constructor() {
        this.template = require('./titled-card.html');
        this.restrict = 'E';
        this.transclude = true;
        this.scope = {
            title: '=',
            description: '='
        }
    }
}

angular.module('app')
    .directive('card', () => new CardDirective);