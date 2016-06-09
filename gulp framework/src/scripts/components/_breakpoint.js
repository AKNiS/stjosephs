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