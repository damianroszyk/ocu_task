
( function( $ ) {

    // test IE, good to disable svg animation

    function getInternetExplorerVersion()
    {
      var rv = -1;
      if (navigator.appName == 'Microsoft Internet Explorer')
      {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
          rv = parseFloat( RegExp.$1 );
      }
      else if (navigator.appName == 'Netscape')
      {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
          rv = parseFloat( RegExp.$1 );
      }
      return rv;
    }

    ie = 0;
    ie = getInternetExplorerVersion();

    alert(ie);

    if ( ie >= 10 ){
        $('html').addClass("ie11");
    } else if ( ie == 9 ){
        $('html').addClass("ie9");
        $('html').removeClass("no-ie");
    } else if ( ie <=8 && ie >5 ){
        $('html').addClass("ie7");
        $('html').removeClass("no-ie");
    } 

} )( jQuery );











  


