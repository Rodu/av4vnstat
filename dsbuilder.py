#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#       untitled.py
#       
#       Copyright 2011 Roberto S. <rob@marlix>
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
#       along with this program; if not, write to the Free Software
#       Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#       MA 02110-1301, USA.

import re
import datetime
import commands

def main():
    vnstatdb = commands.getoutput("vnstat --dumpdb -i ppp0").split("\n")
    jsdataset = open("/media/repository/dev/byro_vnstat/stream/dataset.js", 'w')
    jsdataset.write("var dataset = [")
    day_entries = 0
    
    for line in vnstatdb:
        m = re.match('^d;', line)
        if (m is not None):
            m = re.search(';1$', line)
            if (m is not None):
                # here I have a data line to read
                data = line.split(';')
                date = datetime.datetime.utcfromtimestamp(float(data[2]))
                rxMib = data[3]
                txMib = data[4]
                rxKib = data[5]
                txKib = data[6]
                
                jsdataset.write("{d: ")
                jsdataset.write(str(data[1]))
                jsdataset.write(", time: ")
                jsdataset.write("\"")
                jsdataset.write(str(date.day))
                jsdataset.write("/")
                jsdataset.write(str(date.month))
                jsdataset.write("\", rx: ")
                jsdataset.write(rxMib)
                jsdataset.write(", tx: ")
                jsdataset.write(txMib)
                jsdataset.write("},\n") # a one more comma will remain...
                day_entries += 1
                
    jsdataset.write("],\n")
    jsdataset.write("day_entries = ")
    jsdataset.write(str(day_entries))
    jsdataset.write(";\n")
    
    jsdataset.close()
    
    return 0

if __name__ == '__main__':
    main()
