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
        toptenChart: {visible:VISIBILITY.HIDE, bound: false}
    };

    $scope.showDescription = function () {
        show('description');
    };

    $scope.showHourlyChart = function () {
        show('hourlyChart');

        if (!$scope.chart.hourlyChart.bound)
        {
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

            $scope.chart.hourlyChart.bound = true;
        }
    };
    
    $scope.showDailyChart = function () {
        show('dailyChart');
        
        if (!$scope.chart.dailyChart.bound)
        {
            new Highcharts.Chart({
                chart: {
                    backgroundColor: '#fde7e7',
                    renderTo: RODU.av4vnstat.constants.ELEMENT_ID.CHARTS.DAILY_DATA_CHART,
                    type: 'spline'
                },
                title: {
                    text: 'Last 30 Days Usage'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%e. %b'
                    }
                },
                yAxis: {
                    title: {
                       text: 'Traffic in MiB'
                    }
                },
                tooltip: {
                    formatter: function() {
                            return '<b>'+ this.series.name +'</b><br/>'+
                            Highcharts.dateFormat('%e %b', this.x) +' - '+ this.y + ' MiB';
                    }
                },
                series: RODU.av4vnstat.data.dailyDataChart.series
            });
          
            $scope.chart.dailyChart.bound = true;
        }
    };
    
    $scope.showMonthlyChartChart = function () {
        show('monthlyChart');
        
        if (!$scope.chart.dailyChart.bound)
        {
            
            
            $scope.chart.monthlyChart.bound = true;
        }
    };
};
