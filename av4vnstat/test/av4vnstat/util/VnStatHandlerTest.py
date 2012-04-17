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

from av4vnstat.util import VnStatHandler
from ConfigParser import NoSectionError

'''
Created on 17 Apr 2012

@author: Rodu
'''
import unittest


class VnStatHandlerTest(unittest.TestCase):
    
    def setUp(self):
        #self.vnStatHandler = VnStatHandler()
        pass
    
    def tearDown(self):
        self.vnStatHandler = None

    #def test_handles_exception_for_unexisting_parameter(self):
    # Here as second parameter I need to give the pointer to the callable function 
    # therefore without parenthesis
    #self.assertRaises(NoSectionError, VnStatHandler.VnStatHandler().loadConfigurationFile)
        
    #def test_can_write_outfile(self):
    #    pass


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.test_can_write_outfile']
    unittest.main()