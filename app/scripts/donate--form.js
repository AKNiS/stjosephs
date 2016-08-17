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
			// 	toggleTabIndexes(ev, self);
			// });
			// window.addEventListener("onload", function(ev) {
			// 	console.log("window load!");
			// 	toggleTabIndexes(ev, self);
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
				console.log("closed #donate");
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
			this.fld.id = this.elOriginal.id + "_placeholder";
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = "<em>" + this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML + "</em>";
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
			this.fld.id = this.elOriginal.id + "_placeholder";
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = "<em>" + this.elOriginal.getAttribute( 'placeholder' ) + "</em>";
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
					console.log("close an open input");
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
					// 	ev.preventDefault(); ev.stopPropagation();
					// 	self.close();
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
					var event = document.createEvent("HTMLEvents");
				    event.initEvent("change", true, true);
				    this.elOriginal.dispatchEvent(event);
				}
			}
			else if( this.type === 'input' ) {
				this.getinput.blur();
				this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : "<em>" + this.getinput.getAttribute( 'placeholder' ) + "</em>";
				this.elOriginal.value = this.getinput.value;
			}

			this.toggle.focus();
		}
	}

	// add to global namespace
	window.NLForm = NLForm;

} )( window );