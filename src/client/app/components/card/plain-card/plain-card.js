require('../card.scss');

var ROOT = undefined;

class CardCtrl {
    constructor($rootScope) {
        ROOT = $rootScope
    }

    save(fun) {
        if(ROOT.app.editable){
            fun();
            ROOT.app.resetEdit()
        } else {
            ROOT.app.editable = true
        }
    }
}

class CardDirective {
    constructor() {
        this.template = require('./plain-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.controller = CardCtrl;
        this.controllerAs = 'card';
        this.scope = {
            save: '=',
            add: '=?',
            remove: '=?',
            help: '=?'
        }
    }
}

angular.module('app')
    .directive('plainCard', () => new CardDirective);