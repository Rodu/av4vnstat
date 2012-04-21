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
from av4vnstat.util.VnStatHandler import VnStatHandler
import operator
import re
from av4vnstat.util.Config import ConfigEnum

class DataParser(object):
    '''
    Created on 17 Apr 2012

    @author: Rodu
    '''
    def __init__(self):
        '''
        Constructor
        '''
        self.CONFIG_ENUM = ConfigEnum()
        self._vnStatHandler = VnStatHandler()
        self._vnStatDumpDbFile = None
        
    def parse(self):
        print("parsing...")
        print(self.parseDailyData())
    
    def parseDailyData(self):
        self._initVnStatDumpFile()
        parameters = {}
        parameters["CHART_DATASET_NAME"] = self.CONFIG_ENUM.DAYS_CHART_DATASET_NAME
        # Pattern for matching lines of daily data in vnstat db dump
        parameters["TIME_PATTERN"] = "^d;"
        # This indexes match the field position in the vnstat db dump
        parameters["DATETIME_FIELD"] = 2
        parameters["RX_MIB_FIELD"] = 3
        parameters["TX_MIB_FIELD"] = 4
        parameters["RX_KIB_FIELD"] = 5
        parameters["TX_KIB_FIELD"] = 6
        
        return self._get_linear_data_array(parameters)
    
    def _initVnStatDumpFile(self):
        if (self._vnStatDumpDbFile == None):
            self._vnStatDumpDbFile = self._vnStatHandler.getVnStatDbFile()
        return
    
    # **********************************************************************
    # In dealing with the vnstat database format we need to do some adjustments
    # to the data in order to be consumed by the chart library.
    #
    # We need to sort them in ascending order and we will remove entries
    # with no data at all.
    #
    def _get_linear_data_array(self, parameters):
        data = []
        for line in self._vnStatDumpDbFile:
            m = re.match(parameters["TIME_PATTERN"], line)
            if (m is not None):
                # here I have a data line to read
                dataEntry = line.split(';')
                # Reading the milliseconds value representing an UTC date
                dateutc = long(dataEntry[parameters["DATETIME_FIELD"]])
                # Let's ignore hours with no traffic recorded
                if (dateutc != 0):
                    if (parameters["CHART_DATASET_NAME"] == self.CONFIG_ENUM.HOURS_CHART_DATASET_NAME):
                        rxMiB = float(dataEntry[parameters["RX_KIB_FIELD"]]) / 1024
                        txMiB = float(dataEntry[parameters["TX_KIB_FIELD"]]) / 1024
                        
                    elif (parameters["CHART_DATASET_NAME"] == self.CONFIG_ENUM.DAYS_CHART_DATASET_NAME):
                        rxMiB = float(dataEntry[parameters["RX_MIB_FIELD"]])
                        rxMiB += float(dataEntry[parameters["RX_KIB_FIELD"]]) / 1024
                        txMiB = float(dataEntry[parameters["TX_MIB_FIELD"]])
                        txMiB += float(dataEntry[parameters["TX_KIB_FIELD"]]) / 1024
                        
                    # Appending a row of data
                    data.append([dateutc, rxMiB, txMiB])
        
        # Sorting the data by datetime ascending before returning them
        return sorted(data,key=operator.itemgetter(0))
    