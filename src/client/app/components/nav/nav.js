require('angular_carousel_css');

class NavCtrl {
    constructor() {
        this.nav = [{"title" : "Topic One", "icon" : "image.jpg", "description" : "This is a descriptive topic"},
                    {"title" : "Topic Two", "icon" : "image.jpg", "description" : "This is a descriptive topic"}]

        ;
    }
}

class NavDirective {
    constructor() {
        this.template = "<nav> <ul rn-carousel class='image'> <li>slide #1</li> <li>slide #2</li> <li>slide #3</li> </ul> </nav>";
        this.restrict = 'E';
    }
}

angular.module('app')
    .controller('NavCtrl', NavCtrl)
    .directive('navScroll', NavDirective);

