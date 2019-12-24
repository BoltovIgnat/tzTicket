
var controllerTLNo = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onLeave",  reverse:true}});



jQuery(document).ready(function($) {

	// if ($(".arena-table-box").length){
	// 	$(".arena-table-box select").select2({
	// 		minimumResultsForSearch: Infinity
	// 	});
	// }

	// mobile menu btn
	// var $naviMobile = $(".mobile-header")
	// $(".mobile-menu-btn").click(function(){
 //        $(this).toggleClass("mobile-btn-open")
 //        $naviMobile.fadeToggle("fast");  
 //    })


	// mobile lang toggle
	if ($(".mobile-sub-nav .current-lang").length){
		$(".mobile-sub-nav .current-lang").click(function(e){
			$(this).toggleClass("active");
			$(".other-langs-list").slideToggle(200);
			$(".city-list").slideUp(400);

		});
	}

	// city list toggle
	$(".city-box>a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(".city-list").slideToggle(400);
		$(".other-langs-list").slideUp(200);

	});

	// sub-header-menu toggle
	if ($(".sub-header-menu").length){
		$(".sub-header-menu li").click(function(e){
			e.preventDefault();
			var href = $(this).attr('data-submenu');
			console.log("#"+href);
			$(this).siblings().removeClass("active");
			$(this).toggleClass("active");
			$("#"+href).siblings().removeClass("active");
			$("#"+href).toggleClass('active');
		});
	}

	// sub-header-mobile toggle
	if ($(".sub-menu").length){
		$(".sub-menu-toggle").click(function(e){
			$(this).toggleClass('active');
			$(".sub-menu").slideToggle(400);
		});
		$(".sub-menu .sub-menu-link div").click(function(e){
			e.preventDefault();
			var href = $(this).parent().attr('data-submenu');
			console.log("#"+href);
			$(this).parent().siblings().removeClass("active");
			$(this).parent().toggleClass("active");
			$(this).parent().siblings().find(".submenu-mobile").slideUp("active");
			$("#"+href).toggleClass('active').slideToggle(400);
		});
	}

	$('.big-search-form input').on('keyup',function(e){
		var len = $(this).val().length;
		if(len > 1){
			$(this).closest(".big-search-form").closest(".fixed-top-index").addClass("overtop");
			$(this).closest(".big-search-form").find(".js_searchResults").fadeIn("0").addClass("active");
			$(this).closest(".big-search-form").find(".btn-reset-search").fadeIn("fast");
			if($(window).width() > 767) {
				if ($(".calendar-toggle").hasClass("active")){
					$(this).closest(".big-search-form").find(".js_searchResults").addClass("with-calendar");
				}
				if ($(this).closest(".index-top-screen").length){
					$("body, html").addClass("noscroll");
				}
			}
			if($(window).width() < 768) {
				$("#calendar-wrap-index").slideUp(0);
				$(".calendar-toggle").removeClass("active");
				$(".fixed-top-index").removeClass("calendar-open");
				// $(".fixed-top-index .big-search-form").removeClass("sliding");
			}
		}
		else{
			$(this).closest(".big-search-form").find(".js_searchResults").fadeOut("fast").removeClass("active").removeClass("with-calendar");
			$(this).closest(".big-search-form").find(".btn-reset-search").fadeOut("fast");
			$(this).closest(".big-search-form").closest(".fixed-top-index").removeClass("overtop");
			if ($(this).closest(".index-top-screen").length){
				$("body, html").removeClass("noscroll");
			}
		}
	}); 
	// close found window on click document
	// $("body").click(function(){
	// 	$(".js_searchResults").fadeOut("fast");
	// 	$(".big-search-form").find(".btn-reset-search").fadeOut("fast");
	// });
	$(".btn-reset-search").click(function(){
		$(this).fadeOut("fast");
		$(this).closest(".big-search-form").find(".js_searchResults").fadeOut("fast").removeClass("active").removeClass("with-calendar");;
		$(this).closest(".big-search-form").find("input").val("");
		setTimeout(function() {
			$(".fixed-top-index").removeClass("overtop");
		}, 0);
		if ($(this).closest(".index-top-screen").length){
			$("body, html").removeClass("noscroll");
		}
	})
	$(".big-search-form").click(function(e){
		e.stopPropagation();
	});

		//masonry items-list
	var masonryContainer = document.getElementById('masonry');
	if (masonryContainer){
		$('.events-list').imagesLoaded( function() {
			var msnry = new Masonry( masonryContainer, {
				itemSelector: '.item',
			});
		});
	}

	//masonry faq
	var masonryContainerFaq = document.getElementById('faq-list');
	var msnryFaq;
	if (masonryContainerFaq){
		var msnryFaq = new Masonry( masonryContainerFaq, {
			itemSelector: '.item',
		   
		});
	}

	// 
	//MODAL BOXES
	//

	//show modal
	function showModal($modal){
		$modal.toggleClass("modal-opened");
		if($modal.attr("data-fade")){
			$modal.stop().show(0);
			$("body").addClass("faded");
		}
	};
	//hide modal 
	function hideModal($modal){
		$modal.removeClass("modal-opened");
		if($modal.attr("data-fade")){
			$modal.fadeOut("fast");
			$("body").removeClass("faded");

		}
	};

	// modal-btn-open
	$(".js_openModal").click(function(e){
		e.preventDefault();
		//определяем назначение блока (который открывать)
		var modalDestination = $(this).attr("data-modal");
		var $modalObj = $(".modal-box[data-modal='" + modalDestination + "']");

		//сначала остальные попапы
		$(".modal-link-active").not(this).removeClass("modal-link-active"); 
		$(".modal-box").not($modalObj).each(function(){
			hideModal($(this));
		 });

		//добавляем активный класс ссылке которая открыла окно
		$(this).toggleClass("modal-link-active");
		//запускаем фукнцию открытия модального окна
		showModal($modalObj);
		$("body, html").addClass("noscroll");
	})

	//modal-btn-close
	$(".js_closeModal").click(function(){
		var modalObj = $(this).closest(".modal-box")
		var modallinkData = modalObj.attr("data-modal");
		var modalLink = $(".js_openModal[data-modal='" + modallinkData + "']");
		modalLink.removeClass("modal-link-active");
		hideModal(modalObj);
		$("body, html").removeClass("noscroll");
	});


	//tooltips modification  based on modal script (Тултипы могут быть где угодно в коде, главное data-tooltip)
	// tooltip hover
	$(".js_showTooltip").hover(function(){
		var modalDestination = $(this).attr("data-tooltip");
		var $modalObj = $(".tooltip-box[data-tooltip='" + modalDestination + "']");
		$(".tooltip-box").not($modalObj).each(function(){
			hideModal($(this));
		 });
		showModal($modalObj);
	})




	// index-header-show
	var $indexHeader = $(".index-header");
	var animateElem = $(".index-header");
	var scene = new ScrollMagic.Scene({triggerElement: ".js_headTrigger", duration: 0, offset: -170})
	.on("enter", function () {
		$indexHeader.addClass("fixed-header").removeClass("header-transparent");
		$(".fixed-top-index").removeClass("calendar-open").removeClass("overtop");
		$(".calendar-toggle").removeClass("active");
		$("#calendar-wrap-index").removeClass("active").slideUp(0);
		$(".js_searchResults").fadeOut("fast").removeClass("active").removeClass("with-calendar");
		$(".sub-header-nav").addClass('fixed');
		$(".sub-header-mobile").addClass('fixed');
	})
	.on("leave", function () {
		$indexHeader.removeClass("fixed-header").addClass("header-transparent");
		$(".sub-header-nav").removeClass('fixed');
		$(".sub-header-mobile").removeClass('fixed');
		//закрываем модальное окно subnav side (т.к не смотрится)
		$(".head-menu-btn").removeClass("modal-link-active");
		hideModal($(".sub-nav-side"));
	})
	.addTo(controllerTLNo);


	// rubrics sub-header fixed
	// var animateElem = $(".rubrics-header")
	var scene3 = new ScrollMagic.Scene({triggerElement: ".js_headTrigger", duration: 0, offset: -140})
	.on("enter", function () {
		$(".sub-header-nav").addClass('fixed');
		$(".sub-header-mobile").addClass('fixed');
		$(".rubrics-tizer").addClass('pushed');
	})
	.on("leave", function () {
		$(".sub-header-nav").removeClass('fixed');
		$(".sub-header-mobile").removeClass('fixed');
		$(".rubrics-tizer").removeClass('pushed');
		//закрываем модальное окно subnav side (т.к не смотрится)
		$(".head-menu-btn").removeClass("modal-link-active");
		hideModal($(".sub-nav-side"));
	})
	.addTo(controllerTLNo);


	//update-scrollmagic 
	 controllerTLNo.update();

	//increment value plus minus btn
	// This button will increment the value
	$('.qtyplus').click(function(e){
		e.preventDefault();
		var inputField = $(this).closest(".number-box").find('.js_numInput');
		var currentVal = parseInt(inputField.val());
		if (!isNaN(currentVal)) {
			inputField.val(currentVal + 1);
		} else {
			inputField.val(0);
		}
	});
	// This button will decrement the value till 0
	$(".qtyminus").click(function(e) {
		e.preventDefault();
		var inputField = $(this).closest(".number-box").find('.js_numInput');
		var currentVal = parseInt(inputField.val());
		if (!isNaN(currentVal) && currentVal > 0) {
			inputField.val(currentVal - 1);
		} else {
			inputField.val(0);
		}
	});


	// range slider все настройки делаем в хтмл с помощью data атрибутов
	var $range = $("#priceRange");
	var $priceInput = $("#priceSlided");
	if ( $( "#priceRange" ).length ) {
		$range.ionRangeSlider({
			type: "single",
		});

		$range.on("change", function () {
			var $this = $(this),
				from = $this.data("from");
			$priceInput.val(from);
		});
		var rSlider = $range.data("ionRangeSlider");
		// $priceInput.keyup(function(){
		//     var priceInputVal = $(this).val();
		//     rSlider.update({
		//         from:priceInputVal
		//     })
		// })
	}
	if ($('#filterPriceRange').length){
		$('#filterPriceRange').ionRangeSlider({
			type: "double",
		});
	}
   
	 
	// change password test
	$(".js_btnChangePass").click(function(){
		$(this).closest(".modal-holder").find(".success-box").fadeToggle("fast");
	});


	// cabinet-tables collapse and show
	$btnOpenInsideTable = $(".js_btnInsideTableShow");
	$btnCollapseInsideTable = $(".js_btnInsideTableCollapse");
	$btnOpenInsideTable.click(function(){
		$(this).closest(".table-row").toggleClass("row-opened");
		$(this).closest(".table-row").find(".inside-table").slideToggle("fast");
	})
	$btnCollapseInsideTable.click(function(){
		$(this).closest(".inside-table").slideUp("fast");
		$(this).closest(".table-row").removeClass("row-opened");
	})

	// table-predlog-tooltips
	$(".js_tableShowTooltip").hover(function(){
		$(this).find(".js_tableTooltip").stop().fadeToggle("fast")
	})


	// popover bootstrap

	if ( $( ".js_popover" ).length ) {
		 $('.js_popover').popover({
			container:'body'
		})
	}


	// custom file input

	if ( $( ".inputFile" ).length ) {
		$('.inputFile').filer(); 
	}

	//
	// mobile-search-founds   
	//
	$('.mobile-live-search input').on('keyup',function(e){
		var len = $(this).val().length;
		if(len > 1){
			$(".js_mobileSearchResults").slideDown("fast");
			$(".mobile-live-search button").fadeIn("fast");
		}
		else{
			$(".js_mobileSearchResults").slideUp("fast");
			$(".mobile-live-search button").fadeOut("fast");
		}
	}); 
	// close found window on click document
	$("body").click(function(){
		$(".js_mobileSearchResults").slideUp("fast")
	})

	// cabinet-datepicker
	if ( $( ".cabinet-dates-sidebar" ).length ) {
		$('.cabinet-dates-sidebar .date-box').daterangepicker({
			"autoApply": true,
			"locale": {
				"format": "MM/DD/YYYY",
				"separator": " - ",
				"applyLabel": "Apply",
				"cancelLabel": "Cancel",
				"fromLabel": "From",
				"toLabel": "To",
				"customRangeLabel": "Custom",
				"weekLabel": "Н",
				"daysOfWeek": [
					"Вс",
					"Пн",
					"Вт",
					"Ср",
					"Чт",
					"Пт",
					"Сб"
				],
				"monthNames": [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь"
				],
				"firstDay": 1
			},
			
		}, 
		function(start, end, label) {
			// just-show-date-from
			$(".period-date-from strong").text(start.format('DD'));
			$(".period-date-from span").text(start.format('MMMM'));
			$(".period-date-from em").text(start.format('YYYY'));

			//just-show-date-to
			$(".period-date-to strong").text(end.format('DD'));
			$(".period-date-to span").text(end.format('MMMM'));
			$(".period-date-to em").text(end.format('YYYY'));

			//save to hidden-inputs-values
			$("#periodFromInput").val(start.format('YYYY-MM-DD'))
			$("#periodToInput").val(end.format('YYYY-MM-DD'))

			//help for Programmer = > 
			//console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
		});
	}
	// calendar-datepicker end


	// pickmeup calendar
	// $('.other-filter-btn').click(function(e){
	// 	$('.datepicker-wrap').toggleClass('hidden')
	// });
	// if ($('.datepicker').length){
	// 	var currentDate = new Date();
	// 	var flatContainer = $('.datepicker');
	// 	flatContainer.pickmeup({
	// 		flat: true,
	// 		date: currentDate,
	// 		mode: 'single',
	// 		position: 'bottom',
	// 		trigger_event: 'click',
	// 		hide_on_select: true,
	// 		title_format: 'B Y',
	// 		format: 'd B Y',
	// 		locale: {
	// 			days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
	// 			daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	// 			daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	// 			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	// 			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	// 		},
			
	// 	});
	// }

	if ($('.calendar').length){
		var currentDate = new Date();
		var dateContainer = $('.calendar');
		dateContainer.pickmeup({
			flat: true,
			date: currentDate,
			mode : 'single',
			position: 'bottom',
			trigger_event: 'click',
			hide_on_select: true,
			title_format: 'B Y',
			format: 'd B Y',
			separator: '/',
			locale: {
				days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
				daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
				monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
			},
			render : function (date) {
				if (date < currentDate) {
					return {disabled : true, class_name : 'date-in-past'};
				}
				return {};
			},
			change: function (date) {
				$(".calendar-options input").prop("checked", false);
				dateContainer.data("pickmeup-options").format = "d B Y";
				var data = dateContainer.pickmeup('get_date', true);
				if (dateContainer.data('pickmeup-options').mode === 'range' && (data.length>1)) {
					dateContainer.data("pickmeup-options").mode = "single";
					dateContainer.pickmeup('set_date', data[1]).pickmeup('update');
				}
			},
		});
	}

	$(".calendar-options input").each(function(){
		$(this).on('change', function(){
			if ($(this).is(":checked")){
				var curr = new Date;
				var date;
				if ($(this).attr("id")=='this-week'){
					var day1=new Date(curr);
					var day2 = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
					date=[day1, day2];
				}

				if ($(this).attr("id")=='this-weekend'){
					var day1 = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
					var day2 = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
					date=[day1, day2];
				}

				if($(this).attr("id")=='next-week'){
					var day1 = new Date(curr.setDate(curr.getDate() - curr.getDay()+8));
					var day2 = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
					date=[day1, day2];
				}
				dateContainer.data("pickmeup-options").mode = "range";
				dateContainer.data("pickmeup-options").format = "d/m/y";
				dateContainer.pickmeup('set_date', date);
				dateContainer.pickmeup('update');
			}
		});
	});

	// pickmeup calendar end


	// calendar toggle index
	$("#calendar-toggle-index").click(function(e){
		$(this).toggleClass("active");
		$(this).closest(".big-search-form").closest(".fixed-top-index").toggleClass("calendar-open");
		$("#calendar-wrap-index").slideToggle(0).toggleClass("active");
		if($(window).width() > 767) {
			if ($(".big-search-results").hasClass("active with-calendar")){
					console.log('yes')
					$(".big-search-results").removeClass("with-calendar");
			} else {
				if ($(".big-search-results").hasClass("active")){
					$(".big-search-results").addClass("with-calendar");
					console.log('no')

				}
			}
			// $(".main-heading").toggleClass("text-right");
			$(window).scroll(function(e){
				if ($(this).scrollTop() > 293){
					// dateContainer.pickmeup('hide');
					$(".fixed-top-index").removeClass("calendar-open");
					$("#calendar-toggle-index").removeClass("active");
					$("#calendar-wrap-index").slideUp(0).removeClass("active");
				}
			})
		}
		if($(window).width() < 767) {
			$(".big-search-results").fadeOut("fast");
			// $(".fixed-top-index .big-search-form").toggleClass("sliding");
			if ($(".fixed-top-index").hasClass("overtop")){
				$(".fixed-top-index").removeClass("overtop");
				// $(this).closest(".big-search-form").find(".btn-reset-search").fadeOut("fast");
			}
		}
	});


	// calendar toggle rubrics
	$("#calendar-toggle-rubrics").click(function(e){
		$(this).toggleClass("active");
		$("#calendar-wrap-rubrics").slideToggle(0).toggleClass("active");
		$(this).closest(".rubrics-tizer").toggleClass("calendar-open");
	});

	// mobile calendar toggle rubrics 
	$("#mobile-calendar-toggle-rubrics").click(function(e){
		$(this).toggleClass("active");
		$("#calendar-wrap-rubrics").slideToggle(0).toggleClass("active");
		$(this).closest(".rubrics-tizer").toggleClass("calendar-open");
	});

	// scroll-results
	if ($(".scrolled-results").length){
		$(".scrolled-results").mCustomScrollbar({
			theme:"dark-thin",
			axis:"y",
			autoDraggerLength:true,
			autoExpandScrollbar:true,
			mouseWheel:{ preventDefault: true },
			documentTouchScroll:false
		});
		
	}
	// scroll-results
	if ($(".scrolled-downloads").length){
		$(".scrolled-downloads").mCustomScrollbar({
			theme:"dark-thin",
			axis:"y",
			autoDraggerLength:false,
			autoExpandScrollbar:true,
			mouseWheel:{ preventDefault: true },
			documentTouchScroll:false
		});
	}


	//scroll city-list
	if ($(".city-list").length){
		$(".city-list").mCustomScrollbar({
			theme:"dark-thin",
			axis:"y",
			autoDraggerLength:true,
			autoExpandScrollbar:false,
			autoHideScrollbar: true, 
			mouseWheel:{ preventDefault: true },
			documentTouchScroll:false,
			alwaysShowScrollbar: 0,
		});
	}

	//scroll sub-nav-side
	$(".sub-nav-side").mCustomScrollbar({
		theme:"dark-thin",
		axis:"y",
		autoDraggerLength:true,
		autoExpandScrollbar:false,
		autoHideScrollbar: true, 
		mouseWheel:{ preventDefault: true },
		documentTouchScroll:false,
		alwaysShowScrollbar: 0,
	});

		//scroll login-modal
	$(".login-modal").mCustomScrollbar({
		theme:"dark-thin",
		axis:"y",
		autoDraggerLength:true,
		autoExpandScrollbar:false,
		autoHideScrollbar: true, 
		mouseWheel:{ preventDefault: true },
		documentTouchScroll:false,
		alwaysShowScrollbar: 0,
		setLeft:0,
	});

		//scroll view-table
	$(".view-table-scroll").mCustomScrollbar({
		theme:"dark-thin",
		axis:"y",
		autoDraggerLength:true,
		autoExpandScrollbar:false,
		autoHideScrollbar: true, 
		mouseWheel:{ preventDefault: true },
		documentTouchScroll:false,
		alwaysShowScrollbar: 1,
		setLeft:0,
	});

	$(".sub-header-mobile .sub-menu").mCustomScrollbar({
		theme:"dark-thin",
		axis:"y",
		autoDraggerLength:true,
		autoExpandScrollbar:false,
		autoHideScrollbar: false, 
		mouseWheel:{ preventDefault: true },
		documentTouchScroll:false,
		alwaysShowScrollbar: 1,
		setLeft:0,
	});
	
	//collapse ticket-titles
	if ($(".ticket-titles-collapse").length){
		$(".ticket-titles-col .toggle-link").click(function(e){
			if ($(this).hasClass("open")){
				$(this).text("<< свернуть");
			} else {
				$(this).text("подробнее >>")
			}
			$(this).toggleClass("open");
			$(".ticket-titles-collapse").toggleClass("active");
		});
	}


	// collapse-box toggle
	$(".toggle-link").click(function(){
		if ($(this).hasClass("open")){
				$(this).text("подробнее >>")
				$(this).removeClass("open");
			} else {
				$(this).text("<< свернуть");
				$(this).addClass("open");
			}
		$(this).parent().find(".collapse-box").slideToggle(0);
	});

	// close popup-info
	$(".popup-info .popup-info-close").click(function(e){
		$(this).closest(".popup-info").removeClass("open")
	});

	// test event-card image size 
	$(".event-card").each(function(e){
		var height = $(this).find(".event-image span").attr("style")
		console.log(height)
	})


});





