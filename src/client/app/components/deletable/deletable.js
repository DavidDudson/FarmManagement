require('./deletable.scss');

var ROOT = undefined;
var SCOPE = undefined;

class DeletableController {

    constructor($rootScope, $scope) {
        ROOT = $rootScope;
        SCOPE = $scope;
    }

    static showButton() {
        if (ROOT.app.editable) {
            SCOPE.show = true;
        }
    };

    static hideButton() {
        if (ROOT.app.editable) {
            SCOPE.show = false;
        }
    };
}

class DeletableDirective {
    constructor() {
        this.template = require('./deletable.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.controller = DeletableController;
        this.controllerAs = "deletable";
        this.scope = {
            deleteFunc: '='
        }
    }
}

angular.module('app')
    .directive('editable', () => new DeletableDirective());