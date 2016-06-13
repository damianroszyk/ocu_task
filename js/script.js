
( function( $ ) {

    // Setup variables
    $window = $(window);
    $headerImg = $('.header_list');
    $headerBox = $('#intro');
    $body = $('body');

    winH = $window.height();
    winW = $window.width();


    // FadeIn all sections

    $body.imagesLoaded( function() {
        setTimeout(function() {

                // Resize sections
                adjustWindow();

                // Fade in sections
                $body.removeClass('loading').addClass('loaded');

                var anchor = window.location.hash;

                if (anchor == "#ios_developer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#ios_developer').addClass('st-open');
                        $('#ios_developer .careers_info').slideDown();
                    },1000);
                }else if (anchor == "#ui_designer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#ui_designer').addClass('st-open');
                        $('#ui_designer .careers_info').slideDown();
                    },1000);
                }else if (anchor == "#frontend_developer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#frontend_developer').addClass('st-open');
                        $('#frontend_developer .careers_info').slideDown();
                    },1000);
                }else if (anchor == "#android_developer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#android_developer').addClass('st-open');
                        $('#android_developer .careers_info').slideDown();
                    },1000);
                }else if (anchor == "#python_dev"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#python_dev').addClass('st-open');
                        $('#python_dev .careers_info').slideDown();
                    },1000);
                }



              // $(function scroller(){
              //       var defaultAnchorOffset = 0;

              //       var anchor = window.location.hash;

              //       var anchorOffset = $(anchor).attr('data-menu-offset') * -1;

              //       if (!anchorOffset)
              //           anchorOffset = defaultAnchorOffset;

              //       $('body').animate({
              //           scrollTop: $(anchor).offset().top - anchorOffset
              //       }, 100);
              // });


            if(( winW < 768) || (Modernizr.touch)) {

                var anchor = window.location.hash;
                var anchorOffset = $(anchor).attr('data-menu-offset');

                if (anchor == "#ios_developer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#ios_developer').addClass('st-open');
                        $('#ios_developer .careers_info').slideDown();
                    },1000);
                }else if (anchor == "#ui_designer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#ui_designer').addClass('st-open');
                        $('#ui_designer .careers_info').slideDown();
                    },1000);
                }else if (anchor == "#frontend_developer"){
                    anchorOffset = -60;

                    setTimeout(function(){
                        $('#frontend_developer').addClass('st-open');
                        $('#frontend_developer .careers_info').slideDown();
                    },1000);
                }

                if (anchor){
                    window.location = anchor ;
                    window.scrollBy(0, anchorOffset);
                }
            }

        }, 1000);
    });

    function adjustWindow(){

        // Get window size
        winH = $window.height();
        win_doubleH = 2 * winH;
        winW = $window.width();

        // Keep minimum height 550
        if(winH <= 550) {
            winH = 550;
        }

        // Init Skrollr for 768 and up
        if(( winW >= 768) && (!Modernizr.touch) && ($('html').hasClass('no-ie'))){

            // Reset our slides
            $headerImg.height('100%');
            $headerBox.height('100%');

            // Init Skrollr
            var s = skrollr.init({
                forceHeight: false,
                scale: 2,
                easing: 'outCubic'
            });

            skrollr.menu.init(s, {
                animate: true,
                easing: 'outCubic',
                scale: 5,
                duration: function(currentTop, targetTop) {
                    return 600;
                },
            });

        } else {

            // Init Skrollr
            var s = skrollr.init();
            s.destroy();

            $(".mobile_menu > ul > li > a").click(function(event) {
                event.preventDefault();

                var anchor = $(this).attr('href');
                var anchorOffset = $(anchor).offset().top - 70;

                $('html, body').scrollTop(anchorOffset);
            });

            // });

            // $(".mobile_menu > .menu_box > .logo > a, .mobile_menu > ul > li > a, a.more").click(function(event) {
            //    // event.preventDefault();

            //     var defaultAnchorOffset = 0;
            //     var anchor = $(this).attr('href');
            //     var anchorOffset = $(anchor).attr('data-menu-offset') * -1;

            //     if (!anchorOffset)
            //         anchorOffset = defaultAnchorOffset;

            //     $('body').animate({
            //         scrollTop: $(anchor).offset().top - anchorOffset
            //     }, 100);
            // });

            // Resize our slides
            $headerImg.height(winH);
            $headerBox.height(winH);
        }
    }

    // function initAdjustWindow() {
    //     return {
    //         match : function() {
    //             adjustWindow();
    //         },
    //         unmatch : function() {
    //             adjustWindow();
    //         }
    //     };
    // }

    // enquire.register("screen and (min-width : 768px)", initAdjustWindow(), false)
    //         .listen(100);



    // $(document).scrollsnap({
    //     snaps: '.snap',
    //     proximity: 400,
    //     latency: 1000,
    //     duration: 600,
    // });


    // $(function() {
    //     $('#accordion').accordion({
    //         oneOpenedItem   : true
    //     });
    // });

    // accordion


    var allPanels = $('#accordion .careers_info').hide();
    var allParents = $('#accordion>ul>li');

    $("#accordion>ul>li>a").click(function(){
        $this = $(this);
        $target = $this.next(".careers_info");

        // allPanels.slideUp();
        // $target.slideDown();


        if(!$this.parent().hasClass('st-open')){

            allParents.removeClass('st-open');
            allPanels.slideUp();
            $this.parent().addClass('st-open');
            $target.slideDown();

        }else{

            allPanels.slideUp();
            allParents.removeClass('st-open');
            //$this.parent().removeClass('st-open');
        }
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

        var icon1 = new google.maps.MarkerImage("img/map-icon_1.png", null, null, null, new google.maps.Size(96, 61));
        var icon2 = new google.maps.MarkerImage("img/map-icon_2.png", null, null, null, new google.maps.Size(96, 61));
        var icon3 = new google.maps.MarkerImage("img/map-icon_3.png", null, null, null, new google.maps.Size(96, 61));
        var icon4 = new google.maps.MarkerImage("img/map-icon_4.png", null, null, null, new google.maps.Size(96, 61));

        var map_canvas = document.getElementById('maps');
        var markers = [];

        //warsaw
        var map1 = new google.maps.Map($('#maps .warsaw .map')[0], {
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
            map : map1,
            icon : icon1
        });

        //newyork
        var map2 = new google.maps.Map($('#maps .newyork .map')[0], {
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

        //london
        var map3 = new google.maps.Map($('#maps .london .map')[0], {
            zoom : 16,
            draggable : true,
            scrollwheel : false,
            center : new google.maps.LatLng(51.5226468, -0.0852889),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true,
            styles : styles
        });

        markers[2] = new google.maps.Marker({
            position : new google.maps.LatLng(51.5226468, -0.0852889),
            map : map3,
            icon : icon3
        });

        //sfo
        var map4 = new google.maps.Map($('#maps .sfo .map')[0], {
            zoom : 16,
            draggable : true,
            scrollwheel : false,
            center : new google.maps.LatLng(37.797913, -122.401285),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true,
            styles : styles
        });

        markers[3] = new google.maps.Marker({
            position : new google.maps.LatLng(37.797913, -122.401285),
            map : map4,
            icon : icon4
        });

    }

    var animating = false;

    function Location() {
        this.cityName = null;
        this.buttonClass = null;
        this.mapName = null;
        this.addressClass = null;
    }

    Location.prototype.show = function() {
        $('#maps .wrapper.' + this.mapName).show().css('top', -1050);

        var self = this;

        setTimeout(function() {
            $('#maps .wrapper.' + self.mapName + ' .overlay').show()
                .addClass('rotated');

            $('#maps .wrapper.' + self.mapName).animate({
                top : '+=700'
            }, 1200, 'easeOutSine', function() {
                $('#maps .wrapper.' + self.mapName + ' .overlay').css('top', 0)
                        .hide().removeClass('rotated');
                animating = false;
            });
            $(self.addressClass).show('fade');
        }, 1200);
    }

    Location.prototype.hideAndBindToButton = function(button) {
        var self = this;
        $('#maps .wrapper.' + this.mapName + ' .overlay').show();

        $('#maps .wrapper.' + this.mapName).animate({
            top : '+=700'
        }, 1200, 'easeInSine', function() {
            $(self.addressClass).hide();
            $('#maps .wrapper.' + self.mapName).css('top', -1050);
            $('#maps .wrapper.' + self.mapName + ' .overlay').hide();



            $('#maps .wrapper.' + self.mapName).css('top', -1050);
            $('#maps .wrapper.' + self.mapName + ' .overlay').hide();
        });

        setTimeout(function() {
            // button.bind('click', { targetLocation:self, button:button}, switch_address_click);
            $('.switch_map').removeClass( 'active' );
            $(button).addClass( 'active' );

            // button.bind('click', { targetLocation:self, button:button}, switch_address_click);
            // button.find('span').text(self.cityName);
            // $(button).removeClass( currentLocation.buttonClass );
            // $(button).addClass( self.buttonClass );
        }, 400);
    }

    var warsaw = new Location();
    warsaw.cityName = 'Warsaw';
    warsaw.mapName = 'warsaw';
    warsaw.buttonClass = 'warsaw';
    warsaw.addressClass = '.city.warsaw';

    var newYork = new Location();
    newYork.cityName = "New York";
    newYork.mapName = 'newyork';
    newYork.buttonClass = 'newyork';
    newYork.addressClass = '.city.newyork'

    var london = new Location();
    london.cityName = "London";
    london.mapName = "london";
    london.buttonClass = 'london';
    london.addressClass = '.city.london'

    var sfo = new Location();
    sfo.cityName = "San Francisco";
    sfo.mapName = "sfo";
    sfo.buttonClass = 'sfo';
    sfo.addressClass = '.city.sfo'

    var currentLocation = null;

    var switch_address_click = function(event) {
        var button = event.data.button;


        if( !$(button).hasClass( 'active' ) ) {
            if(animating == true) {
                return;
            }
            animating = true;

            var button = event.data.button;
            var targetLocation = event.data.targetLocation;

            // event.preventDefault();
            // button.unbind("click");
            // button.bind('click', function(event) {
            //     event.preventDefault();
            // });

            setCurrentLocation(targetLocation, button);
        }
    };


    function setCurrentLocation(location, button) {
        if(currentLocation != null) {
            currentLocation.hideAndBindToButton(button)
        }
        currentLocation = location;
        currentLocation.show();
    }

    $("#switch_address_btn_newyork").bind('click', {targetLocation: newYork,
        button:$("#switch_address_btn_newyork")},
        switch_address_click);

    $("#switch_address_btn_london").bind('click', {targetLocation: london,
        button:$("#switch_address_btn_london")},
        switch_address_click);

    $("#switch_address_btn_sfo").bind('click', {targetLocation: sfo,
        button:$("#switch_address_btn_sfo")},
        switch_address_click);

    $("#switch_address_btn_warsaw").bind('click', {targetLocation: warsaw,
        button:$("#switch_address_btn_warsaw")},
        switch_address_click);


    $('.address .warsaw').show();

    google.maps.event.addDomListener(window, 'load', initialize);
    currentLocation = warsaw


    if ( ($('html').hasClass('no-ie')) ){
        $(window).scroll(function() {

            var winH = $(window).height();
            var winH_fix = winH - 100;
            var win2H = (winH * 2) - 90;

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

            // if ($("nav.desktop_menu").offset().top < winH_fix) {
            //     $("nav.desktop_menu").removeClass("nav_box");
            //     $("nav.desktop_menu").removeClass("nav_dark");
            //     // $(".mobile_menu").removeClass("nav_box");
            //     // $(".mobile_menu").removeClass("nav_dark");
            // } else if ($("nav").offset().top >= winH_fix && $("nav").offset().top < win2H){
            //     $("nav.desktop_menu").addClass("nav_dark");
            //     $("nav.desktop_menu").removeClass("nav_box");
            //     // $(".mobile_menu").addClass("nav_dark");
            //     // $(".mobile_menu").removeClass("nav_box");
            // } else if ($("nav").offset().top >= win2H) {
            //     $("nav.desktop_menu").addClass("nav_box");
            //     $("nav.desktop_menu").removeClass("nav_dark");
            //     // $(".mobile_menu").addClass("nav_box");
            //     // $(".mobile_menu").removeClass("nav_dark");
            // }


            if ($("nav.desktop_menu").offset().top < winH_fix) {
                $("nav.desktop_menu").removeClass("nav_box");
                $("nav.desktop_menu").removeClass("nav_dark");
            } else {
                $("nav.desktop_menu").addClass("nav_box");
                $("nav.desktop_menu").removeClass("nav_dark");
            }

        });
    }

    // Mobile menu

    $(".toggle_menu").click(function(){
        $(this).parents().eq(1).toggleClass('active');
    });

    $(".mobile_menu ul li a").click(function(){
        $(this).parents().eq(2).removeClass('active');
    });

    $(".mobile_menu .logo a").click(function(){
        $(this).parents().eq(2).removeClass('active');
    });

} )( jQuery );


// $(document).ready(
//   function() {
//     $("html").niceScroll({
//         horizrailenabled:false,
//         cursorborder: '0 solid #000',
//         cursoropacitymax: '.3',
//         cursorwidth: '10px',
//         cursorcolor: '#24272b'
//     });
//   }
// );
