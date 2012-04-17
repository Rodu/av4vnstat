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