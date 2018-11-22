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
	 */
	function redirect(intent) {
		var intent_l = intent.lowerCase();
		switch (intent_l) {
			case 'shopping':
				window.href = intentMap[intent_l] + intent;
			break;
			default:
				window.href = intentMap[intent_l];
			break;
		}
	}

	return {
		redirect: redirect
	};
};