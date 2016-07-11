// google.maps.event.addDomListener(window, 'load', init);
// var map;

// function init() {
//     var mapOptions = {
//         center: new google.maps.LatLng(-29.672822, 152.940895),
//         zoom: 14,
//         zoomControl: true,
//         zoomControlOptions: {
//             style: google.maps.ZoomControlStyle.DEFAULT,
//         },
//         disableDoubleClickZoom: true,
//         mapTypeControl: true,
//         mapTypeControlOptions: {
//             style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
//         },
//         scaleControl: true,
//         scrollwheel: true,
//         panControl: true,
//         streetViewControl: true,
//         draggable: true,
//         overviewMapControl: true,
//         overviewMapControlOptions: {
//             opened: false,
//         },
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         styles: [{
//             "featureType": "administrative",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "on"
//             }, {
//                 "saturation": -100
//             }, {
//                 "lightness": 20
//             }]
//         }, {
//             "featureType": "road",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "on"
//             }, {
//                 "saturation": -100
//             }, {
//                 "lightness": 40
//             }]
//         }, {
//             "featureType": "water",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "on"
//             }, {
//                 "saturation": -10
//             }, {
//                 "lightness": 30
//             }]
//         }, {
//             "featureType": "landscape.man_made",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "simplified"
//             }, {
//                 "saturation": -60
//             }, {
//                 "lightness": 10
//             }]
//         }, {
//             "featureType": "landscape.natural",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "simplified"
//             }, {
//                 "saturation": -60
//             }, {
//                 "lightness": 60
//             }]
//         }, {
//             "featureType": "poi",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "off"
//             }, {
//                 "saturation": -100
//             }, {
//                 "lightness": 60
//             }]
//         }, {
//             "featureType": "transit",
//             "elementType": "all",
//             "stylers": [{
//                 "visibility": "off"
//             }, {
//                 "saturation": -100
//             }, {
//                 "lightness": 60
//             }]
//         }],
//     }
//     var mapElement = document.getElementById('map');
//     var i, description, 
//     	telephone, email, web,
//     	markericon, marker, link,
//     	map = new google.maps.Map(mapElement, mapOptions);
//     var locations = [
//         ['St Josephs', 'St Joseph\'s Cowper', '(02) 6642 3022', 'info@sjc.org.au', 'sjc.org.au', -29.670873, 152.94221700000003, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png']
//     ];
//     for (i = 0; i < locations.length; i++) {
//         if (locations[i][1] == 'undefined') {
//             description = '';
//         } else {
//             description = locations[i][1];
//         }
//         if (locations[i][2] == 'undefined') {
//             telephone = '';
//         } else {
//             telephone = locations[i][2];
//         }
//         if (locations[i][3] == 'undefined') {
//             email = '';
//         } else {
//             email = locations[i][3];
//         }
//         if (locations[i][4] == 'undefined') {
//             web = '';
//         } else {
//             web = locations[i][4];
//         }
//         if (locations[i][7] == 'undefined') {
//             markericon = '';
//         } else {
//             markericon = locations[i][7];
//         }
//         marker = new google.maps.Marker({
//             icon: markericon,
//             position: new google.maps.LatLng(locations[i][5], locations[i][6]),
//             map: map,
//             title: locations[i][0],
//             desc: description,
//             tel: telephone,
//             email: email,
//             web: web
//         });
//         link = '';
//     }

// }