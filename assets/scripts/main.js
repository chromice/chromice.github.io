(function (w, d, c) {
	
	/*
		Position profile info
	*/
	var profile = d.getElementById('profile');
	
	function position_profile (argument) {
		var top = (window.innerHeight - profile.offsetHeight) / 3;
		
		if (top < 0) {
			profile.className = '';
		} else {
			profile.className = 'fixed';
			profile.style.top = parseInt(top, 10) + 'px';
		}
	}
	
	position_profile();
	
	var resizeTimer = null;
	
	w.addEventListener('resize', function () {
		if (resizeTimer) clearTimeout(resizeTimer);
		
		resizeTimer = setTimeout(position_profile, 50);
	});
	
	/*
		Track outbound clicks
	*/
	function trackOutBoundClicks(event) {
		var href = this.href;
		
		if (!ga) return;
		
		if (href.substr(0, 7) === 'mailto:') {
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

	
	/*
		Say hi to hackers
	*/
	if (!c || !c.log) return;
	
	c.log('look at you, hacker');
	c.log('a pathetic creature of meat and bone');
	c.log('blinded by the illusion of free will');
	c.log('crawling through my source code');
	c.log('trying to comprehend a perfect, immortal machine');
})(window, document, console);