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
        VISIBILITY = RODU.av4vnstat.constants.VISIBILITY,

        show = function (id) {
            $scope.chart[visibleChart].visible = VISIBILITY.HIDE;
            $scope.chart[id].visible = VISIBILITY.SHOW;
            visibleChart = id;
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
        var hourlyChart;
        show('hourlyChart');

        if (!$scope.chart.hourlyChart.bound)
        {
            hourlyChart = new RODU.av4vnstat.visualization.HourlyChart();
            $scope.chart.hourlyChart.bound = true;
        }
    };
    
    $scope.showDailyChart = function () {
        var dailyChart;
        show('dailyChart');
        
        if (!$scope.chart.dailyChart.bound)
        {
            dailyChart = new RODU.av4vnstat.visualization.DailyChart();
            $scope.chart.dailyChart.bound = true;
        }
    };
    
    $scope.showMonthlyChart = function () {
        var monthlyChart;
        show('monthlyChart');
        
        if (!$scope.chart.monthlyChart.bound)
        {
            monthlyChart = new RODU.av4vnstat.visualization.MonthlyChart();
            monthlyChart.render();
            $scope.chart.monthlyChart.bound = true;
        }
    };
    
    $scope.showTopTenChart = function () {
        var topTenChart;
        show('topTenChart');
        
        if (!$scope.chart.topTenChart.bound)
        {
            topTenChart = new RODU.av4vnstat.visualization.TopTenChart();
            $scope.chart.topTenChart.bound = true;
        }
    };
};
