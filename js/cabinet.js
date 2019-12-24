jQuery(document).ready(function($) {

	//cabinet select-custom
	// var data = [
	// 	'Первая лига чемпионата большой заголовок мероприятия',
	// 	'Первая лига чемпионата большой заголовок мероприятия',
	// 	'лига чемпионата большой заголовок мероприятия',
	// 	'большой заголовок мероприятия',
	// 	'Еще большой заголовок мероприятия',
	// 	'Первая лига чемпионата большой заголовок мероприятия',
	// 	'Первая лига чемпионата большой заголовок мероприятия',
	// 	'Первая лига чемпионата большой заголовок мероприятия',
	// 	'Первая лига чемпионата большой заголовок мероприятия'
	// ]
	// $('.cabinet-new-table .event-select').each(function(){
	// 	$(this).select2({
	// 		data: data
	// 	});
	// });
	// $(window).on('scroll',  function (e) {
	// 	 $('.cabinet-new-table .event-select').select2('close');
	// });


	//test dropdown-input toggle
	$('.dropdown-input input').on('keyup',function(e){
		var len = $(this).val().length;
		let ibcValue = $(this).val();
		var resultsDropdown = $(this).attr('data-menu');
		let setLi = $(this).closest('.dropdown-input').find('ul').children().children().children();

		if(len > 1){
			$(this).closest('.dropdown-input').addClass('open');

			$.each( setLi, function(index,value) {

				$(this).show();
				if (value.innerText.indexOf(ibcValue.toUpperCase()) == -1){
					$(this).hide();
				}
			});

			// $(resultsDropdown).addClass('open')
			var w = $(this).closest('.dropdown-input').width();
			console.log(w)
			$(this).closest('.dropdown-input').find('.dropdown-menu').width(w)
		} else {
			$(this).closest('.dropdown-input').removeClass('open');
			// $(resultsDropdown).removeClass('open');
		}
	});


	//cabinet-new-dropdowns
	$('.dropdown-select').each(function(){
		$(this).find('.dropdown-menu li').on('click', function(e){
			e.stopPropagation();
		});
	});

	$('.dropdown').each(function(){
		$(this).on('show.bs.dropdown', function () {
			$(this).siblings().removeClass('open')
		});
	});
	$('.cabinet-new-header .dropdown-select').each(function(){
			var W = $(this).find('.dropdown-menu').width();
			$(this).find('.g_red-dropdown').width(W)
	});


	//scroll filter-list
	if ($(".filter-scroll").length){
		$(".filter-scroll").mCustomScrollbar({
			theme:"dark-thin",
			axis:"y",
			autoDraggerLength:true,
			autoExpandScrollbar:false,
			autoHideScrollbar: true, 
			mouseWheel:{ preventDefault: true },
			documentTouchScroll:false,
			alwaysShowScrollbar: 0,
			scrollbarPosition: "outside"
		});
	}


	// scroll cabinet-new-table
	$('.cabinet-new-scroll').mCustomScrollbar({
		theme:'dark-thin',
		axis:'y',
		autoDraggerLength:true,
		autoExpandScrollbar:false,
		autoHideScrollbar: true, 
		mouseWheel:{ preventDefault: true },
		documentTouchScroll:false,
		alwaysShowScrollbar: 0,
		scrollbarPosition: 'outside',
	});

	// cabinet-new calendar
	var currentDate = new Date();
	var calendarContainer = $('.datepicker-cabinet');
	calendarContainer.pickmeup({
		flat: true,
		date: currentDate,
		mode: 'range',
		position: 'bottom',
		trigger_event: 'click',
		hide_on_select: true,
		title_format: 'B Y',
		format: 'd.m.Y',
		separator: '-',
		locale: {
			days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
			daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
			daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
		},
		change: function (date) {
			var data = calendarContainer.pickmeup('get_date', true);
			if (data[0]==data[1]){
				$('#date-start')[0].value = data[0];
				$('#date-start')[0].focus();
				$('#calendar-start')[0].innerHTML = data[0];
			} else {
				$('#date-end')[0].value = data[1];
				$('#date-end')[0].focus();
				$('#calendar-end')[0].innerHTML = data[1];
			}

		},
	});


	$('.cabinet-new-table-head .sort-toggle').each(function(){
		$(this).click(function(e){
			var column = $(this).attr('data-sort');
			$(this).addClass('sorted');
			$(this).siblings().each(function(){
				var siblingsColumn = $(this).attr('data-sort');
				$(this).removeClass('sorted');
				$('.'+siblingsColumn).removeClass('sorted');
			})
			$('.cabinet-new .cabinet-new-scroll').find('.'+column).addClass('sorted');
		})
	});



	// cabinet-new active cols

	$(document).on('click', function(e){
		if ($(e.target).hasClass('item-clickable')){
			$(e.target).closest('.table-col').addClass('active');
			$(e.target).closest('.table-col').find('input.form-control').focus()
		}
		if ($(e.target).hasClass('item-clickable') && ($(e.target).closest('.table-col').siblings().hasClass('active'))){
			$(e.target).closest('.table-col').siblings().removeClass('active');
		}
		if ($(e.target).closest('.cabinet-new-table .item-clickable').length === 0 && $(e.target).attr('class') !=='.cabinet-new-table .item-clickable') {
			$('.cabinet-new-table .item-clickable').closest('.table-col').removeClass('active')
		}
		if ($(e.target).closest('.dropdown-input').length === 0 && $(e.target).attr('class') !=='dropdown-menu') {
			console.log($(e.target))
			$('.dropdown-input').removeClass('open');
		}

	});


	//show modal
	function showMyModal($modal){
		$modal.toggleClass("modal-opened");
		if($modal.attr("data-fade")){
			$modal.stop().fadeIn(0);
			$(".faded-bg").addClass("active");
		}
	};
	//hide modal 
	function hideMyModal($modal){
		$modal.removeClass("modal-opened");
		if($modal.attr("data-fade")){
			$modal.fadeOut(0);
			$(".faded-bg").removeClass("active");

		}
	};

	// modal-btn-open
	$(".btn_openModal").click(function(e){
		e.preventDefault();
		//определяем назначение блока (который открывать)
		var modalDestination = $(this).attr("data-modal");
		var $modalObj = $(".modal-box[data-modal='" + modalDestination + "']");

		//сначала остальные попапы
		$(".modal-link-active").not(this).removeClass("modal-link-active"); 
		$(".modal-box").not($modalObj).each(function(){
			hideMyModal($(this));
		 });

		//добавляем активный класс ссылке которая открыла окно
		$(this).toggleClass("modal-link-active");
		//запускаем фукнцию открытия модального окна
		showMyModal($modalObj);
	});
		//modal-btn-close
	$(".btn_closeModal").click(function(){
		var modalObj = $(this).closest(".modal-box")
		var modallinkData = modalObj.attr("data-modal");
		var modalLink = $(".btn_openModal[data-modal='" + modallinkData + "']");
		modalLink.removeClass("modal-link-active");
		hideMyModal(modalObj);
	});

	$('.ibc-count-deals').text($(".ibc-bk").children().length-1);

	var ibcAmount = 0;

	$(".ibc-col-price").each(function(i,elem) {
		let amount = $(elem).children('strong').text()
		var re = /[^0-9\,]/gi;
		if (re.test(amount)) {
			amount = amount.replace(re, '');
		}
		ibcAmount += Number(amount);
		console.log();
	});

	$('.ibc-amount-deals').text(ibcAmount);
});