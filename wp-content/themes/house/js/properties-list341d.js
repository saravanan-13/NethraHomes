(function($) {
    var $window = $(window);
    var $propertyListAside = $('#properties-list-aside');
    var $propertyForm = $('#property_form');
    
    var $minPriceInput = $('#property_form input[name=vp_minprice]');
    var $maxPriceInput = $('#property_form input[name=vp_maxprice]');
    var $locationInput = $('#property_form input[name=vp_user1]');
    
    $('#pagination').pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: false
    });
    
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
    
    function pageMinHeight() {
        $('#main-content').css('min-height', $propertyListAside.outerHeight());
    }
    
    $('.show-filter-options').click(function() {
        if($(this).closest('.properties-filter-wrap').hasClass('open-filter')) {
            $(this).closest('.properties-filter-wrap').removeClass('open-filter');
            $(this).siblings('.properties-filter').css('height', 0);
        } else {
            $(this).closest('.properties-filter-wrap').addClass('open-filter');
            $(this).siblings('.properties-filter').css('height', $(this).siblings('.properties-filter').find('.properties-filter-inner').outerHeight());
        }
    });
    
    $('#properties-list-aside input[name=property-price], #properties-list-aside .location-checkbox, #show-all-locations').change(function() {
        
        var minPrice = $('input[name=property-price]:checked').data('min-price');
        var maxPrice = $('input[name=property-price]:checked').data('max-price');
        
        $minPriceInput.val(minPrice);
        $maxPriceInput.val(maxPrice);
        
        $('#properties-list-aside .location-checkbox, #show-all-locations').each(function() {
            if($(this).is(':checked')) {
                $locationInput.val($(this).data('location'));
            }
        });
        
        $('.properties-filter-wrap').removeClass('open-filter');
        $('.properties-filter').css('height', 0);
        
        $propertyForm.submit();
    });
    
    $('#properties-list-aside .property-status').change(function() {
        var $statusInput = $('#property_form input[name=vp_status]');

        var searchString = "For Sale,To Let,"

        $('.property-status').each(function() {
            if($(this).prop('checked')) {
                searchString += $(this).attr('data-status') + ",";
            }
        });

        $statusInput.val(searchString.slice(0,-1));
        
        $propertyForm.submit();
    });
    
    $('.pagination-show-all').click(function(e) {
        e.preventDefault();
        $('input[name=vp_pagesize]').val('1000000');
        
        $propertyForm.submit();
    });
    
    $(document).ready(function() {
        propertiesHeader();
        pageMinHeight();
    });
    
    $window.scroll(function() {
        propertiesHeader();
    });
    
    $window.resize(function() {
        propertiesHeader();
        pageMinHeight();
    });
})(jQuery)