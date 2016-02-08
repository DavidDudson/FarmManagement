require('./deletable.scss');

var ROOT = undefined;
var SCOPE = undefined;

class DeletableController {

    constructor($rootScope, $scope) {
        ROOT = $rootScope;
        SCOPE = $scope;
    }

    static showButton() {
        if (ROOT.app.editable === true) {
            SCOPE.show = true;
        }
    };

    static hideButton() {
        if (ROOT.app.editable === true) {
            SCOPE.show = false;
        }
    };

    deleteItem() {
        SCOPE.deleteFunc(SCOPE._id);
    }
}

class DeletableDirective {
    constructor() {
        this.template = require('./deletable.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.controller = DeletableController;
        this.controllerAs = "deletable";
        this.link = (scope, element, attrs) => {
            scope.deleteFunc = scope.$eval(attrs.deleteFunc);
            scope._id = scope.$eval(attrs._id);
        }
    }
}

angular.module('app')
    .directive('deletable', () => new DeletableDirective());