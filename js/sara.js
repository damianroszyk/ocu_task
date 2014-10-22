
( function( $ ) {

    if ( ($('html').hasClass('no-ie')) ){
        $(window).scroll(function() {

            var imageH = 600;

            if ($("nav").offset().top > imageH) {
                $("nav").addClass("nav_box");
            } else {
                $("nav").removeClass("nav_box");
            }

            var winH = $(window).height();

            $('.graphics').each(function(){
                var imagePos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+winH-200) {
                    $('.graphics>img').each(function(i) {
                        var me = $(this);
                        setTimeout(function () { $(me).addClass("fadeInLeft"); }, (300 * i));
                    });    
                };
            });

            $('.icons').each(function(){
                var box = $(this);
                var imagePos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+winH-300) {
                    $(box).find('.image').addClass("fadeInLeft");
                }
            });

            $('.navigation').each(function(){
                var box = $(this);
                var imagePos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+winH-300) {
                    $(box).find('.image').addClass("fadeInLeft");
                }
            });

            $('.recipes').each(function(){
                var box = $(this);
                var imagePos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+winH-300) {
                    $(box).find('.image').addClass("fadeInLeft");
                }
            });

            $('.mobile').each(function(){
                var box = $(this);
                var imagePos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+winH-300) {
                    $(box).find('.image').addClass("fadeInLeft");
                }
            });

        }); 
    }  




    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true,
        centeredSlides: true,
        loop:true,
        slidesPerView: 3,
        loopedSlides: 3,
        loopAdditionalSlides:3,
        roundLengths:true,
        watchActiveIndex: true,
        keyboardControl: true,   
        grabCursor: true,
        offsetSlidesBefore:1,
        offsetSlidesBefore:1
    });



    if( $("html").hasClass("ie9") ){
        
        var mySwiper = new Swiper('.swiper-container',{
            pagination: '.pagination',
            paginationClickable: true,
            centeredSlides: true,
            loop:true,
            slidesPerView: 3,
            loopedSlides: 3,
            loopAdditionalSlides:3,
            roundLengths:true,
            watchActiveIndex: true,
            keyboardControl: true,   
            offsetSlidesBefore:1,
            offsetSlidesBefore:1,
            onlyExternal:true
        });    
    }




    

    $("#btn_play").click(function(){
        $(".video>.bg").addClass("open_video");
        $(".btn_play").fadeOut(300);

        $(".video>iframe").attr('src', $(".video>iframe").attr('src') + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ff9933&amp;autoplay=1');

        setTimeout(function(){
            $(".video>iframe").addClass("open");
        }, 500);    
    });

    

    $("#btn_play").on({
        mouseenter: function () {
            $(".video>.bg").addClass("hover");
        },
        mouseleave: function () {
            $(".video>.bg").removeClass("hover");
        }
    });  

   



} )( jQuery );

















  


