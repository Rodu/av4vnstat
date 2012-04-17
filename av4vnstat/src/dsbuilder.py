#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#       dsbuilder.py
#       
#       Copyright (C) 2012 Rodu
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

import re
import sys
import datetime
import commands
import operator
import unittest

# **********************************************************************
# The function creates the dataset for the chart type indicated by the
# parameter chartType, using the data collected in the vnstat db
# and generates the Javascript to be used in the respective charts.
#
def build_chart_dataset(chartType, chartDatasetName):
    global BAR_CHART_TYPE
    global LINEAR_CHART_TYPE
    global HOURS_CHART_DATASET_NAME
    global DAYS_CHART_DATASET_NAME
    
    # Field position in the dataList
    DATETIME_FIELD, RX_MIB_FIELD, TX_MIB_FIELD = range(3)
    arrTimeRef = []
    arrRxMiB = []
    arrTxMiB = []
    rxMiB = ""
    txMiB = ""
    
    parameters = {}
    if (chartDatasetName == HOURS_CHART_DATASET_NAME):
        parameters["CHART_DATASET_NAME"] = HOURS_CHART_DATASET_NAME
        # Pattern for matching lines of hourly data in vnstat db dump
        parameters["TIME_PATTERN"] = "^h;"
        # This indexes match the field position in the vnstat db dump
        parameters["DATETIME_FIELD"] = 2
        parameters["RX_KIB_FIELD"] = 3
        parameters["TX_KIB_FIELD"] = 4
        
    elif (chartDatasetName == DAYS_CHART_DATASET_NAME):
        parameters["CHART_DATASET_NAME"] = DAYS_CHART_DATASET_NAME
        # Pattern for matching lines of daily data in vnstat db dump
        parameters["TIME_PATTERN"] = "^d;"
        # This indexes match the field position in the vnstat db dump
        parameters["DATETIME_FIELD"] = 2
        parameters["RX_MIB_FIELD"] = 3
        parameters["TX_MIB_FIELD"] = 4
        parameters["RX_KIB_FIELD"] = 5
        parameters["TX_KIB_FIELD"] = 6
    
    dataList = get_linear_data_array(parameters)
    
    for data in dataList:
        dateutc = datetime.datetime.utcfromtimestamp(float(data[DATETIME_FIELD]))
        # We add one hour because vnstat is measuring traffic at min 59
        # leading to a wrong day indication on the chart in some cases.
        dateutc += datetime.timedelta(hours=1)
        if (chartDatasetName == HOURS_CHART_DATASET_NAME):
            # We are only interested in the hours
            timeref = dateutc.hour
        elif (chartDatasetName == DAYS_CHART_DATASET_NAME):
            timeref = "Date.UTC(" + str(dateutc.year) + ","
            # Months are one based but we want them zero based
            timeref = timeref + str(dateutc.month - 1) + ","
            timeref = timeref + str(dateutc.day) + ","
            timeref = timeref + str(dateutc.hour) + ","
            timeref = timeref + str(dateutc.minute) + ","
            timeref = timeref + str(dateutc.second) + ")"
        
        # Rounding down to two decimal places value calculated for MiBs
        rxMiB = str(round(data[RX_MIB_FIELD], 2))
        txMiB = str(round(data[TX_MIB_FIELD], 2))
        
        arrTimeRef.append(timeref)
        arrRxMiB.append(rxMiB)
        arrTxMiB.append(txMiB)
    
    # Let's write results to file
    write_JS_data_object(chartType, chartDatasetName, arrTimeRef, arrRxMiB, arrTxMiB)
        
        #str(arrRxMiB).replace("'", ""),
        #str(arrTxMiB).replace("'", ""))

# **********************************************************************
# In dealing with the vnstat database format we need to do some adjustments
# to the data in order to be consumed by the chart library.
#
# We need to sort them in ascending order and we will remove entries
# with no data at all.
#
def get_linear_data_array(parameters):
    global HOURS_CHART_DATASET_NAME
    global DAYS_CHART_DATASET_NAME
    
    data = []
    for line in vnstatdb:
        m = re.match(parameters["TIME_PATTERN"], line)
        if (m is not None):
            # here I have a data line to read
            dataEntry = line.split(';')
            # Reading the milliseconds value representing an UTC date
            dateutc = long(dataEntry[parameters["DATETIME_FIELD"]])
            # Let's ignore hours with no traffic recorded
            if (dateutc != 0):
                if (parameters["CHART_DATASET_NAME"] == HOURS_CHART_DATASET_NAME):
                    rxMiB = float(dataEntry[parameters["RX_KIB_FIELD"]]) / 1024
                    txMiB = float(dataEntry[parameters["TX_KIB_FIELD"]]) / 1024
                    
                elif (parameters["CHART_DATASET_NAME"] == DAYS_CHART_DATASET_NAME):
                    rxMiB = float(dataEntry[parameters["RX_MIB_FIELD"]])
                    rxMiB += float(dataEntry[parameters["RX_KIB_FIELD"]]) / 1024
                    txMiB = float(dataEntry[parameters["TX_MIB_FIELD"]])
                    txMiB += float(dataEntry[parameters["TX_KIB_FIELD"]]) / 1024
                    
                # Appending a row of data
                data.append([dateutc, rxMiB, txMiB])
    
    # Sorting the data by datetime ascending before returning them
    return sorted(data,key=operator.itemgetter(0))

