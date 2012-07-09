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
        };
        
        /*
         * The render method will draw the visualization on the screen in the
         * proper place and should be called on the first time to show the vis.
         */
        this.render = function(){
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
};
