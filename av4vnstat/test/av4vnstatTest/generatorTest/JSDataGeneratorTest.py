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
from av4vnstat.util.VnStatHandler import VnStatHandler
from av4vnstat.generator.DataParser import DataParser
from av4vnstat.generator.JSDatasetGenerator import JSDatasetGenerator

'''
Created on 22 Apr 2012

@author: Rodu
'''
import unittest


class JSDataGeneratorTest(unittest.TestCase):


    def setUp(self):
        self.vnStatHandler = VnStatHandler()
        # Here we need to open a file for testing!
        vnStatDumpFile = open("../dummy_vnstat_test_dump.txt", 'r')
        self.vnStatHandler.setVnStatDumpFile(vnStatDumpFile)
        
        # The object under test
        self.dataParser = DataParser()
        self.dataParser.setVnStatHandler(self.vnStatHandler)



    def tearDown(self):
        pass


    def testGenerateMonthlyData(self):
        jsDatasetGenerator = JSDatasetGenerator()
        jsDatasetGenerator.setDataParser(self.dataParser)
        
        #    [ [ DateUTC(YYY, MM, DD), [Rx %] , [Tx %] ], 
        #      [ DateUTC(YYY, MM, DD), [Rx %] , [Tx %] ], ...]
        #
        #    To create the desired shape this are the proportions:
        #
        #        [0, 50, 30, 100, 30, 50, 0 ]
        #
        # Assuming the dummy data file to contain the following:
        #
        # m;1;1334980780;1024;2048;0;0;1
        # m;2;1334982490;8192;4096;0;0;1
        #
        expectedDataSet = [ ['Date.UTC(2012,3,21,4,59,40)',
                             [0.0, 6.25, 3.75, 12.5, 3.75, 6.25, 0],
                             [0.0, 12.5, 7.5, 25.0, 7.5, 12.5, 0.0] ],
                           ['Date.UTC(2012,3,21,5,28,10)',
                            [0.0, 50.0, 30.0, 100.0, 30.0, 50.0, 0.0],
                            [0.0, 25.0, 15.0, 50.0, 15.0, 25.0, 0.0] ] ]
        
        calculatedDataSet = jsDatasetGenerator.generateMonthlyDataSet()
        
        #print(expectedDataSet)
        #print(calculatedDataSet)
        
        self.assertEqual(expectedDataSet, calculatedDataSet,
                         "Calculated data do not match expected data set!")
        
if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testGenerateMonthlyData']
    unittest.main()
