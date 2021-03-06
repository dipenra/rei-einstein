/**
 * Redirect Library
 * Takes the User's Intent and Redirects the User to the Proper place
 */
var ReiEinstein = ReiEinstein || {};

ReiEinstein.RedirectPage = function() {
	var intentMap = {
		"shopping" : "https://www.rei.com/search?q=",
		"hiking project app": "https://www.hikingproject.com/",
		"mtb project app": "https://www.mtbproject.com/",
		"mountain project app": "https://www.mountainproject.com/",
		"trail run project app": "https://www.trailrunproject.com/",
		"powder project app": "https://www.powderproject.com/",
		"national parks app": "https://www.rei.com/adventures"
	};

	/**
	 * redirect
	 * redirects user to the proper website by 
	 * looking at their intent
	 * @param {STRING} intent 
	 * @param {STRING} search
	 */
	function redirect(intent, search) {
		var intent_l = intent.toLowerCase();
		switch (intent_l) {
			case 'shopping':
				window.location.replace(intentMap[intent_l] + search);
			break;
			default:
				window.location.replace(intentMap[intent_l]);
			break;
		}
		loadinIframe(url);
	}
	
	return {
		redirect: redirect
	};
};