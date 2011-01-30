<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <title>GAWrapper</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <script type="text/javascript" src="mootools-1.2.5-core-yc.js"></script>
    <script type="text/javascript" src="../Source/GAWrapper.js"></script>
    <script type="text/javascript">
        var gaWrapper = new GAWrapper('UA-13022813-6','Moo',{shouldLog:true,duplicateAsPageView:true});
    </script>
  </head>
  <body>
      <div>
          
      </div>
      <div id="contentWrapper">
          <div>A pageview should be registered as option 'onLoadTrackPageView' is set to true by default</div>
          <div><br/>&nbsp;<br/></div>
          <div id="gaclicktest">Click on each one of the list elements to register a click event with the item's value (watch firebug's console for logging)</div>
          <ul>
              <li>1 - One</li>
              <li>2 - Two</li>
              <li>3 - Three</li>
              <li>Moo</li>
          </ul>
      </div>
      <script type="text/javascript">
          window.addEvent('domready',function(){
            document.getElements('li').each(function(curItem){
                curItem.setStyle('cursor','pointer');
                curItem.setStyle('margin','15px');
                curItem.addEvent('click',function(){
                    gaWrapper.pushClicked('listItem','clicked',this.get('text'));
                });
            });
          });
      </script>
  </body>
</html>
