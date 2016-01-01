class PreloadDirective {
    constructor() {
        this.restrict = 'A';
        this.link = (scope, element) => {

            scope.$watch('ngSrc', () => {
                element.addClass('hidden');
                element.parent().append("<md-progress-circular class='preload' md-mode='indeterminate'></md-progress-circular>")
            });

            element.on('load', () => {
                element.removeClass('hidden');
                //element.parent().remove('.preload');
            });

        }
    }
}


angular.module('app')
    .directive('preload', () => new PreloadDirective);