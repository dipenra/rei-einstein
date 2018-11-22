var ReiEinstein = ReiEinstein || {};

ReiEinstein.Products = function() {

	function fetchProducts(page) {
		var df = $.Deferred();
		var url = "/data/rei-test-data-" + page + ".json";
		var Ajax = new ReiEinstein.Ajax();

		function done(r) {
			if(r && r.results) {
				sanitizeProductData(r.results);
				df.resolve(sanitizeProductData(r.results));
			} else {
				df.reject();
			}
		}

		function fail(r) {
			df.reject(r);
		}
		
		Ajax.get(url).done(done).fail(fail);
		return df.promise();
	}

	function sanitizeProductData(data) {
		return $.map(data, function(obj){
			var totalRatingStars = 5;
			var reiDomain = "https://www.rei.com/";
			var priceDisplay = obj.displayPrice.priceDisplay;
			var rating = obj.rating * (100/totalRatingStars);
			return {
				title: obj.title,
				brand: obj.brand,
				link: reiDomain + obj.link,
				thumbnailImageLink : obj.thumbnailImageLink,
				reviewCount: (obj.reviewCount) ? obj.reviewCount : 0,
				priceType: priceDisplay.priceDisplayType.toLowerCase(),
				price: (priceDisplay.price) ? priceDisplay.price : priceDisplay.compareAtPrice,
				salePrice: priceDisplay.salePrice,
				savingsPercent: priceDisplay.savingsPercent,
				ratingPercent: rating
			};

		});
	}

	return {
		fetchProducts: fetchProducts
	};
};