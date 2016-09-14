
/**
 * nlform.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
    var document = window.document;

    if (!String.prototype.trim) {
        String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
    }

    function NLForm( el, hash ) {   
        this.el = el;
        this.hash = hash;
        this.overlays = Array.prototype.slice.call( this.el.querySelectorAll( '.donate--form__overlay' ));
        this.fields = [];
        this.fldOpen = -1;
        this._init();
    }

    NLForm.prototype = {
        _init : function() {
            var self = this;
            Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
                self.fldOpen++;
                self.fields.push( new NLField( self, el, 'dropdown', self.fldOpen ) );
            } );
            Array.prototype.slice.call( this.el.querySelectorAll( 'input' ) ).forEach( function( el, i ) {
                self.fldOpen++;
                self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
            } );
            this.overlays.forEach( function( el, i ) {
                el.addEventListener( 'click', function(ev) { self._closeFlds(); } );
                el.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
            } );
            document.addEventListener( 'keydown', function(ev) { 
                if ( ev.keyCode == 27 && self.fldOpen !== -1 ) { 
                    self._closeFlds(); } 
                } 
            );
            // console.log("init run");
            // console.log(this.fields);
            // window.addEventListener("hashchange", function(ev) {
            //  toggleTabIndexes(ev, self);
            // });
            // window.addEventListener("onload", function(ev) {
            //  console.log("window load!");
            //  toggleTabIndexes(ev, self);
            // });
        },
        _closeFlds : function() {
            if( this.fldOpen !== -1 ) {
                this.fields[ this.fldOpen ].close();
            }
        },
        toggleTabIndexes : function() {
            // enable tab indexing while form is open
            console.log(this);
            var self = this;
            console.log(self);
            if(location.hash === this.hash) {
                console.log('donate is open');
                this.fields.forEach( function( el, i ) {
                    // console.log(el);
                    el.toggle.setAttribute('tabindex','1');
                    if(i==0) {
                        el.toggle.focus();
                    }
                } );
            } else {
                console.log('closed #donate');
                this.fields.forEach( function( el, i ) {
                    el.toggle.removeAttribute('tabindex');
                } );
            }
        }
    }

    function NLField( form, el, type, idx ) {
        this.form = form;
        this.elOriginal = el;
        this.pos = idx;
        this.type = type;
        this._create();
        this._initEvents();
    }

    NLField.prototype = {
        _create : function() {
            if( this.type === 'dropdown' ) {
                this._createDropDown(); 
            }
            else if( this.type === 'input' ) {
                this._createInput();    
            }
        },
        _createDropDown : function() {
            var self = this;
            this.fld = document.createElement( 'div' );
            this.fld.className = 'donate--field__popup donate--field__dd';
            this.fld.id = this.elOriginal.id + '_placeholder';
            this.toggle = document.createElement( 'a' );
            this.toggle.innerHTML = '<em>' + this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML + '</em>';
            this.toggle.className = 'donate--field__toggle';
            this.optionsList = document.createElement( 'ul' );
            var ihtml = '';
            Array.prototype.slice.call( this.elOriginal.querySelectorAll( 'option' ) ).forEach( function( el, i ) {
                if(!self.elOriginal.disabled) {
                    ihtml += self.elOriginal.selectedIndex === i ? '<li class="donate--field__dd-checked" tabindex="-1">' + el.innerHTML + '</li>' : '<li tabindex="-1">' + el.innerHTML + '</li>';
                    // selected index value
                    if( self.elOriginal.selectedIndex === i ) {
                        self.selectedIdx = i;
                    }
                }
            } );
            this.optionsList.innerHTML = ihtml;
            this.fld.appendChild( this.toggle );
            this.fld.appendChild( this.optionsList );
            this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
            this.elOriginal.style.display = 'none';
        },
        _createInput : function() {
            var self = this;
            this.fld = document.createElement( 'div' );
            this.fld.className = 'donate--field__popup donate--field__text';
            this.fld.id = this.elOriginal.id + '_placeholder';
            this.toggle = document.createElement( 'a' );
            this.toggle.innerHTML = '<em>' + this.elOriginal.getAttribute( 'placeholder' ) + '</em>';
            this.toggle.className = 'donate--field__toggle';
            this.optionsList = document.createElement( 'ul' );
            this.getinput = document.createElement( 'input' );
            this.getinput.setAttribute( 'type', 'text' );
            this.getinput.setAttribute( 'placeholder', this.elOriginal.getAttribute( 'placeholder' ) );
            this.getinputWrapper = document.createElement( 'li' );
            this.getinputWrapper.className = 'donate--field__input';
            this.getinputWrapper.appendChild( this.getinput );
            this.optionsList.appendChild( this.getinputWrapper );
            this.fld.appendChild( this.toggle );
            this.fld.appendChild( this.optionsList );
            this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
            this.elOriginal.style.display = 'none';
        },
        _initEvents : function() {
            var self = this;
            this.toggle.addEventListener( 'click', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
            this.toggle.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
            this.toggle.addEventListener( 'keydown', function( ev ) {
                if ( ev.keyCode == 32 ) { // key: space
                    ev.preventDefault(); ev.stopPropagation(); self._open();
                }
                if( ev.keyCode == 9 ) { // key: tab
                    console.log('close an open input');
                    ev.preventDefault(); ev.stopPropagation(); self.close();
                }
            } );

            if( this.type === 'dropdown' ) {
                var opts = Array.prototype.slice.call( this.optionsList.querySelectorAll( 'li' ) );
                opts.forEach( function( el, i ) {
                    el.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
                    el.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
                    el.addEventListener( 'keydown', function( ev ) {
                        if ( ev.keyCode == 38 ) { // key: up arrow
                            ev.preventDefault(); ev.stopPropagation();
                            if(document.activeElement.previousElementSibling) {
                                document.activeElement.previousElementSibling.focus();
                            } else {
                                opts[opts.length-1].focus();
                            }
                        }
                        if ( ev.keyCode == 40 ) { // key: down arrow
                            ev.preventDefault(); ev.stopPropagation();
                            if(document.activeElement.nextElementSibling) {
                                document.activeElement.nextElementSibling.focus();
                            } else {
                                opts[0].focus();
                            }
                        }
                        if( ev.keyCode == 32 || ev.keyCode == 13) { // key: space or enter
                            ev.preventDefault(); ev.stopPropagation();
                             self.close( el, opts.indexOf( el ) );
                        }
                        if( ev.keyCode == 9 && self.open ) { // key: tab
                            // ev.preventDefault(); ev.stopPropagation();
                            self.close();
                        }
                    } );
                } );

            }
            else if( this.type === 'input' ) {
                this.getinput.addEventListener( 'keydown', function( ev ) {
                    if ( ev.keyCode == 13 ) { // key: enter
                        self.close();
                    }
                    // if( ev.keyCode == 9 && self.open ) { // key: tab
                    //  ev.preventDefault(); ev.stopPropagation();
                    //  self.close();
                    // }
                } );
            }

        },
        _open : function() {
            if( this.open ) {
                return false;
            }
            this.open = true;
            this.form.fldOpen = this.pos;
            var self = this;
            this.fld.className += ' donate--field__open';
            if( this.type === 'dropdown' ) {
                this.optionsList.children[ this.selectedIdx ].focus();
            } else if( this.type === 'input' ) {
                this.getinput.focus();
            }
        },
        close : function( opt, idx ) {
            if( !this.open ) {
                return false;
            }
            this.open = false;
            this.form.fldOpen = -1;
            this.fld.className = this.fld.className.replace(/\b donate--field__open\b/,'');

            if( this.type === 'dropdown' ) {
                if( opt ) {
                    // remove class nl-dd-checked from previous option
                    var selectedopt = this.optionsList.children[ this.selectedIdx ];
                    selectedopt.className = '';
                    opt.className = 'donate--field__dd-checked';
                    this.toggle.innerHTML = opt.innerHTML;
                    // update selected index value
                    this.selectedIdx = idx;
                    // update original select element´s value
                    this.elOriginal.value = this.elOriginal.children[ this.selectedIdx ].value;

                    // trigger the native change event
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent('change', true, true);
                    this.elOriginal.dispatchEvent(event);
                }
            }
            else if( this.type === 'input' ) {
                this.getinput.blur();
                this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : '<em>' + this.getinput.getAttribute( 'placeholder' ) + '</em>';
                this.elOriginal.value = this.getinput.value;
            }

            this.toggle.focus();
        }
    }

    // add to global namespace
    window.NLForm = NLForm;

} )( window );




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
    var donateForm = new NLForm( document.getElementById( 'donate--form' ), '#donate' );

    // on page load and hash change, 
    // when donate form is open,
    // make donate form elements tabbable
    // donateForm.toggleTabIndexes();
    // window.addEventListener('hashchange', donateForm.toggleTabIndexes);
    // var donateClose = document.getElementById('donate--close');
    // toggleTabIndex(donateClose, '#donate');
    // window.addEventListener('hashchange', function(ev) {
    //     toggleTabIndex(donateClose, '#donate');
    // });

    // set listeners for triggering connected elements
    // e.g. only show donation period when frequency is set to "per"
    // Group >> denom
    var donateGroup = document.getElementById('donate--field__group');
    var donateDenom = document.getElementById('donate--denom');
    donateGroup.addEventListener('change', function(ev) {
        donateDenom.innerHTML = donateGroup.value;
    });
    var donateFreq = document.getElementById('donate--field__frequency');
    var donatePeriodPlaceholder = document.getElementById('donate--field__period_placeholder');
    donateFreq.addEventListener('change', function(ev) {
        if(donateFreq.value == 'per') {
            donatePeriodPlaceholder.style = 'display:inline-block';
        } else if (donateFreq.value == 'once') {
            donatePeriodPlaceholder.style = 'display:none';
        }
    });

    // controls for donate form sections
    var donateForm = document.querySelector('.donate--form');
    var donateAmount = document.querySelector('.donate--amount');
    var donateDetails = document.querySelector('.donate--details');
    var donateSubmit = document.querySelector('.donate--submit');
    document.getElementById('donate--control__next')
            .addEventListener('click', function(ev) {
        ev.preventDefault(); ev.stopPropagation();
        donateAmount.className = 'donate--fieldset donate--amount';
        donateDetails.className = 'donate--fieldset donate--details active';
        var mm = window.matchMedia( '(min-width: 550px)' );
        if(!mm.matches) {
            setTimeout(function() {
                donateForm.scrollTop = donateDetails.offsetTop - 40;
            }, 500);
        }
    });
    document.getElementById('donate--control__prev')
            .addEventListener('click', function(ev) {
        ev.preventDefault(); ev.stopPropagation();
        donateAmount.className = 'donate--fieldset donate--amount active';
        donateDetails.className = 'donate--fieldset donate--details';
        var mm = window.matchMedia( '(min-width: 550px)' );
        if(!mm.matches) {
            setTimeout(function() {
                donateForm.scrollTop = donateAmount.offsetTop - 40;
            }, 500);
        }
    });
    document.getElementById('donate--control__next2')
            .addEventListener('click', function(ev) {
        ev.preventDefault(); ev.stopPropagation();
        donateDetails.className = 'donate--fieldset donate--details';
        donateSubmit.className = 'donate--fieldset donate--submit active';
        var mm = window.matchMedia( '(min-width: 550px)' );
        if(!mm.matches) {
            setTimeout(function() {
                donateForm.scrollTop = donateSubmit.offsetTop - 40;
            }, 500);
        }
    });
    document.getElementById('donate--control__prev2')
            .addEventListener('click', function(ev) {
        ev.preventDefault(); ev.stopPropagation();
        donateDetails.className = 'donate--fieldset donate--details active';
        donateSubmit.className = 'donate--fieldset donate--submit';
        var mm = window.matchMedia( '(min-width: 550px)' );
        if(!mm.matches) {
            setTimeout(function() {
                donateForm.scrollTop = donateDetails.offsetTop - 40;
            }, 500);
        }
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
// google.maps.event.addDomListener(window, 'load', init);
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


// set an element's tab index to 1, making it tabbable and promoting
// it above document flow. used in donate form to make it accessible via keyboard
function toggleTabIndex(el, hash) {
    console.log(hash);
    if(location.hash === hash) {
        el.setAttribute('tabindex','1');
    } else {
        el.removeAttribute('tabindex');
    }
}

// change an element's opacity to 0 and after a timeout 
// sets display to none. used in conjunction with css 
// transition of opacity. used in donate form to transition
// between pages of the form
// function fadeOut(el) {
//     el.style.opacity = 0;
//     setTimeout(function() {
//         el.style.visibility = 'hidden';
//     }, 330);
// }

// change an element's opacity to 1 and display to block
// used in conjunction with css transition of opacity. 
// used in donate form to transition between pages of the form
// function fadeIn(el) {
//     el.style.visibility = 'visible';
//     el.style.opacity = 1;
// }