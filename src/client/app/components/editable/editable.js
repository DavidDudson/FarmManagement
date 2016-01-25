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
        this.replace = true;
        this.transclude = true;
        this.controller = EditableController;
        this.controllerAs = "editable";
        this.scope = {
            value: '=',
            name: '=',
            type: '=',
            description: '='
        }
    }
}

angular.module('app')
    .directive('editable', () => new EditableDirective());