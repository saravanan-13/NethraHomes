jQuery(document).ready(function () {
    if (jQuery("#vp-map").length > 0) {
        var map = new google.maps.Map(document.getElementById('vp-map'), {
            zoom: vp_Zoom,
            center: vp_LatLng
        });

        var infowindow = new InfoBubble({
            backgroundColor: vp_Backcolour,
            borderWidth: 0,
            closeSrc: vp_close,
        });

        var marker, i;
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                title: locations[i][0]
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][3]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

        if (showRadius) {
            var cOptions = {
                strokeWeight: 2,
                map: map,
                center: vp_LatLng,
                radius: vp_Radius
            };
            // Add the circle for this city to the map.
            cCircle = new google.maps.Circle(cOptions);
        }
    }

    if (jQuery("#vp-map-canvas").length>0) {
        var mapOptions = {
            zoom: 16,
            center: vp_LatLng
        }
        var map = new google.maps.Map(document.getElementById('vp-map-canvas'), mapOptions);
        var infowindow = new InfoBubble({
            backgroundColor: vp_Backcolour,
            closeSrc: vp_close,
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: vp_LatLng,
            map: map,
            title: titleString
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }
});
