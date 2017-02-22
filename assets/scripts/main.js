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
		} else if (href.substr(0, 1) === '#') {
			ga('send', 'event', {
				eventCategory: 'Inbound Link',
				eventAction: 'click',
				eventLabel: href,
				transport: 'beacon'
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
		Hide case study body
	*/
	if (!d.querySelectorAll) return;
	
	// Find case study screenshots...
	var links = d.querySelectorAll('#recent-projects article .links');
	Array.prototype.forEach.call(links, function(el, i) {
		var article = el.parentNode.parentNode;
		var more = d.createElement('button');
		
		more.innerHTML = 'Read case study';
		el.appendChild(more);
		
		article.className = 'compact hidden';
		
		more.addEventListener('click', function (event) {
			article.className = 'hidden';
			more.parentNode.removeChild(more);
			
			setTimeout(function () {
				article.className = '';
				var rect = article.getBoundingClientRect();
				scrollTo(d.body, rect.top + d.body.scrollTop - 29, 500);
			}, 100);
		}, true);
	});
	
	/*
		ScrollTo
	*/
	function scrollTo(element, to, duration) {
		var start = element.scrollTop,
			change = to - start,
			currentTime = 0,
			increment = 1000/60;
			
		var animateScroll = function() {
			currentTime += increment;
			var val = Math.easeInOutQuad(currentTime, start, change, duration);
			element.scrollTop = val;
			
			if (currentTime < duration) {
				animate(animateScroll);
			}
		};
		animateScroll();
	}
	
	Math.easeInOutQuad = function (t, b, c, d) {
	  t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	var animate = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		// IE Fallback, you can even fallback to onscroll
		function(callback){ window.setTimeout(callback, 1000/60); };

})(window, document, console);