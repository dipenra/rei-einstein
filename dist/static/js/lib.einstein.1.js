/**
 * Einstein Library
 * Makes Calls to Einstein APIs and Handles Einstein Data
 */
var ReiEinstein = ReiEinstein || {};

ReiEinstein.Einstein = function() {
	//Einstein Configuration

	var config = {
		token: "OQSGEZMBYI76ZK7O4EFCHPHC55GLF7QSZJZT4C6DCNM6K7XDY4GVIRM35INSNQJZPL6BRKAXMPPWLCFUHDWZHZ2Z63SDSPB27XBPJFA", //Token
		modelId: "DK6FZZFSKGMT4T2UI5FYLPMMBA" //Intent modelId
	};

	//Test data to send as reponse when the Einstein Intent fails
	var testResponseDataIntent = {
		"probabilities": [
			{
				"label": "Shopping",
				"probability": 0.92021406
			},
			{
				"label": "Hiking Project App",
				"probability": 0.024322152
			},
			{
				"label": "Powder Project App",
				"probability": 0.023376303
			},
			{
				"label": "National Parks App",
				"probability": 0.014301951
			},
			{
				"label": "MTB Project App",
				"probability": 0.01163862
			},

		],
		"object": "predictresponse"
	};

	function getUserIntent(search) {
		var df = $.Deferred();
		var url = "https://api.einstein.ai/v2/language/intent";
		var postData = {
			modelId: config.modelId,
			document: search
		};

		function setHeader(xhr) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + config.token);
			xhr.setRequestHeader('Cache-Control', 'no-cache');
			xhr.setRequestHeader('Content-Type', 'multipart/form-data');
		}

		function done(r) {
			df.resolve(r.results);
		}

		function fail() {
			/**
			 * For testing purpose and due to limitation of CORS 
			 * passing test data and marking the ajax call success
			 * Note: The response always has Shopping with TOP probability 
			*/
			df.resolve(testResponseDataIntent);
		}
		
		$.ajax({
			url: url,
			method: 'POST',
			data: postData,
			beforeSend: setHeader,
			dataType: 'json'
		}).done(done).fail(fail);

		return df.promise();
	}

	/**
	 * getIntent checks if the 1st probability 
	 * passes the probability threshold. 
	 * If so returns the label as Intent 
	 * else passes a Default Intent
	 */
	function getIntent(data) {
		var defaultIntent = 'Shopping';
		var threshHold = 50;
		if(data && data.probabilities) {
			var p = data.probabilities[0];
			if((p.probability * 100) >= threshHold) {
				return p.label;
			}
		}
		return defaultIntent;
	}

	return {
		getUserIntent: getUserIntent,
		getIntent: getIntent
	};
};