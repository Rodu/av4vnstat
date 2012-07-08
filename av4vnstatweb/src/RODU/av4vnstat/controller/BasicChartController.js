/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 08/07/12
 * Time: 14:15
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.controller.BasicChartController = function ($scope) {
    'use strict';
    var SHOW = 'block',
        HIDE = 'none',
        visibleChart = 'description',

        show = function (id) {
            $scope.chart[visibleChart].visible = HIDE;
            $scope.chart[id].visible = SHOW;
            visibleChart = id;
        };

    $scope.chart = {
        description: {visible:SHOW},
        hourlyChart: {visible:HIDE},
        dailyChart: {visible:HIDE},
        monthlyChart: {visible:HIDE},
        toptenChart: {visible:HIDE}
    };

    $scope.showDescription = function () {
        show('description');
    };

    $scope.showHourlyChart = function () {
        show('hourlyChart');

        new Highcharts.Chart({
            chart: {
                backgroundColor: '#fde7e7',
                renderTo: RODU.av4vnstat.constants.ELEMENT_ID.CHARTS.HOURLY_DATA_CHART,
                type: 'column'
            },
            title: {
                text: 'Last 24 Hours Usage'
            },
            xAxis: {

                categories: RODU.av4vnstat.data.hourlyDataChart.categories
            },
            yAxis: {
                title: {
                    text: 'Traffic in MiB'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x + ' hrs - ' + this.y + ' MiB';
                }
            },
            series: RODU.av4vnstat.data.hourlyDataChart.series
        });
    };
};
