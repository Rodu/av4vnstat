#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#       dsbuilder.py
#       
#       Copyright (C) 2011 Rodu
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

# **********************************************************************
# The function creates the dataset for the hourly and daily data collected
# and generates the Javascript to be used in the respective charts.
#
def build_linear_chart_dataset(chartDataSetName):
    global LINEAR_CHART_TYPE
    global HOURS_CHART_DATASET_NAME
    
    dataList = []
    # Field position in the vnstat dataset
    DATETIME_FIELD = 0
    RX_KIB_FIELD = 1
    TX_KIB_FIELD = 2
    arrRxMib = []
    arrTxMib = []
    rxMib = ""
    txMib = ""
    
    parameters = {}
    if (chartDataSetName == HOURS_CHART_DATASET_NAME):
        parameters["TIME_PATTERN"] = "^h;"
        parameters["DATETIME_FIELD"] = 2
        parameters["RX_KIB_FIELD"] = 3
        parameters["TX_KIB_FIELD"] = 4
        dataList = get_linear_data_array(parameters)
        
    for data in dataList:
        dateutc = datetime.datetime.utcfromtimestamp(float(data[DATETIME_FIELD]))
        timeref = "Date.UTC(" + str(dateutc.year) + ","
        # Months are one based but we want them zero based
        timeref = timeref + str(dateutc.month - 1) + ","
        timeref = timeref + str(dateutc.day) + ","
        timeref = timeref + str(dateutc.hour) + ","
        timeref = timeref + str(dateutc.minute) + ","
        timeref = timeref + str(dateutc.second) + ")"
        # Calculating MiB from KiB rounded to 2 decimal digits
        rxMib = str(round(data[RX_KIB_FIELD], 2))
        txMib = str(round(data[TX_KIB_FIELD], 2))
        
        arrRxMib.append([timeref, rxMib])
        arrTxMib.append([timeref, txMib])
    
    # Let's write results to file
    write_JS_data_object(LINEAR_CHART_TYPE,
        chartDataSetName,
        str(arrRxMib).replace("'", ""),
        str(arrTxMib).replace("'", ""))

# **********************************************************************
# The function creates the dataset for the hourly data collected and
# generates the Javascript to be used in the chart.
#
def build_days_dataset():
    # Field position in the vnstat dataset
    DAYS_FIELD = 2
    RX_MIB_FIELD = 3
    TX_MIB_FIELD = 4
    RX_KIB_FIELD = 5
    TX_KIB_FIELD = 6
    
    build_line_chart_dataset("dailyDataChart", "^d;", DAYS_FIELD, RX_MIB_FIELD, TX_MIB_FIELD, RX_KIB_FIELD, TX_KIB_FIELD)

def build_line_chart_dataset(chartDataSetName, timePattern, 
        timePatternField, rxMiBField, txMiBField, rxKiBField, txKiBField):
    # Creating the data object in the respective namespace
    jsdataset.write("RODU.vnstat.data.")
    jsdataset.write(chartDataSetName)
    jsdataset.write(" = {\n")
    
    # Opening the series filed
    jsdataset.write("\tseries: [{\n")
    
    timeref = ""
    # To provide data properly to the charting library I need to sort
    # entries by date ascending. Initially they come just in the opposite order.
    # The two following arrays will contain the data and will be sorted accordingly.
    arrRxMib = []
    yestrArrRxMib = []
    
    arrTxMib = []
    
    rxMib = ""
    txMib = ""
    
    for line in vnstatdb:
        m = re.match(timePattern, line)
        if (m is not None):
            # here I have a data line to read
            data = line.split(';')
            # will skip timeref with no traffic at all
            if (data[timePatternField] != "0"):
                dateutc = datetime.datetime.utcfromtimestamp(float(data[timePatternField]))
                timeref = "Date.UTC(" + str(dateutc.year) + ","
                # Months are one based but we want them zero based
                timeref = timeref + str(dateutc.month - 1) + ","
                timeref = timeref + str(dateutc.day)
                
                if (timePattern == "^h;"):
                    #timeref = timeref + data[timePatternField] + ","
                    timeref = timeref + "," + str(dateutc.hour) + ","
                    timeref = timeref + str(dateutc.minute) + ","
                    timeref = timeref + str(dateutc.second) + "),"
                    
                    print("Y:" + str(dateutc.day))
                    print(datetime.datetime.now().day)
                    if (dateutc.day < datetime.datetime.now().day):
                        yestrArrRxMib.append([timeref + str(round(float(data[rxKiBField]) / 1024, 2))])
                    else:
                        # Calculating MiB from KiB rounded to 2 decimal digits
                        arrRxMib.append([timeref + str(round(float(data[rxKiBField]) / 1024, 2))])
                        arrTxMib.append([timeref + str(round(float(data[txKiBField]) / 1024, 2))])
                        #txMib = txMib + str(round(float(data[txKiBField]) / 1024, 2)) + ","
                else:
                    timeref = timeref + "),"
                    # Reading the MiB from data appending the KiB value as well
                    arrRxMib.insert(0, [timeref + str(data[rxMiBField]) + "." + str(data[rxKiBField])])
                    arrTxMib.insert(0, [timeref + str(data[txMiBField]) + "." + str(data[txKiBField])])
    
    if (len(yestrArrRxMib) > 0):
        arrRxMib.insert(0, yestrArrRxMib)
    
    rxMib = "\t\tdata: " + str(arrRxMib).replace("'", "")
    txMib = "\t\tdata: " + str(arrTxMib).replace("'", "")
    
    jsdataset.write("\t\tname: 'Downloaded MiB',\n")
    jsdataset.write("\t\tmarker: { symbol: 'square' },\n")
    jsdataset.write(rxMib)
    jsdataset.write("\n\t},{\n")
    
    jsdataset.write("\t\tname: 'Uploaded MiB',\n")
    jsdataset.write("\t\tmarker: { symbol: 'diamond' },\n")
    jsdataset.write(txMib)
    jsdataset.write("\n\t}],\n")
    
    #jsdataset.write("\tcategories: [")
    #jsdataset.write(timeref)
    #jsdataset.write("]\n")
    
    # closing the object
    jsdataset.write("\n};\n")

