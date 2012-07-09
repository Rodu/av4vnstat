/**
 * Main library namespace
 * 
 * @namespace
 */
//
// Av4VnStat
//      
// Copyright 2012 Roberto S. <greenheron@rocketmail.com>
//      
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//      
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//      
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
//
var RODU = RODU || {};

RODU.av4vnstat = {};

// Definition of application packages
RODU.av4vnstat.controller = {};
RODU.av4vnstat.data = {};
RODU.av4vnstat.visualization = {};
/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 07/07/12
 * Time: 14:49
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.Av4VnStat = function(){
    'use strict';
};
/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 08/07/12
 * Time: 16:18
 * To change this template use File | Settings | File Templates.
 */
// here will save instances that need to be shared among multiple objects
RODU.av4vnstat.CONFIG = {
    // Set this to true to see error messages in the browser web console
    DEBUG: false,

    VISIBILITY: {
        SHOW: 'show',
        HIDE: 'hide'
    },

    // Mapping of document elements ids to (pseudo) constants
    ELEMENT_ID: {
        CONTAINERS: {
            HOME: "home",
            BASIC_DATA_CHARTS: "basicDataCharts",
            ADVANCED_MONITORING_CHARTS: "advancedMonitoringCharts"
        },

        TEXT_CONTAINERS: {
            UPDATE_TIME: "updateTime"
        },

        CHARTS_DESCRIPTIONS: {
            BASIC_CHARTS_DESCRIPTION: "basicChartDescription",
            ADVANCED_CHARTS_DESCRIPTION: "advancedChartDescription"
        },

        CHARTS: {
            HOURLY_DATA_CHART: "hourlyDataChart",
            DAILY_DATA_CHART: "dailyDataChart",
            MONTHLY_DATA_CHART: "monthlyDataChart",
            TOP_TEN_DATA_CHART: "topTenDataChart"
        }
    }
};
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
            if (!chart.bound) {
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
            }
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
        bindChart($scope.chart.hourlyChart, 
                  RODU.av4vnstat.visualization.HourlyChart);
    };
    
    $scope.showDailyChart = function () {
        show('dailyChart');
        bindChart($scope.chart.dailyChart, 
                  RODU.av4vnstat.visualization.DailyChart);
    };
    
    $scope.showMonthlyChart = function () {
        show('monthlyChart');
        bindChart($scope.chart.monthlyChart, 
                  RODU.av4vnstat.visualization.MonthlyChart);
    };
    
    $scope.showTopTenChart = function () {
        show('topTenChart');
        bindChart($scope.chart.topTenChart, 
                  RODU.av4vnstat.visualization.TopTenChart);
    };
};
RODU.av4vnstat.controller.MainController = function ($scope) {
    'use strict';
    $scope.updateTimeText = "Last update at: " + RODU.av4vnstat.data.updateTime.data;
};
/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 07/07/12
 * Time: 14:01
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.controller.SectionController = function ($scope) {
    'use strict';
    var visibleSection = 'home',
        VISIBILITY = RODU.av4vnstat.CONFIG.VISIBILITY,

        show = function (id) {
            $scope.section[visibleSection].visible = VISIBILITY.HIDE;
            $scope.section[id].visible = VISIBILITY.SHOW;
            visibleSection = id;
        };

    $scope.section = {
        home: {visible:VISIBILITY.SHOW},
        basic: {visible:VISIBILITY.HIDE},
        advanced: {visible:VISIBILITY.HIDE}
    };

    $scope.showHome = function () {
        show('home');
    };

    $scope.showBasic = function () {
        show('basic');
    };

    $scope.showAdvanced = function () {
        show('advanced');
    };
};
RODU.av4vnstat.data.updateTime = {

	data: "2012-07-09 10:43:33"

};
RODU.av4vnstat.data.hourlyDataChart = {

	categories: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 9, 10, 11],
	series: [{
		name: 'Download',
		marker: { symbol: 'square' },
		data: [2.58, 19.97, 28.85, 0.69, 0.27, 1.82, 7.07, 3.82, 2.95, 1.49, 3.22, 4.34, 0.07, 10.45, 0.92, 1.04]
	},{
		name: 'Upload',
		marker: { symbol: 'diamond' },
		data: [0.17, 0.71, 1.14, 0.08, 0.03, 0.34, 0.63, 0.31, 0.22, 0.19, 0.1, 0.8, 0.03, 1.1, 0.34, 0.17]
	}]

};
RODU.av4vnstat.data.dailyDataChart = {
	series: [{
		name: 'Download',
		marker: { symbol: 'square' },
		data: [[Date.UTC(2012,5,10,11,13,51), 460.85], [Date.UTC(2012,5,11,11,25,29), 155.7], [Date.UTC(2012,5,12,8,55,29), 90.68], [Date.UTC(2012,5,13,0,0,2), 145.19], [Date.UTC(2012,5,14,0,0,3), 299.97], [Date.UTC(2012,5,15,0,35,41), 602.59], [Date.UTC(2012,5,16,0,0,22), 208.05], [Date.UTC(2012,5,17,2,17,48), 479.9], [Date.UTC(2012,5,18,0,0,21), 174.75], [Date.UTC(2012,5,19,8,57,32), 124.98], [Date.UTC(2012,5,20,10,16,47), 98.28], [Date.UTC(2012,5,21,9,41,47), 388.77], [Date.UTC(2012,5,22,10,55,18), 90.76], [Date.UTC(2012,5,23,0,0,1), 380.05], [Date.UTC(2012,5,24,0,0,17), 109.55], [Date.UTC(2012,5,25,0,0,9), 555.46], [Date.UTC(2012,5,26,0,0,4), 351.89], [Date.UTC(2012,5,27,9,31,16), 349.3], [Date.UTC(2012,5,28,0,0,27), 242.57], [Date.UTC(2012,5,29,0,0,18), 265.69], [Date.UTC(2012,5,30,7,21,27), 545.99], [Date.UTC(2012,6,1,0,0,18), 63.65], [Date.UTC(2012,6,2,0,0,25), 267.01], [Date.UTC(2012,6,3,0,0,23), 90.03], [Date.UTC(2012,6,4,0,0,5), 107.75], [Date.UTC(2012,6,5,0,0,0), 116.13], [Date.UTC(2012,6,6,10,31,50), 233.55], [Date.UTC(2012,6,7,0,0,20), 65.78], [Date.UTC(2012,6,8,13,55,17), 72.74], [Date.UTC(2012,6,9,0,0,25), 16.82]]
	},{
		name: 'Upload',
		marker: { symbol: 'diamond' },
		data: [[Date.UTC(2012,5,10,11,13,51), 11.45], [Date.UTC(2012,5,11,11,25,29), 13.12], [Date.UTC(2012,5,12,8,55,29), 7.75], [Date.UTC(2012,5,13,0,0,2), 17.69], [Date.UTC(2012,5,14,0,0,3), 9.45], [Date.UTC(2012,5,15,0,35,41), 18.23], [Date.UTC(2012,5,16,0,0,22), 8.61], [Date.UTC(2012,5,17,2,17,48), 15.71], [Date.UTC(2012,5,18,0,0,21), 10.91], [Date.UTC(2012,5,19,8,57,32), 8.15], [Date.UTC(2012,5,20,10,16,47), 13.47], [Date.UTC(2012,5,21,9,41,47), 18.21], [Date.UTC(2012,5,22,10,55,18), 5.91], [Date.UTC(2012,5,23,0,0,1), 13.78], [Date.UTC(2012,5,24,0,0,17), 7.67], [Date.UTC(2012,5,25,0,0,9), 15.67], [Date.UTC(2012,5,26,0,0,4), 13.1], [Date.UTC(2012,5,27,9,31,16), 22.84], [Date.UTC(2012,5,28,0,0,27), 11.06], [Date.UTC(2012,5,29,0,0,18), 10.4], [Date.UTC(2012,5,30,7,21,27), 14.35], [Date.UTC(2012,6,1,0,0,18), 2.8], [Date.UTC(2012,6,2,0,0,25), 13.65], [Date.UTC(2012,6,3,0,0,23), 6.26], [Date.UTC(2012,6,4,0,0,5), 5.42], [Date.UTC(2012,6,5,0,0,0), 5.82], [Date.UTC(2012,6,6,10,31,50), 10.76], [Date.UTC(2012,6,7,0,0,20), 2.64], [Date.UTC(2012,6,8,13,55,17), 3.92], [Date.UTC(2012,6,9,0,0,25), 2.44]]
	}]

};
RODU.av4vnstat.data.monthlyDataChart = {
	series: [{
		name: '',
		traffic: [239.23, 1199.41, 1618.37, 2453.16, 187.73, 5520.04, 2661.62, 4849.41, 7946.65, 8879.78, 7621.95, 1033.46],
		data: [[Date.UTC(2011,7,26,16,47,29), [0.0, 1.35, 0.81, 2.69, 0.81, 1.35, 0.0]], [Date.UTC(2011,8,1,9,40,23), [0.0, 6.75, 4.05, 13.51, 4.05, 6.75, 0.0]], [Date.UTC(2011,9,1,0,0,17), [0.0, 9.11, 5.47, 18.23, 5.47, 9.11, 0.0]], [Date.UTC(2011,10,1,13,34,6), [0.0, 13.81, 8.29, 27.63, 8.29, 13.81, 0.0]], [Date.UTC(2011,11,1,17,39,37), [0.0, 1.06, 0.63, 2.11, 0.63, 1.06, 0.0]], [Date.UTC(2012,0,3,16,27,22), [0.0, 31.08, 18.65, 62.16, 18.65, 31.08, 0.0]], [Date.UTC(2012,1,1,9,38,56), [0.0, 14.99, 8.99, 29.97, 8.99, 14.99, 0.0]], [Date.UTC(2012,2,1,1,0,28), [0.0, 27.31, 16.38, 54.61, 16.38, 27.31, 0.0]], [Date.UTC(2012,3,1,0,0,3), [0.0, 44.75, 26.85, 89.49, 26.85, 44.75, 0.0]], [Date.UTC(2012,4,1,0,0,26), [0.0, 50.0, 30.0, 100.0, 30.0, 50.0, 0.0]], [Date.UTC(2012,5,1,12,7,15), [0.0, 42.92, 25.75, 85.83, 25.75, 42.92, 0.0]], [Date.UTC(2012,6,1,0,0,18), [0.0, 5.82, 3.49, 11.64, 3.49, 5.82, 0.0]]]
	},{
		name: '',
		traffic: [24.03, 92.0, 194.53, 255.1, 10.54, 203.88, 175.16, 222.43, 422.44, 381.49, 338.5, 53.7],
		data: [[Date.UTC(2011,7,26,16,47,29), [0.0, 0.14, 0.08, 0.27, 0.08, 0.14, 0.0]], [Date.UTC(2011,8,1,9,40,23), [0.0, 0.52, 0.31, 1.04, 0.31, 0.52, 0.0]], [Date.UTC(2011,9,1,0,0,17), [0.0, 1.1, 0.66, 2.19, 0.66, 1.1, 0.0]], [Date.UTC(2011,10,1,13,34,6), [0.0, 1.44, 0.86, 2.87, 0.86, 1.44, 0.0]], [Date.UTC(2011,11,1,17,39,37), [0.0, 0.06, 0.04, 0.12, 0.04, 0.06, 0.0]], [Date.UTC(2012,0,3,16,27,22), [0.0, 1.15, 0.69, 2.3, 0.69, 1.15, 0.0]], [Date.UTC(2012,1,1,9,38,56), [0.0, 0.99, 0.59, 1.97, 0.59, 0.99, 0.0]], [Date.UTC(2012,2,1,1,0,28), [0.0, 1.25, 0.75, 2.5, 0.75, 1.25, 0.0]], [Date.UTC(2012,3,1,0,0,3), [0.0, 2.38, 1.43, 4.76, 1.43, 2.38, 0.0]], [Date.UTC(2012,4,1,0,0,26), [0.0, 2.15, 1.29, 4.3, 1.29, 2.15, 0.0]], [Date.UTC(2012,5,1,12,7,15), [0.0, 1.91, 1.14, 3.81, 1.14, 1.91, 0.0]], [Date.UTC(2012,6,1,0,0,18), [0.0, 0.3, 0.18, 0.6, 0.18, 0.3, 0.0]]]
	}]

};
RODU.av4vnstat.data.topTenDaysDataChart = {
	series: [{
		name: 'Download',
		color: 'rgba(223, 83, 83, .5)',
		data: [[Date.UTC(2012,0,4,1,5,42), 1161.38], [Date.UTC(2012,0,28,1,0,18), 650.88], [Date.UTC(2012,2,18,14,14,51), 821.15], [Date.UTC(2012,3,6,11,48,23), 910.24], [Date.UTC(2012,3,15,10,26,8), 668.39], [Date.UTC(2012,3,29,0,0,13), 585.12], [Date.UTC(2012,4,7,3,26,44), 619.05], [Date.UTC(2012,4,20,0,0,3), 1208.3], [Date.UTC(2012,4,21,0,22,16), 661.0], [Date.UTC(2012,5,15,0,35,41), 602.59]]
	},{
		name: 'Upload',
		color: 'rgba(119, 152, 191, .5)',
		data: [[Date.UTC(2012,0,4,1,5,42), 25.55], [Date.UTC(2012,0,28,1,0,18), 16.35], [Date.UTC(2012,2,18,14,14,51), 25.94], [Date.UTC(2012,3,6,11,48,23), 44.2], [Date.UTC(2012,3,15,10,26,8), 16.23], [Date.UTC(2012,3,29,0,0,13), 18.14], [Date.UTC(2012,4,7,3,26,44), 21.18], [Date.UTC(2012,4,20,0,0,3), 88.35], [Date.UTC(2012,4,21,0,22,16), 23.52], [Date.UTC(2012,5,15,0,35,41), 18.23]]
	}]

};
RODU.av4vnstat.visualization.DailyChart = function () {
    'use strict';
    var dailyChart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#fde7e7',
            renderTo: RODU.av4vnstat.CONFIG.ELEMENT_ID.CHARTS.DAILY_DATA_CHART,
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
};
RODU.av4vnstat.visualization.HourlyChart = function () {
    'use strict';
    var hourlyChart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#fde7e7',
            renderTo: RODU.av4vnstat.CONFIG.ELEMENT_ID.CHARTS.HOURLY_DATA_CHART,
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
RODU.av4vnstat.visualization.MonthlyChart = function () {
    'use strict';
        // The container for the whole visualization
    var _renderTo = RODU.av4vnstat.CONFIG.ELEMENT_ID.CHARTS.MONTHLY_DATA_CHART,
        tailContainer,
        // How many columns per row 
        NUM_COLUMNS = 3,
        lastColumnNumber = 0,
        lastRowNumber = 0,
        smRow = null,
        tailId,
        // Private method
        // Appends a tail to the visualization according to configuration
        // constraints
        appendTail = function(tail){
            if (smRow === null || lastColumnNumber === NUM_COLUMNS){
                smRow = document.createElement("UL");
                smRow.setAttribute("class", "smallMultiplesRow");
                
                document.getElementById(_renderTo).appendChild(smRow);
                lastColumnNumber = 0;
                lastRowNumber += 1;
            }
            
            tailContainer = document.createElement("LI");
            tailId = "t_" + lastRowNumber + "_" + lastColumnNumber;
            tailContainer.appendChild(tail.create(tailId));
            smRow.appendChild(tailContainer);
            
            tail.render();
            lastColumnNumber++;
        },
        
        /*
         * The render method will draw the visualization on the screen in the
         * proper place and should be called on the first time to show the vis.
         */
        render = function(){
            var tail, rxSeries, rxSeriesData, txSeries, txSeriesData, tailData,
                i, renderContainer;
            var DOWNLOAD_SERIES = 0, UPLOAD_SERIES = 1,
                DATE_FIELD = 0, MIB_FIELD = 1;
            //RODU.vnstat.util.debug("rendering small multiples...");
            // Removing all the previously appended tails for a new rendering
            renderContainer = document.getElementById(_renderTo).innerHTML = "";
            // Reading the data series from the data.js (0: Download, 1: Upload)
            rxSeries = RODU.av4vnstat.data.monthlyDataChart.series[DOWNLOAD_SERIES];
            txSeries = RODU.av4vnstat.data.monthlyDataChart.series[UPLOAD_SERIES];
            rxSeriesData = rxSeries.data;
            txSeriesData = txSeries.data;
            // Looping the series in the data to create the tail data
            for (i = 0; i < rxSeriesData.length; i++){
                tail = new RODU.av4vnstat.visualization.MonthlyChartTail();
                tailData = {};
                tailData.rxName = rxSeries.name;
                tailData.txName = txSeries.name;
                // timestamp
                tailData.datetime = rxSeriesData[i][DATE_FIELD];
                // download percentages (rx)
                tailData.rxPerc = rxSeriesData[i][MIB_FIELD];
                // download data (rx)
                tailData.rxMiB = rxSeries.traffic[i];
                // upload data (tx)
                tailData.txMiB = txSeries.traffic[i];
                // upload percentages (tx)
                tailData.txPerc = txSeriesData[i][MIB_FIELD];
                tailData.total = Math.round(rxSeries.traffic[i] + txSeries.traffic[i]);
                
                tail.setData(tailData);
                appendTail(tail);
            }
        };
        
        (function(){
            render();
        }());
};
/**
 * Represents the SmallMultiples single Tail that will be repeated n times
 * according to the data set.
 * 
 */
RODU.av4vnstat.visualization.MonthlyChartTail = function(){
    'use strict';
    var _data = null, _id = null,
        self = this,
    
    _getMonthNameFromUTC = function(utcDate){
        var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
                      "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
        
        var date = new Date(utcDate);
        var month = months[date.getUTCMonth()];
        var year = date.getUTCFullYear();
        
        return month + " " + year; 
    };
    
    /*
     * Set the data needed to draw the single tail.
     */
    this.setData = function(data){
        self._data = data;
    };
    
    this.create = function(tailId){
        var tail;
        self._id = tailId;
        tail = document.createElement("DIV");
        tail.setAttribute("id", tailId);
        tail.setAttribute("class", "smallMultiplesTail");
        
        return tail;
    };
    
    // dev purposes!
    this.render = function(){
        var monthlyChartTail = new Highcharts.Chart({
            chart: {
                backgroundColor: '#fde7e7',
                renderTo: self._id,
                type: 'area'
            },
            title: {
                text: _getMonthNameFromUTC(self._data.datetime)
            },
            subtitle: {
                text: "Total " + self._data.total + " MiB"
            },
            xAxis: {
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                min: 0, max: 100,
                tickInterval: 100, tickColor: '#ffffff'
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [{
                name: self._data.rxName + self._data.rxMiB,
                data: self._data.rxPerc
            }, {
                name: self._data.txName + self._data.txMiB,
                data: self._data.txPerc
            }]
        });
    };
};
RODU.av4vnstat.visualization.TopTenChart = function () {
    'use strict';
    var topTenChart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#fde7e7',
            renderTo: RODU.av4vnstat.CONFIG.ELEMENT_ID.CHARTS.TOP_TEN_DATA_CHART,
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'All Times Top Ten Days usage'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e. %b'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Traffic in MiB'
            }
        },
        tooltip: {
            formatter: function() {
                    return Highcharts.dateFormat('%e %b', this.x) +', '+ this.y +' MiB';
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
               },
               states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: RODU.av4vnstat.data.topTenDaysDataChart.series
    });
};
