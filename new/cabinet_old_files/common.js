
        
        
        

var getUrlParameter = function getUrlParameter(sParam)
{
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++)
    {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam)
        {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

if(isMobile)
{
    if($(".scroll-to-if-mobile").length) {
        $('html, body').animate({
            scrollTop: $(".scroll-to-if-mobile").offset().top
        }, 1000);
    }
}
if($(".scroll-to").length) {
    $('html, body').animate({
        scrollTop: $(".scroll-to").offset().top
    }, 1000);
}

$(document).ready(function () {

    // Toggle else links
    if ($(".ticket-titles-collapse").length){
        $(".ticket-titles-col .toggle-link").click(function(e)
        {
            console.log(e)
            if ($(this).hasClass("open")){
                $(this).text(" подробнее >>");
            }
            else
            {
                $(this).text(" << Свернуть")
            }
            $(this).toggleClass("open");
            $(".ticket-titles-collapse").toggleClass("active");
        });
    }


    if ($('.calendar').length) {
        console.log("Calendar: "+$('.calendar').length);
        var currentDate = new Date();
        var dateContainer = $('.calendar');
        dateContainer.pickmeup({
            flat: true,
            date: currentDate,
            mode: 'single',
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
            render: function (date) {
                if (date < currentDate) {
                    return {disabled: true, class_name: 'date-in-past'};
                }
                return {};
            },
            change: function (date) {
                $(".calendar-options input").prop("checked", false);
                dateContainer.data("pickmeup-options").format = "d B Y";
                var data = dateContainer.pickmeup('get_date', true);
                if (dateContainer.data('pickmeup-options').mode === 'range' && (data.length > 1)) {
                    dateContainer.data("pickmeup-options").mode = "single";
                    dateContainer.pickmeup('set_date', data[1]).pickmeup('update');
                }
            },
        });
    }

    $(".calendar-options input").each(function () {
        $(this).on('change', function () {
            if ($(this).is(":checked")) {
                var curr = new Date;
                var date;
                if ($(this).attr("id") == 'this-week') {
                    var day1 = new Date(curr);
                    var day2 = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
                    date = [day1, day2];
                }

                if ($(this).attr("id") == 'this-weekend') {
                    var day1 = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
                    var day2 = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
                    date = [day1, day2];
                }

                if ($(this).attr("id") == 'next-week') {
                    var day1 = new Date(curr.setDate(curr.getDate() - curr.getDay() + 8));
                    var day2 = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
                    date = [day1, day2];
                }
                dateContainer.data("pickmeup-options").mode = "range";
                dateContainer.data("pickmeup-options").format = "d/m/y";
                dateContainer.pickmeup('set_date', date);
                dateContainer.pickmeup('update');
            }
        });
    });
    // pickmeup calendar end

    // sub-header-menu toggle
    if ($(".sub-header-menu").length) {
        $(".sub-header-menu li").click(function (e) {
            e.preventDefault();
            var href = $(this).attr('data-submenu');
            console.log("#" + href);
            $(this).siblings().removeClass("active");
            $(this).toggleClass("active");
            $("#" + href).siblings().removeClass("active");
            $("#" + href).toggleClass('active');
        });
    }

    // sub-header-mobile toggle
    if ($(".sub-menu").length) {
        $(".sub-menu-toggle").click(function (e) {
            $(this).toggleClass('active');
            $(".sub-menu").slideToggle(400);
        });
        $(".sub-menu .sub-menu-link").click(function (e) {
            e.preventDefault();
            var href = $(this).attr('data-submenu');
            console.log("#" + href);
            $(this).siblings().removeClass("active");
            $(this).toggleClass("active");
            $(this).siblings().find(".submenu-mobile").slideUp("active");
            $("#" + href).toggleClass('active').slideToggle(400);
        });
    }


    // calendar toggle rubrics
    $("#calendar-toggle-rubrics").click(function (e) {
        $(this).toggleClass("active");
        $("#calendar-wrap-rubrics").slideToggle(0).toggleClass("active");
        $(this).closest(".rubrics-tizer").toggleClass("calendar-open");
    });

    // mobile calendar toggle rubrics
    $("#mobile-calendar-toggle-rubrics").click(function (e) {
        $(this).toggleClass("active");
        $("#calendar-wrap-rubrics").slideToggle(0).toggleClass("active");
        $(this).closest(".rubrics-tizer").toggleClass("calendar-open");
    });

    $(".current-lang").click(function(){
        $(".other-langs-list").toggle();
    });

    var payResult = getUrlParameter("result");
    var payTimeout = getUrlParameter("pay_timeout");
    var card_save = getUrlParameter("card_save");
    // alert.modal_small(payTimeout,"Оплата была отклонена. За подробностми обращайтесь в службу поддержки.");
    if(payResult=="0")
    {
        //alert.modal_small("Оплата отклонена.","Оплата была отклонена. За подробностми обращайтесь в службу поддержки.");
    }
    if(payResult=="1")
    {
        alert.modal_small("Оплата успешна.","Вы успешно произвели оплату. Статус сделки будет изменен в течение нескольких секунд.");
    }
    if(payTimeout=="1")
    {
        //alert.modal_small("Оплата отклонена.","Вы не успели произвести оплату. Попробуйте снова.");
    }
    if(card_save=="1")
    {
        alert.modal_small("Сохранение карты.","Карта принята в обработку.<br>Изменения вступят в силу в течение 10 минут.");
    }

    //masonry items-list
    var masonryContainer = document.getElementById('masonry');
    if (masonryContainer) {
        $('.events-list').imagesLoaded(function () {
            var msnry = new Masonry(masonryContainer, {
                itemSelector: '.item',

            });
        });
    }

    //masonry faq
    var masonryContainerFaq = document.getElementById('faq-list');
    if (masonryContainerFaq) {
        var msnryFaq = new Masonry(masonryContainerFaq, {
            itemSelector: '.item',
        });
    }

    common.initControls();

    if($(".datetimepicker").length>0)
    {
        $(".datetimepicker").datetimepicker({
            locale: 'ru',
            showMeridian: false,
            format: 'DD.MM.YYYY HH:mm'
        });
    }

    alert.console($(".datepicker-input").html());
    if($(".datepicker-input").length>0)
    {
        $(".datepicker-input").datetimepicker({
            locale: 'ru',
            showMeridian: false,
            format: 'DD.MM.YYYY'
        });
    }

    if ($(".fancybox").length) {
        $(".fancybox").fancybox();
    }

    $(".numeric-integer").numeric({decimal: false, negative: false});
    $(".numeric-float").numeric({negative: false});
    $(".numeric-integer-negative").numeric({decimal: false, negative: true});
    $(".numeric-float-negative").numeric({negative: true});

    $(".phone-mask").mask("+0(000)000-00-00");
    $(".card-mask").mask("0000-0000-0000-0000");

    // Info sell buy
    if ($(".how-carousel .swiper-container").length) {
        var swiper = new Swiper('.how-carousel .swiper-container', {
            pagination: '.how-carousel .swiper-pagination',
            nextButton: '.how-carousel .swiper-button-next',
            prevButton: '.how-carousel .swiper-button-prev',
            slidesPerView: 1,
            direction: "vertical",
            paginationClickable: true,
            mousewheelControl: true,
            paginationBulletRender: function (index, className) {
                return '<div class="item ' + className + '"><span>' + (index + 1) + '</span><em>Шаг</em></div>';
            }
        });
    }

    $(document).on("click", ".proposal-butt-submit", function () {
        // alert.modal_small("Спасибо","Ваше предложение получено.");
        var formData = new FormData($(".proposal-form")[0]);
        var formUrl = $(".proposal-form").attr('action');
        $.ajax({
            url: formUrl,
            type: 'POST',
            success: function (dat) {
                var json = jQuery.parseJSON(dat);
                var result = json.result;
                if (result.indexOf("SUCCESS") != -1) {
                    alert.modal_small("Спасибо","Ваше предложение получено.");
                }
                else {
                    alert.modal_small("Ошибка", "Что-то не так.");
                }
            },
            error: function () {
                alert.modal_small("Ошибка", "Что-то не так.");
            },
            data: formData,
            cache: false,
            async: true,
            contentType: false,
            processData: false
        });
        $(this).closest(".modal-box").find(".js_closeModal").click();
        return false;
    });
    //show modal
    function showModal($modal) {
        $modal.toggleClass("modal-opened");
        if ($modal.attr("data-fade")) {
            $modal.fadeToggle("fast")
        }
    };
    //hide modal
    function hideModal($modal) {
        $modal.removeClass("modal-opened");
        if ($modal.attr("data-fade")) {
            $modal.fadeOut("fast")
        }
        var url = $($modal).attr("on-close-url");
        alert.console("Hide modal: " + url);
        if (url) {
            window.location = url;
        }
    };

    // modal-btn-open
    $(".js_openModal").click(function (e) {
        e.stopPropagation();
        //определяем назначение блока (который открывать)
        var modalDestination = $(this).attr("data-modal");
        var $modalObj = $(".modal-box[data-modal='" + modalDestination + "']");

        //сначала остальные попапы
        $(".modal-link-active").not(this).removeClass("modal-link-active");
        $(".modal-box").not($modalObj).each(function () {
            hideModal($(this));
        });

        //добавляем активный класс ссылке которая открыла окно
        $(this).toggleClass("modal-link-active");
        //запускаем фукнцию открытия модального окна
        showModal($modalObj);
    });

    //modal-btn-close
    $(document).on("click", ".js_closeModal", function () {
        var modalObj = $(this).closest(".modal-box")
        var modallinkData = modalObj.attr("data-modal");
        var modalLink = $(".js_openModal[data-modal='" + modallinkData + "']");
        modalLink.removeClass("modal-link-active");
        hideModal(modalObj);
    });

    var $naviMobile = $(".mobile-header")
    $(".mobile-menu-btn").click(function () {
        $(this).toggleClass("mobile-btn-open")
        $naviMobile.fadeToggle("fast");
    });

    if ($(".js_popover").length) {
        $('.js_popover').popover({
            container: 'body'
        })
    }
});
//show modal
function showModal($modal) {
    $modal.addClass("modal-opened");
    if ($modal.attr("data-fade")) {
        $modal.stop().fadeToggle("fast")
    }
};
//hide modal
function hideModal($modal) {
    $modal.removeClass("modal-opened");
    if ($modal.attr("data-fade")) {
        $modal.fadeOut("fast")
    }
    var url = $($modal).attr("on-close-url");
    //alert.console("Hide modal: " + url);
    if (url) {
        window.location = url;
    }
};

var collection = {

    unique: function (arr) {
        var un = a.filter(function (itm, i, arr) {
            return i == arr.indexOf(itm);
        });
        return un;
    }
}
var validation = {
    email: function (val) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(val);
    }
}
var common = {
    message: function (code) {
        if (code == 1) {
            return "Предложение успешно создано. Подробности в вашем личном кабинете";
        }
    },
    initControls: function () {

        $("[data-toggle=\"tooltip\"]").tooltip();

        $(".numeric-integer").numeric({decimal: false, negative: false});
        $(".numeric-float").numeric({negative: false});
        $(".numeric-integer-negative").numeric({decimal: false, negative: true});
        $(".numeric-float-negative").numeric({negative: true});

        if ($(".control-form").length) {
            $(".control-form").fancybox({
                'hideOnContentClick': true,
                autoSize: true,
                autoScale: true,
                maxHeight: 800
            });
        }

        $("input[mask]").each(function () {
            var m = $(this).attr("mask");
            $(this).mask(m);
        });

    },
    formatDouble: function (num) {
        var val = parseFloat(Math.round(num * 100) / 100).toFixed(2);
        return $.parseNumber(val, {format: "#.##"});
    }
}
var live = {
    hot_event: function ()
    {
        $.ajax({
            url: "/live/hot_subevents",
            context: document.body,
            async: true,
            cache: false,
            success: function (dat) {
                $(".live",dat).each(function(){
                    alert.noty("alert",$(this).get(),25000,'centerRight');
                });
            },
            failure: function () {
                alert.console("error","Bullshit");
            }
        });
    },
    bestsellers: function ()
    {
        $.ajax({
            url: "/live/bestsellers",
            context: document.body,
            async: true,
            cache: false,
            success: function (dat) {
                $(".live",dat).each(function(){
                    alert.noty("warning",$(this).get(),20000,'bottomLeft','bounceInLeft','bounceOutLeft');
                });
            },
            failure: function () {
                alert.console("error","Bullshit");
            }
        });
    },
    visitors: function ()
    {
        $.ajax({
            url: "/live/visitors",
            context: document.body,
            async: true,
            cache: false,
            success: function (dat) {
                $(".live",dat).each(function(){
                    alert.noty("success",$(this).get(),6000,'centerLeft','bounceInLeft','bounceOutUp');
                });
            },
            failure: function () {
                alert.console("error","Bullshit");
            }
        });
    }
}
var alert = {

    loading: function (on, text) {
        var text_span = $("#smallbox-loading-text");
        if (!on) {
            if (text_span != null) {
                $(text_span).closest(".SmallBox").remove();
            }
            return;
        }

        if (text_span.size() > 0) {
            $(text_span).html(text);
        }
        else {
            $.smallBox({
                title: "<img id='smallbox-loading-image' class=\"smallbox-loading-image\" src='/../img/circle-loader.gif' style=\"float:right;\"><span id='smallbox-loading-text' class='smallbox-loading-text' style='color: #000000; float: right; margin-right: 10px; font-size: 22px;'>" + text + "</span>",
                content: "",
                color: "white",
                iconSmall: "",
                colortime: 0
            }, null);
        }
    },
    error: function (title, text, callback) {
        $.smallBox({
            title: title,
            content: text,
            color: "#9c5353",
            iconSmall: "fa fa-remove bounce animated",
            timeout: 4000
        }, callback);
    },
    warning: function (title, text, callback) {
        $.smallBox({
            title: title,
            content: text,
            color: "#dfb56c",
            iconSmall: "fa fa-warning bounce animated",
            timeout: 4000
        }, callback);
    },
    success: function (title, text, callback) {
        $.smallBox({
            title: title,
            content: text,
            color: "#5F895F",
            iconSmall: "fa fa-check bounce animated",
            timeout: 4000
        }, callback);
    },
    info: function (title, text, callback) {
        $.smallBox({
            title: title,
            content: text,
            color: "#9cb4c5",
            iconSmall: "fa fa-info bounce animated",
            timeout: 4000
        }, callback);
    },
    general_info: function (message, icon, color) {
        $.smallBox({
            title: message,
            content: "",
            color: color,
            iconSmall: "fa " + icon + " bounce animated",
            timeout: 7000
        }, null);
    },
    console: function (text) {
        console.log(text);
    },
    noty: function (type, text, timeout, position, open_from, close_from) {


        if (!position) {
            position = 'topRight';
        }
        if (!open_from) {
            open_from = 'bounceInRight';
        }
        if (!close_from) {
            close_from = 'bounceOutRight';
        }
        noty({
            text: text,
            animation: {
                open: 'animated '+open_from, // Animate.css class names
                close: 'animated '+close_from, // Animate.css class names
                easing: 'swing', // unavailable - no need
                speed: 500 // unavailable - no need
            },
            layout: position,
            type: type,
            timeout: timeout
        });
    },
    is_loading: false,
    modal_loader: function (show) {
        alert.is_loading = show;
        var $modalObj = $(".loader-modal-alert");

        //сначала остальные попапы
        $(".modal-box").each(function () {
            hideModal($modalObj);
        });

        if(show)
        {
            showModal($modalObj);
        }
        else
        {
            hideModal($modalObj);
        }
    },

    modal_small: function (title, text, on_close_url, hide_ok) {
        var $modalObj = $(".small-modal-alert");

        //сначала остальные попапы
        $(".modal-box").each(function () {
            hideModal($modalObj);
        });

        $(".modal-title", $modalObj).html(title);
        $(".modal-text", $modalObj).html(text);
        if(hide_ok)
        {
            $(".g_btn-red-round",$modalObj).hide();
        }
        else
        {
            $(".g_btn-red-round",$modalObj).show();
        }
        showModal($modalObj);

        if (on_close_url) {
            $($modalObj).attr("on-close-url", on_close_url);
        }

    },
    modal_big: function (title, text, butt_text_1, butt_text_2, butt_function_1, butt_function_2, on_close_url) {
        var $modalObj = $(".big-modal-alert");

        //сначала остальные попапы
        $(".modal-box").not($modalObj).each(function () {
            hideModal($modalObj);
        });

        $(".btn-yes", $modalObj).hide();
        $(".btn-no", $modalObj).hide();
        if(butt_text_1)
        {
            $(".btn-yes", $modalObj).show();
        }
        if(butt_text_2)
        {
            $(".btn-no", $modalObj).show();
        }

        $(".modal-title", $modalObj).html(title);
        $(".modal-text", $modalObj).html(text);
        $(".btn-yes", $modalObj).html(butt_text_1);
        $(".btn-no", $modalObj).html(butt_text_2);

        // Set up button logic
        $(".btn-yes", $modalObj).unbind("click");
        $(".btn-yes", $modalObj).click(function () {
            hideModal($modalObj);
            if (butt_function_1) {
                butt_function_1();
            }
        });

        $(".btn-no", $modalObj).unbind("click");
        $(".btn-no", $modalObj).click(function () {
            hideModal($modalObj);
            if (butt_function_2) {
                butt_function_2();
            }
        });

        showModal($modalObj);

        if (on_close_url) {
            $($modalObj).attr("on-close-url", on_close_url);
        }
    },
    modal_offer_address: function (title, address, offer_id) {
        var $modalObj = $(".address-input-alert");

        //сначала остальные попапы
        $(".modal-box").each(function () {
            hideModal($modalObj);
        });

        $(".modal-title", $modalObj).html(title);
        $(".address-input", $modalObj).val(address);

        showModal($modalObj);
        $(".offer-id-input",$modalObj).val(offer_id);
        $(".address-form", $modalObj).submit(function(){
            var formData = new FormData($(this)[0]);
            var formUrl = $(this).attr('action');

            $.ajax({
                url: formUrl,
                type: 'POST',
                success: function (dat) {
                    if(dat.indexOf("SUCCESS")!=-1)
                    {
                        alert.modal_small("Успех","Адрес изменен!");
                    }
                    else
                    {
                        alert.modal_small("Ошибка","Не удалось сменить адрес.");
                    }
                },
                error: function () {
                    alert.console("warning","Серверная ошибка");
                    alert.modal_loader(false);
                },
                data: formData,
                cache: false,
                async: false,
                contentType: false,
                processData: false
            });
            return false;
        });
    },
    modal_payment: function () {
        var $modalObj = $(".payment-modal-alert");

        //сначала остальные попапы
        $(".modal-box").not($modalObj).each(function () {
            hideModal($modalObj);
        });

        showModal($modalObj);
    },
}



