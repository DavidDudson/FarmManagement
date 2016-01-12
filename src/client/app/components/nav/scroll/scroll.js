require('./scroll.scss');

class ScrollDirective {
    constructor() {
        this.template = require('./scroll.html');
        this.restrict = 'E';
        this.controller = 'ScrollCtrl';
    }
}

class ScrollCtrl {
    constructor($rootScope) {

        // HACK: Dont init the controller until we are certain that the categories are available
        // Categories should really be in a service
        $rootScope.app.categoryPromise.then(() => {
            this.index = undefined;
            this.displayCount = () => $rootScope.app.editable === true ? 4 : 5;

            this.centerIndex = function (id) {
                this.index = id;
                this.scrollLeft();
                this.scrollLeft();
            };
            this.scrollLeft = function () {
                if (this.index === 0) {
                    this.index = $rootScope.app.categories.length - 1;
                } else {
                    this.index -= 1;
                }
            };
            this.scrollRight = function () {
                this.index += 1;
                this.index = this.index % $rootScope.app.categories.length;
            };
            this.selected = function () {
                var first = $rootScope.app.categories.slice(this.index);
                var displayCount = this.displayCount();
                if (first.length > displayCount) {
                    first = first.slice(0, displayCount);
                } else if (first.length < displayCount) {
                    var toAdd = displayCount - first.length;
                    var second = $rootScope.app.categories.slice(0, toAdd);
                    first = first.concat(second);
                }
                return first
            };

            $rootScope.nav = this;
        });
    }
}

angular.module('app')
    .directive('navScroll', () => new ScrollDirective())
    .controller('ScrollCtrl', ScrollCtrl);

