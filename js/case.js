
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
















  


