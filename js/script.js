
( function( $ ) {

    // Setup variables
    $window = $(window);
    $headerImg = $('.headerImg');
    $body = $('body');


    //FadeIn all sections   
    $body.imagesLoaded( function() {
        setTimeout(function() {
              
              // Resize sections
              adjustWindow();
              
              // Fade in sections
              $body.removeClass('loading').addClass('loaded');

              $(window).scrollTop(0);
              
        }, 1000);
    });


    function adjustWindow(){

        // Get window size
        winH = $window.height();
        winW = $window.width();

        // Keep minimum height 550
        if(winH <= 550) {
            winH = 550;
        }

        // Init Skrollr for 768 and up
        // if( winW >= 768) {  ****************************** HIDE

            // Init Skrollr
            var s = skrollr.init({
                forceHeight: false
            });

            skrollr.menu.init(s, {
                animate: true,
                easing: 'outCubic',
                scale: 2,
                duration: function(currentTop, targetTop) {
                    return 1400;
                },
            });

            // Resize our slides
            $headerImg.height(winH);

            s.refresh($('.headerImg'));

        // } else { ****************************** HIDE

        //     // Init Skrollr
        //     var s = skrollr.init();
        //     s.destroy();
        // }
    
        // Check for touch
        // if(Modernizr.touch) {

        //     // Init Skrollr
        //     var s = skrollr.init();
        //     s.destroy();
        // }

    }
    
    function initAdjustWindow() {
        return {
            match : function() {
                adjustWindow();
            },
            unmatch : function() {
                adjustWindow();
            }
        };
    }

    enquire.register("screen and (min-width : 768px)", initAdjustWindow(), false)
            .listen(100);



    $(document).scrollsnap({
        snaps: '.snap',
        proximity: 400,
        latency: 1000,
        duration: 600,
    });


    $(function() {     
        $('#accordion').accordion({
            oneOpenedItem   : true
        });   
    });


    function initialize() {

        var styles = [{
            "featureType" : "road.local",
            "elementType" : "labels.text.fill",
            "stylers" : [{
                "color" : "#939393"
            }]
        }, {
            "featureType" : "road.local",
            "elementType" : "geometry.fill",
            "stylers" : [{
                "color" : "#efedec"
            }]
        }, {
            "featureType" : "landscape",
            "elementType" : "geometry",
            "stylers" : [{
                "color" : "#f9f9f9"
            }]
        }, {
            "featureType" : "road.local",
            "elementType" : "geometry.stroke",
            "stylers" : [{
                "color" : "#dadada"
            }]
        }, {
            "featureType" : "road.arterial",
            "elementType" : "geometry.fill",
            "stylers" : [{
                "color" : "#e6e6e6"
            }]
        }, {
            "featureType" : "road.arterial",
            "elementType" : "geometry.stroke",
            "stylers" : [{
                "color" : "#dadada"
            }]
        }, {
            "featureType" : "road.arterial",
            "elementType" : "labels.text",
            "stylers" : [{
                "color" : "#939393"
            }, {
                "weight" : 0.1
            }]
        }, {
        }];

        var icon = new google.maps.MarkerImage("img/map-icon.png", null, null, null, new google.maps.Size(96, 61));
        var icon2 = new google.maps.MarkerImage("img/map-icon_2.png", null, null, null, new google.maps.Size(96, 61));

        var map_canvas = document.getElementById('maps');
        var markers = [];

        //warsaw
        var map = new google.maps.Map($('#maps .warsaw .map')[0], {
            zoom : 16,
            draggable : true,
            scrollwheel : false,
            center : new google.maps.LatLng(52.232347, 21.01305),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true,
            styles : styles
        });

        markers[0] = new google.maps.Marker({
            position : new google.maps.LatLng(52.232347, 21.01305),
            map : map,
            icon : icon
        });

        //ny
        var map2 = new google.maps.Map($('#maps .ny .map')[0], {
            zoom : 16,
            draggable : true,
            scrollwheel : false,
            center : new google.maps.LatLng(40.721264, -73.95632),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true,
            styles : styles
        });

        markers[1] = new google.maps.Marker({
            position : new google.maps.LatLng(40.721264, -73.95632),
            map : map2,
            icon : icon2
        });

    }




    var switch_address_click = function(event) {
        event.preventDefault();

        var map_to_hide;
        var map_to_show;

        var self = this

        if ($(self).find('span').text() === "Warsaw") {
            map_to_hide = 'ny';
            map_to_show = 'warsaw';
        } else {
            map_to_hide = 'warsaw';
            map_to_show = 'ny';
        };

        $("#switch_address_btn").unbind("click");
        $("#switch_address_btn").bind('click', function(event) {
            event.preventDefault();
        });


        $('#maps .wrapper.' + map_to_hide + ' .overlay').show();
        $('#maps .wrapper.' + map_to_show).show().css('top', -1050);

        $('#maps .wrapper.' + map_to_hide).animate({
            top : '+=700'
        }, 1200, 'easeInSine', function() {

            if ($(self).find('span').text() === "Warsaw") {
                $('.address .ny').hide();
                $('.address .warsaw').show('fade');
                $(self).find('span').text('New York');
            } else {
                $('.address .warsaw').hide();
                $('.address .ny').show('fade');
                $(self).find('span').text('Warsaw');
            };

            $('#maps .wrapper.' + map_to_hide).css('top', -1050);

            $('#maps .wrapper.' + map_to_hide + ' .overlay').hide();
        });

        setTimeout(function() {
            $(self).toggleClass( "red" ); 
        }, 1600);

        

        setTimeout(function() {
            $('#maps .wrapper.' + map_to_show + ' .overlay').show().addClass('rotated');
            $('#maps .wrapper.' + map_to_show).animate({
                top : '+=700'
            }, 1200, 'easeOutSine', function() {
                $('#maps .wrapper.' + map_to_show + ' .overlay').css('top', 0).hide().removeClass('rotated');
                $("#switch_address_btn").bind('click', switch_address_click);
            });
        }, 1200);
    };


    $("#switch_address_btn").bind('click', switch_address_click);

    $('.address .warsaw').show();

     google.maps.event.addDomListener(window, 'load', initialize);


    $(window).scroll(function() {
 
        var winH = $(window).height();
        var win2H = (winH * 2) - 130;

        $('.content').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-100) {
                $(box).find('h1').addClass("fadeInLeft");
                $(box).find('h2').addClass("fadeInLeft");
                setTimeout(function () { $(box).find('hr').addClass("fadeInLeft"); }, 200);
                setTimeout(function () { $(box).find('h3').addClass("fadeInLeft"); }, 400);
            }
        });

        $('#careers').each(function(){
            var box = $(this);
             var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-100) {
                setTimeout(function () { $(box).find('.pro1').addClass("fadeInLeft"); }, 400);
                setTimeout(function () { $(box).find('.pro2').addClass("fadeInLeft"); }, 700);
                setTimeout(function () { $(box).find('.pro3').addClass("fadeInLeft"); }, 1000);
            }
        });

         $('.case_item ').each(function(){
            var box = $(this);
             var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-100) {
                setTimeout(function () { $(box).find('h3').addClass("fadeInLeft"); }, 100);
                setTimeout(function () { $(box).find('ul').addClass("fadeInLeft"); }, 400);
                setTimeout(function () { $(box).find('p').addClass("fadeInLeft"); }, 700);
                setTimeout(function () { $(box).find('a').addClass("fadeInLeft"); }, 1000);
            }
        });

        $('#services').each(function(){
             var box = $(this);
             var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-100) {
                setTimeout(function () { $(box).find('.consulting').addClass("fadeInLeft"); }, 600);
                setTimeout(function () { $(box).find('.design').addClass("fadeInLeft"); }, 900);
                setTimeout(function () { $(box).find('.dev').addClass("fadeInLeft"); }, 1200);
                setTimeout(function () { $(box).find('.delivery').addClass("fadeInLeft"); }, 1500);
            }
        });

        $('.logos').each(function(){
             var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-100) {
                $('.logos li').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (100 * i));
                });    
            };
        });

        $('.gallery').each(function(){
             var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-100) {
                $('.gallery img').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (100 * i));
                });    
            };
        });


        //menu

         if ($("nav").offset().top < winH) {
            $("nav").removeClass("nav_box");
            $("nav").removeClass("nav_dark");
        } else if ($("nav").offset().top >= winH && $("nav").offset().top < win2H){
            $("nav").addClass("nav_dark");
            $("nav").removeClass("nav_box");
        } else if ($("nav").offset().top >= win2H) {
            $("nav").addClass("nav_box");
            $("nav").removeClass("nav_dark");
        }

    });

} )( jQuery );


// $(document).ready(
//   function() { 
//     $("html").niceScroll();
//   }
// );











  


