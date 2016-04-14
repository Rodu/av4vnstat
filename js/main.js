require([
'jquery', 'lib/highcharts', 'lib/angular-1.0.1.min',
'av4vnstat.min',
], function($) {
     angular.element(document).ready(function() {
        angular.bootstrap(document);
        new RODU.av4vnstat.Av4VnStat();
    });
});
