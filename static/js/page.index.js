$(function(){
	//page data that are local to this page
	var pageData = {
		xhr: false,
		pagination: 1,
		endofrecord: false, //If xhr status is 404 set this to true, since there are no other test data
	};

	$(window).on("scroll", windowScrollHandler).scroll();
	$("header").on("submit", "form[name='search-form']", submitSearchFormHandler);
	
	//load initial products
	fetchProductData();

	/* handlers */
	function windowScrollHandler() {
		if(isPageBottom() && !pageData.xhr) {
			fetchProductData();
		}
	}

	function submitSearchFormHandler(e) {
		e.preventDefault();
		
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
		if(pageData.endofrecord) return;

		var Products = new ReiEinstein.Products();
		function done(r) {
			renderProductItems(r);
			pageData.pagination++;
			pageData.xhr = false;
		}
		function fail(r) {
			if(r && typeof r.status != "undefined") {
				if(r.status==404) {
					pageData.endofrecord = true;
				}
			}
			pageData.xhr = false;
		}
		pageData.xhr = true;
		Products.fetchProducts(pageData.pagination).done(done).fail(fail);
	}

	function renderProductItems(data) {
		var templateItems = $("#itemsTemplate").html();
		Mustache.parse(templateItems);
		var $html = $(Mustache.render(templateItems, {items: data}));
		$("#itemsList").append($html);
	}

});