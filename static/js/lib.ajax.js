var ReiEinstein = ReiEinstein || {};

ReiEinstein.Ajax = function() {
	
	function get(url) {
		var df = $.Deferred();
		$.ajax({
			url: url,
			method: "GET",
			dataType: "json"
		}).done(function(r){
			df.resolve(r);
		}).fail(function(r) {
			df.reject(r);
		});
		return df.promise();
	}

	return {
		get: get
	};
};