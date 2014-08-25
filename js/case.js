
( function( $ ) {

    // Setup variables
    $window = $(window);
    $headerImg = $('.headerImg');
    $body = $('body');


    //FadeIn all sections   
    $body.imagesLoaded( function() {
        setTimeout(function() {
              
              // Fade in sections
              $body.removeClass('loading').addClass('loaded');

              $(window).scrollTop(0);

                
        }, 400);
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
        if( winW >= 768) {

            // Init Skrollr
            var s = skrollr.init({
                forceHeight: false
            });

        

        } else {

            // Init Skrollr
            var s = skrollr.init();
            s.destroy();
        }
    
        // Check for touch
        if(Modernizr.touch) {

            // Init Skrollr
            var s = skrollr.init();
            s.destroy();
        }

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


    $(window).scroll(function() {

        var imageH = 400;

        if ( $("body").is(".audit") ) {
           imageH = 400;
        } else{
           imageH = 720; 
        }

        if ($("nav").offset().top > imageH) {
            $("nav").addClass("nav_box");
        } else {
            $("nav").removeClass("nav_box");
        }

    });

    var mySwiper = new Swiper('.sketch',{
        pagination: '.pagination',
        loop:true,
        grabCursor: true,
        paginationClickable: true
      })


} )( jQuery );
















  


