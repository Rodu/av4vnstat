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
