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
        self._dataParser = None
        self._jsDataFile = None
        
    # *************************************************************************
    def setDataParser(self, dataParser):
        self._dataParser = dataParser
        
    # *************************************************************************
    def generateHourlyDataSet(self):
        dataList = self._dataParser.parseHourlyData()
        arrTimeRef, arrRxMiB, arrTxMiB = self._generateChartData(dataList,
                                                                 self._buildBarChartTimeref)
        # Let's write results to file
        self._writeBarChartJSObject(Constants.HOURS_CHART_DATASET_NAME,
                                    arrTimeRef, arrRxMiB, arrTxMiB)
    
    # *************************************************************************
    def generateDailyDataSet(self):
        dataList = self._dataParser.parseDailyData()
        arrTimeRef, arrRxMiB, arrTxMiB = self._generateChartData(dataList,
                                                                 self._buildLineChartTimeref)
        # Let's write results to file
        self._writeLineChartJSDataObject(Constants.DAYS_CHART_DATASET_NAME,
                                    arrTimeRef, arrRxMiB, arrTxMiB)
    
    # *************************************************************************
    def generateMonthlyDataSet(self):
        dataList = self._dataParser.parseMonthlyData()
        dataSet = self._generateSmallMultiplesData(dataList)
    
    #def _generateBarChartData(self, chartDatasetName):
    #    return self._generateChartData(chartDatasetName, self._buildBarChartTimeref)
    
    #def _generateLineChartData(self, chartDatasetName):
    #    return self._generateChartData(chartDatasetName, self._buildLineChartTimeref)
    
    # *************************************************************************
    def cleanup(self):
        self._closeJSDataFile()
        
    # *************************************************************************
    def _buildBarChartTimeref(self, dateutc):
        # We are only interested in the hours
        return dateutc.hour
    
    # *************************************************************************
    def _buildLineChartTimeref(self, dateutc):
        timeref = "Date.UTC(" + str(dateutc.year) + ","
        # Months are one based but we want them zero based
        timeref = timeref + str(dateutc.month - 1) + ","
        timeref = timeref + str(dateutc.day) + ","
        timeref = timeref + str(dateutc.hour) + ","
        timeref = timeref + str(dateutc.minute) + ","
        timeref = timeref + str(dateutc.second) + ")"
        
        return timeref
    
    # *************************************************************************
    def _generateChartData(self, dataList, timerefFunc):
        self._openJSDataFile()
        
        # Field position in the dataList
        DATETIME_FIELD, RX_MIB_FIELD, TX_MIB_FIELD = range(3)
        arrTimeRef = []
        arrRxMiB = []
        arrTxMiB = []
        rxMiB = ""
        txMiB = ""
        
        for data in dataList:
            dateutc = datetime.datetime.utcfromtimestamp(float(data[DATETIME_FIELD]))
            # We add one hour because vnstat is measuring traffic at min 59
            # leading to a wrong day indication on the chart in some cases.
            dateutc += datetime.timedelta(hours = 1)
            # Calling the pointed function passing the date object
            timeref = timerefFunc(dateutc)
            # Rounding down to two decimal places value calculated for MiBs
            rxMiB = str(round(data[RX_MIB_FIELD], 2))
            txMiB = str(round(data[TX_MIB_FIELD], 2))
            
            arrTimeRef.append(timeref)
            arrRxMiB.append(rxMiB)
            arrTxMiB.append(txMiB)
        
        return arrTimeRef, arrRxMiB, arrTxMiB
    
    # *************************************************************************
    # To calculate percentages:
    #
    #    - Find the maxValue element of the month looking in both Tx and Rx
    #     (the min will be zero). The maxValue will represent the 100%
    #      and all the others will be calculated and drawn in respect to
    #      this value (they will be a percentage of that)
    #
    #   - For each line (entry) generate an entry for the chart calculating:
    #       - the percentage for the representative point (the top at the center)
    #       - the percentages for the other points in relation to the ratio
    #           those other points have with the top one
    #   
    #   - Write the entry that the chart will consume, representing a SM tail
    #   
    #   
    #    Example of the data set:
    #   
    #    [ [ DateUTC(YYY, MM, DD), [Rx %] , [Tx %] ], 
    #      [ DateUTC(YYY, MM, DD), [Rx %] , [Tx %] ], ...]
    #
    #    To create the desired shape this are the proportions:
    #
    #        [0, 50, 30, 100, 30, 50, 0 ]
    #
    #    where the 100 represent the central point to calculate while the
    #    others need be calculated in respect of the 100 percent, and have to be
    #    30%, 50% etc from the central value.
    #
    #    See testing class for what is expected.
    #
    def _generateSmallMultiplesData(self, dataList):
        dataSet = []
        
        # This ratios will determine the shape of the chart
        percentRatios = [0, 50, 30, 100, 30, 50, 0]
        
        # Field position in the dataList
        DATETIME_FIELD, RX_MIB_FIELD, TX_MIB_FIELD = range(3)
        
        # Let's find the maxValue in both rx and tx entries
        maxValue = 0
        for entry in dataList:
            entryMax = entry[RX_MIB_FIELD]
            if (entry[RX_MIB_FIELD] < entry[TX_MIB_FIELD]):
                entryMax = entry[TX_MIB_FIELD]
                
            if (entryMax > maxValue):
                maxValue = entryMax
        #print(str(maxValue))
        
        # Let's create the dataset calculating the value with respect to the maxValue
        for entry in dataList:
            dataSetEntry = []
            rxData = []
            txData = []
            dateutc = datetime.datetime.utcfromtimestamp(float(entry[DATETIME_FIELD]))
            # We add one hour because vnstat is measuring traffic at min 59
            # leading to a wrong day indication on the chart in some cases.
            dateutc += datetime.timedelta(hours = 1)
            # Calling the pointed function passing the date object
            timeref = self._buildLineChartTimeref(dateutc)
            
            # Calculating percentages
            percRxVariation = (entry[RX_MIB_FIELD] / maxValue) * 100
            percTxVariation = (entry[TX_MIB_FIELD] / maxValue) * 100
            for ratio in percentRatios:
                rxData.append(ratio * percRxVariation / 100)
                txData.append(ratio * percTxVariation / 100)
            
            dataSetEntry.append(timeref)
            dataSetEntry.append(rxData)
            dataSetEntry.append(txData)
            
            dataSet.append(dataSetEntry)
            
        return dataSet
    
    # *************************************************************************
    # 
    def _writeBarChartJSObject(self, chartDatasetName, arrTimeRef, arrRxMiB, arrTxMiB):
        self._openJSDataObject(chartDatasetName)
        
        self._writeCategoriesDataObject(arrTimeRef)
        self._writeSeriesDataObject(arrRxMiB, arrTxMiB)
            
        self._closeJSDataObject()
    
    # *************************************************************************
    def _writeLineChartJSDataObject(self, chartDatasetName, arrTimeRef, arrRxMiB, arrTxMiB):
        self._openJSDataObject(chartDatasetName)
        
        arrSeriesRxMiB = []
        arrSeriesTxMiB = []

        for i in range(len(arrTimeRef)):
            arrSeriesRxMiB.append([arrTimeRef[i], arrRxMiB[i]])
            arrSeriesTxMiB.append([arrTimeRef[i], arrTxMiB[i]])
        
        self._writeSeriesDataObject(arrSeriesRxMiB, arrSeriesTxMiB)
        
        self._closeJSDataObject()
    
    # *************************************************************************
    # Writes the opening of a Javascript literal using the chartDatasetName
    # as the name of the literal.
    #
    def _openJSDataObject(self, chartDatasetName):
        self._jsDataFile.write("RODU.vnstat.data.")
        self._jsDataFile.write(chartDatasetName)
        self._jsDataFile.write(" = {\n")

    # *************************************************************************
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
        
    # *************************************************************************
    # Generates the Javascript data set expected by the bar chart type.
    # 
    def _writeCategoriesDataObject(self, arrTimeRef):
        self._jsDataFile.write("\n\tcategories: ")
        self._jsDataFile.write(str(arrTimeRef))
        self._jsDataFile.write(",\n")
    
    # *************************************************************************
    # Writes the closing of a Javascript literal
    #
    def _closeJSDataObject(self):
        self._jsDataFile.write("\n};\n")

    # *************************************************************************
    def _openJSDataFile(self):
        if (self._jsDataFile == None):
            configFileReader = ConfigFileReader()
            jsFilePath = configFileReader.read(Constants.SEC_JS_DATA,
                                               Constants.OPT_JS_DATA_FILE_PATH)
            self._jsDataFile = open(jsFilePath, 'w')
    
    # *************************************************************************
    def _closeJSDataFile(self):
        if (not self._jsDataFile == None):
            self._jsDataFile.close()
    
