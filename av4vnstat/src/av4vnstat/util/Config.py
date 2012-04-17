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

import os
from ConfigParser import ConfigParser, NoSectionError, NoOptionError
from av4vnstat.util import Logging
'''
Created on 17 Apr 2012

@author: Rodu
'''

class ConfigEnum(object):
    '''
    classdocs
    '''
    USER_HOME_DIR = os.environ["HOME"]
    
    LOG_FILE_NAME = USER_HOME_DIR  + "/av4vnstat.log"
    
    CONFIG_FILE = USER_HOME_DIR  + "/av4vnstat.cfg"
    
    VNSTAT_SECTION = "vnstat_section"
    
    VNSTAT_CMD = "vnstat_cmd"
    
    
'''
'''
class ConfigReader(object):
    
    def __init__(self):
        self.CONFIG_ENUM = ConfigEnum()
        self.configParser = ConfigParser()
        self.configParser.read(self.CONFIG_ENUM.CONFIG_FILE)
        self.logger = Logging.Logger(self.CONFIG_ENUM.LOG_FILE_NAME)
        
    def read(self, sectionName, optionName):
        try:
            # Reading the vnstat executable from inside the config file
            self.vnstatCmd = self.configParser.get(sectionName, optionName)
        except(NoSectionError):
            self.logger.log("[Error] Section with name: " + sectionName +
                            " not existing in configuration file.")
        except(NoOptionError):
            self.logger.log("[Error] Option with name: " + optionName +
                            " not existing in configuration file.")
        
        self.logger.closeLogFile()