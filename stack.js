var n = 2, // number of layers
    m = day_entries, // number of samples per layer
    data = d3.layout.stack()(stream_layers(n, m, .1)),
    color = d3.interpolateRgb("#AEA8DA", "#60699F");

var p = 40,
    w = 960,
    h = 500 - .5 - p,
    mx = m,
    my = d3.max(data, function(d) {
      return d3.max(d, function(d) {
        return d.y0 + d.y;
      });
    }),
    mz = d3.max(data, function(d) {
      return d3.max(d, function(d) {
        return d.y;
      });
    }),
    
    x = function(d) { return d.x * w / mx; },
    labelx = function(d) { return p + x(d); },
    labely = function(d,i) { return d.y; },
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
    .data(data)
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
  .transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", y1)
    .attr("height", function(d) { return y0(d) - y1(d); });
    
var labels = vis.selectAll("text.label")
    .data(data[0])
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
    .data(data[0])
    .enter().append("svg:text")
        .attr("class", "ylabelTx")
        .attr("font-size", "1.2em")
        .attr("x", labelx)
        .attr("dx", x({x: .05}))
        .attr("y", y3)
        .text(labely);
        
var ylabelsRx = vis.selectAll("text.ylabelsRx")
    .data(data[1])
    .enter().append("svg:text")
        .attr("class", "ylabelsRx")
        .attr("font-size", "1.2em")
        .attr("dx", x({x: .05}))
        .attr("fill", "#ffffff")
        .attr("x", labelx)
        .attr("y", y3)
        .text(labely);

var ylabelsTot = vis.selectAll("text.ylabelsTot")
    .data(data[1])
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
