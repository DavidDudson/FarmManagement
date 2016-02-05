require('../card.scss');

var ROOT = undefined;
var SCOPE = undefined;

class CardCtrl {
    constructor($rootScope, $scope) {
        ROOT = $rootScope;
        SCOPE = $scope;
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
        this.link = (scope, element, attrs) => {
            scope.save = scope.$eval(attrs.save);
            scope.help = scope.$eval(attrs.help);
        };
    }
}

angular.module('app')
    .directive('plainCard', () => new CardDirective);