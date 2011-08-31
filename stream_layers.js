/* Inspired by Lee Byron's test data generator. */
function stream_layers(n, m, o) {
  if (arguments.length < 3) o = 0;
  return d3.range(n).map(function() {
      var a = getValue(arguments[1]), i;
      return a.map(stream_index);
    });
}

function stream_index(d, i) {
  return {x: i, y: Math.max(0, d)};
}

selectDataset = function(dsType)
{
    //console.log("selecting dataset for " + dsType);
    switch(dsType)
    {
        case 0:
            dataset = dataset_hourly;
            break;
        case 1:
            dataset = dataset_daily;
            break;
    }
}

getValue = function(n)
{
    var values = [], i;
    for (i = 0; i < dataset.length; i++)
    {
        values.push(dataset[i][n == 0 ? "tx" : "rx"]);
    }
    
    return values;
},

getLabel = function(m)
{
    return dataset[m]["time"];
},

getYLabel = function()
{
    return 5;
};

