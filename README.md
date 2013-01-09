#av4vnstat - Another Viewer for vnstat

The application allows to visualize the data collected by vnstat, network traffic information tool, using the [Highcharts](http://www.highcharts.com) Javascript library.

At the moment the code is in a working but transitional state. A better implementation would be needed for loading data from an external source.

[AngularJS](http://angularjs.org) has been introduced to manage the interaction with the application elements more as a prototype implementation.

Vnstat can be used on a Linux machine to register the amount of traffic in download and upload for a specific network interface card.

The Av4vnstat uses a Python program to parse the data that vnstat collects, and create specific datasets to be consumed in the Javascript front-end.

To see an example of the running web interface you can open the file:

    av4vnstatweb/example/av4vnstat.html

It would be better to serve the application via a web server, in order to have proper HTTP support.
If you don't have a web server installed and don't want to bother, then open a console and change directory to:

    av4vnstatweb/example

From there, run the Python web server:

    $ python -m SimpleHTTPServer

Now open your web browser at the url [http://localhost:8000](http://localhost:8000) and click av4vnstat.html. You can terminate the web server from the keyboard with a (^C) CTRL-C.

For setup instructions to collect and visualize your network usage see the SETUP.md file.

##Development and building the project

The project uses Ant together with a bunch of other tools to validate, test, organize, document, and minify the Javascript source.

To see the available Ant tasks just type:

    $ ant -p

The ones you would use are _ant debug_ and _ant dist_.

###Running tests

In order to execute the automated tests you need to have the [PhantomJS](http://phantomjs.org/) executable on your machine. The script will look for phantomjs in:

    /usr/local/bin/phantomjs

Of course Python is also required for the build to run.

