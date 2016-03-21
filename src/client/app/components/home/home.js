require('./home.scss');
var _ = require('lodash');

var ROOT = undefined;

class HomeCtrl {
    constructor($rootScope) {
        ROOT = $rootScope;
        this.description = `Welcome to farmFINANZ!\n\n
            Take your skills to the next level. The fundamentals in farm management are about getting the maths right.\n\n
            We are here to assist you in every aspect of farm finance. We have a series of tutorials, topics and calculators that help you to get or refresh the knowledge you need to meet the challenges of farming today. We can help you to sharpen your maths skills in the finance field of farm management. Best of all, you’ll be learning from Massey farm business management professionals in this field, who developed the topics with you in mind.\n\n
            Your options are to go in on a topic basis (see above) or farm type basis (“All questions” below).`;

        this.editDesc = null;

        this.save = () => {
            if (ROOT.app.editable === false) {
                console.error("Tried to make modifications while not editable");
                return
            }
            if (this.editDesc != null || this.editDesc != "") {
                $rootScope.app.showToast("This will be saved to the db in the future");
                this.description = this.editDesc;
                this.editDesc = null;
            } else {
                $rootScope.app.showToast("Invalid Description");
            }
        };

        this.updateModel = data => this.editDesc = data;

        this.shuffleGraphs = () => _.shuffle(this.graphs);

        this.graphs = [{
            title: "Price Indicators - Sheep - $ Per Head",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            series: ['Sales Prime Lamb', 'Sales Store Lamb', 'Sales Ewes MA Prime', 'Sales Ewes MA Store', "Sales Ewes 2th Prime", "Sales Ewes 2th Store"],
            data: [
                [53.79, 55.95, 87.80, 78.88, 112.27, 115.96, 81.17, 98.94, 91.10, 100.30],
                [40.45, 35.25, 68.59, 63.95, 89.38, 98.52, 58.82, 76.51, 65.90, 76.60],
                [37.65, 31.40, 47.67, 55.92, 90.52, 102.44, 66.68, 83.23, 75.70, 80.50],
                [44.13, 36.15, 54.00, 70.39, 96.47, 125.94, 76.33, 89.45, 89.90, 92.00],
                [46.35, 41.04, 55.50, 69.42, 93.06, 106.16, 66.20, 82.14],
                [76.66, 54.86, 107.70, 119.58, 143.64, 199.41, 115.64, 122.60, 116.60, 123.90]
            ],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Price Indicators - Sheep - Net Wool Cents Per kg Greasy",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            data: [[265.6, 260.4, 258.0, 249.9, 391.6, 417.3, 317.2, 373.5, 390.0, 435.0]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Price Indicators - Beef - $ Per Head",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            series: ['Sales Steer 1-1.5 yr Prime', 'Sales Steers 2 yr+ Prime', 'Sales Bull Beef Prime/Boner', 'Sales Cows Prime/Boner', "Sales Bull Beef 1 yr Store", "Sales Steers 1-1.5 yr Store", "Sales Heifers 1-1.5 yr Store"],
            data: [
                [812.46, 820.18, 899.22, 905.89, 1069.80, 1047.03, 988.53, 1096.66, 1353.00, 1483.00],
                [1020.16, 984.18, 1106.39, 1041.82, 1226.34, 1284.59, 1259.44, 1339.60, 1583.00, 1739.00],
                [974.36, 915.03, 1053.51, 1004.34, 1215.34, 1283.32, 1231.65, 1288.92, 1446.00, 1573.00],
                [531.18, 501.24, 599.56, 597.85, 784.61, 804.05, 746.38, 802.33, 897.00, 987.00],
                [650.62, 582.47, 660.44, 705.22, 772.38, 880.48, 839.64, 846.55],
                [660.44, 603.68, 671.21, 715.27, 798.72, 885.11, 797.55, 814.80, 1005.00, 1102.00],
                [583.10, 478.18, 569.22, 604.78, 801.69, 817.35, 679.13, 710.81, 817.00, 893.00]
            ],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Effective Area (Hectares)",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            data: [[645, 649, 649, 658, 663, 640, 635, 634, 634, 634]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Total Labour Units",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14"],
            data: [[1.72, 1.69, 1.68, 1.70, 1.68, 1.72, 1.69, 1.70]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Total Stock Units at Open",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            data: [[4268, 4251, 4046, 4020, 4047, 4042, 4039, 4066, 4202, 4085]]
        }, {
            title: "Stock Units Per Hectare",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            data: [[6.6, 6.6, 6.2, 6.1, 6.1, 6.3, 6.4, 6.4, 6.6, 6.4]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Production Indicators",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            series: ["Ewe Lambing %", "Hogget Labs as % Total Lambs", "Calving %", "Fawning %"],
            data: [[125.8, 122.5, 117.9, 127.9, 117.2, 125.2, 129.6, 126.8, 128.9, 126.1],
                [4.4, 3.3, 2.2, 3.4, 3.8, 4.6, 5.4, 4.4, 3.7, 3.6],
                [83.6, 81.6, 78.4, 80.0, 81.3, 80.5, 81.1, 84.3, 84.0, 85.5],
                [76.9, 80.0, 75.0, 83.3, 83.3, 80.0, 81.3, 68.8, 73.3, 69.2]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Shorn Wool Sold (kg)",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            series: ["Per Sheep", "Per Sheep su"],
            data: [[4.55, 4.45, 4.17, 4.97, 4.65, 4.71, 4.84, 4.56, 4.62, 4.59],
                [5.01, 4.88, 4.55, 5.42, 5.11, 5.19, 5.38, 5.08, 5.10, 5.06]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Economic Farm Surplus",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            series: ["$ Per Hectare", "$ Per Stock Unit"],
            data: [[-0.81, -26.18, 40.99, 41.31, 110.04, 185.59, 59.56, 119.06, 94.50, 108.81],
                [-0.12, -4.00, 6.58, 6.76, 18.03, 29.39, 9.36, 18.57, 14.26, 16.89]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Earning Before Interest Tax & Rent",
            labels: ["2006-07", "2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            series: ["$ Per Hectare", "$ Per Stock Unit"],
            data: [[129.64, 112.56, 187.92, 191.07, 261.05, 342.11, 220.46, 282.86, 263.05, 279.93],
                [19.59, 17.19, 30.14, 31.28, 42.77, 54.17, 34.66, 44.11, 39.69, 43.45]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Rate Of Return on Total Farm Capital %",
            labels: ["2007-08", "2008-09", "2009-10", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16"],
            data: [[-0.3, 0.5, 0.5, 1.4, 2.3, 0.7, 1.4, 1.0, 1.2]],
            source: "Beef + Lamb New Zealand Economic Service 2015"
        }, {
            title: "Dairy Farm Owner Operator Terms of Trade",
            series: ["Prices received index", "Prices paid index", "Terms of trade index"],
            labels: ["2003-04", "2004-05", "2005-06", "2006-07", "2007-08", "2008-09", "2009-10", "2010-11", "2011-12", "2012-13", "2013-14"],
            data: [[1000, 1096, 1046, 1042, 1767, 1308, 1512, 1793, 1668, 1588, 1896],
                [1000, 1032, 1094, 1127, 1243, 1308, 1328, 1357, 1431, 1449, 1488],
                [1000, 1063, 956, 925, 1422, 1000, 1138, 1322, 1166, 1096, 1274]],
            source: "Statistics New Zealand, Quotable Value, DairyNZ Economic Survey 2013-14"
        } , {
            title: "Dairy Farm Owner Operator Terms of Trade % change",
            labels: ["2004-05", "2005-06", "2006-07", "2007-08", "2008-09", "2009-10", "2010-11", "2011-12", "2012-13", "2013-14"],
            data: [[6.3, -10, -3.2, 53.7, -29.7, 13.9, 16.1, -11.8, -6, 16.3]],
            source: "Statistics New Zealand, Quotable Value, DairyNZ Economic Survey 2013-14"
        }]
    }
}

HomeCtrl.$inject = ['$rootScope'];



angular.module('app')
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise("/home");

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state("home", {
                url: '/home',
                views: {
                    '': {
                        template: require('./home.html'),
                        controller: HomeCtrl,
                        controllerAs: 'home'
                    },
                    'nav': require('components/nav/scroll/scroll.js')
                },
                resolve: {
                    categories: ($http, $rootScope) => $http.get("/categories"),
                    userData: ($http, $rootScope) => $http.get("/local/check")
                }
            });
    });