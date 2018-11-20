$(function(){
	$(window).on('scroll', function(){
		if( $(window).scrollTop() > $(document).height() - $(window).height() ) {
			console.log('end');
			alert('sds');
		}
	}).scroll();
});