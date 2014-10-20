
( function( $ ) {

    if ( ($('html').hasClass('no-ie')) ){
    $(window).scroll(function() {

        var imageH = 500;

        if ($("nav").offset().top > imageH) {
            $("nav").addClass("nav_box");
        } else {
            $("nav").removeClass("nav_box");
        }

        var winH = $(window).height();

        $('.case_logotype').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $('.case_logotype .image>div').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (200 * i));
                });    
            };
        });

        $('.case_colors').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $('.case_colors .image>ul').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (400 * i));
                });    
            };
        });

        $('.case_typo').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $(box).find('img').addClass("fadeInLeft");
            }
        });

        $('.case_notification').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $(box).find('img').addClass("fadeInLeft");
            }
        });

        $('.case_icons').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $(box).find('img').addClass("fadeInLeft");
            }
        });

        $('.case_controls').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $(box).find('img').addClass("fadeInLeft");
            }
        });

        $('.case_sprint').each(function(){
            var box = $(this);
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $(box).find('img').addClass("fadeInLeft");
            }
        });

        $('.case_stats').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+winH-200) {
                $('.case_stats .image>div').each(function(i) {
                    var me = $(this);
                    setTimeout(function () { $(me).addClass("fadeInLeft"); }, (400 * i));
                });    
            };
        });
    }); 

    }   

} )( jQuery );

















  


