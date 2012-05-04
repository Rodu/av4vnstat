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
from av4vnstat.generator.JSDatasetGenerator import JSDatasetGenerator
from av4vnstat.generator.DataParser import DataParser
from av4vnstat.util.VnStatHandler import VnStatHandler

class Av4vnstat(object):
    '''
    Created on 17 Apr 2012

    @author: Rodu
    
    This represent the main class of the program.
    
    As the progam can be used by both the command line and the desktop GUI,
    it allows to choose between these two main dinstinctions.
    
    Invoked from the command line, the program is meant to provide the
    javascript data set that will be used in the web interface.
    
    When the program is used through the desktop GUI, all data and charts will
    be displayed there.
    
    '''
    def __init__(self):
        '''
        Constructor
        '''
        
    # *************************************************************************
    def main(self):
        dataParser = DataParser()
        dataParser.setVnStatHandler(VnStatHandler())
        
        jsDataGenerator = JSDatasetGenerator()
        jsDataGenerator.setDataParser(dataParser)
        
        jsDataGenerator.generateUpdateTimeRecord()
        jsDataGenerator.generateHourlyDataSet()
        jsDataGenerator.generateDailyDataSet()
        jsDataGenerator.generateMonthlyDataSet()
        jsDataGenerator.generateTopTenDaysDataSet()
        
        jsDataGenerator.cleanup()
            
if __name__ == '__main__':
    
    Av4vnstat().main()
    
    
