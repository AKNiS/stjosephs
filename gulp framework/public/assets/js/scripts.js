/*	
 *	-- Components --
 *	Scripts concatenated and placed before document closing </body>
 */



// (function ($) {
	'use strict';

	// Namespace
	var sawse = sawse || {};

	// Set responsive breakpoints
	$(window).setBreakpoints({
		// use only largest available vs use all available
		distinct: true, 
		breakpoints: [
			0,
			768,
			1024
		] 
	});
	// Examples: See _responsive.js


	/*  
	 *  -- Component Imports --
	 *  Scripts concatenated and placed before document closing </body>
	 */

	/* 
 *	_breakpoint.js
 */

sawse.breakpoint = (function () {
	'use strict';

	var breakpoints = {
		mobile: false,
		tablet: false,
		desktop: false
	};

	var is = function (breakpoint) {
		switch (breakpoint) {
			case 'mobile':
				return breakpoints.mobile === true;

			case 'tablet':
				return breakpoints.tablet === true;

			case 'desktop':
				return breakpoints.desktop === true;
		}
	};

	var init = function () {
		var $body = $('body');

		// MOBILE
		$(window).on('enterBreakpoint0', function () {
			$body.addClass('bp-mobile');
			breakpoints.mobile = true;
		});

		$(window).on('exitBreakpoint0', function () {
			$body.removeClass('bp-mobile');
			breakpoints.mobile = false;
		});

		// TABLET
		$(window).on('enterBreakpoint768', function () {
			$body.addClass('bp-tablet');
			breakpoints.tablet = true;
		});

		$(window).on('exitBreakpoint768', function () {
			$body.removeClass('bp-tablet');
			breakpoints.tablet = false;
		});

		// DESKTOP
		$(window).on('enterBreakpoint1024', function () {
			$body.addClass('bp-desktop');
			breakpoints.desktop = true;
		});

		$(window).on('exitBreakpoint1024', function () {
			$body.removeClass('bp-desktop');
			breakpoints.desktop = false;
		});
	};

	return {
		init: init,
		is: is
	};

}());
	/* 
 *	_auction-app.js
 */

sawse.auctionApp = (function () {
	'use strict';

	var init = function () {
		
	};

	return {
		init: init
	};

}());


	/*
	 *  -- Component Functions --
	 */


	$(document).ready(function () {

		sawse.breakpoint.init();
		sawse.auctionApp.init();

	});
// })(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHRcclxuICpcdC0tIENvbXBvbmVudHMgLS1cclxuICpcdFNjcmlwdHMgY29uY2F0ZW5hdGVkIGFuZCBwbGFjZWQgYmVmb3JlIGRvY3VtZW50IGNsb3NpbmcgPC9ib2R5PlxyXG4gKi9cclxuXHJcblxyXG5cclxuLy8gKGZ1bmN0aW9uICgkKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHQvLyBOYW1lc3BhY2VcclxuXHR2YXIgc2F3c2UgPSBzYXdzZSB8fCB7fTtcclxuXHJcblx0Ly8gU2V0IHJlc3BvbnNpdmUgYnJlYWtwb2ludHNcclxuXHQkKHdpbmRvdykuc2V0QnJlYWtwb2ludHMoe1xyXG5cdFx0Ly8gdXNlIG9ubHkgbGFyZ2VzdCBhdmFpbGFibGUgdnMgdXNlIGFsbCBhdmFpbGFibGVcclxuXHRcdGRpc3RpbmN0OiB0cnVlLCBcclxuXHRcdGJyZWFrcG9pbnRzOiBbXHJcblx0XHRcdDAsXHJcblx0XHRcdDc2OCxcclxuXHRcdFx0MTAyNFxyXG5cdFx0XSBcclxuXHR9KTtcclxuXHQvLyBFeGFtcGxlczogU2VlIF9yZXNwb25zaXZlLmpzXHJcblxyXG5cclxuXHQvKiAgXHJcblx0ICogIC0tIENvbXBvbmVudCBJbXBvcnRzIC0tXHJcblx0ICogIFNjcmlwdHMgY29uY2F0ZW5hdGVkIGFuZCBwbGFjZWQgYmVmb3JlIGRvY3VtZW50IGNsb3NpbmcgPC9ib2R5PlxyXG5cdCAqL1xyXG5cclxuXHQvLyBpbXBvcnQoJ2NvbXBvbmVudHMvX2JyZWFrcG9pbnQuanMnKTtcclxuXHQvLyBpbXBvcnQoJ2NvbXBvbmVudHMvX2F1Y3Rpb24tYXBwLmpzJyk7XHJcblxyXG5cclxuXHQvKlxyXG5cdCAqICAtLSBDb21wb25lbnQgRnVuY3Rpb25zIC0tXHJcblx0ICovXHJcblxyXG5cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0c2F3c2UuYnJlYWtwb2ludC5pbml0KCk7XHJcblx0XHRzYXdzZS5hdWN0aW9uQXBwLmluaXQoKTtcclxuXHJcblx0fSk7XHJcbi8vIH0pKGpRdWVyeSk7Il0sImZpbGUiOiJjb21wb25lbnRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
