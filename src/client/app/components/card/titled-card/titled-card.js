require('../card.scss');

var ROOT = undefined;
var SCOPE = undefined;

class CardCtrl {
    constructor($rootScope, $scope) {
        ROOT = $rootScope;
        SCOPE = $scope;
        this.edits = {};

        this.updateModel = (name, data) => {
            console.log(data)
            this.edits[name] = data;
        };

        this.save = fun => {
            if(ROOT.app.editable === true){
                fun(this.edits);
            } else {
                ROOT.app.editable = true
            }
        }

    }
}

CardCtrl.$inject = ['$rootScope',  '$scope'];


class CardDirective {
    constructor() {
        this.template = require('./titled-card.html');
        this.restrict = 'E';
        this.replace = true;
        this.transclude = true;
        this.controller = CardCtrl;
        this.controllerAs = 'card';
        this.scope = {
            save: '=save',
            help: '=help',
            title: '=title',
            description: '=description'
        };
    }
}

angular.module('app')
    .directive('titledCard', () => new CardDirective);