GAWrapper
==================

A MooTools wrapper for Google Analytics web analytics service

![Screenshot](http://www.etootim.com/hub/ga/gaw.png)

How to use
----------

GAWrapper Utility is aimed to simplify the use of Google Analytics for MooTools developers.

Current version allows you to track page view and also register click event tracking to better understand how your visitors interact with your site.

The GAWrapper is using the Async usage of Google API.

Simply register for a Google Analytics account (http://www.google.com/analytics/),

Create a website profile and get a profile number UA-XXXXXXXX-X,

Create the wrapper:

    var gaWrapper = new GAWrapper('UA-XXXXXXXX-X','your.tracker.name',{shouldLog:true,duplicateAsPageView:true});

'your.tracker.name' - recommended to avoid conflicts with other trackers on your page and to allow you to run multiple trackers.

If not used, send null.

Options object is optional.

Default options:
        options: {
                onLoadTrackPageView:true,   /* track page view or not on initial load */
                pageViewStr:null,   /* you should start your page name with a leading slash '/' further reading :http://code.google.com/apis/analytics/docs/tracking/asyncUsageGuide.html*/
                shouldLog:false,    /* console logging for firebug */
                duplicateAsPageView:false, /* This will create a 'pageview' for every event registered and fired useful for drill down on Google Analytics online dashboard under "Content->Content Drilldown"*/
                domainName:null /* if you would like the tracking to be limited to a specific domain or sub domain (_setDomainName)*/
        },

Two main function to use:

pushPageView() and pushClicked():

    pushPageView(str) // use to register a pageview. 'str' is optional and if is not sent or null will use the default _trackPageview by GA.

    pushClicked(category, action, opt_label, opt_value) // http://code.google.com/apis/analytics/docs/tracking/eventTrackerOverview.html

A working demo was created on http://www.etootim.com/hub/ga/index.php

Please use Firefox with firebug enabled so you can see the logging in the console.

Class is used in production on http://www.zenforex.com

Screenshots
-----------
![Screenshot 1](http://www.etootim.com/hub/ga/gaw.png)