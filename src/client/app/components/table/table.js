class TableCtrl {
    constructor() {
        this.randomthing = test;
    }
}

class TableDirective {
    constructor() {
        this.template = '<div>I\'m a directive!</div>';
        this.restrict = 'E';
    }
}

angular.module('app')
    .controller('TableCtrl', TableCtrl)
    .controller('AppCtrl', TableDirective);
