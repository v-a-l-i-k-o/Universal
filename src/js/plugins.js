// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

/* ===== JQUERY/HELPER PLUGINS ===== */

/* ----- slick-slider ----- */

//=include _partials/slick.min.js

/* ----- slick-menu ----- */

//=include _partials/jquery.slicknav.min.js

/* ----- bpopup ----- */

//=include _partials/jquery.bpopup.min.js

/* ----- magnific-popup ----- */

//=include _partials/jquery.magnific-popup.min.js
