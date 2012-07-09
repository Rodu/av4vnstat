/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 08/07/12
 * Time: 14:15
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.controller.BasicChartController = function ($scope) {
    'use strict';
    var visibleChart = 'description',
        VISIBILITY = RODU.av4vnstat.CONFIG.VISIBILITY,
        DELAY = 150, // milliseconds

        show = function (id) {
            $scope.chart[visibleChart].visible = VISIBILITY.HIDE;
            $scope.chart[id].visible = VISIBILITY.SHOW;
            visibleChart = id;
        },
        
        bindChart = function (chart, ChartClass) {
            /*
             * This delay is necessary because HighChart wont see the
             * DOM manupulated by AngualrJS and there will be errors
             * in measuring the elements containing the charts without
             * this delay.
             */
            window.setTimeout(function(){
                var instance; // to make JSLint happy...
                if (!chart.bound)
                {
                    instance = new ChartClass();
                    chart.bound = true;
                }
            }, DELAY);
        };

    $scope.chart = {
        description: {visible:VISIBILITY.SHOW},
        hourlyChart: {visible:VISIBILITY.HIDE, bound: false},
        dailyChart: {visible:VISIBILITY.HIDE, bound: false},
        monthlyChart: {visible:VISIBILITY.HIDE, bound: false},
        topTenChart: {visible:VISIBILITY.HIDE, bound: false}
    };

    $scope.showDescription = function () {
        show('description');
    };

    $scope.showHourlyChart = function () {
        show('hourlyChart');
        
        if (!$scope.chart.hourlyChart.bound)
        {
            bindChart($scope.chart.hourlyChart, 
                      RODU.av4vnstat.visualization.HourlyChart);
        }
    };
    
    $scope.showDailyChart = function () {
        show('dailyChart');
        
        if (!$scope.chart.dailyChart.bound)
        {
            bindChart($scope.chart.dailyChart, 
                      RODU.av4vnstat.visualization.DailyChart);
        }
    };
    
    $scope.showMonthlyChart = function () {
        var monthlyChart;
        show('monthlyChart');
        
        if (!$scope.chart.monthlyChart.bound)
        {
            bindChart($scope.chart.monthlyChart, 
                      RODU.av4vnstat.visualization.MonthlyChart);
        }
    };
    
    $scope.showTopTenChart = function () {
        var topTenChart;
        show('topTenChart');
        
        if (!$scope.chart.topTenChart.bound)
        {
            bindChart($scope.chart.topTenChart, 
                      RODU.av4vnstat.visualization.TopTenChart);
        }
    };
};
