RODU.av4vnstat.visualization.TopTenChart = function () {
    new Highcharts.Chart({
        chart: {
            backgroundColor: '#fde7e7',
            renderTo: RODU.av4vnstat.constants.ELEMENT_ID.CHARTS.TOP_TEN_DATA_CHART,
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
                    return ''+
                    Highcharts.dateFormat('%e %b', this.x) +', '+ this.y +' MiB';
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
