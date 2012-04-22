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
import unittest
from av4vnstatTest.generatorTest.DataParserTest import DataParserTest
from av4vnstatTest.generatorTest.JSDataGeneratorTest import JSDataGeneratorTest


class TestSuite(unittest.TestCase):
    '''
    Created on 22 Apr 2012
    
    @author: Rodu
    '''
    def __init__(self):
        unittest.TestCase.__init__(self)
        unittest.TextTestRunner(verbosity = 2).run(self.suite())
        
    def suite(self):
        suite = unittest.TestSuite()
        
        # Testing DataParser
        suite.addTest(DataParserTest('testParseHourlyData'))
        suite.addTest(DataParserTest('testParseDailyData'))
        
        # Testing JSDataGenerator
        suite.addTest(JSDataGeneratorTest('testGenerateMonthlyData'))
        
        return suite

#if __name__ == "__main__":
#    #import sys;sys.argv = ['', 'TestSuite.testDataParser']
#    unittest.main()
    
