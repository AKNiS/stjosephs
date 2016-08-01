var donateForm = new NLForm( document.getElementById( 'donate--form' ), '#donate' );

/*
* 
* Cookie for prompting the user to join the mailing list
* - On the first visit, prompt the user only once
* - If on one page for 20 seconds
* - OR if the user visits a second page
* - Expires in 7 days
* 
* When the page loads, look for a cookie
* if cookie AND triggered, do nothing
* if cookie AND not triggered, prompt immediately
* if no cookie, create cookie and start timer
* if timer ends, set cookie to triggered
* 
*/
window.onload = function(e) {

    donateForm.toggleTabIndexes();
    window.addEventListener('hashchange', donateForm.toggleTabIndexes);

    var donateClose = document.getElementById('donate--close');
    toggleTabIndex(donateClose, '#donate');
    window.addEventListener('hashchange', function(ev) {
        toggleTabIndex(donateClose, '#donate');
    });


    // Newsletter popup cookie handler
    var timerSec = 20;
    var cookie = document.cookie.replace(/(?:(?:^|.*;\s*)sjcMailingList\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if(!cookie) {
        console.log('No cookie exists! Creating one and starting a timer');
        writeCookie('sjcMailingList', false, 7);
        setTimeout(function() {
            console.log('Reached timer end! Prompt now.');
            location.href='#mailing-list';
            writeCookie('sjcMailingList', true, 7);
        }, timerSec*1000);
    } else if (cookie && cookie === 'false') {
        console.log('Found a cookie! Return visit but haven\'t prompted yet. Prompt now!');
        location.href='#mailing-list';
        writeCookie('sjcMailingList', true, 7);
    } else if (cookie && cookie === 'true') {
        console.log('Found a cookie, and user has been triggered. Do nothing');
    }

    // Change header size on scroll
    window.addEventListener('scroll', function(e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            header = document.getElementById('header');
        if(distanceY > shrinkOn) {
            // add class 'small'
            header.className = 'header small';
        } else {
            // remove class 'small'
            header.className = 'header';
        }
    });
}

function writeCookie (key, value, days) {
    var date = new Date();

    // Default at 365 days.
    days = days || 365;

    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000

    window.document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';

    return value;
};

function deleteCookie (key) {
    window.document.cookie = key + '=; expires=0; path=/';
}


/* Google Map init */
google.maps.event.addDomListener(window, 'load', init);
var map;


function init() {
    var mapOptions = {
        center: new google.maps.LatLng(-29.672822, 152.940895),
        zoom: 14,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        },
        scaleControl: true,
        scrollwheel: true,
        panControl: true,
        streetViewControl: true,
        draggable: true,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
            'featureType': 'administrative',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'on'
            }, {
                'saturation': -100
            }, {
                'lightness': 20
            }]
        }, {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'on'
            }, {
                'saturation': -100
            }, {
                'lightness': 40
            }]
        }, {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'on'
            }, {
                'saturation': -10
            }, {
                'lightness': 30
            }]
        }, {
            'featureType': 'landscape.man_made',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'simplified'
            }, {
                'saturation': -60
            }, {
                'lightness': 10
            }]
        }, {
            'featureType': 'landscape.natural',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'simplified'
            }, {
                'saturation': -60
            }, {
                'lightness': 60
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'off'
            }, {
                'saturation': -100
            }, {
                'lightness': 60
            }]
        }, {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [{
                'visibility': 'off'
            }, {
                'saturation': -100
            }, {
                'lightness': 60
            }]
        }],
    }
    var mapElement = document.getElementById('map');
    var i, description, 
    	telephone, email, web,
    	markericon, marker, link,
    	map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
        ['St Josephs', 'St Joseph\'s Cowper', '(02) 6642 3022', 'info@sjc.org.au', 'sjc.org.au', -29.670873, 152.94221700000003, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png']
    ];
    for (i = 0; i < locations.length; i++) {
        if (locations[i][1] == 'undefined') {
            description = '';
        } else {
            description = locations[i][1];
        }
        if (locations[i][2] == 'undefined') {
            telephone = '';
        } else {
            telephone = locations[i][2];
        }
        if (locations[i][3] == 'undefined') {
            email = '';
        } else {
            email = locations[i][3];
        }
        if (locations[i][4] == 'undefined') {
            web = '';
        } else {
            web = locations[i][4];
        }
        if (locations[i][7] == 'undefined') {
            markericon = '';
        } else {
            markericon = locations[i][7];
        }
        marker = new google.maps.Marker({
            icon: markericon,
            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
            map: map,
            title: locations[i][0],
            desc: description,
            tel: telephone,
            email: email,
            web: web
        });
        link = '';
    }

}

function toggleTabIndex(el, hash) {
    console.log(hash);
    if(location.hash === hash) {
        el.setAttribute('tabindex','1');
    } else {
        el.removeAttribute('tabindex');
    }
}