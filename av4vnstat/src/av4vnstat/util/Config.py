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
from stat import S_ISDIR, ST_MODE
'''
Created on 17 Apr 2012

@author: Rodu
'''

class ConfigEnum(object):
    '''
    classdocs
    '''
    # Parametrizing the program name that will be used as suffix in many places.
    _PROGRAM_NAME = "av4vnstat"
    
    # Reading environment variable so that to use the user home folder to store
    # some program content
    USER_HOME_DIR = os.environ["HOME"]
    
    # This will be a folder (possibly) hidden that will contain file needed by
    # the program, that the user will not have need (normally) to access.
    #AV4VNSTAT_WORK_DIR = USER_HOME_DIR + "/." + _PROGRAM_NAME
    AV4VNSTAT_WORK_DIR = USER_HOME_DIR + "/" + _PROGRAM_NAME
    
    # Defines the name for the log file that will be used to store some messages
    # for easier debug.
    LOG_FILE_NAME = USER_HOME_DIR  + "/" + _PROGRAM_NAME + ".log"
    
    # Represent the path to the file containing configurable options that the
    # user needs to have an easy access to.
    # (Not use _PROGRAM_NAME here to not hide the file from the user).
    CONFIG_FILE = USER_HOME_DIR  + "/av4vnstat" + ".cfg"
    
    # Defining configuration file section and option constant names
    SEC_VNSTAT = "VNSTAT"
    OPT_VNSTAT_CMD = "vnstat_cmd"
    
    SEC_NETWORK_CARD = "NETWORK_CARD"
    OPT_CARD_NAME = "card_name"
    
    # This file is used to dump the content of vnstat so that it can be
    # successively parsed by the parser
    VNSTAT_DBDUMP_FILE_NAME = USER_HOME_DIR + "/" + _PROGRAM_NAME + "/vnstat_dbdump.txt"
        
class ConfigInitializer(object):
    def __init__(self):
        # Let's check if the directory for containing the program data already
        # exists
        CONFIG = ConfigEnum()
        
        mode = os.stat(CONFIG.AV4VNSTAT_WORK_DIR)[ST_MODE]
        #print(S_ISDIR(mode))
        if (S_ISDIR(mode)):
            print("fine")
        else:
            try:
                os.mkdir(CONFIG.AV4VNSTAT_WORK_DIR)
            except(OSError):
                msg = "Cannot create directory: "
                msg += CONFIG.AV4VNSTAT_WORK_DIR
                print(msg)
                exit(1)
    
'''
'''
class ConfigReader(object):
    
    def __init__(self):
        
        ConfigInitializer()
        
        self.CONFIG_ENUM = ConfigEnum()
        self.configParser = ConfigParser()
        self.configParser.read(self.CONFIG_ENUM.CONFIG_FILE)
        self.logger = Logging.Logger(self.CONFIG_ENUM.LOG_FILE_NAME)
        
    def read(self, sectionName, optionName):
        try:
            # Reading the vnstat executable from inside the config file
            return self.configParser.get(sectionName, optionName)
        except(NoSectionError):
            self.logger.log("[Error] Section with name: " + sectionName +
                            " not existing in configuration file.")
            exit(1)
        except(NoOptionError):
            self.logger.log("[Error] Option with name: " + optionName +
                            " not existing in configuration file.")
            exit(1)
            
        self.logger.closeLogFile()