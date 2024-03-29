require('../card.scss');

var ROOT = undefined;

class CardCtrl {
    constructor($rootScope) {
        ROOT = $rootScope;
    }

    save(fun) {
        if(ROOT.app.editable){
            fun(this.edits);
        } else {
            ROOT.app.editable = true
        }
    }
}

CardCtrl.$inject = ['$rootScope'];


class CardDirective {
    constructor() {
        this.template = require('./plain-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.controller = CardCtrl;
        this.controllerAs = 'card';
        this.link = (scope, element, attrs) => {
            scope.save = scope.$eval(attrs.save);
            scope.help = scope.$eval(attrs.help);
        };
    }
}


angular.module('app')
    .directive('plainCard', () => new CardDirective);