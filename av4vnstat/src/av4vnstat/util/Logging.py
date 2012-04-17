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



'''
Created on 17 Apr 2012

@author: Rodu
'''

class Logger(object):
    '''
    classdocs
    '''
    def __init__(self, logFileName):
        '''
        Constructor
        '''
        self.logFile = None
        self.logFileName = logFileName
        self._openLogFile()
        
    def _openLogFile(self):
        self.logFile = open(self.logFileName, 'a')
        
    def log(self, message):
        if (self.logFile == None):
            self.openLogFile()
        self.logFile.write(message)
        self.logFile.write("\n")
        
        #self.closeLogFile()
        
    def closeLogFile(self):
        self.logFile.close()