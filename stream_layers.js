/* Inspired by Lee Byron's test data generator. */
function stream_layers(n, m, o) {
  if (arguments.length < 3) o = 0;
  /*
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  * */
  return d3.range(n).map(function() {
      var a = getValue(arguments[1]), i;
      //for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      //for (i = 0; i < 5; i++) bump(a);
      return a.map(stream_index);
    });
}

/* Another layer generator using gamma distributions. */
function stream_waves(n, m) {
  return d3.range(n).map(function(i) {
    return d3.range(m).map(function(j) {
        var x = 20 * j / m - i / 3;
        return 2 * x * Math.exp(-.5 * x);
      }).map(stream_index);
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

