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

	data: "2012-12-31 20:11:29"

};
RODU.av4vnstat.data.hourlyDataChart = {

	categories: [22, 23, 0, 12, 13, 14, 17, 18, 19, 20, 21],
	series: [{
		name: 'Download',
		marker: { symbol: 'square' },
		data: [17.13, 10.81, 0.0, 9.93, 24.38, 0.14, 79.99, 312.11, 76.89, 0.91, 0.3]
	},{
		name: 'Upload',
		marker: { symbol: 'diamond' },
		data: [1.96, 16.18, 0.0, 0.66, 1.79, 0.01, 3.11, 6.97, 3.17, 0.21, 0.08]
	}]

};
RODU.av4vnstat.data.dailyDataChart = {
	series: [{
		name: 'Download',
		marker: { symbol: 'square' },
		data: [[Date.UTC(2012,10,20,11,31,5), 45.98], [Date.UTC(2012,10,21,9,55,11), 44.3], [Date.UTC(2012,10,22,1,0,23), 111.82], [Date.UTC(2012,10,23,13,30,50), 91.52], [Date.UTC(2012,10,24,1,0,8), 80.37], [Date.UTC(2012,10,25,15,10,25), 445.22], [Date.UTC(2012,10,26,12,9,44), 50.63], [Date.UTC(2012,10,27,8,54,23), 116.02], [Date.UTC(2012,10,28,13,45,40), 125.11], [Date.UTC(2012,10,29,1,30,12), 393.87], [Date.UTC(2012,10,30,1,0,29), 209.66], [Date.UTC(2012,11,1,1,19,15), 234.8], [Date.UTC(2012,11,2,1,36,49), 53.65], [Date.UTC(2012,11,3,9,9,16), 108.08], [Date.UTC(2012,11,4,11,35,47), 24.8], [Date.UTC(2012,11,5,10,16,16), 56.6], [Date.UTC(2012,11,6,1,0,14), 268.91], [Date.UTC(2012,11,7,12,9,20), 86.77], [Date.UTC(2012,11,8,1,36,13), 724.51], [Date.UTC(2012,11,9,5,20,3), 341.29], [Date.UTC(2012,11,11,11,48,53), 96.85], [Date.UTC(2012,11,12,1,0,17), 371.97], [Date.UTC(2012,11,13,12,1,50), 248.49], [Date.UTC(2012,11,14,1,0,29), 105.99], [Date.UTC(2012,11,15,13,51,2), 40.99], [Date.UTC(2012,11,16,4,27,14), 293.78], [Date.UTC(2012,11,17,9,43,42), 28.98], [Date.UTC(2012,11,29,18,47,14), 1653.03], [Date.UTC(2012,11,30,14,2,20), 399.0], [Date.UTC(2012,11,31,12,47,13), 504.66]]
	},{
		name: 'Upload',
		marker: { symbol: 'diamond' },
		data: [[Date.UTC(2012,10,20,11,31,5), 3.02], [Date.UTC(2012,10,21,9,55,11), 5.41], [Date.UTC(2012,10,22,1,0,23), 7.05], [Date.UTC(2012,10,23,13,30,50), 7.23], [Date.UTC(2012,10,24,1,0,8), 26.55], [Date.UTC(2012,10,25,15,10,25), 13.0], [Date.UTC(2012,10,26,12,9,44), 5.09], [Date.UTC(2012,10,27,8,54,23), 15.86], [Date.UTC(2012,10,28,13,45,40), 9.5], [Date.UTC(2012,10,29,1,30,12), 14.14], [Date.UTC(2012,10,30,1,0,29), 9.17], [Date.UTC(2012,11,1,1,19,15), 15.64], [Date.UTC(2012,11,2,1,36,49), 7.45], [Date.UTC(2012,11,3,9,9,16), 7.79], [Date.UTC(2012,11,4,11,35,47), 2.08], [Date.UTC(2012,11,5,10,16,16), 4.58], [Date.UTC(2012,11,6,1,0,14), 14.52], [Date.UTC(2012,11,7,12,9,20), 6.67], [Date.UTC(2012,11,8,1,36,13), 17.69], [Date.UTC(2012,11,9,5,20,3), 55.9], [Date.UTC(2012,11,11,11,48,53), 7.89], [Date.UTC(2012,11,12,1,0,17), 11.44], [Date.UTC(2012,11,13,12,1,50), 6.63], [Date.UTC(2012,11,14,1,0,29), 4.64], [Date.UTC(2012,11,15,13,51,2), 3.11], [Date.UTC(2012,11,16,4,27,14), 11.14], [Date.UTC(2012,11,17,9,43,42), 3.56], [Date.UTC(2012,11,29,18,47,14), 34.68], [Date.UTC(2012,11,30,14,2,20), 41.46], [Date.UTC(2012,11,31,12,47,13), 16.0]]
	}]

};
RODU.av4vnstat.data.monthlyDataChart = {
	series: [{
		name: '',
		traffic: [5520.04, 2661.62, 4849.41, 7946.65, 8879.78, 7621.95, 2050.09, 4418.27, 4889.23, 4324.61, 3485.51, 5643.14],
		data: [[Date.UTC(2012,0,3,16,27,22), [0.0, 31.08, 18.65, 62.16, 18.65, 31.08, 0.0]], [Date.UTC(2012,1,1,9,38,56), [0.0, 14.99, 8.99, 29.97, 8.99, 14.99, 0.0]], [Date.UTC(2012,2,1,1,0,28), [0.0, 27.31, 16.38, 54.61, 16.38, 27.31, 0.0]], [Date.UTC(2012,3,1,0,0,3), [0.0, 44.75, 26.85, 89.49, 26.85, 44.75, 0.0]], [Date.UTC(2012,4,1,0,0,26), [0.0, 50.0, 30.0, 100.0, 30.0, 50.0, 0.0]], [Date.UTC(2012,5,1,12,7,15), [0.0, 42.92, 25.75, 85.83, 25.75, 42.92, 0.0]], [Date.UTC(2012,6,1,0,0,18), [0.0, 11.54, 6.93, 23.09, 6.93, 11.54, 0.0]], [Date.UTC(2012,7,2,11,32,59), [0.0, 24.88, 14.93, 49.76, 14.93, 24.88, 0.0]], [Date.UTC(2012,8,1,22,0,10), [0.0, 27.53, 16.52, 55.06, 16.52, 27.53, 0.0]], [Date.UTC(2012,9,1,0,54,20), [0.0, 24.35, 14.61, 48.7, 14.61, 24.35, 0.0]], [Date.UTC(2012,10,15,17,51,27), [0.0, 19.63, 11.78, 39.25, 11.78, 19.63, 0.0]], [Date.UTC(2012,11,1,1,19,15), [0.0, 31.78, 19.07, 63.55, 19.07, 31.78, 0.0]]]
	},{
		name: '',
		traffic: [203.88, 175.16, 222.43, 422.44, 381.49, 338.5, 99.31, 233.06, 270.66, 184.53, 180.66, 272.87],
		data: [[Date.UTC(2012,0,3,16,27,22), [0.0, 1.15, 0.69, 2.3, 0.69, 1.15, 0.0]], [Date.UTC(2012,1,1,9,38,56), [0.0, 0.99, 0.59, 1.97, 0.59, 0.99, 0.0]], [Date.UTC(2012,2,1,1,0,28), [0.0, 1.25, 0.75, 2.5, 0.75, 1.25, 0.0]], [Date.UTC(2012,3,1,0,0,3), [0.0, 2.38, 1.43, 4.76, 1.43, 2.38, 0.0]], [Date.UTC(2012,4,1,0,0,26), [0.0, 2.15, 1.29, 4.3, 1.29, 2.15, 0.0]], [Date.UTC(2012,5,1,12,7,15), [0.0, 1.91, 1.14, 3.81, 1.14, 1.91, 0.0]], [Date.UTC(2012,6,1,0,0,18), [0.0, 0.56, 0.34, 1.12, 0.34, 0.56, 0.0]], [Date.UTC(2012,7,2,11,32,59), [0.0, 1.31, 0.79, 2.62, 0.79, 1.31, 0.0]], [Date.UTC(2012,8,1,22,0,10), [0.0, 1.52, 0.91, 3.05, 0.91, 1.52, 0.0]], [Date.UTC(2012,9,1,0,54,20), [0.0, 1.04, 0.62, 2.08, 0.62, 1.04, 0.0]], [Date.UTC(2012,10,15,17,51,27), [0.0, 1.02, 0.61, 2.03, 0.61, 1.02, 0.0]], [Date.UTC(2012,11,1,1,19,15), [0.0, 1.54, 0.92, 3.07, 0.92, 1.54, 0.0]]]
	}]

};
RODU.av4vnstat.data.topTenDaysDataChart = {
	series: [{
		name: 'Download',
		color: 'rgba(223, 83, 83, .5)',
		data: [[Date.UTC(2012,0,4,1,5,42), 1161.38], [Date.UTC(2012,2,18,14,14,51), 821.15], [Date.UTC(2012,3,6,11,48,23), 910.24], [Date.UTC(2012,4,20,0,0,3), 1208.3], [Date.UTC(2012,7,17,9,20,22), 848.9], [Date.UTC(2012,8,10,9,48,21), 904.97], [Date.UTC(2012,8,16,0,0,9), 830.01], [Date.UTC(2012,9,7,14,12,28), 941.14], [Date.UTC(2012,10,15,17,51,27), 966.17], [Date.UTC(2012,11,29,18,47,14), 1653.03]]
	},{
		name: 'Upload',
		color: 'rgba(119, 152, 191, .5)',
		data: [[Date.UTC(2012,0,4,1,5,42), 25.55], [Date.UTC(2012,2,18,14,14,51), 25.94], [Date.UTC(2012,3,6,11,48,23), 44.2], [Date.UTC(2012,4,20,0,0,3), 88.35], [Date.UTC(2012,7,17,9,20,22), 23.33], [Date.UTC(2012,8,10,9,48,21), 16.31], [Date.UTC(2012,8,16,0,0,9), 17.19], [Date.UTC(2012,9,7,14,12,28), 22.59], [Date.UTC(2012,10,15,17,51,27), 27.32], [Date.UTC(2012,11,29,18,47,14), 34.68]]
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
