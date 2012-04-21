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
from av4vnstat.util import Logging
from av4vnstat.util.Config import Constants, ConfigFileReader
import commands

class VnStatHandler(object):
    '''
    Created on 17 Apr 2012
    
    @author: Rodu

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
        self.vnstatDumpFile = None
        
    # *************************************************************************
    def _createVnStatDumpFile(self):
        '''
        The method will dump the content of the vnstat db to the a file.
        
        @param outFile: the name of the file that will contain the vnstat db
        '''
        configReader = ConfigFileReader()
        vnstatCmd = configReader.read(Constants.SEC_VNSTAT,
                                                  Constants.OPT_VNSTAT_CMD)
        networkCard = configReader.read(Constants.SEC_NETWORK_CARD,
                                                  Constants.OPT_CARD_NAME)
        self._openVnStatDumpFile('w')
        self.vnstatDumpFile.write(commands.getoutput(vnstatCmd + " --dumpdb -i " + networkCard))
        self._closeVnStatDumpFile()
    
    # *************************************************************************
    def _openVnStatDumpFile(self, mode):
        logger = Logging.Logger(Constants.LOG_FILE_NAME)
        try:
            self.vnstatDumpFile = open(Constants.VNSTAT_DUMP_FILE_NAME, mode)
        except(IOError):
            msg = "The file " + Constants.VNSTAT_DUMP_FILE_NAME
            msg += " cannot be open with mode '" + mode + "'."
            print(msg)
            logger.log(msg)
            exit(1)
        
    # *************************************************************************
    def _closeVnStatDumpFile(self):
        self.vnstatDumpFile.close()
        
    # *************************************************************************
    def getVnStatDbFile(self):
        if (self.vnstatDumpFile == None):
            # First of all we will refresh the file on running the program
            self._createVnStatDumpFile()
            self._openVnStatDumpFile('r')
            
        return self.vnstatDumpFile
