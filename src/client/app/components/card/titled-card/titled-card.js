require('../card.scss');

var ROOT = undefined;
var SCOPE = undefined;

class CardCtrl {
    constructor($rootScope, $scope) {
        ROOT = $rootScope
        SCOPE = $scope
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
        this.template = require('./titled-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.controller = CardCtrl;
        this.controllerAs = 'card';
        this.link = (scope, element, attrs) => {
            scope.save = scope.$eval(attrs.save);
            scope.help = scope.$eval(attrs.help);
            scope.title = scope.$eval(attrs.title);
            scope.description = scope.$eval(attrs.description);
        };
    }
}

angular.module('app')
    .directive('titledCard', () => new CardDirective);