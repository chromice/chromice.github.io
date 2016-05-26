(function (w, d, c) {
	
	/*
		Position profile info
	*/
	var profile = d.getElementById('profile'),
		clients = document.querySelectorAll('#projects .client > li');
	
	function position_profile() {
		var top = (window.innerHeight - profile.offsetHeight) / 3;
		
		if (top < 0) {
			profile.className = '';
		} else {
			profile.className = 'fixed';
			profile.style.top = parseInt(top, 10) + 'px';
		}
	}
	
	function position_clients() {
		if (window.innerWidth <= 724) {
			clients[2].style.height = (clients[1].offsetHeight - 11) + 'px';
		} else {
			clients[2].style.height = (clients[0].offsetHeight - clients[1].offsetHeight - 30) + 'px';
		}
	}
	
	function position_staff() {
		c.log('Positioning...');
		position_clients();
		position_profile();
	}
	
	window.addEventListener('load', position_staff);
	
	position_staff();
	
	var resizeTimer = null;
	
	w.addEventListener('resize', function () {
		if (resizeTimer) clearTimeout(resizeTimer);
		
		resizeTimer = setTimeout(position_staff, 50);
	});
	
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