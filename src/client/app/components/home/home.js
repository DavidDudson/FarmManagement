require('./home.scss');
var _ = require('lodash');

class HomeCtrl {
    constructor($rootScope) {
        this.description = "Welcome to FarmFINANZ!\n\nTake your knowledge to the next level. The fundamentals in Farm Management are about getting the maths right.\n\nWe are here to assist you in every aspect of farm finance. We have a series of tutorials, Topics and calculators that help you to get or refresh the knowledge you need to meet the challenges of farming today. We can help you to sharpen your maths skills in every field of farm management, ultimately to identify business opportunities and define future goals. Best of all, you’ll be learning from Massey professionals in this field, who developed the Topics with you in mind.";

        this.save = () => {
            this.description = $rootScope.edit['HomeDescription'];
            console.log("This will be saved to the db in the future");
        };

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
        }, {
            title: "Dairy World Milk Price Averages (USD)",
            series: ["Butter", "Ched", "SMP", "WMP", "All"],
            data:[[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3,726, 4,081, 4,550, 4,425, 4,721, 4,409, 3,846, 3,743, 3,925, 3,707, 3,693, 3,499, 3,614, 3,710, 3,911, 3,915, 3,780, 3,529, 3,583, 3,750, 4,051, 4,223, 4,657, 4,745, 4,586, 4,746, 4,534, 4,040, 3,832, 3,892, 3,667, 3,634, 3,699, 3,181, 3,144, 2,800, 2,940, 2,753, 2,698, 2,514, 2,614, 2,505, 2,656, 2,849, 3,145, 3,558, 3,564, 3,783, 3,823, 3,912, 3,555, 3,259, 3,026, 3,005, 2,911, 2,619, 2,707, 2,694, 2,460, 2,293, 2,541, 2,746, 3,108, 3,037, 2,850, 2,574, 2,709, 3,009],
                [4,315, 4,220, 4,270, 4,066, 4,049, 3,800, 3,497, 3,406, 3,518, 3,572, 3,601, 3,598, 3,776, 3,640, 3,559, 3,497, 3,114, 3,371, 2,937, 2,940, 2,857, 3,189, 3,117, 3,060, 2,986, 3,159, 3,401, 3,593, 3,589, 3,300, 2,990, 3,037, 3,436, 3,372, 3,510, 3,458, 3,496, 3,525, 3,554, 3,827, 4,315, 4,622, 4,753, 4,800, undefined, 4,877, 4,578, 4,395, 4,475, 4,335, 4,375, 4,257, 4,295, 4,389, 4,326, 4,380, 4,584, 4,501, 4,569, 4,656, 5,133, 4,935, 4,845, 4,837, 4,641, 4,438, 4,273, 4,195, 4,108, 4,236, 4,381, 4,226, 4,164, 3,742, 3,453, 3,275, 3,077, 3,028, 3,007, 2,728, 2,861, 3,017, 3,002, 3,090, 2,961, 2,636, 3,054, 3,377, 3,130, 2,787, 2,888, 3,012, 2,745, 3,055, 3,128, 3,060, 2,613, 2,663, 2,778, 2,913, 3,206, 3,234, 3,163, 2,987, 2,874, 2,829],
                [2,927, 3,672, 3,612, 3,462, 3,067, 2,770, 3,197, 3,229, 3,221, 3,072, 3,021, 3,096, 3,060, 3,128, 3,492, 3,579, 3,913, 3,898, 3,977, 3,816, 3,763, 3,771, 3,909, 3,824, 4,372, 3,994, 3,704, 3,488, 3,479, 3,438, 3,444, 3,230, 3,193, 3,292, 3,292, 3,354, 3,424, 3,312, 3,269, 3,351, 3,296, 3,259, 3,194, 3,125, 3,078, 2,871, 2,730, 2,573, 3,011, 2,834, 2,599, 2,727, 2,805, 3,023, 3,211, 3,339, 3,309, 3,325, 3,449, 3,402, 3,362, 3,419, 3,572, 3,552, 3,554, 3,592, 3,759, 4,050, 5,142, 4,757, 4,280, 4,252, 4,164, 4,284, 4,441, 4,566, 4,451, 4,426, 4,420, 4,330, 4,491, 4,541, 4,559, 4,583, 4,791, 4,868, 4,688, 4,698, 4,746, 4,780, 4,658, 4,584, 4,126, 3,969, 3,873, 3,733, 3,863, 3,855, 3,810, 3,516, 3,264, 2,874, 2,600, 2,619, 2,540, 2,462, 2,457, 2,299, 2,423, 2,320, 2,386, 2,389, 2,598, 2,744, 2,935, 2,731, 2,467, 2,253, 2,048, 1,992, 1,982, 1,978, 1,875, 1,702, 1,419, 1,521, 1,698, 1,992, 2,267, 2,178, 2,018, 1,851, 1,918],
                [4,395, 3,843, 3,306, 2,917, 2,585, 2,224, 2,017, 1,851, 2,158, 2,235, 2,144, 1,886, 1,829, 2,301, 2,858, 3,022, 3,437, 3,560, 3,309, 3,256, 3,281, 3,969, 3,932, 3,790, 3,224, 2,974, 3,522, 3,602, 3,521, 3,484, 3,495, 3,447, 3,556, 3,620, 3,750, 3,780, 3,995, 4,320, 4,619, 4,105, 3,878, 3,912, 3,859, 3,863, 3,780, 3,888, 3,638, 3,475, 3,474, 3,385, 3,314, 3,345, 3,309, 3,503, 3,487, 3,574, 3,637, 3,589, 3,554, 3,562, 3,533, 3,421, 3,409, 3,316, 3,227, 2,847, 2,776, 2,546, 2,763, 2,886, 2,760, 2,584, 2,675, 2,870, 2,978, 3,036, 3,167, 3,421, 3,352, 3,276, 3,170, 3,147, 3,199, 3,288, 3,468, 3,654, 4,298, 5,116, 5,100, 5,245, 4,721, 4,722, 4,643, 4,668, 4,757, 5,058, 5,021, 5,124, 5,058, 5,096, 5,208, 5,058, 4,891, 4,870, 5,035, 4,958, 4,934, 4,943, 5,005, 4,999, 4,703, 4,439, 4,033, 3,990, 3,928, 3,877, 3,594, 3,658, 3,459, 3,088, 2,725, 2,804, 2,673, 2,692, 2,443, 2,503, 2,522, 2,400, 2,229, 2,270, 2,307, 2,402, 2,874, 3,272, 3,241, 2,928, 2,538, 2,446, 2,386, 2,390, 2,309, 2,327, 2,054, 1,848, 1,590, 1,856, 2,078, 2,495, 2,824, 2,694, 2,453, 2,148, 2,260],
                [4,395, 3,843, 3,306, 2,917, 2,585, 2,224, 2,017, 1,851, 2,158, 2,235, 2,144, 1,886, 1,829, 2,301, 2,858, 3,022, 3,593, 3,669, 3,472, 3,369, 3,259, 3,986, 3,981, 3,880, 3,344, 3,080, 3,562, 3,663, 3,591, 3,506, 3,542, 3,522, 3,594, 3,690, 3,908, 3,960, 4,246, 4,540, 4,826, 4,443, 4,280, 4,293, 4,367, 4,443, 4,306, 4,324, 4,017, 3,796, 3,716, 3,660, 3,580, 3,499, 3,449, 3,540, 3,511, 3,617, 3,737, 3,688, 3,654, 3,701, 3,666, 3,545, 3,576, 3,396, 3,277, 2,983, 2,843, 2,618, 2,899, 3,042, 2,787, 2,756, 2,797, 3,054, 3,174, 3,249, 3,285, 3,399, 3,387, 3,348, 3,290, 3,311, 3,357, 3,442, 3,598, 3,756, 4,216, 4,683, 4,966, 4,968, 4,597, 4,549, 4,443, 4,598, 4,643, 4,828, 4,847, 4,941, 4,891, 4,880, 4,980, 4,888, 4,797, 4,805, 4,973, 4,990, 4,943, 5,025, 5,042, 5,016, 4,794, 4,563, 4,124, 4,047, 3,950, 3,873, 3,756, 3,807, 3,595, 3,309, 3,025, 3,000, 2,787, 2,795, 2,599, 2,640, 2,649, 2,561, 2,513, 2,609, 2,709, 2,758, 3,042, 3,366, 3,374, 3,136, 2,746, 2,620, 2,515, 2,472, 2,412, 2,409, 2,276, 2,082, 1,815, 1,974, 2,226, 2,568, 2,834, 2,735, 2,569, 2,345, 2,419]],
            labels: ["2 Jul 2008", "5 Aug 2008, 2 Sep 2008", "1 Oct 2008", "4 Nov 2008", "2 Dec 2008", "6 Jan 2009", "3 Feb 2009", "3 Mar 2009", "1 Apr 2009", "12 May 2009", "2 Jun 2009", "1 Jul 2009", "4 Aug 2009", "1 Sep 2009", "6 Oct 2009", "3 Nov 2009", "1 Dec 2009", "5 Jan 2010", "2 Feb 2010", "2 Mar 2010", "6 Apr 2010", "4 May 2010", "1 Jun 2010", "6 Jul 2010", "3 Aug 2010", "1 Sep 2010", "15 Sep 2010", "5 Oct 2010", "19 Oct 2010", "2 Nov 2010", "16 Nov 2010", "1 Dec 2010", "15 Dec 2010", "4 Jan 2011", "18 Jan 2011", "1 Feb 2011", "15 Feb 2011", "1 Mar 2011", "15 Mar 2011", "5 Apr 2011", "19 Apr 2011", "3 May 2011", "17 May 2011", "1 Jun 2011", "15 Jun 2011", "5 Jul 2011", "19 Jul 2011", "2 Aug 2011", "16 Aug 2011", "6 Sep 2011", "20 Sep 2011", "4 Oct 2011", "18 Oct 2011", "1 Nov 2011", "15 Nov 2011", "6 Dec 2011", "20 Dec 2011", "3 Jan 2012", "17 Jan 2012", "1 Feb 2012", "15 Feb 2012", "6 Mar 2012", "20 Mar 2012", "3 Apr 2012", "17 Apr 2012", "1 May 2012", "15 May 2012", "5 Jun 2012", "19 Jun 2012", "3 Jul 2012", "17 Jul 2012", "1 Aug 2012", "15 Aug 2012", "4 Sep 2012", "18 Sep 2012", "2 Oct 2012", "16 Oct 2012", "6 Nov 2012", "20 Nov 2012", "4 Dec 2012", "18 Dec 2012", "2 Jan 2013", "16 Jan 2013", "5 Feb 2013", "19 Feb 2013", "5 Mar 2013", "19 Mar 2013", "2 Apr 2013", "16 Apr 2013", "1 May 2013", "15 May 2013", "4 Jun 2013", "18 Jun 2013", "2 Jul 2013", "16 Jul 2013", "6 Aug 2013", "20 Aug 2013", "3 Sep 2013", "17 Sep 2013", "1 Oct 2013", "15 Oct 2013", "5 Nov 2013", "19 Nov 2013", "3 Dec 2013", "17 Dec 2013", "7 Jan 2014", "21 Jan 2014", "4 Feb 2014", "18 Feb 2014", "4 Mar 2014", "18 Mar 2014", "1 Apr 2014", "15 Apr 2014", "6 May 2014", "20 May 2014", "3 Jun 2014", "17 Jun 2014", "1 Jul 2014", "15 Jul 2014", "5 Aug 2014", "19 Aug 2014", "2 Sep 2014", "16 Sep 2014", "1 Oct 2014", "15 Oct 2014", "4 Nov 2014", "18 Nov 2014", "2 Dec 2014", "16 Dec 2014", "6 Jan 2015", "20 Jan 2015", "3 Feb 2015", "17 Feb 2015", "3 Mar 2015", "17 Mar 2015", "1 Apr 2015", "15 Apr 2015", "5 May 2015", "19 May 2015", "2 Jun 2015", "16 Jun 2015", "1 Jul 2015", "15 Jul 2015", "4 Aug 2015", "18 Aug 2015", "1 Sep 2015", "15 Sep 2015", "6 Oct 2015", "20 Oct 2015", "3 Nov 2015", "17 Nov 2015", "1 Dec 2015"],
            source: "www.globaldairytrade.info"
        }]
    }
}


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
                    categories: ($http, $rootScope) => $http.get("/categories")
                }
            });
    });