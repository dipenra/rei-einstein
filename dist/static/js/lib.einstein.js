var ReiEinstein = ReiEinstein || {};

ReiEinstein.Einstein = function() {
	var config = {
		token: "NKID7QKX3SWVZOR2URQQX43KPT7F43OIZA7WGPZ2XPSJ5UQ6DHL4VTS4V2SXENVL6PUC73VKZ7ZP6YY4CR5APHIUN3QWUT2PGTOPW5Q",
		modelId: "WIBWTEB6SLJLXVINIHHWYGWSMQ"
	};

	function getUserIntent(search) {
		//var df = $.Deferred();
		var url = "https://api.einstein.ai/v2/language/intent";
		var postData = {
			modelId: config.modelId,
			document: search
		};

		function setHeader(xhr) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + config.token);
			xhr.setRequestHeader('Content-Type', 'multipart/form-data');
			xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
			xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhot:3000');
		}

		$.ajax({
			url: url,
			method: 'POST',
			data: postData,
			beforeSend: setHeader,
			success: function(data){
			  console.log('succes: ' + data);
			}
		});
		//var Ajax = new ReiEinstein.Ajax();

		//return df.promise();
	}

	return {
		getUserIntent: getUserIntent
	};
};