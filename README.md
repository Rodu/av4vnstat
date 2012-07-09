#av4vnstat - Another Viewer for vnstat

Visualizing vnstat data using the Highcharts Javascript library:
http://www.highcharts.com

The application allows to visualize the data collected by vnstat, network traffic information tool.

AngularJS is being introduced to manage the interaction with the application and at the moment some features are used.

Vnstat can be used on a Linux machine, to register the amount of traffic in download and upload for a specific network interface.

The Av4vnstat uses a Python program to parse the data that vnstat collects and create specific datasets to be consumed in the Javascript web app.

The idea is to have a cron job running the python script to read the vnstat data and update the Javascript dataset at regular intervals.

Using the Highchart library basic charts and some visualizations will show the data.

To see an example of the running web interface you can open the file:

av4vnstatweb/example.html

For setup instructions in order to collect and visualize your network usage see the SETUP.md file.

##Development and building the project

The project uses Ant together with a bunch of other tools to validate, test, organize, document, and minify the Javascript source.

Just type:

    ant -p

to see the available tasks. The ones you would use are ant debug, ant dist.

###Runnint tests

In order to execute the automated tests you need to have the PhantomJS executable on your machine. The script will look for phantomjs in:

    /usr/local/bin/phantomjs

Also python is required for the build to run.

