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

@author: rob
'''
from av4vnstat.parser.DataParser import DataParser
from av4vnstat.util.VnStatHandler import VnStatHandler

class JSDatasetGenerator(object):
    '''
    classdocs
    '''
    def __init__(self):
        '''
        Constructor
        '''
        self.dataParser = DataParser()
        self.dataParser.setVnStatHandler(VnStatHandler())
        self.dataParser.parse()
