class IntroDirective {
    constructor() {
        this.template = require('./introduction.html');
        this.restrict = 'E';
    }
}

class IntroCtrl {
    constructor(descriptable) {
        this.title = descriptable.title;
        this.description = descriptable.description;
    }
}


angular.module('app')
    .controller('IntroCtrl', IntroCtrl)
    .directive('intro', () => new IntroDirective);