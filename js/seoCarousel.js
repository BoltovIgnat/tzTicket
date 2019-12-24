/*global Sly */
jQuery(function ($) {
	'use strict';
	document.getElementsByTagName('html')[0].className += ' ' +
		(~window.navigator.userAgent.indexOf('MSIE') ? 'ie' : 'no-ie');

	// ==========================================================================
	//   Header example
	// ==========================================================================
	if ($(window).width() > 760) {
	    // do something for small screens
	
		var $myCarousel = $('#seocar');
		var $frame = $myCarousel.find('.frame'); window.frr = $frame;
		var sly = new Sly($frame, {
			horizontal: 1,
			itemNav: 'forceCentered',
			activateMiddle: 1,
			smart: 1,
			activateOn: 'click',
			mouseDragging: 0,
			touchDragging: 0,
			releaseSwing: 1,
			startAt: 1,
			scrollSource: $myCarousel.find(".no"),
			scrollBar: false,
			scrollBy: 1,
			pagesBar: $myCarousel.find('.pages'),
			activatePageOn: 'click',
			speed: 500,
			moveBy: 600,
			elasticBounds: 0,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,
			activeClass:   'bespoke-active',
			next: $myCarousel.find('.next'),
		},
		{
			load: function () {
				
			},
		    active: [
		        function (itemIndex ) {

		        	var $activeEl = $("#seocar ul .bespoke-active");
					//активный
						$activeEl.siblings().addClass("bespoke-inactive");
						$activeEl.removeClass("bespoke-inactive");
						

					//неактивные перед активным + index
						var prevAll = $activeEl.prevAll();
						prevAll.each(function(index){
							$(this).attr('beforeid', index);
							$activeEl.attr("afterid" , '');
							$(this).addClass("bespoke-before");
							$(this).removeClass("bespoke-after");
						});
						
						$activeEl.prevAll().attr("afterid" , '');
						
						

					//main delete

						$activeEl.removeClass("bespoke-before");	
						$activeEl.removeClass("bespoke-after");	
						$activeEl.attr("beforeid" , '');
						$activeEl.attr("afterid" , '');
						
					//неактивные после активного + index
						var nextAll = $activeEl.nextAll();
						nextAll.each(function(index){
							$(this).attr('afterid', index);
							$(this).attr("beforeid" , '');
							$(this).addClass("bespoke-after");
							$(this).removeClass("bespoke-before");

						});
					//seonav
					var $currentIndex = $("#seocar ul li").index($activeEl);	
					$(".seonav").find("[dataseo='" + $currentIndex + "']").addClass("active");
					$(".seonav").find("[dataseo='" + $currentIndex + "']").siblings().removeClass("active");
					$(".seonav").find("[dataseo='" + $currentIndex + "']").prevAll().addClass("done");
					$(".seonav").find("[dataseo='" + $currentIndex + "']").nextAll().removeClass("done");
					

		        }
		    ]
		}).init();
	} //endif

	//seoNav
	$(".seonav li").click(function(){
		var $clickedIndex = $(this).attr("dataseo");
		 sly.activate($clickedIndex); // Insert new item at the beginning of SLIDEE
	})

	//PrevNext
	$(".js_seoNext").click(function(){
		sly.next();
	})
	$(".js_seoPrev").click(function(){
		sly.prev();
	})

	

	
});