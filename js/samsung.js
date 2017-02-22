
( function( $ ) {

     var winH = $(window).height();

    $(".loading-screen").height(winH); 
    $(".loading-screen .content").height(winH);    
    $(".case_intro").height(winH);    
    $(".case_intro .content").height(winH);
    $(".case_intro .bg_case").height(winH); 


    $("a.more").click(function(event) {
        event.preventDefault(); 

        var anchor = $(this).attr('href');

        $('body').animate({ 
                scrollTop: $(anchor).offset().top
            }, 1200);        
        });


    if ( ($('html').hasClass('no-ie')) ){
    $(window).scroll(function() {

        var imageH = 500;

        if ($("nav").offset().top > imageH) {
            $("nav").addClass("nav_box");
        } else {
            $("nav").removeClass("nav_box");
        }

        var winH = $(window).height();
    }); 
    }   

} )( jQuery );

















  


