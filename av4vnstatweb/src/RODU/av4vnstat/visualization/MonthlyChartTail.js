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
