require('../card.scss');

class CardDirective {
    constructor() {
        this.template = require('./plain-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.scope = {
            save: '=',
            remove: '=',
            help: '='
        }
    }
}

angular.module('app')
    .directive('plainCard', () => new CardDirective);