# **********************************************************************
# In dealing with the vnstat database format we need to do some adjustments
# to the data in order to be consumed by the chart library.
#
# We need to sort them in ascending order and we will remove entries
# with no data at all.
#
def get_linear_data_array(parameters):
    data = []
    for line in vnstatdb:
        m = re.match(parameters["TIME_PATTERN"], line)
        if (m is not None):
            # here I have a data line to read
            dataEntry = line.split(';')
            #dateutc = datetime.datetime.utcfromtimestamp(float(dataEntry[DATETIME_FIELD]))
            dateutc = long(dataEntry[parameters["DATETIME_FIELD"]])
            # Let's ignore hours with no traffic recorded
            if (dateutc != 0):
                rxMib = float(dataEntry[parameters["RX_KIB_FIELD"]]) / 1024
                txMib = float(dataEntry[parameters["TX_KIB_FIELD"]]) / 1024
                # Appending data
                data.append([dateutc, rxMib, txMib])
    
    # Sorting the data by datetime ascending before returning them
    return sorted(data,key=operator.itemgetter(0))

# **********************************************************************
# The write_JS_data_object generates the Javascript data set expected
# by the chart type.
# 
def write_JS_data_object(chartType, chartDatasetName, strRxMib, strTxMib):
    global LINEAR_CHART_TYPE
    
    jsdataset.write("RODU.vnstat.data.")
    jsdataset.write(chartDatasetName)
    jsdataset.write(" = {\n")
    
    if (chartType == LINEAR_CHART_TYPE):        
        # Opening the series filed
        jsdataset.write("\tseries: [{\n")
        jsdataset.write("\t\tname: 'Downloaded MiB',\n")
        jsdataset.write("\t\tmarker: { symbol: 'square' },\n\t\tdata: ")
        jsdataset.write(strRxMib)
        jsdataset.write("\n\t},{\n")
        
        jsdataset.write("\t\tname: 'Uploaded MiB',\n")
        jsdataset.write("\t\tmarker: { symbol: 'diamond' },\n\t\tdata: ")
        jsdataset.write(strTxMib)
        jsdataset.write("\n\t}],\n")
    
    # closing the object
    jsdataset.write("\n};\n")

# **********************************************************************
def main():

    build_linear_chart_dataset(HOURS_CHART_DATASET_NAME)
    
    #build_monthly_dataset()
    #build_topten_dataset()
    
    #jsdataset.write("\n};\n")
    
    jsdataset.close()
    
    return 0
    
if __name__ == '__main__':
    LINEAR_CHART_TYPE = 10
    
    HOURS_CHART_DATASET_NAME = "hourlyDataChart"
    
    # change this to the network card name on which vnstat records traffic
    network_card = "ppp0"
    
    vnstatdb = commands.getoutput("vnstat --dumpdb -i " + network_card).split("\n")
    jsdataset = open(sys.path[0] + "/js/data.js", 'w')
    
    main()
