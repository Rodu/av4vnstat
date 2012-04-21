#
# Copyright (C) 2012 Rodu
#       
#       This program is free software; you can redistribute it and/or modify
#       it under the terms of the GNU General Public License as published by
#       the Free Software Foundation; either version 2 of the License, or
#       (at your option) any later version.
#       
#       This program is distributed in the hope that it will be useful,
#       but WITHOUT ANY WARRANTY; without even the implied warranty of
#       MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#       GNU General Public License for more details.
#       
#       You should have received a copy of the GNU General Public License
#       along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
from av4vnstat.generator.DataParser import DataParser
from av4vnstat.util.Config import Constants, ConfigFileReader
from av4vnstat.util.VnStatHandler import VnStatHandler
import datetime

class JSDatasetGenerator(object):
    '''
    Created on 17 Apr 2012

    @author: rob
    '''
    def __init__(self):
        '''
        Constructor
        '''
        self.dataParser = DataParser()
        self.dataParser.setVnStatHandler(VnStatHandler())
        self._jsDataFile = None
        
    def generateHourlyDataSet(self):
        self._generateBarChartData(Constants.HOURS_CHART_DATASET_NAME)
        
    def _generateBarChartData(self, chartDatasetName):
        self._openJSDataFile()
        
        # Field position in the dataList
        DATETIME_FIELD, RX_MIB_FIELD, TX_MIB_FIELD = range(3)
        arrTimeRef = []
        arrRxMiB = []
        arrTxMiB = []
        rxMiB = ""
        txMiB = ""
        
        dataList = self.dataParser.parseHourlyData()
        for data in dataList:
            dateutc = datetime.datetime.utcfromtimestamp(float(data[DATETIME_FIELD]))
            # We add one hour because vnstat is measuring traffic at min 59
            # leading to a wrong day indication on the chart in some cases.
            dateutc += datetime.timedelta(hours = 1)
            #if (chartDatasetName == HOURS_CHART_DATASET_NAME):
            # We are only interested in the hours
            timeref = dateutc.hour
            #elif (chartDatasetName == DAYS_CHART_DATASET_NAME):
            #    timeref = "Date.UTC(" + str(dateutc.year) + ","
            #    # Months are one based but we want them zero based
            #    timeref = timeref + str(dateutc.month - 1) + ","
            #    timeref = timeref + str(dateutc.day) + ","
            #    timeref = timeref + str(dateutc.hour) + ","
            #    timeref = timeref + str(dateutc.minute) + ","
            #    timeref = timeref + str(dateutc.second) + ")"
            
            # Rounding down to two decimal places value calculated for MiBs
            rxMiB = str(round(data[RX_MIB_FIELD], 2))
            txMiB = str(round(data[TX_MIB_FIELD], 2))
            
            arrTimeRef.append(timeref)
            arrRxMiB.append(rxMiB)
            arrTxMiB.append(txMiB)
        
        # Let's write results to file
        self._writeBarChartJSObject(chartDatasetName, arrTimeRef, arrRxMiB, arrTxMiB)
    
    # **********************************************************************
    # Calls respective generator functions depending on the chartType param.
    # 
    def _writeBarChartJSObject(self, chartDatasetName, arrTimeRef, arrRxMiB, arrTxMiB):
        self._openJSDataObject(chartDatasetName)
        
        self._writeCategoriesDataObject(arrTimeRef)
        self._writeSeriesDataObject(arrRxMiB, arrTxMiB)
            
        self._closeJSDataObject()
        
    # **********************************************************************
    # Writes the opening of a Javascript literal using the chartDatasetName
    # as the name of the literal.
    #
    def _openJSDataObject(self, chartDatasetName):
        self._jsDataFile.write("RODU.vnstat.data.")
        self._jsDataFile.write(chartDatasetName)
        self._jsDataFile.write(" = {\n")

    # **********************************************************************
    # Generates the Javascript data set expected by the linear chart type.
    # 
    def _writeSeriesDataObject(self, arrRxMiB, arrTxMiB):
        # Opening the series filed
        self._jsDataFile.write("\tseries: [{\n")
        # Download
        self._jsDataFile.write("\t\tname: 'Download',\n")
        self._jsDataFile.write("\t\tmarker: { symbol: 'square' },\n\t\tdata: ")
        self._jsDataFile.write(str(arrRxMiB).replace("'", ""))
        self._jsDataFile.write("\n\t},{\n")
        # Upload
        self._jsDataFile.write("\t\tname: 'Upload',\n")
        self._jsDataFile.write("\t\tmarker: { symbol: 'diamond' },\n\t\tdata: ")
        self._jsDataFile.write(str(arrTxMiB).replace("'", ""))
        self._jsDataFile.write("\n\t}],\n")
        
    # **********************************************************************
    # Generates the Javascript data set expected by the bar chart type.
    # 
    def _writeCategoriesDataObject(self, arrTimeRef):
        self._jsDataFile.write("\n\tcategories: ")
        self._jsDataFile.write(str(arrTimeRef))
        self._jsDataFile.write(",\n")
    
    # **********************************************************************
    # Writes the closing of a Javascript literal
    #
    def _closeJSDataObject(self):
        self._jsDataFile.write("\n};\n")

    def _openJSDataFile(self):
        if (self._jsDataFile == None):
            configFileReader = ConfigFileReader()
            jsFilePath = configFileReader.read(Constants.SEC_JS_DATA,
                                               Constants.OPT_JS_DATA_FILE_PATH)
            self._jsDataFile = open(jsFilePath, 'w')
