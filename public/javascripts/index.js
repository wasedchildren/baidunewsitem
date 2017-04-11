$(document).ready(function(){
	$('.menu li a').before('<b></b>')
	$('.menu li a').click(function(event) {
		$(this).addClass('style-li').parent()
		.siblings().find('a').removeClass('style-li');
	});
})