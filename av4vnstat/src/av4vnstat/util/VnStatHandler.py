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
from av4vnstat.util.Config import ConfigEnum, ConfigReader

'''
Created on 17 Apr 2012

@author: Rodu
'''

class VnStatHandler(object):
    '''
    The class in in charge of the interaction with the vnstat program installed
    on the OS.
    
    It will read the vnstat database for the indicated network card and will
    provide the content in form of a dump in a file where the DataParser can
    access and read.
    '''
    def __init__(self):
        '''
        Constructor
        
        @param vnstatCmd: the path to the vnstat executable as declared in the config file.
        '''
        self.CONFIG_ENUM = ConfigEnum()
        self.configReader = ConfigReader()
        self.vnstatCmd = self.configReader.read(self.CONFIG_ENUM.VNSTAT_SECTION,
                                                  self.CONFIG_ENUM.VNSTAT_CMD)
        
    '''
    The method will dump the content of the vnstat db to the a file.
    
    @param outFile: the name of the file that will contain the vnstat db
    '''
    #def writeDBContent(self, outFile):