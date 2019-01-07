(function($) {
    var $videoWrap = $('#video-wrap');
    var $videoOuter = $('#video-wrap .video');
    var $video = $('#video-wrap video');
    
    function hideLogo() {
        if($(window).scrollTop() == 0) {
            $('#main-header-logo').removeClass('shrink-logo');
        } else {
            $('#main-header-logo').addClass('shrink-logo');
        }
    }
    
    function videoControls() {
        if(window.innerWidth < 768) {
            $video.attr('controls', true);
        } else {
            $video.removeAttr('controls');
        }
    }
    
    function videoMaxHeight() {
       // $videoOuter.css('max-height', window.innerHeight);
    }
    
    function stopVideo() {
        $video.get(0).pause();
        $videoWrap.removeClass('playing').addClass('paused');
    }
    
    function playVideo() {
        if(window.innerWidth >= 768) {
            if($video.get(0).paused || !$videoWrap.hasClass('playing')) {
                if(!$videoWrap.hasClass('playing') && !$videoWrap.hasClass('paused')) {
                    $video.get(0).currentTime = 0;
                }
                
                $videoWrap.addClass('playing').removeClass('paused');

                $video.get(0).play();
                
                var headerHeight = $('#main-header').outerHeight();

                if($video.outerHeight() > window.innerHeight - headerHeight) {
                   // $videoOuter.css('height', $video.height());

                    setTimeout(function() {
                       // $videoOuter.css('height', window.innerHeight - headerHeight);
                    }, 100);

                    $('html, body').animate({
                        scrollTop: $video.offset().top - headerHeight
                    }, 1000);
                } else {
                    $('html, body').animate({
                        scrollTop: $video.offset().top - (($(window).height() - $video.height() + headerHeight)/2)
                    }, 1000);
                }
                
                $video.animate({volume: 1}, 1000);
            } else {
                stopVideo();
            }
        }
    }
    
    function resizeVideoWrap() {
        $videoWrap.css('height', $video.height());
    }
    
    $video.on('ended',function(){
        $videoWrap.removeClass('playing').addClass('paused');
        
        $video.get(0).currentTime = 0;
    });
    
    $('#video-wrap').click(function() {
        playVideo();
    });
    
    $('#property-language-options a').click(function(e) {
        e.preventDefault();
        
        history.pushState(null, null, "?language="+$(this).text());
        
        if($(window).scrollTop() > $video.offset().top) {
            $('html,body').animate({
                scrollTop: $video.offset().top
            }, 1000);
        }
        
        $(this).parent().addClass('hide').siblings().removeClass('hide');
        
        NProgress.start();
        
        var languageId = $(this).data('language-id');
        
        stopVideo();
        
        setTimeout(function() {
            $video.remove();
            
            if(videos[languageId].placeholder) {
                $videoWrap.append('<div class="video"><video poster="'+videos[languageId].placeholder+'"><source src="'+videos[languageId].video+'" type="video/mp4"></video></div>');
            } else {
                $videoWrap.append('<div class="video"><video><source src="'+videos[languageId].video+'" type="video/mp4"></video></div>');
            }
            
            $videoOuter = $('#video-wrap .video');
            $video = $('#video-wrap').find('video');
            
            function handleCanPlay() {
                videoMaxHeight();
                resizeVideoWrap();
                videoControls();
                NProgress.done();
            }
            
            $video.get(0).load();
            $video.get(0).addEventListener("canplay", handleCanPlay, false);
        }, 1000);
    });
    
    $(document).ready(function() {
        hideLogo();
        videoMaxHeight();
        videoControls();
        
        NProgress.configure({ 
            parent: '#video-wrap'
        });
        
        NProgress.start();
        
        function handleReadyCanPlay() {
            resizeVideoWrap();
            NProgress.done();
        }
        
        $video.get(0).load();
        $video.get(0).addEventListener("canplay", handleReadyCanPlay, false);
    });
    
    $(window).resize(function() {
        resizeVideoWrap();
        videoControls();
    });
    
    $(window).scroll(function() {
        hideLogo();
    });
})(jQuery);