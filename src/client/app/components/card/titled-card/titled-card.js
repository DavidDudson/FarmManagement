require('../card.scss');

class CardDirective {
    constructor() {
        this.template = require('./titled-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.scope = {
            title: '=',
            description: '=',
            save: '=',
            remove: '=',
            help: '='
        }
    }
}

angular.module('app')
    .directive('titledCard', () => new CardDirective);