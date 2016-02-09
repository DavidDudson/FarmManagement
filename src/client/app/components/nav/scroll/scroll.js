require('./scroll.scss');

var HTTP = undefined;
var ROOT = undefined;

class ScrollCtrl {
    constructor($rootScope, $http, categories) {

        HTTP = $http;
        ROOT = $rootScope;
        this.categories = categories.data;

        this.index = 0;
        this.displayCount = () => $rootScope.app.editable === true ? 4 : 5;

        this.centerIndex = function (id) {
            this.index = id;
            this.scrollRight();
            this.scrollRight();
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
            console.log(first);
            return first
        };

        $rootScope.nav = this;
    }

    addCategory() {
        HTTP.post('/category', {"title": "New Category", "description": "New Description"})
            .then(res => {
                ROOT.nav.categories.push(res.data);
                ROOT.app.showToast("Create Category Succeeded");
            }, err => {
                if (err.status === 500) {
                    ROOT.app.showToast("Create Category Failed: Server Crash");
                } else if (err.status == 418) {
                    ROOT.app.showToast("Create Category Failed: New Category already exists");
                } else {
                    ROOT.app.showToast("Create Category Failed: " + err.status);
                }
            })
    }
}

 module.exports = {
        template: require('./scroll.html'),
        controller: ScrollCtrl,
        controllerAs: "nav"
    };

