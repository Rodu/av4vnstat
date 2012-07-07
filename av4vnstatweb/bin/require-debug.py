#!/usr/bin/python
'''
    This script is used from ANT.
    
    The script generates the array of dependencies that RequireJS needs
    at application start-up.
    
    The script uses a flag (true | false) to distinguish between the
    dependencies that will be needed in the DEBUG or RELEASE build.
    This allows a better debug during development allowing to inspect
    any single file.
    
    When the script is called with the debug = false, in the dependencies
    will only be included the concatenated and pre-built file with the
    entire application.
    
'''
import os
import sys

try:
    DEBUG_FLAG = sys.argv[1] # This will be passed as an argument
except(IndexError):
    exit("Missing argument (true | false) to indicate if debug or dist.")

print("require(['jquery', 'lib/extjs/ext-all', 'lib/rodulib',")
if (DEBUG_FLAG == "true"):
    os.chdir("./src")
    for root, dirs, files in os.walk("./RODU"):
        for file in files:
            print("'" + root + "/" + file[0:len(file)-3] + "',")

elif (DEBUG_FLAG == "false"):
    print("'musicexplorer.min',")

else:
    strExit = "Unrecognized parameter " + DEBUG_FLAG + "\n"
    strExit += "Ademitted parameters are: true | false"
    exit(strExit)

print("], function($) {")
print("    $(function() {")
print("        RODU.util.debug(\"Creating MusicExplorer instance\");")
print("        new RODU.musicexplorer.MusicExplorer();")
print("    });")
print("});")

