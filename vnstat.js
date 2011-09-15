/* @namespace */
var RODU;

if (!RODU)
{
    RODU = {};
}
else
{
    throw("'RODU' already defined by other module.");
}

if (!RODU.vnstat)
{
	/** Package containing...  
	 * @namespace */
	RODU.vnstat = {};
}
else
{
    throw("'RODU.vnstat' already defined by other module.");
}

RODU.vnstat.VNStat = function()
{
    var data = new RODU.vnstat.data.Data();
    
    this.cleanup = function()
    {
        document.getElementById("chart").innerHTML = "";
    };
    
    /* TODO: ugly...
     * The code should be reviewed. There should be an initialization
     * phase and the variable declarations should be separate from their
     * initialization to free the code from restrictive initialization
     * and execution dependencies */
    this.draw = function(dsType)
    {
        var dataset,
        data_entries = 0;
        
        switch(dsType)
        {
            case 0:
                dataset = data.data_hourly;
                data_entries = data.hour_entries;
                break;
            case 1:
                dataset = data.data_daily;
                data_entries = data.day_entries;
                break;
            case 2:
                dataset = data.data_monthly;
                data_entries = data.month_entries;
                break;
            case 3:
                dataset = data.data_topten;
                data_entries = data.topten_entries;
                break;
        }
            
        var stream_layers = function(n, m, dsType, o) {
            if (arguments.length < 4) o = 0;
              return d3.range(n).map(function() {
                  var a = getValue(arguments[1]), i;
                  return a.map(function(d, i) {
                      return {x: i, y: Math.max(0, d)};
                    });
                });
        };
        
        var getValue = function(n)
        {
            var values = [], i;
            for (i = 0; i < dataset.length; i++)
            {
                values.push(dataset[i][n == 0 ? "tx" : "rx"]);
            }
            
            return values;
        };

        var getLabel = function(m)
        {
            return dataset[m]["time"];
        };

        var getYLabel = function()
        {
            return 5;
        };
        
        var n = 2, // number of layers
            m = data_entries, // number of samples per layer
            chart_data = d3.layout.stack()(stream_layers(n, m, dsType, .1)),
            color = d3.interpolateRgb("#AEA8DA", "#60699F");

        var p = 40,
            w = 960,
            h = 500 - .5 - p,
            mx = m,
            my = d3.max(chart_data, function(d) {
              return d3.max(d, function(d) {
                return d.y0 + d.y;
              });
            }),
            mz = d3.max(chart_data, function(d) {
              return d3.max(d, function(d) {
                return d.y;
              });
            }),
            
            x = function(d) { return d.x * w / mx; },
            labelx = function(d) { return p + x(d); },
            labely = function(d,i) { return (d.y > 0) ? d.y : ""; },
            labeltot = function(d,i) { return d.y + d.y0; },
            y0 = function(d) { return h - d.y0 * h / my; },
            y1 = function(d) { 
                var val = h - (d.y + d.y0) * h / my;
                if (val < p) val += p;
                return val;
                //return (p + h) - (d.y + d.y0) * h / my;
            },
            y2 = function(d) { return d.y * h / mz; }, // or `my` to not rescale
            y3 = function(d) { return 10 + y1(d); };

        var vis = d3.select("#chart")
          .append("svg:svg")
            .attr("width", w)
            .attr("height", h + p);
          
        var layers = vis.selectAll("g.layer")
            .data(chart_data)
          .enter().append("svg:g")
            .style("fill", function(d, i) { return color(i / (n - 1)); })
            .attr("class", "layer");

        var bars = layers.selectAll("g.bar")
            .data(function(d) { return d; })
          .enter().append("svg:g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });

        bars.append("svg:rect")
            .attr("width", x({x: .9}))
            .attr("x", p)
            .attr("y", h)
            .attr("height", 0)
            //.attr("onmouseover", "alert('hello')")
          .transition()
            .delay(function(d, i) { return i * 10; })
            .attr("y", y1)
            .attr("height", function(d) { return y0(d) - y1(d); });
            
        var labels = vis.selectAll("text.label")
            .data(chart_data[0])
          .enter().append("svg:text")
            .attr("class", "label")
            .attr("font-size", "1.3em")
            .attr("x", labelx)
            .attr("y", h + 6)
            .attr("dx", x({x: .80}))
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .text(function(d, i) { return getLabel(i); });

        var ylabelTx = vis.selectAll("text.ylabelTx")
            .data(chart_data[0])
            .enter().append("svg:text")
                .attr("class", "ylabelTx")
                .attr("font-size", "1.2em")
                .attr("x", labelx)
                .attr("dx", x({x: .05}))
                .attr("y", y3)
                .text(labely);
                
        var ylabelsRx = vis.selectAll("text.ylabelsRx")
            .data(chart_data[1])
            .enter().append("svg:text")
                .attr("class", "ylabelsRx")
                .attr("font-size", "1.2em")
                .attr("dx", x({x: .05}))
                .attr("fill", "#ffffff")
                .attr("x", labelx)
                .attr("y", y3)
                .text(labely);

        var ylabelsTot = vis.selectAll("text.ylabelsTot")
            .data(chart_data[1])
            .enter().append("svg:text")
                .attr("class", "ylabelsTot")
                .attr("font-size", "1.3em")
                .attr("x", labelx)
                .attr("y", p/2)
                .attr("dx", x({x: .20}))
                .text(labeltot);
                
        vis.append("svg:line")
            .attr("x1", 0)
            .attr("x2", p + (w - x({x: .1})))
            .attr("y1", p)
            .attr("y2", p);
        /*
        vis.append("svg:line")
            .attr("x1", p)
            .attr("x2", p)
            .attr("y1", 0)
            .attr("y2", h);
        */
        vis.append("svg:line")
            .attr("x1", 0)
            .attr("x2", p + (w - x({x: .1})))
            .attr("y1", h)
            .attr("y2", h);
    };
};
