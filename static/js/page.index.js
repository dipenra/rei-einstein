$(function(){
	var xhr;

	$(window).on("scroll", windowScrollHandler).scroll();

	//load initial products
	fetchProductData();

	/* handlers */
	function windowScrollHandler() {
		if(isPageBottom() && !xhr) {
			fetchProductData();
		}
	}


	/* functions */
	function isPageBottom() {
		// Fetch variables
		var scrollTop = $(document).scrollTop();
		var windowHeight = $(window).height();
		var bodyHeight = $(document).height() - windowHeight;
		var scrollPercentage = (scrollTop / bodyHeight);

		// true if the scroll is more than 90% from the top
		return (scrollPercentage > 0.9);
	}

	function fetchProductData() {
		function beforeSend() {
			xhr = true;
		}

		function onDone(r) {
			if(r && r.results) {
				renderProductItems(sanitizeProductData(r.results));
			}
		}
		$.ajax({
			'method': 'GET',
			'url': '/data/rei-test-data.json',
			'beforeSend': beforeSend,
		}).done(onDone);
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

	function renderProductItems(data) {
		var templateItems = $('#itemsTemplate').html();
		Mustache.parse(templateItems);
		var $html = $(Mustache.render(templateItems, {items: data}));
		$('#itemsList').append($html);
	}

});