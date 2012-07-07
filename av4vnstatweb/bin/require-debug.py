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
    DEBUG_FLAG = sys.argv[1]
    DEPENDENCIES = sys.argv[2]
    APP_ROOT_NS = sys.argv[3]
    APP_NAME = sys.argv[4]
    APP_MAIN_CLASS = sys.argv[5]
except(IndexError):
    exit("Wrong arguments.")

print("require([")

if (DEPENDENCIES != ""):
 print(DEPENDENCIES + ",")
 
if (DEBUG_FLAG == "true"):
    os.chdir("./src")
    for root, dirs, files in os.walk("./" + APP_ROOT_NS):
        for file in files:
            print("'" + root + "/" + file[0:len(file)-3] + "',")

elif (DEBUG_FLAG == "false"):
    print("'" + APP_NAME + ".min',")

else:
    strExit = "Unrecognized parameter " + DEBUG_FLAG + "\n"
    strExit += "Ademitted parameters are: true | false"
    exit(strExit)

print("], function($) {")
#print("    $(function() {")
print("     angular.element(document).ready(function() {")
print("        angular.bootstrap(document);")
print("        new " + APP_ROOT_NS + "." + APP_NAME + "." + APP_MAIN_CLASS + "();")
print("    });")
print("});")

