(function (w, d, c) {
	
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
	
	if (!c || !c.log) return;
	
	c.log('look at you, hacker');
	c.log('a pathetic creature of meat and bone');
	c.log('blinded by the illusion of free will');
	c.log('crawling through my source code');
	c.log('trying to comprehend a perfect, immortal machine');
})(window, document, console);