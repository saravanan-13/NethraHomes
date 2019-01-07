(function($) {
    var $window = $(window);
        
    function propertiesHeader() {
        var $mainHeader = $('#main-header');
        var winTopPos = $window.scrollTop();
        
        if(window.innerWidth >= 768) {
            var menuBtnPos = 0;

            if(window.innerWidth >= 1720) {
                menuBtnPos = 60;
            } else if(window.innerWidth >= 1640) {
                menuBtnPos = 40;
            } else if(window.innerWidth >= 1500) {
                menuBtnPos = 20;
            }
        
            if(winTopPos == 0) {
                $mainHeader.removeClass('fixed');
            } else {
                if(winTopPos >= menuBtnPos) {
                    $mainHeader.addClass('fixed');
                } else {
                    $mainHeader.removeClass('fixed');
                }
            }
        }
    }
    
    $(document).ready(function() {
        propertiesHeader();
    });
    
    $window.scroll(function() {
        propertiesHeader();
    });
    
    $window.resize(function() {
        propertiesHeader();
    });
})(jQuery)