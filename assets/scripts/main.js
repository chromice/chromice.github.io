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
	
	function scrollRelativeLinks(event) {
		var href = this.href;
		var section = d.getElementById(href.replace(/.*?\#(.+)/, '$1'));
		
		if (!history.pushState || !section) {
			return;
		}
		
		event.preventDefault();
		
		var rect = section.getBoundingClientRect();
		var root = /firefox/i.test(navigator.userAgent) ? d.documentElement : d.body;
		var amount = rect.top + root.scrollTop;
		
		scrollTo(root, amount, amount/7);
		history.pushState(null, '', href);
	}
	
	var as = d.getElementsByTagName('a');
	
	for (var i = 0; i < as.length; i++) {
		as[i].addEventListener('click', trackOutBoundClicks, true);
		as[i].addEventListener('click', scrollRelativeLinks, true);
	}
	
	// Quit execution
	if (!d.querySelectorAll) return;
	
	/*
		Video player
	*/
	var videos = d.getElementsByTagName('video');
	Array.prototype.forEach.call(videos, function(v, i) {
		var container = v.parentNode.parentNode;
		var button = d.createElement('span');
		button.className = 'status';
		v.parentNode.appendChild(button);
		
		v.addEventListener('click', function (e) {
			if (v.paused) {
				v.play();
			} else {
				v.pause();
				v.currentTime = 0;
			}
		});
		v.addEventListener('play', function () {
			addClass(container, 'playing');
			
			if (ga) {
				ga('send', 'event', {
					eventCategory: 'Video',
					eventAction: 'play',
					eventLabel: v.title,
					transport: 'beacon'
				});
			}
		});
		v.addEventListener('pause', function () {
			removeClass(container, 'playing');
			
			if (ga) {
				ga('send', 'event', {
					eventCategory: 'Video',
					eventAction: 'pause',
					eventLabel: v.title,
					transport: 'beacon'
				});
			}
			
		});
	});
	
	/*
		Hide case study body
	*/
	
	// Find case study screens...
	var links = d.querySelectorAll('#recent-projects article.expandable .links');
	Array.prototype.forEach.call(links, function(el, i) {
		var article = el.parentNode.parentNode;
		var more = d.createElement('button');
		
		more.innerHTML = 'Read the case study';
		el.appendChild(more);
		
		article.className = 'compact hidden';
		
		more.addEventListener('click', function (event) {
			article.className = 'hidden';
			more.parentNode.removeChild(more);
			
			setTimeout(function () {
				article.className = '';
				var rect = article.getBoundingClientRect();
				var root = /firefox/i.test(navigator.userAgent) ? d.documentElement : d.body;
				scrollTo(root, rect.top + root.scrollTop - 29, 500);
			}, 100);
			
			if (!ga) return;
			
			ga('send', 'event', {
				eventCategory: 'Inbound Link',
				eventAction: 'click',
				eventLabel: '#' + article.getAttribute('id'),
				transport: 'beacon'
			});
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

	/*
		DOM functions
	*/
	function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}
	function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
})(window, document, console);