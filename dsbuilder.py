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

def main():

    build_hours_dataset()
    
    #build_daily_dataset()
    #build_monthly_dataset()
    #build_topten_dataset()
    
    #jsdataset.write("\n};\n")
    
    jsdataset.close()
    
    return 0

def build_hours_dataset():
    # Field position in the vnstat dataset
    HOURS_FIELD = 1
    RX_KIB_FIELD = 3
    TX_KIB_FIELD = 4
    
    # Creating the data object in the respective namespace
    jsdataset.write("RODU.vnstat.data.hourlyDataChart = {\n")
    # Opening the series filed
    jsdataset.write("\tseries: [{\n")
    jsdataset.write("\t\tname: 'Downloaded MiB',\n")
    jsdataset.write("\t\tmarker: { symbol: 'square' },\n")
    
    hours = ""
    rxMib = "\t\tdata: ["
    txMib = "\t\tdata: ["
    
    for line in vnstatdb:
        m = re.match('^h;', line)
        if (m is not None):
            # here I have a data line to read
            data = line.split(';')
            # will skip hours with no traffic at all
            if (data[RX_KIB_FIELD] != "0" and data[TX_KIB_FIELD] != "0"):
                #hours = hours + str(datetime.datetime.utcfromtimestamp(int(data[HOURS_FIELD]))) + ","
                hours = hours + str(data[HOURS_FIELD]) + ","
                # Calculating MiB from KiB rounded to 2 decimal digits
                rxMib = rxMib + str(round(float(data[RX_KIB_FIELD]) / 1024, 2)) + ","
                txMib = txMib + str(round(float(data[TX_KIB_FIELD]) / 1024, 2)) + ","
            
    jsdataset.write(rxMib)
    jsdataset.write("]\n\t},{\n")
    jsdataset.write("\t\tname: 'Uploaded MiB',\n")
    jsdataset.write("\t\tmarker: { symbol: 'diamond' },\n")
    jsdataset.write(txMib)
    # Closing the series field
    jsdataset.write("]\n\t}],\n")
    
    jsdataset.write("\tcategories: [")
    jsdataset.write(hours)
    jsdataset.write("]\n")
    
    # closing the object
    jsdataset.write("\n};\n")
    
def build_daily_dataset():
    jsdataset.write("this.data_daily = [")
    day_entries = lines_by_regexp('^d;', DAILY_DATASET_TYPE)
    jsdataset.write("];\n")
    jsdataset.write("this.day_entries = ")
    jsdataset.write(str(day_entries))
    jsdataset.write(";\n")

def build_monthly_dataset():
    jsdataset.write("this.data_monthly = [")
    entries = lines_by_regexp('^m;', MONTHLY_DATASET_TYPE)
    jsdataset.write("];\n")
    jsdataset.write("this.month_entries = ")
    jsdataset.write(str(entries))
    jsdataset.write(";\n")

def build_topten_dataset():
    jsdataset.write("this.data_topten = [")
    entries = lines_by_regexp('^t;', TOPTEN_DATASET_TYPE)
    jsdataset.write("];\n")
    jsdataset.write("this.topten_entries = ")
    jsdataset.write(str(entries))
    jsdataset.write(";\n")

def lines_by_regexp(regexp, datasetType):
    entries = 0
    for line in vnstatdb:
        m = re.match(regexp, line)
        if (m is not None):
            m = re.search(';1$', line)
            if (m is not None):
                # here I have a data line to read
                data = line.split(';')
                date = datetime.datetime.utcfromtimestamp(float(data[2]))
                datestring = ""
                rxMib = data[3]
                txMib = data[4]
                rxKib = data[5]
                txKib = data[6]
                
                write_data_entry(datasetType, date, rxMib, txMib, rxKib, txKib)
                
                entries += 1
    return entries
                
def write_data_entry(datasetType, date, rxMib, txMib, rxKib, txKib):
    jsdataset.write("{time: ")
    jsdataset.write("\"")
    
    if (datasetType == HOURLY_DATASET_TYPE):
        jsdataset.write(str(date.hour))
        
    elif (datasetType == DAILY_DATASET_TYPE or datasetType == TOPTEN_DATASET_TYPE):
        jsdataset.write(str(date.day))
        jsdataset.write("/")
        jsdataset.write(str(date.month))
        
    elif (datasetType == MONTHLY_DATASET_TYPE):
        jsdataset.write(str(date.month))
        jsdataset.write("/")
        jsdataset.write(str(date.year))
        
    jsdataset.write("\", rx: ")
    jsdataset.write(rxMib)
    jsdataset.write(", tx: ")
    jsdataset.write(txMib)
    jsdataset.write("},\n") # a one more comma will remain...
                
if __name__ == '__main__':
    HOURLY_DATASET_TYPE = 0
    DAILY_DATASET_TYPE = 1
    MONTHLY_DATASET_TYPE = 2
    TOPTEN_DATASET_TYPE = 3
    
    # change this to the network card name on which vnstat records traffic
    network_card = "ppp0"
    
    vnstatdb = commands.getoutput("vnstat --dumpdb -i " + network_card).split("\n")
    jsdataset = open(sys.path[0] + "/js/data.js", 'w')
    
    main()
