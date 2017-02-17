(function (w, d, c) {
	/*
		Track outbound clicks
	*/
	function trackOutBoundClicks(event) {
		var href = this.href;
		
		if (!ga) return;
		
		if (href.substr(-4, 4) === '.pdf') {
			ga('send', 'event', {
				eventCategory: 'Resume Link',
				eventAction: 'click',
				eventLabel: href,
				transport: 'beacon'
			});
		} else if (href.substr(0, 7) === 'mailto:') {
			ga('send', 'event', {
				eventCategory: 'Email link',
				eventAction: 'click',
				eventLabel: href
			});
		} else {
			ga('send', 'event', {
				eventCategory: 'Outbound Link',
				eventAction: 'click',
				eventLabel: href,
				transport: 'beacon'
			});
		}
	}
	
	var as = d.getElementsByTagName('a');
	
	for (var i = 0; i < as.length; i++) {
		as[i].addEventListener('click', trackOutBoundClicks, true);
	}

})(window, document, console);