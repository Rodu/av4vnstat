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
    throw("'RODU.vnstat' already defined by other module.");
    RODU.namespaceConflict = true;
}

// Check on namespace conflict
if (!RODU.namespaceConflict){
    
    /* defining additional namespaces */
    RODU.vnstat.command = {};
    // here will save instances that need to be shared among multiple objects
    RODU.vnstat.singleton = {};
    RODU.vnstat.util = {};
    RODU.vnstat.chart = {};
    RODU.vnstat.data = {};
    
    RODU.vnstat.constants = {
        // Set this to true to see error messages in the browser web console
        DEBUG: true,
        
        // Mapping of document elements ids to (pseudo) constants
        ELEMENT_ID: {
            CONTAINERS: {
                BASIC_DATA_CHARTS: "basicDataCharts",
                ADVANCED_MONITORING_CHARTS: "advancedMonitoringCharts"
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
                    new RODU.vnstat.chart.HourlyDataChart;
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
                    new RODU.vnstat.chart.DailyDataChart;
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
    RODU.vnstat.chart.HourlyDataChart = function(){
          new Highcharts.Chart({
             chart: {
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
    RODU.vnstat.chart.DailyDataChart = function(){
          new Highcharts.Chart({
            chart: {
                renderTo: RODU.vnstat.constants.ELEMENT_ID.CHARTS.DAILY_DATA_CHART,
                type: 'spline'
            },
            title: {
                text: 'Last 30 Days Usage'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e. %b',
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
        
        // The method hides all the chart containers and only shows the one
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
