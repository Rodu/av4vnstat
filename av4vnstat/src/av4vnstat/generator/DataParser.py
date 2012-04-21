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
from av4vnstat.util.Config import Constants
import operator
import re

class DataParser(object):
    '''
    Created on 17 Apr 2012

    @author: Rodu
    '''
    def __init__(self):
        '''
        Constructor
        '''
        self._vnStatHandler = None
    
    # *************************************************************************
    def setVnStatHandler(self, vnStatHandler):
        self._vnStatHandler = vnStatHandler
    
    # *************************************************************************
    def getVnStatHandler(self):
        return self._vnStatHandler
    
    # *************************************************************************
    def parse(self):
        print("parsing...")
        print(self.parseTopTenDaysData())
        
    # *************************************************************************
    def parseHourlyData(self):
        return self._get_linear_data_array(Constants.HOURS_CHART_DATASET_NAME,
                                           "^h;")

    # *************************************************************************
    def parseDailyData(self):
        return self._get_linear_data_array(Constants.DAYS_CHART_DATASET_NAME,
                                           "^d;")
        
    # *************************************************************************
    def parseMonthlyData(self):
        return self._get_linear_data_array(Constants.MONTHS_CHART_DATASET_NAME,
                                           "^m;")
    
    # *************************************************************************
    def parseTopTenDaysData(self):
        return self._get_linear_data_array(Constants.TOP_TEN_DAYS_DATASET_NAME,
                                           "^t;")
    # *************************************************************************
    # In dealing with the vnstat database format we need to do some adjustments
    # to the data in order to be consumed by the chart library.
    #
    # We need to sort them in ascending order and we will remove entries
    # with no data at all.
    #
    def _get_linear_data_array(self, chartName, timePattern):
        data = []
        
        # This index matches the datetime field position in the vnstat db dump
        DATETIME_FIELD = 2
        
        # Holding pointer to function
        dataReaderFnc = None
        if (chartName == Constants.HOURS_CHART_DATASET_NAME):
            dataReaderFnc = self._readHourlyRxTxData
        else:
            dataReaderFnc = self._readDMTlyRxTxData
        
        for line in self._vnStatHandler.getVnStatDbFile():
            m = re.match(timePattern, line)
            if (m is not None):
                # here I have a data line to read
                dataEntry = line.split(';')
                # Reading the milliseconds value representing an UTC date
                dateutc = long(dataEntry[DATETIME_FIELD])
                # Ignores entries with no traffic recorded
                if (dateutc != 0):
                    # Appending a row of data
                    data.append([dateutc, dataReaderFnc(dataEntry)])
        
        # Sorting the data by datetime ascending before returning them
        return sorted(data, key = operator.itemgetter(0))
    
    # *************************************************************************
    # The function reads data for Hourly entries
    #
    def _readHourlyRxTxData(self, dataEntry):
        RX_KIB_FIELD = 3
        TX_KIB_FIELD = 4
        rxMiB = float(dataEntry[RX_KIB_FIELD]) / 1024
        txMiB = float(dataEntry[TX_KIB_FIELD]) / 1024
        return rxMiB, txMiB
    
    # *************************************************************************
    # The function reads data for Daily, Monthly TopTen entries (DMT)
    #
    def _readDMTlyRxTxData(self, dataEntry):
        RX_MIB_FIELD = 3
        TX_MIB_FIELD = 4
        RX_KIB_FIELD = 5
        TX_KIB_FIELD = 6
        rxMiB = float(dataEntry[RX_MIB_FIELD])
        rxMiB += float(dataEntry[RX_KIB_FIELD]) / 1024
        txMiB = float(dataEntry[TX_MIB_FIELD])
        txMiB += float(dataEntry[TX_KIB_FIELD]) / 1024
        return rxMiB, txMiB
    