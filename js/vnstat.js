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

RODU.vnstat.VNStat = (function(){
    $(document).ready(function(){
        
        
    }); // end jQuery ready call
}());
