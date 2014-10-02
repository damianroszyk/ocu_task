
( function( $ ) {

   

    var mySwiper = new Swiper('.sketch',{
        pagination: '.pagination',
        loop:true,
        grabCursor: true,
        paginationClickable: true
    });


    if ( ($('html').hasClass('no-ie')) ){
    $(window).scroll(function() {

        imageH = 720;

        winW = $(window).width();


        if (winW < 992){
            imageH = 550;
        }

        if ($("nav").offset().top > imageH) {
            $("nav").addClass("nav_box");
        } else {
            $("nav").removeClass("nav_box");
        }

        var winH = $(window).height();

        $('.case_about .images').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $('.images img').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (200 * i));
                });    
            };
        });


        $('.sketch').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $(box).addClass("fadeInLeft");
            }
        });

        $('.case_flowmap').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $(box).find('img').addClass("fadeInLeft");
            }
        });

        $('.case_ux').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $(box).find('.bg_ux').addClass("fadeInLeft");
            }
        });

        $('.case_design').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $('.case_design>.content>img').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (700 * i));
                });    
            };
        });

         $('.case_design .icon_box').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $('.icon_box .design_icon').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (300 * i));
                });    
            };
        });

        $('.case_tech .icon_box').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $('.icon_box .tech_icon').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (300 * i));
                });    
            };
        });

         $('.case_frame').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $(box).find('.title').addClass("fadeInLeft");
            }
        });

         $('.case_pack').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-300) {
                $(box).find('.title').addClass("fadeInLeft");
            }
        });
    });

    }

    


} )( jQuery );
















  


