require('./scroll.scss');

class ScrollDirective {
    constructor() {
        this.template = require('./scroll.html');
        this.restrict = 'E';
        this.controller = 'ScrollCtrl';

        }
}

class ScrollCtrl {
    constructor($rootScope, $http) {

        this.categories = $http.get("/category");

        this.index = undefined;
        this.displayCount = () => $rootScope.app.editable === true ? 4 : 5;

        this.centerIndex = function (id) {
            $rootScope.category = _.find(this.categories, {id: id});
            this.index = id;
            this.scrollLeft();
            this.scrollLeft();
        };
        this.scrollLeft = function () {
            if (this.index === 0) {
                this.index = this.categories.length - 1;
            } else {
                this.index -= 1;
            }
        };
        this.scrollRight = function () {
            this.index += 1;
            this.index = this.index % this.categories.length;
        };
        this.selected = function () {
            var first = this.categories.slice(this.index);
            var displayCount = this.displayCount();
            if (first.length > displayCount) {
                first = first.slice(0, displayCount);
            } else if (first.length < displayCount) {
                var toAdd = displayCount - first.length;
                var second = this.categories.slice(0, toAdd);
                first = first.concat(second);
            }
            return first
        };

        $rootScope.nav = this;
    }
}

angular.module('app')
    .directive('navScroll', () => new ScrollDirective())
    .controller('ScrollCtrl', ScrollCtrl);

