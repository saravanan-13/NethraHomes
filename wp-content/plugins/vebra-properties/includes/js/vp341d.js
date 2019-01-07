var vpautocomplete;

jQuery(document).ready(function () {

    // The slider being synced must be initialized first
    jQuery('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        itemWidth: 160,
        itemMargin: 5,
        asNavFor: '#slider'
    });

    jQuery('#slider').flexslider({
        animation: "fade",
        controlNav: false,
        animationLoop: false,
        slideshow: true,
        sync: "#carousel"
    });

    //Google autofill for locations
    if (jQuery("#vp_location").length > 0) {
        vpautocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('vp_location')),
            { types: ['geocode'] });
    }

    jQuery("#vp_location").blur(function () {
        setLngLat();
    });

    if (jQuery("#vp_location").length > 0) setLngLat();

    jQuery('#vp_orderby_select').change(function () {
        jQuery("input:hidden[name=vp_orderby]").val(jQuery('#vp_orderby_select').val());
        jQuery("#property_form").submit();
    });

    //paging
    jQuery(".properties-page").click(function () {
        jQuery("input:hidden[name=vp_page]").val(jQuery(this).attr("data-id"));
        jQuery("#property_form").submit();
        return false;
    });

    jQuery('#viewList').click(function () {
        jQuery("input:hidden[name=vp_view]").val("list");
        jQuery("#property_form").submit();
    });

    jQuery('#viewMap').click(function () {
        jQuery("input:hidden[name=vp_view]").val("map");
        jQuery("#property_form").submit();
    });

    jQuery(".vp_rent").hide();
    jQuery(".vp_commercial").hide();
    if (jQuery(".vp_search input:radio[name=area]").length > 0) {
        if (jQuery(".vp_search input:radio[name=area]:checked").length <= 0) {
            jQuery(".vp_search input:radio[name=area]:first").attr("checked", "checked");
        }
        setSearchOpts(jQuery(".vp_search input:radio[name=area]:checked").val());
    }

    jQuery(".vp_search input:radio[name=area]").change(function () {
        setSearchOpts(jQuery(".vp_search input:radio[name=area]:checked").val());
    });

    if (jQuery(".vp_search select[name=area]").length > 0) {
        setSearchOpts(jQuery(".vp_search select[name=area]").val());
    }

    jQuery(".vp_search select[name=area]").change(function () {
        setSearchOpts(jQuery(".vp_search select[name=area]").val());
    });

    jQuery("#propertyFilter form").on('submit', function () {
        if (jQuery("#vp_location").val() == jQuery("#vp_location").attr('placeholder')) 
            jQuery("#vp_location").val("");
        jQuery("#vp_location").attr('placeholder', '');
    });
});

function setSearchOpts(section) {
    switch (section) {
        case "To Rent":
            jQuery(".vp_price").hide();
            jQuery(".vp_rent").show();
            jQuery(".vp_commercial").hide();
            break;
        case "Commercial":
            jQuery(".vp_price").hide();
            jQuery(".vp_rent").hide();
            jQuery(".vp_commercial").show();
            break;
        default:
            jQuery(".vp_price").show();
            jQuery(".vp_rent").hide();
            jQuery(".vp_commercial").hide();
            break;
    }
}

function setLngLat() {
    var address = document.getElementById('vp_location').value;
    if (address != "") {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                if (jQuery("input[name='lat']").length > 0)
                    jQuery("input[name='lat']").val(results[0].geometry.location.lat());
                else
                    jQuery("#vp_location").after("<input type='hidden' name='lat' value='" + results[0].geometry.location.lat() + "' />");

                if (jQuery("input[name='lng']").length > 0)
                    jQuery("input[name='lng']").val(results[0].geometry.location.lng());
                else
                    jQuery("#vp_location").after("<input type='hidden' name='lng' value='" + results[0].geometry.location.lng() + "' />");
            }
        });
    }
}