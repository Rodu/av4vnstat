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
import commands
from av4vnstat.util import Logging
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
        self.vnstatDumpDbFile = None
        self.logger = Logging.Logger(self.CONFIG_ENUM.LOG_FILE_NAME)
        
        # First of all we will refresh the file on running the program
        self._writeDBContentToFile()
    '''
    The method will dump the content of the vnstat db to the a file.
    
    @param outFile: the name of the file that will contain the vnstat db
    '''
    def _writeDBContentToFile(self):
        vnstatCmd = self.configReader.read(self.CONFIG_ENUM.SEC_VNSTAT,
                                                  self.CONFIG_ENUM.OPT_VNSTAT_CMD)
        networkCard = self.configReader.read(self.CONFIG_ENUM.SEC_NETWORK_CARD,
                                                  self.CONFIG_ENUM.OPT_CARD_NAME)
        self._openVnStatDumpDbFile('w')
        self.vnstatDumpDbFile.write(commands.getoutput(vnstatCmd + " --dumpdb -i " + networkCard))
        self._closeVnStatDumpDbFile()
    
    def _openVnStatDumpDbFile(self, mode):
        try:
            self.vnstatDumpDbFile = open(self.CONFIG_ENUM.VNSTAT_DBDUMP_FILE_NAME, mode)
        except(IOError):
            msg = "The file " + self.CONFIG_ENUM.VNSTAT_DBDUMP_FILE_NAME
            msg += " cannot be open with mode '" + mode + "'."
            print(msg)
            self.logger.log(msg)
            exit(1)
        
    def _closeVnStatDumpDbFile(self):
        self.vnstatDumpDbFile.close()
        
    def getVnStatDbFile(self):
        self._openVnStatDumpDbFile('r')
        return self.vnstatDumpDbFile