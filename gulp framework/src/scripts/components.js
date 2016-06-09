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

	// import('components/_breakpoint.js');
	// import('components/_auction-app.js');


	/*
	 *  -- Component Functions --
	 */


	$(document).ready(function () {

		sawse.breakpoint.init();
		sawse.auctionApp.init();

	});
// })(jQuery);