# **********************************************************************
# Calls respective generator functions depending on the chartType param.
# 
def write_JS_data_object(chartType, chartDatasetName, arrTimeRef, arrRxMiB, arrTxMiB):
    open_JS_data_object(chartDatasetName)
    
    if (chartType == BAR_CHART_TYPE):
        write_categories_data_object(arrTimeRef)
        write_series_data_object(arrRxMiB, arrTxMiB)
            
    elif (chartType == LINEAR_CHART_TYPE):
        arrSeriesRxMiB = []
        arrSeriesTxMiB = []
        i = 0
        while (i < len(arrTimeRef)):
            arrSeriesRxMiB.append([arrTimeRef[i], arrRxMiB[i]])
            arrSeriesTxMiB.append([arrTimeRef[i], arrTxMiB[i]])
            i += 1
        
        write_series_data_object(arrSeriesRxMiB, arrSeriesTxMiB)
        
    close_JS_data_object()
    
# **********************************************************************
# Generates the Javascript data set expected by the linear chart type.
# 
def write_series_data_object(arrRxMiB, arrTxMiB):
    # Opening the series filed
    jsdataset.write("\tseries: [{\n")
    # Download
    jsdataset.write("\t\tname: 'Download',\n")
    jsdataset.write("\t\tmarker: { symbol: 'square' },\n\t\tdata: ")
    jsdataset.write(str(arrRxMiB).replace("'",""))
    jsdataset.write("\n\t},{\n")
    # Upload
    jsdataset.write("\t\tname: 'Upload',\n")
    jsdataset.write("\t\tmarker: { symbol: 'diamond' },\n\t\tdata: ")
    jsdataset.write(str(arrTxMiB).replace("'",""))
    jsdataset.write("\n\t}],\n")
    
# **********************************************************************
# Generates the Javascript data set expected by the bar chart type.
# 
def write_categories_data_object(arrTimeRef):
    jsdataset.write("\n\tcategories: ")
    jsdataset.write(str(arrTimeRef))
    jsdataset.write(",\n")
    
# **********************************************************************
# Writes the opening of a Javascript literal using the chartDatasetName
# as the name of the literal.
#
def open_JS_data_object(chartDatasetName):
    jsdataset.write("RODU.vnstat.data.")
    jsdataset.write(chartDatasetName)
    jsdataset.write(" = {\n")
    
# **********************************************************************
# Writes the closing of a Javascript literal
#
def close_JS_data_object():
    jsdataset.write("\n};\n")
    
# **********************************************************************
#
#
class TestingClass(unittest.TestCase):
    
    def setUp(self):
        self.number = 0
    
    def test_number(self):
        self.assertEqual(self.number, 1)

# **********************************************************************
def main():

    suite = unittest.TestLoader().loadTestsFromTestCase(TestingClass)
    unittest.TextTestRunner(verbosity=2).run(suite)
    
    build_chart_dataset(BAR_CHART_TYPE, HOURS_CHART_DATASET_NAME)
    build_chart_dataset(LINEAR_CHART_TYPE, DAYS_CHART_DATASET_NAME)
    
    #jsdataset.close()
    
    return 0
    
if __name__ == '__main__':
    BAR_CHART_TYPE = 10
    LINEAR_CHART_TYPE = 20
    
    HOURS_CHART_DATASET_NAME = "hourlyDataChart"
    DAYS_CHART_DATASET_NAME = "dailyDataChart"
    
    # change this to the network card name on which vnstat records traffic
    NETWORK_CARD = "ppp0"
    
    vnstatdb = commands.getoutput("vnstat --dumpdb -i " + NETWORK_CARD).split("\n")
    jsdataset = open(sys.path[0] + "/web/js/data.js", 'w')
    
    main()
