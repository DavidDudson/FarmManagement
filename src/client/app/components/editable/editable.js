require('./editable.scss');

var ROOT = undefined;
var SCOPE = undefined;

class EditableController {

    constructor($rootScope, $scope) {
        ROOT = $rootScope;
        SCOPE = $scope;
    }

    showButton() {
        if (ROOT.app.editable) {
            SCOPE.show = true;
        }
    };

    hideButton() {
        if (ROOT.app.editable) {
            SCOPE.show = false;
        }
    };
}

class EditableDirective {
    constructor() {
        this.template = require('./editable.html');
        this.restrict = 'E';
        this.controller = EditableController;
        this.controllerAs = "editable";
        this.link = (scope, element, attrs) => {
            scope.value = scope.$eval(attrs.value);
            scope.name = scope.$eval(attrs.name);
            scope.type = attrs.type;
            scope.description = scope.$eval(attrs.description);
        }
    }
}

angular.module('app')
    .directive('editable', () => new EditableDirective());