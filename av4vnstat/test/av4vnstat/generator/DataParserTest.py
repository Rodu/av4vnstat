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
from av4vnstat.generator.DataParser import DataParser
from av4vnstat.util.VnStatHandler import VnStatHandler
import unittest


class DataParserTest(unittest.TestCase):
    '''
    Created on 21 Apr 2012
    
    @author: Rodu
    '''
    
    def setUp(self):
        self.vnStatHandler = VnStatHandler()
        # Here we need to open a file for testing!
        vnStatDumpFile = open("../../dummy_vnstat_test_dump.txt", 'r')
        self.vnStatHandler.setVnStatDumpFile(vnStatDumpFile)
        
        # The object under test
        self.dataParser = DataParser()
        self.dataParser.setVnStatHandler(self.vnStatHandler)

    def tearDown(self):
        pass


    def testParseHourlyData(self):
        parsedHourlyData = self.dataParser.parseHourlyData()
        expectedHourlyData = [[1334980780L, 1.0, 2.0],
                              [1334982490L, 2.0, 1.0]]
        print(parsedHourlyData)
        print(expectedHourlyData)
        self.assertEqual(parsedHourlyData, expectedHourlyData,
                         "The returned data differs from the expected ones!")
    
    def testParseDailyData(self):
        parsedHourlyData = self.dataParser.parseDailyData()
        expectedHourlyData = [[1334703620L, 2.0, 2.0],
                              [1334796662L, 1.0, 1.0],
                              [1334876424L, 7.0, 7.0],
                              [1334977960L, 11.0, 11.0]]
        #print(parsedHourlyData)
        #print(expectedHourlyData)
        self.assertEqual(parsedHourlyData, expectedHourlyData,
                         "The returned data differs from the expected ones!")

if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testParseHourlyData']
    unittest.main()
