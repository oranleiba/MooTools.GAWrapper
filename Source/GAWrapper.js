/*
---

script: GAWrapper.js

description: A wrapper to Google Analytics code.

license: MIT-style license

authors:
- Oran Leiba, (http://www.zenforex.com)

requires:
- /core/1.2.5:*

provides: [GAWrapper]

This Wrapper is intended to replace the GA code
 <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

With event tracking functionality

Ver 1.0.0


...
*/

var GAWrapper = new Class({

    Implements: [Options,Events],

    UAID: $empty,
    NAME: '',//avoid conflicts if others use the GA also on the same document

    options: {
            onLoadTrackPageView:true,/* track page view or not on initial load*/
            pageViewStr:null,/*you should start your page name with a leading slash '/'*/
            shouldLog:false,/* console logging for firebug*/
            duplicateAsPageView:false,
            domainName:null
    },

    initialize: function(UAID,NAME,options) {
        this.UAID = UAID;
        if(NAME){
            this.NAME = NAME+'.';
        }
        this.setOptions(options);
        this.log('GAWrapper initialize');
        this.log('GAWrapper UAID '+this.UAID);
        this.log('GAWrapper NAME '+this.NAME);
        this.log('GAWrapper options.domainName '+this.options.domainName);
        window._gaq = window._gaq || [];//global level variable
        this._gaq = window._gaq;//reference to global variable
        this._gaq.push([this.NAME+'_setAccount', this.UAID]);
        if(this.options.onLoadTrackPageView){
            this.pushPageView(this.options.pageViewStr);
        }
        if(this.options.domainName){
            this._gaq.push([this.NAME+'_setDomainName', this.options.domainName]);
        }
        this.getGA();
    },

    getGA:function(){
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    },

    pushed: function(description){
        this.fireEvent('pushed',description);
        this.log(description);
    },
    
    pushPageView:function(str){
        if(str){
            this._gaq.push([this.NAME+'_trackPageview',str]);
            this.pushed('pageview '+str);
        }else{
            this._gaq.push([this.NAME+'_trackPageview']);
            this.pushed('pageview');
        }
    },

    pushClicked: function(category, action, opt_label, opt_value){
        this._gaq = window._gaq;//otherwise loses reference to the google _gaq object
        var descriptionStr = '/click/'+category+ '/'+action
        if(!opt_label){
            opt_label=null;
        }else{
            descriptionStr += '/'+opt_label;
        }
        if(!opt_value){
            opt_value=null;
        }else{
            descriptionStr +='/'+opt_value;
        }
        this._gaq.push([this.NAME+'_trackEvent', category, action, opt_label,opt_value]);
        this.pushed(descriptionStr);
        if(this.options.duplicateAsPageView){
            this._gaq.push([this.NAME+'_trackPageview', descriptionStr]);
            this.pushed('pv '+descriptionStr);
        }
    },

    log: function(message){
        if(this.options.shouldLog){
            try{
                if(console){
                    console.log('GAWrapper '+message);
                }
            }catch(err){
                //don nothing
            }
        }
    }
});

