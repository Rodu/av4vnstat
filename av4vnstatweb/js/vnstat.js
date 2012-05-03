/* @namespace */
var RODU;

if (!RODU)
{
    RODU = {};
}

if (!RODU.vnstat)
{
    /** Package containing...  
     * @namespace */
    RODU.vnstat = {};
    RODU.namespaceConflict = false;
}
else
{
    RODU.namespaceConflict = true;
    throw("'RODU.vnstat' already defined by other module.");
}

// Check on namespace conflict
if (!RODU.namespaceConflict){
    
    /* defining additional namespaces */
    RODU.vnstat.command = {};
    RODU.vnstat.singleton = {};
    RODU.vnstat.util = {};
    RODU.vnstat.data = {};
    RODU.vnstat.vis = {};
    RODU.vnstat.vis.chart = {};
    RODU.vnstat.vis.smallmultiples = {};
    
    // here will save instances that need to be shared among multiple objects
    RODU.vnstat.constants = {
        // Set this to true to see error messages in the browser web console
        DEBUG: true,
        
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
            
            CHARTS: {
                HOURLY_DATA_CHART: "hourlyDataChart",
                DAILY_DATA_CHART: "dailyDataChart",
                MONTHLY_DATA_CHART: "monthlyDataChart",
                TOP_TEN_DATA_CHART: "topTenDataChart"
            }
        }
    };
    
    /**
     * We use jQuery here like it would be the program main.
     */
    $(window).load(function(){
        RODU.vnstat.util.debug("-------------------------------------");
        RODU.vnstat.util.debug("No namespace conflict");
        
        // Instantiating some singletons
        RODU.vnstat.singleton.widgetManager = new RODU.vnstat.WidgetManager;
        
        new RODU.vnstat.VNStat();
    }); // end jQuery ready call


    /**
     * This would be the principal object of the program.
     */
    RODU.vnstat.VNStat = function(){
        var wl = RODU.vnstat.singleton.widgetList = new RODU.vnstat.WidgetList();
        var widgetRenderer = new RODU.vnstat.WidgetRenderer();
        
        // Setting content for last update time
        //TODO: this operation may be centralized with a different execution flow including all such operations
        var updateTimeText = "Last update at: " + RODU.vnstat.data.updateTime.data;
        var updateTimeContainer = document.getElementById(RODU.vnstat.constants.ELEMENT_ID.TEXT_CONTAINERS.UPDATE_TIME);
        updateTimeContainer.innerHTML = updateTimeText;
                
        widgetRenderer.renderCommandList({
            containerId: "verticalTabContainer",
            commandMapName: "mainCommandMap",
            listCssClass: "verticalTabList",
            listItemCssClass: "verticalTabItem"});
        
        widgetRenderer.renderCommandList({
            containerId: "basicTabContainer",
            commandMapName: "basicChartsCommandMap",
            listCssClass: "horizontalTabList",
            listItemCssClass: "horizontalTabItem"});
        
        widgetRenderer.renderCommandList({
            containerId: "advancedTabContainer",
            commandMapName: "advancedChartsCommandMap",
            listCssClass: "horizontalTabList",
            listItemCssClass: "horizontalTabItem"});
    };

    /**
     * Defines a command object that will be used in the application
     * to bind the user actions to the application logic.
     */
    RODU.vnstat.command.Command = function(name, label, description, action){
        if (name === undefined){
            throw("Command name must be defined!");
            return;
        }
        
        return {
            // the command name is used to map commands to action in the
            // command handler
            name: name,
            // the label will be shown in the UI
            label: (label || "N/A"),
            // the description could be shown as a tooltip in the UI
            description: (description || ""),
            /**
             * The method will execute some functionality.
             * 
             * It will receive the function that implements the functionality
             * as a parameter so that this command object can be generic.
             */
            execute: action
        };
    };
    
    /**
     * The WidgetList hold lists of widgets to be used and maniputaleted
     * in the application.
     */
    RODU.vnstat.WidgetList = function(){
        // Holds a map of initialized commands for the main section,
        // associating the command name to the command instance.
        this.commandMap = {
            mainCommandMap: {
                ShowHomePageCommand: new RODU.vnstat.command.ShowHomePageCommand,
                ShowBasicDataCommand: new RODU.vnstat.command.ShowBasicDataCommand,
                ShowAdvancedDataCommand: new RODU.vnstat.command.ShowAdvancedDataCommand
            },
            
            basicChartsCommandMap: {
                ShowHourlyChartCommand: new RODU.vnstat.command.ShowHourlyChartCommand,
                ShowDailyChartCommand: new RODU.vnstat.command.ShowDailyChartCommand,
                ShowMonthlyChartCommand: new RODU.vnstat.command.ShowMonthlyChartCommand,
                ShowTopTenChartCommand: new RODU.vnstat.command.ShowTopTenChartCommand
            },
            
            advancedChartsCommandMap: {
                ShowDataLeftCommand: new RODU.vnstat.command.ShowDataLeftCommand
            }
        };
    };
    
    /**
     * Define the command used to show the home page.
     */
    RODU.vnstat.command.ShowHomePageCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowHomePageCommand",
                "Home",
                "",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowHomePageCommand");
                    RODU.vnstat.singleton.widgetManager.showContainer(
                        RODU.vnstat.constants.ELEMENT_ID.CONTAINERS.HOME);
                }));
    };
    
    /**
     * Define the command used to show basic data.
     */
    RODU.vnstat.command.ShowBasicDataCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowBasicDataCommand",
                "Basic data",
                "Shows the basic data collected",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowBasicDataCommand");
                    RODU.vnstat.singleton.widgetManager.showContainer(
                        RODU.vnstat.constants.ELEMENT_ID.CONTAINERS.BASIC_DATA_CHARTS);
                }));
    };
    
    /**
     * Define the command used to show advanced data.
     */
    RODU.vnstat.command.ShowAdvancedDataCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowAdvancedDataCommand",
                "Advanced monitoring",
                "Shows the advanced calculated data",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowAdvancedDataCommand");
                    RODU.vnstat.singleton.widgetManager.showContainer(
                        RODU.vnstat.constants.ELEMENT_ID.CONTAINERS.ADVANCED_MONITORING_CHARTS);
                })
        );
    };
    
    /**
     * Define the command used to show the basic hourly usage chart.
     */
    RODU.vnstat.command.ShowHourlyChartCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowHourlyChartCommand",
                "Hours",
                "Shows the data traffic by hour",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowHourlyChartCommand");
                    RODU.vnstat.singleton.widgetManager.showChart(
                        RODU.vnstat.constants.ELEMENT_ID.CHARTS.HOURLY_DATA_CHART);
                    // Draws the chart
                    new RODU.vnstat.vis.chart.HourlyDataChart;
                })
        );
    };
    
    /**
     * Define the command used to show the basic daily usage chart.
     */
    RODU.vnstat.command.ShowDailyChartCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowDailyChartCommand",
                "Days",
                "Shows the data traffic by day",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowDailyChartCommand");
                    RODU.vnstat.singleton.widgetManager.showChart(
                        RODU.vnstat.constants.ELEMENT_ID.CHARTS.DAILY_DATA_CHART);
                    // Draws the chart
                    new RODU.vnstat.vis.chart.DailyDataChart;
                })
        );
    };
    
    /**
     * Define the command used to show the basic monthly usage chart.
     */
    RODU.vnstat.command.ShowMonthlyChartCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowMonthlyChartCommand",
                "Months",
                "Shows the data traffic by month",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowMonthlyChartCommand");
                    RODU.vnstat.singleton.widgetManager.showChart(
                            RODU.vnstat.constants.ELEMENT_ID.CHARTS.MONTHLY_DATA_CHART);
                        // Draws the chart
                        var sm = new RODU.vnstat.vis.smallmultiples.SmallMultiples;
                        sm.render();
                })
        );
    };
    
    /**
     * Define the command used to show the basic top 10 days usage chart.
     */
    RODU.vnstat.command.ShowTopTenChartCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowTopTenChartCommand",
                "Top 10 days",
                "Shows the top 10 days data traffic",
                function(){ 
                    RODU.vnstat.util.debug("Executing command name ShowTopTenChartCommand"); 
                })
        );
    };
    
    /**
     * Define the command used to show the chart for remaining data (data left).
     */
    RODU.vnstat.command.ShowDataLeftCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowDataLeftCommand",
                "Data left",
                "Shows the amount of data still available",
                function(){ 
                    RODU.vnstat.util.debug("executing command name ShowDataLeftCommand"); 
                })
        );
    };
    
    /**
     * Defined a HourlyDataChart object.
     */
    RODU.vnstat.vis.chart.HourlyDataChart = function(){
          new Highcharts.Chart({
             chart: {
                backgroundColor: '#fde7e7',
                renderTo: RODU.vnstat.constants.ELEMENT_ID.CHARTS.HOURLY_DATA_CHART,
                type: 'column'
             },
             title: {
                text: 'Last 24 Hours Usage'
             },
             xAxis: {
                
                categories: RODU.vnstat.data.hourlyDataChart.categories
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
             series: RODU.vnstat.data.hourlyDataChart.series
          });
    };
    
    /**
     * Defined a DailyDataChart object.
     */
    RODU.vnstat.vis.chart.DailyDataChart = function(){
          new Highcharts.Chart({
            chart: {
                backgroundColor: '#fde7e7',
                renderTo: RODU.vnstat.constants.ELEMENT_ID.CHARTS.DAILY_DATA_CHART,
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
            series: RODU.vnstat.data.dailyDataChart.series
          });
    };
    
    /*
     * SmallMultiples visualization
     * 
     * It is composed of Tails and as many of them will be created, depending on
     * the data.
     * 
     */
    RODU.vnstat.vis.smallmultiples.SmallMultiples = function(){
    	var self = this,
    	// The container for the whole visualization
    	_renderTo = RODU.vnstat.constants.ELEMENT_ID.CHARTS.MONTHLY_DATA_CHART,
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
    		var	tail, rxSeries, rxSeriesData, txSeries, txSeriesData, tailData,
    			i, renderContainer;
    		var DOWNLOAD_SERIES = 0, UPLOAD_SERIES = 1,
    			DATE_FIELD = 0, MIB_FIELD = 1;
    		RODU.vnstat.util.debug("rendering small multiples...");
    		// Removing all the previously appended tails for a new rendering
    		renderContainer = document.getElementById(_renderTo).innerHTML = "";
    		// Reading the data series from the data.js (0: Download, 1: Upload)
    		rxSeries = RODU.vnstat.data.monthlyDataChart.series[DOWNLOAD_SERIES];
    		txSeries = RODU.vnstat.data.monthlyDataChart.series[UPLOAD_SERIES];
    		rxSeriesData = rxSeries.data;
    		txSeriesData = txSeries.data;
    		// Looping the series in the data to create the tail data
    		for (i = 0; i < rxSeriesData.length; i++){
    		//for (i = 0; i < 3; i++){
    			tail = new RODU.vnstat.vis.smallmultiples.Tail;
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
    
    /**
     * Represents the SmallMultiples single Tail that will be repeated n times
     * according to the data set.
     * 
     */
    RODU.vnstat.vis.smallmultiples.Tail = function(){
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
    		RODU.vnstat.util.debug("creating tail...");
	    	var tail;
	    	self._id = tailId;
	    	tail = document.createElement("DIV");
	    	tail.setAttribute("id", tailId);
	    	tail.setAttribute("class", "smallMultiplesTail");
	    	
	    	return tail;
    	};
    	
    	// dev purposes!
    	this.render = function(){
    		RODU.vnstat.util.debug("rendering tail " + self._id);
    		RODU.vnstat.util.debug("datetime: " + self._data.datetime);
    		RODU.vnstat.util.debug("rx: " + self._data.rx);
    		RODU.vnstat.util.debug("tx: " + self._data.tx);
    		
	    	new Highcharts.Chart({
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
	                name: "" + self._data.rxName + self._data.rxMiB,
	                data: self._data.rxPerc
	            }, {
	            	name: "" + self._data.txName + self._data.txMiB,
	                data: self._data.txPerc
	            }]
	        });
    	};
    };
    
    /**
     * The WidgetRenderer is used to render to HTML (or else) the widgets
     * used in the application.
     */
    RODU.vnstat.WidgetRenderer = function(){
        /**
         * The method renders to HTML the list of commands defined.
         */
        this.renderCommandList = function(renderInfo){
            RODU.vnstat.util.debug("Rendering command list " + renderInfo.commandMapName);
            var oCommand, command, ul, li, ahref,
                commandMap = RODU.vnstat.singleton.widgetList.commandMap[renderInfo.commandMapName];
                
            ul = document.createElement("UL");
            ul.setAttribute("class", renderInfo.listCssClass);
            
            for (oCommand in commandMap){
                command = commandMap[oCommand];
                RODU.vnstat.util.debug("- Instantiating command " + command.name);
                
                li = document.createElement("LI");
                li.setAttribute("class", renderInfo.listItemCssClass);
                
                ahref = document.createElement("A");
                ahref.setAttribute("href", "#");
                ahref.setAttribute("onclick", 
                    "RODU.vnstat.singleton.widgetList.commandMap['" + renderInfo.commandMapName + "']['" + command.name + "'].execute()");
                ahref.setAttribute("title", command.description);
                ahref.appendChild(document.createTextNode(command.label));
                
                li.appendChild(ahref);
                ul.appendChild(li);
            }
            
            document.getElementById(renderInfo.containerId).appendChild(ul);
        };
    };
    
    /**
     * Manipulates some properties related to the widget appearance.
     */
    RODU.vnstat.WidgetManager = function(){
        // Workaround for this...
        var self = this,
        
        // Private method to hide all the ids in the received dictionary    
        hideAll = function(dictionary){
            RODU.vnstat.util.debug("Hiding all containers in dictionary...");
            var containerId;
            for (containerId in dictionary){
                // hiding all containers
                self.hide(dictionary[containerId]);
            }
        };
        
        // Shows the element registered with the id received
        this.show = function(elementId){
            RODU.vnstat.util.debug("Showing element with id " + elementId);
            document.getElementById(elementId).style.display = "block";
        };
        
        // The method hides all the containers and only shows the one
        // matching the received id
        this.showContainer = function(elementId){
            // First we hide all the containers
            hideAll(RODU.vnstat.constants.ELEMENT_ID.CONTAINERS);
            // Showing the container by id
            this.show(elementId);
        };
        
        // Hides all the chart containers and only shows the one
        // matching the received id
        this.showChart = function(elementId){
            // First we hide all the other charts
            hideAll(RODU.vnstat.constants.ELEMENT_ID.CHARTS);
            this.show(elementId);
        };
        
        // Hides the element registered with the id received
        this.hide = function(elementId){
            RODU.vnstat.util.debug("Hiding element with id " + elementId);
            document.getElementById(elementId).style.display = "none";
        };
    };
    
    /**
     * Utility function to show debug messages depending on the value
     * of the DEBUG constant.
     */
    RODU.vnstat.util.debug = function(message){
        var timestamp;
        if (RODU.vnstat.constants.DEBUG){
            timestamp = "[ " + new Date().getTime() + " ] ";
            console.log(timestamp + message);
        }
    };
    
} // end check on namespace conflict
