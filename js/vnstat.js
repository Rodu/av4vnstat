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
        
    /**
     * We use jQuery here like it would be the program main.
     */
    $(document).ready(function(){
        //console.log("No namespace conflict...");
        new RODU.vnstat.VNStat();
    }); // end jQuery ready call


    /**
     * This would be the principal object of the program.
     */
    RODU.vnstat.VNStat = function(){
        var wl = RODU.vnstat.singleton.widgetList = new RODU.vnstat.WidgetList();
        var widgetRenderer = new RODU.vnstat.WidgetRenderer();
        
        widgetRenderer.renderCommandList({
            container: document.getElementById("verticalTabContainer"),
            commandMapName: "mainCommandMap",
            listCssClass: "verticalTabList",
            listItemCssClass: "verticalTabItem"});
        
        widgetRenderer.renderCommandList({
            container: document.getElementById("basicTabContainer"),
            commandMapName: "basicChartsCommandMap",
            listCssClass: "horizontalTabList",
            listItemCssClass: "horizontalTabItem"});
        
        widgetRenderer.renderCommandList({
            container: document.getElementById("advancedTabContainer"),
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
                ShowHourlyUsageCommand: new RODU.vnstat.command.ShowHourlyUsageCommand,
                ShowDailyUsageCommand: new RODU.vnstat.command.ShowDailyUsageCommand,
                ShowMonthlyUsageCommand: new RODU.vnstat.command.ShowMonthlyUsageCommand,
                ShowTopTenUsageCommand: new RODU.vnstat.command.ShowTopTenUsageCommand
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
                    console.log("executing command name ShowBasicDataCommand");
                    
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
                    console.log("executing command name ShowAdvancedDataCommand"); 
                })
        );
    };
    
    /**
     * Define the command used to show the basic hourly usage chart.
     */
    RODU.vnstat.command.ShowHourlyUsageCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowHourlyUsageCommand",
                "Hours",
                "Shows the data traffic by hour",
                function(){ 
                    console.log("executing command name ShowHourlyUsageCommand"); 
                })
        );
    };
    
    /**
     * Define the command used to show the basic daily usage chart.
     */
    RODU.vnstat.command.ShowDailyUsageCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowDailyUsageCommand",
                "Days",
                "Shows the data traffic by day",
                function(){ 
                    console.log("executing command name ShowDailyUsageCommand"); 
                })
        );
    };
    
    /**
     * Define the command used to show the basic monthly usage chart.
     */
    RODU.vnstat.command.ShowMonthlyUsageCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowMonthlyUsageCommand",
                "Months",
                "Shows the data traffic by month",
                function(){ 
                    console.log("executing command name ShowMonthlyUsageCommand"); 
                })
        );
    };
    
    /**
     * Define the command used to show the basic top 10 days usage chart.
     */
    RODU.vnstat.command.ShowTopTenUsageCommand = function(){
        return (
            new RODU.vnstat.command.Command("ShowTopTenUsageCommand",
                "Top 10 days",
                "Shows the top 10 days data traffic",
                function(){ 
                    console.log("executing command name ShowTopTenUsageCommand"); 
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
                    console.log("executing command name ShowDataLeftCommand"); 
                })
        );
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
            //console.log("rendering command list");
            var oCommand, command, ul, li, ahref,
                commandMap = RODU.vnstat.singleton.widgetList.commandMap[renderInfo.commandMapName];
                
            ul = renderInfo.container.appendChild(document.createElement("UL"));
            ul.setAttribute("class", renderInfo.listCssClass);
            
            for (oCommand in commandMap){
                //console.log(widgetList.commandList[i].label);
                command = commandMap[oCommand];
                
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
            
            renderInfo.container.appendChild(ul);
        };
        
        /**
         * The method (shold) receive a command as parameter and render
         * it in HTML.
         */
        this.renderCommand = function(command){
            //console.log("rendering command");
            var output = [];
            output.push("<a href=\"#\" onclick=\"\" title=\"");
            output.push(command.description);
            output.push("\">");
            output.push(command.label);
            output.push("</a>\n");
            
            console.log(output.join(""));
        };
    };
} // end check on namespace conflict
