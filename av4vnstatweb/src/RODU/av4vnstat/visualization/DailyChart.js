RODU.av4vnstat.visualization.DailyChart = function () {
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
};
