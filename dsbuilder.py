#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#       untitled.py
#       
#       Copyright 2011 Roberto S. <rob@marlix>
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
#       along with this program; if not, write to the Free Software
#       Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#       MA 02110-1301, USA.

import re
import datetime
import commands

def main():

    jsdataset.write("BYRO.vnstat.data = {};\nBYRO.vnstat.data.Data = function(){\n")
    
    build_hours_dataset()
    build_daily_dataset()
    build_monthly_dataset()
    build_topten_dataset()
    
    jsdataset.write("\n};\n")
    
    jsdataset.close()
    
    return 0

def build_daily_dataset():
    jsdataset.write("this.data_daily = [")
    day_entries = lines_by_regexp('^d;', DAILY_DATASET_TYPE)
    jsdataset.write("],\n")
    jsdataset.write("this.day_entries = ")
    jsdataset.write(str(day_entries))
    jsdataset.write(";\n")

def build_monthly_dataset():
    jsdataset.write("this.data_monthly = [")
    entries = lines_by_regexp('^m;', MONTHLY_DATASET_TYPE)
    jsdataset.write("],\n")
    jsdataset.write("this.month_entries = ")
    jsdataset.write(str(entries))
    jsdataset.write(";\n")

def build_topten_dataset():
    jsdataset.write("this.data_topten = [")
    entries = lines_by_regexp('^t;', TOPTEN_DATASET_TYPE)
    jsdataset.write("],\n")
    jsdataset.write("this.topten_entries = ")
    jsdataset.write(str(entries))
    jsdataset.write(";\n")

def build_hours_dataset():
    jsdataset.write("this.data_hourly = [")
    entries = 0
    for line in vnstatdb:
        m = re.match('^h;', line)
        if (m is not None):
            # here I have a data line to read
            data = line.split(';')
            if (data[2] == "0"):
                continue # will skip hours with no traffic at all
                
            date = datetime.datetime.utcfromtimestamp(float(data[2]))
            rxMib = str(float(data[3]) / 1000)
            txMib = str(float(data[4]) / 1000)
            rxKib = data[3]
            txKib = data[4]
            
            write_data_entry(HOURLY_DATASET_TYPE, date, rxMib, txMib, rxKib, txKib)
            
            entries += 1
    jsdataset.write("],\n")
    jsdataset.write("this.hour_entries = ")
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
    
    if (datasetType == 0):
        jsdataset.write(str(date.hour))
    elif (datasetType == 1 or datasetType == 3):
        jsdataset.write(str(date.day))
        jsdataset.write("/")
        jsdataset.write(str(date.month))
    elif (datasetType == 2):
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
    
    vnstatdb = commands.getoutput("vnstat --dumpdb -i ppp0").split("\n")
    jsdataset = open("/media/repository/dev/byro_vnstat/stream/data.js", 'w')
    
    main()
