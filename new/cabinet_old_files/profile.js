
        
        
        

        $(document).ready(function () {

            var currentDeal = getUrlParameter("current_deal");

            var payment_success = getUrlParameter("success");

            var action = getUrlParameter("action");


            $(document).tooltip();

            if (payment_success == "true") {
                alert.modal_small("Оплата","Успешно проведена");

                var metricsParams = {price:$(".paid-deal-price").val(), deal_id:$(".paid-deal-id").val(), commission:$(".paid-deal-commission").val()};
                yaCounter36484504.reachGoal('ORDER', metricsParams, function () {
                    alert.console("yaCounter: Оплата проведена "+$(".paid-deal-id").val()+" : "+$(".paid-deal-price").val()+" : "+$(".paid-deal-commission").val());
                });


                dataLayer.push({
                    "ecommerce": {
                        "purchase": {
                            "actionField": {
                                "id" : $(".paid-deal-id").val(),
                                "revenue" : $(".paid-deal-commission").val()
                            },
                            "products": [
                                {
                                    "id": $(".paid-offer-id").val(),
                                    "name": $(".paid-subevent-name").val(),
                                    "price": $(".paid-deal-price").val(),
                                    "brand": "Eticket4"
                                }
                            ]
                        }
                    }
                });


            }
            else if (payment_success == "false") {
                alert.modal_small("Оплата","Не была проведена.<br>Попробуйте снова.");
            }

            $("tr[deal-id=\"" + currentDeal + "\"]").addClass("table-row-active-deal");
            $("tr[deal-id=\"" + currentDeal + "\"]").closest(".inside-table").show();
            $("tr[deal-id=\"" + currentDeal + "\"]").closest(".table-row").addClass("row-opened").click();

            $btnOpenInsideTable = $(".js_btnInsideTableShow");
            $btnCollapseInsideTable = $(".js_btnInsideTableCollapse");
            $btnOpenInsideTable.click(function () {
                $(this).closest(".table-row").toggleClass("row-opened");
                $(this).closest(".table-row").find(".inside-table").slideToggle("fast");
            });
            $btnCollapseInsideTable.click(function () {
                $(this).closest(".inside-table").slideUp("fast");
                $(this).closest(".table-row").removeClass("row-opened");
            });

            // table-predlog-tooltips
            $(".js_tableShowTooltip").hover(function () {
                $(this).find(".js_tableTooltip").stop().fadeToggle("fast")
            });


            // popover bootstrap

            if ($(".js_popover").length) {
                $('.js_popover').popover({
                    container: 'body'
                })
            }


            $(".cabinet-edit-form,.cabinet-payment-form").submit(function () {
                alert.modal_loader(true);
                var form = this;
                var formData = new FormData($(form)[0]);
                var formUrl = $(form).attr('action');
                $.ajax({
                    url: formUrl,
                    type: 'POST',
                    success: function (dat) {
                        $("button", form).fadeOut(300).fadeIn(300);
                        alert.modal_loader(false);
                    },
                    error: function () {
                        alert.console("warning", "Серверная ошибка");
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

            $(".password-change-form").submit(function () {
                alert.modal_loader(true);
                var form = this;

                var p1 = $("input[name=\"new_password\"]", form).val();
                var p2 = $("input[name=\"new_password_2\"]", form).val();

                if (p1 != p2) {
                    alert.modal_small("Ошибка","Пароли не совпадают.");
                    alert.modal_loader(false);
                    return false;
                }
                if (p1 == "") {
                    alert.modal_small("Ошибка","Пароль не должен быть пустым.");
                    alert.modal_loader(false);
                    return false;
                }

                var formData = new FormData($(form)[0]);
                var formUrl = $(form).attr('action');
                $.ajax({
                    url: formUrl,
                    type: 'POST',
                    success: function (dat) {
                        alert.modal_loader(false);
                        var json = dat;
                        var result = json.result;
                        alert.console(result);
                        if (result.indexOf("SUCCESS") != -1) {
                            alert.modal_small("Успех","Пароль успешно именен.");
                            $(".change-password-close").click();
                        }
                        else {
                            alert.modal_small("Ошибка","Введите верные данные. Пароль не может быть короче 2х символов.");
                        }
                    },
                    error: function () {
                        alert.console("warning", "Серверная ошибка");
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

            // cabinet-datepicker
            if ($(".cabinet-dates-sidebar").length) {
                $('.cabinet-dates-sidebar .date-box').daterangepicker({
                            "autoApply": false,
                            "locale": {
                                "format": "MM/DD/YYYY",
                                "separator": " - ",
                                "applyLabel": "Применить",
                                "cancelLabel": "Отмена",
                                "fromLabel": "C",
                                "toLabel": "По",
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
                            }

                        },
                        function (start, end, label) {
                            // just-show-date-from
                            $(".period-date-from strong").text(start.format('DD'));
                            $(".period-date-from span").text(start.format('MMMM'));
                            $(".period-date-from em").text(start.format('YYYY'));

                            //just-show-date-to
                            $(".period-date-to strong").text(end.format('DD'));
                            $(".period-date-to span").text(end.format('MMMM'));
                            $(".period-date-to em").text(end.format('YYYY'));

                            //save to hidden-inputs-values
                            $("#periodFromInput").val(start.format('DD.MM.YYYY'))
                            $("#periodToInput").val(end.format('DD.MM.YYYY'))

                            $(".select-table-form").submit();
                            //help for Programmer = >
                            //console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
                        });
            }

            $(".act-edit").click(function () {
                alert.modal_loader(true);
                $(".edit-offer-form").html("");
                var id = $(this).attr("offer-id");
                $.ajax({
                    url: "/profile/edit_offer_form?offer_id=" + id,
                    context: document.body,
                    async: true,
                    cache: false,
                    success: function (dat) {
                        $(".edit-offer-form").html(dat);
                        $(".curr-sector").prop("selected", true);
                        alert.modal_loader(false);
                    },
                    failure: function () {
                        alert.console("error", "Bullshit");
                    }
                });
            });

            $(document).on("submit", ".edit-offer-form", function () {
                var html = "";
                $(".ticket-checkbox:not(:checked)").each(function () {
                    var ticket_id = $(this).attr("offer-ticket-id");
                    html += "<input type='hidden' name='offer_tickets' value='" + ticket_id + "'>";
                });
                $(this).append(html);
            });

            $(document).on("submit", ".upload-tickets-form", function () {
                var ind = 0;
                $(".ticket-input-file").each(function () {
                    $(this).attr("name", "files[" + ind + "]");
                    ind++;
                });

            });


            $(document).on("click", ".deal-action", function () {
                alert.modal_loader(true);
                var id = $(this).attr("deal-id");
                var action = "deal_accept";
                if ($(this).hasClass("decline-deal")) {
                    action = "deal_decline";
                }
                $.ajax({
                    url: "/seller/" + action + "?deal_id=" + id,
                    context: document.body,
                    async: true,
                    cache: false,
                    success: function (dat) {
                        alert.modal_loader(false);
                        var json = jQuery.parseJSON(dat);
                        var result = json.result;
                        alert.console(result);
                        if (result.indexOf("TICKETS_FAILED") != -1) {
                            $.ajax({
                                url: "/profile/load_tickets_form?deal_id=" + id,
                                context: document.body,
                                async: false,
                                cache: false,
                                success: function (dat) {
                                    $(".upload-modal").html(dat);
                                    $(".upload-modal").show();
                                    if ($(".inputFile").length) {
                                        $('.inputFile').filer();
                                    }
                                },
                                failure: function () {
                                    alert.modal_small("Ошибка","Загрузка билетов не сработала...");
                                }
                            });
                        }
                        else if (result.indexOf("DEAL_SAVE_FAILED") != -1) {
                            alert.modal_small("Ошибка подтверждения","Некоторые условия для одтверждения сделки не соблюдены. За подробностями обратитесь к службе поддержки.");
                        }
                        else if (result.indexOf("SEND_FAILED") != -1) {
                            alert.modal_small("Ошибка отправки","Не удалось вызвать курьера. Обратитесь в службу поддержки.");
                        }
                        else if (result.indexOf("SAVE_SUCCESSFUL") != -1) {
                            location.reload();
/*                            if(!($(".cabinet-new-item[deal-id=\""+id+"\"]").length))
                            {
                                location.reload();
                            }*/
                        }
                        else {
                            alert.modal_small("Ой....","Что-то случилось. Сообщите, пожалуйста, нашей службе поддержки!");
                        }
                    },
                    failure: function () {
                        alert.console("error", "Bullshit");
                        alert.modal_loader(false);
                    }
                });
            });


            $(document).on("submit", ".change-pass-form", function () {
                alert.modal_loader(true);
                var form = this;

                var formData = new FormData($(form)[0]);
                var formUrl = $(form).attr('action');

                var p1 = $("input[name=\"new_password\"]", form).val();
                var p2 = $("input[name=\"new_password_2\"]", form).val();
                if (p1 != p2) {
                    alert.modal_small("Ошибка","Пароли не совпадают или пустые.");
                    alert.modal_loader(false);
                    return false;
                }
                $.ajax({
                    url: formUrl,
                    type: 'POST',
                    success: function (dat) {
                        alert.modal_loader(false);
                        if (dat.indexOf("SUCCESS") != -1) {
                            $(form).parent().find(".g_btn-close").click();
                            alert.modal_small("Успех","Пароль успешно изменен!");
                        }
                        else {
                            alert.modal_small("Ошибка","Введите верные данные. Пароль не может быть короче 2х символов.");
                        }

                    },
                    error: function () {
                        alert.console("warning", "Серверная ошибка");
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

            $(document).on("click", ".set-address", function () {
                var offer_id = $(this).attr("offer-id");
                var address = $(this).attr("address");
                alert.modal_offer_address("Введите адрес, куда приедет курьер, забрать билеты.", address, offer_id);
            });
            // Submit tickets...
            $(document).on("click", ".upload-and-send-tickets", function () {
                $(this).closest("form").find("input[name=\"send\"]").val(true);
                $(this).closest("form").submit();
            });
            $(document).on("submit", ".upload-tickets-form", function () {
                var form = this;
                var deal_id = $("input[name=\"deal_id\"]",form).val();
                alert.modal_loader(true);
                var formData = new FormData($(form)[0]);
                var formUrl = $(form).attr('action');
                $.ajax({
                    url: formUrl,
                    type: 'POST',
                    success: function (dat) {
                        alert.modal_loader(false);
                        if (dat.indexOf("SAVE_SUCCESSFUL") != -1) {
                            $(form).parent().find(".g_btn-close").click();
                            var url = "/profile/offers";
                            if($(".cabinet-new-item[deal-id=\""+deal_id+"\"]").length)
                            {
                                url = null;
                                $(".cabinet-new-item[deal-id=\""+deal_id+"\"]").remove();
                            }
                            alert.modal_small("Успех","Билеты успешно загружены и отправлены покупателю.", url);
                        }
                        else if (dat.indexOf("SUCCESS") != -1) {
                            $(form).parent().find(".g_btn-close").click();
                            var url = "/profile/offers";
                            if($(".cabinet-new-item[deal-id=\""+deal_id+"\"]").length)
                            {
                                url = null;
                                //$(".cabinet-new-item[deal-id=\""+deal_id+"\"]").remove();
                            }
                            alert.modal_small("Успех","Билеты загружены!", url);
                        }
                        else if (dat.indexOf("DEAL_SAVE_FAILED") != -1) {
                            alert.modal_small("Ошибка подтверждения","Некоторые условия для одтверждения сделки не соблюдены. За подробностями обратитесь к службе поддержки.");
                        }
                        else if (dat.indexOf("SEND_FAILED") != -1) {
                            alert.modal_small("Ошибка отправки","Не удалось вызвать курьера. Обратитесь в службу поддержки.");
                        }
                        else {
                            alert.modal_small("Ошибка","Вы не выбрали билетов.");
                        }

                    },
                    error: function () {
                        alert.modal_loader(false);
                        alert.console("warning", "Серверная ошибка");
                    },
                    data: formData,
                    cache: false,
                    async: true,
                    contentType: false,
                    processData: false
                });
                return false;
            });

            var offerToRemove = null;
            var removeOffer = function () {
                alert.modal_loader(true);
                var id = $(offerToRemove).attr("offer-id");
                var self = offerToRemove;

                $.ajax({
                    url: "/seller/offer_remove?offer_id=" + id,
                    context: document.body,
                    async: false,
                    cache: false,
                    success: function (dat) {
                        alert.modal_loader(false);
                        var json = jQuery.parseJSON(dat);
                        var result = json.result;
                        alert.console(result);
                        if (result.indexOf("SUCCESS") != -1) {
                            $(self).closest(".table-row").remove();
                            alert.modal_small("Успех","Предложение успешно снято с продажи. Все сделки по этому предложению останутся в таблице.", "/profile/offers");
                        }
                        else if (result.indexOf("FAILURE") != -1) {
                            alert.modal_small("Ошибка","Предложение нельзя удалить, так как кто-то уже совершает покупку.");
                        }
                        else {
                            alert.modal_small("Ой....","Что-то случилось. Сообщите, пожалуйста, нашей службе поддержки!");
                        }

                    },
                    failure: function () {
                        alert.console("error", "Bullshit");
                        alert.modal_loader(false);
                    }
                });
                return false;
            }

            $(document).on("click", ".remove-offer", function (e) {
                e.stopPropagation();
                e.preventDefault();
                offerToRemove = this;
                alert.modal_big("Вы уверены?","Предложение будет снято с продажи.<br> Однако все сделки останутся в таблице.<br> Продолжать?","Снять с продажи","Отмена", removeOffer, null, null);
            });

            $(document).on("click", ".download-link", function (e) {
                var html = $(this).closest("div").find(".holder").html();
                alert.modal_small("Скачать билеты", html, null, true);
            });


            $(".promo-link-button").click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                var title = $(this).attr("data-original-title");
                var text = $(this).attr("data-content");
                alert.modal_small(title, text);
                return false;
            });


            $(".scrolled-downloads").mCustomScrollbar({
                theme: "inset-3-dark",
                axis: "y",
                autoDraggerLength: false,
                autoExpandScrollbar: true,
                mouseWheel: {preventDefault: true},
                documentTouchScroll: false
            });

            $(document).on("click", ".upload-tickets", function () {
                var deal_id = $(this).attr("deal-id");
                $.ajax({
                    url: "/profile/load_tickets_form?deal_id=" + deal_id,
                    context: document.body,
                    async: false,
                    cache: false,
                    success: function (dat) {
                        $(".upload-modal").html(dat);
                        $(".upload-modal").show();
                        if ($(".inputFile").length) {
                            $('.inputFile').filer();
                        }
                    },
                    failure: function () {
                        alert.modal_small("Ошибка","Загрузка билетов не сработала...");
                    }
                });
            });

            $(document).on("click", ".set-overprice", function () {
                var deal_id = $(this).attr("deal-id");
                var overprice = $(this).attr("overprice") * -1;
                $(".set-overprice-form").show();
                $(".set-overprice-form .deal-id-input").val(deal_id);
                $(".set-overprice-form .overprice-input").val(overprice);
            });


            $(document).on("change", ".arena-zone-select", function () {
                var z_id = $("option:selected", this).attr("arena-zone-id");
                $(".arena-zone-sector-select option").hide();
                $(".arena-zone-sector-select option[arena-zone-id=\"" + z_id + "\"]").show();
                $(".arena-zone-sector-select").val($(".arena-zone-sector-select option[arena-zone-id=\"" + z_id + "\"]").first().val());
            });

            if(action=="enter_card")
            {
                $("button[data-modal=\"payment-card\"]").click();
            }

            $('#cardDataForm').submit(function() {

                var cardDataRequest = {
                    'merchID' : $("input[name=\"MerchID\"]").val(),
                    'requestID' : $("input[name=\"RequestID\"]").val(),
                    'email' : $("input[name=\"Email\"]").val(),
                    'firstName' : $("input[name=\"FirstName\"]").val(),
                    'lastName' : $("input[name=\"LastName\"]").val(),
                    'description' : $("input[name=\"Description\"]").val(),
                    'cardOwnerId' : $("input[name=\"CardOwnerId\"]").val(),
                    'backURL' : $("input[name=\"BackURL\"]").val(),
                    'timestamp' : $("input[name=\"Timestamp\"]").val(),
                    'signature' : $("input[name=\"Signature\"]").val()
                };

                $.ajax({
                    url: '/profile/cardDataLog',
                    type: 'POST',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    cache: false,
                    data: JSON.stringify(cardDataRequest),
                    success: function (dat) {
                        console.log(dat);
                    }
                });

                return true; // return false to cancel form action
            });
            $(document).on("click", ".payment-card-detail", function () {
            });


        });