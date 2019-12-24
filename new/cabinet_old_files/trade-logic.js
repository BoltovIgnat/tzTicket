
    
    
    

    $(document).ready(function () {
        trade.init();
    });

        var animation = true;
        var offer_id = 0;
        var price = 0;
        var oldPrice = "";

        var lcokAnimation = false;
        function showAnimation(element, color) {
            var original_color = element.css('background-color');
            // var original_color = element.css('border-left-color');
            if (animation && !lcokAnimation) {
                lcokAnimation = true;
                element
                    .animate({borderColor: color}, 100, 'linear')
                    .delay(100)
                    .animate({borderColor:original_color}, 100, 'linear')
                    .delay(100)
                    .animate({borderColor: color}, 100, 'linear')
                    .delay(100)
                    .animate({borderColor:original_color}, 100, 'linear')
                    .delay(100)
                    .animate({borderColor: color}, 100, 'linear')
                    .delay(100)
                    .animate({borderColor:original_color}, 500, 'easeOutCirc');
                setTimeout( function() { lcokAnimation = false; }, 1500);
            }

        }

        function findElementByClassAndOfferId (className, offerId) {
            var elements = $.grep($("." + className), function(element0){
                return $(element0).attr("offer-id") == offerId;
            })
            if (elements && elements[0])
                return elements[0];
        }

        function findElementByClassAndOfferIdAndOptionName (className, offerId, name) {
            var elements = $.grep($("." + className), function(element0){
                return ($(element0).attr("offer-id") == offerId && $(element0).attr("option-name") == name);
            })
            if (elements && elements[0])
                return elements[0];
        }



        $(".main-category-checkbox").change(function() {
            showAnimation( $("#add-offer-button"), "blue");
        });

//-----------------------------------------------------------------------------

    var trade = {
        init: function () {
            // Initiate controls
            trade.initControls();
            trade.initDealActions();
            // Refresh data every 15 seconds
            setInterval(trade.refreshInfo, 15000);
            showAnimation( $("#add-offer-button"), "blue");
        },
        initControls: function () {
            //1. Init offer delete ------------------------
            $(document).on("click",".delete-offer-button", function(){
                var offer_id = $(this).attr("offer-id");
                trade.deleteOffer(offer_id);
            });

            //2. Init offer copy --------------------------
            $(document).on("click",".copy-offer-button", function(){
                var offer_id = $(this).attr("offer-id");
                trade.copyOffer(offer_id);
            });

            //3. Init offer statistics --------------------
            $(document).on("click",".statistics-offer-button", function(){
                var offer_id = $(this).attr("offer-id");
                trade.showStatistics(offer_id);
            });

            //4. Init hidden controls ---------------------
            $(document).on("click",".item-clickable",function(){
                $(this).closest(".table-col").addClass("active");
                $(this).closest(".table-col").find(".item-hidden-input").focus().select();

            });
            $(document).on("keyup",".item-hidden-input",function(e){
                if(e.which==13)
                {
                    $(this).closest(".table-col").removeClass("active");
                }
            });

            $(document).on("keyup",".search-filter",function(e){
                if(e.which==13)
                {
                    var search = $(this).val().toUpperCase();
                    var col_number = $(this).attr("col-number");
                    $(".main-table .cabinet-new-item").each(function(){
                        var t = $(".table-col[col-number=\""+col_number+"\"]",this).text();
                        var inp = $(".table-col[col-number=\""+col_number+"\"] input",this).val();
                        var sel = $(".table-col[col-number=\""+col_number+"\"] select option:selected",this).val();
                        var val = "";
                        if(t) val += t.trim();
                        if(inp) val += inp.trim();
                        if(sel) val += sel.trim();
                        console.log(col_number+" T: "+val);
                        if(val.toUpperCase().indexOf(search)>=0)
                        {
                            $(this).show();
                        }
                        else
                        {
                            $(this).hide();
                        }
                    });
                }
            });

            $(document).on("keyup", ".event-select",function() {
                var element = $(this).closest(".arena_sector"); //findElementByClassAndOfferId('arena_sector'/*offer-sits-input'*/, offerId);
                if (element)
                    showAnimation(element, 'red');
            });

            $(document).on("blur", ".event-select",function() {
                var element = $(this).closest(".arena_sector"); //findElementByClassAndOfferId('arena_sector'/*offer-sits-input'*/, offerId);
                if (element)
                    showAnimation(element, 'red');
                trade.sendMessagesIfComplete($(this).attr("offer-id"));
            });

            $(document).on("click",".icon-sort",function(){
                var col_number = $(this).attr("col-number");

                $("div[id*=pi_div]").sort(function(a,b){
                    if(a.id < b.id) {
                        return -1;
                    } else {
                        return 1;
                    }
                })
            });

            //5. Init sector change ------------------------
            $(document).on("change",".arena_sector",function(){
                var offer_id = $(this).attr("offer-id");
                var sector_id = $(this).find("option:selected").val();
                trade.changeSector(offer_id,sector_id);
                var priceElement = findElementByClassAndOfferId("offer-price-input", offer_id);
                //showAnimation(priceElement, 'red');


            });

            //6. Init price change -------------------------
            $(document).on("keyup",".offer-price-input",function(e){

                if(e.which==13) {
                    offer_id = $(this).attr("offer-id");
                    price = $(this).val();
                    trade.sendMessagesIfComplete(offer_id);
                    alert.modal_big("Подтвердите цену","Вы подтверждаете изменение цены?","Да","Нет",trade.setPrice,trade.oldPrice,null);
                }
            });

            $(document).on("focusout",".offer-price-input",function(e){
                offer_id = $(this).attr("offer-id");
                price = $(this).val();
                trade.sendMessagesIfComplete(offer_id);
                alert.modal_big("Подтвердите цену","Вы подтверждаете изменение цены?","Да","Нет",trade.setPrice,trade.oldPrice,null);
            });

            //7. Init offer options change -------------------------
            $(document).on("change",".offer-option",function(){
                var option = $(this).attr("option-name");
                var ison = $(this).prop("checked");
                var offer_id = $(this).attr("offer-id");
                trade.changeOption(option, ison, offer_id, this);
            });

            //8. Init offer sits change ----------------------------
            $(document).on("keyup",".offer-sits-input",function(e){
                if(e.which==13) {
                    var offer_id = $(this).attr("offer-id");
                    var sits = $(this).val();
                    trade.changeSits(offer_id,sits);
                    var priceElement = findElementByClassAndOfferId("offer-price-input", offer_id);
                    //showAnimation(priceElement, 'red');
                }
            });

            $(document).on("blur",".offer-sits-input",function(e){
                var offer_id = $(this).attr("offer-id");
                var sits = $(this).val();
                trade.sendMessagesIfComplete(offer_id)
                trade.changeSits(offer_id,sits);
                var priceElement = findElementByClassAndOfferId("offer-price-input", offer_id);
                //showAnimation(priceElement, 'red');

            })

            $(document).on("change",".offer-state",function(){

                var state = "READY_TO_SELL";
                if($(this).is(":checked"))
                {
                    state = "READY_TO_BUY";
                }

                if (state == "READY_TO_SELL") {
                    showAnimation( $("#add-offer-button"), "blue");
                }

                var offer_id = $(this).attr("offer-id");
                trade.changeState(state, offer_id);
            });

            $(document).on("keydown",".offer-sits-input",function(e){
                // Digits, '-' and ','

                var val = $(this).val();
                var hasRanger = val.indexOf("-")!=-1;
                var lastChar = "";
                if(val!='')
                {
                    lastChar = val.substr(val.length - 1);
                }
                alert.console("Key press: "+e.keyCode+"  has ranger:"+hasRanger);
                if (((e.keyCode >= 96 && e.keyCode <=105) || (e.keyCode >= 48 && e.keyCode <=57) || e.keyCode == 188 || e.keyCode == 189 || e.keyCode == 109 || e.keyCode == 110 || e.keyCode == 191)
                    ||
                    (e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode == 8 || e.keyCode == 16 || e.keyCode == 46 )
                {
                    var comma = e.keyCode==188||e.keyCode==191||e.keyCode==110;
                    var range = e.keyCode==109||e.keyCode==189;


                    // Only one ranger anf not on first position
                    if((hasRanger || val=='') && range)
                    {
                        e.preventDefault();
                        return false;
                    }

                    // Can`t print comma or ranger after comma or ranger
                    if((comma||range) && (lastChar==','||lastChar=='-'))
                    {
                        e.preventDefault();
                        return false;
                    }

                    // Can`t print comma first
                    if(val=='' && comma)
                    {
                        e.preventDefault();
                        return false;
                    }

                    if(comma)
                    {
                        $(this).val($(this).val()+',');
                        e.preventDefault();
                        return false;
                    }
                    if(range)
                    {
                        $(this).val($(this).val()+'-');
                        e.preventDefault();
                        return false;
                    }
                }
                else
                {
                    e.preventDefault();
                    return false;
                }
            });

            //10. Init buy requests
            $(document).on("click",".buy-request-button",function(){
                trade.showRequests($(this).attr("offer-id"));
            });

            $(document).on("click",".statistics-offer-button",function(){
                var offer_id = $(this).attr("offer-id");
                trade.showStatistics(offer_id);
            });

            $(document).on("click",".view-subevent",function(){
                var offer_id = $(this).attr("offer-id");
                var subevent_id = $(this).attr("subevent-id");
                if (subevent_id && subevent_id > 0)
                    window.location='/event/subevent/'+subevent_id;
                if (offer_id) {
                    $.ajax({
                        url: "/profile/trade/get_subevent?offer_id="+offer_id,
                        type: "GET",
                        async: true,
                        cache: false,
                        success: function (data) {
                            if (data.id && data.id > 0)
                            window.location='/event/subevent/'+data.id;
                        }
                    });
                }

            });

            $(document).on("click",".btn_closeModal",function(){
                $(this).closest(".modal-box").remove();
            });

            $(document).on("change","input[name=\"searchFilter\"]",function(){
                var val = $("input[name=\"searchFilter\"]:checked").closest(".custom-check").find(".request-filter-variant").html();

                $(".request-filter-span").html(val);
                if(val=="от клиентов")
                {
                    $(".request-table .cabinet-new-item[deal-id=\"0\"]").hide();
                    $(".request-table .cabinet-new-item[deal-id!=\"0\"]").show();
                }
                else if(val=="от брокеров")
                {
                    $(".request-table .cabinet-new-item[deal-id!=\"0\"]").hide();
                    $(".request-table .cabinet-new-item[deal-id=\"0\"]").show();
                }
                else
                {
                    $(".request-table .cabinet-new-item").show();
                }
            });

            $(document).on("keydown",".request-text-search",function(e){
                if(e.keyCode==13)
                {
                    var text = $(this).val().toUpperCase();
                    $(".request-table .cabinet-new-item").each(function(){
                        var subevent = $(".col-event span",this).html();
                        var arena = $(".col-arena span",this).html();
                        var sector = $(".col-places span",this).html();
                        var price = $(".col-price",this).text();
                        var contacts = $(".col-contacts span",this).text();

                        var total = subevent+arena+sector+price+contacts;

                        if(total.toUpperCase().indexOf(text)>=0)
                        {
                            $(this).show();
                        }
                        else
                        {
                            $(this).hide();
                        }
                    });
                }
            });

            $(document).on("click",".event-select",function(e){
                $(this).select();
            });




            $(".add-offer-button").click(function(){
                trade.newOffer();
            });
            $(document).on("click","div .col-sector select", function(e){
                var offer_id = $(this).attr("offer-id");
                var arena_id = $(this).attr("arena-id");
                var fill = trade.fillArenaSectors(offer_id,arena_id,false);

                if(fill)
                {
                    e.stopPropagation();
                }

            });

            $("#accept-selectors").click(function () {

                function isValidDate(dateString) {
                    var regEx = /^\d{2}.\d{2}.\d{4}$/;
                    return dateString.match(regEx) != null;
                }

                var state = $(".main-type-radio:checked").val();
                var categories = "";
                if ($(".main-category-checkbox:checked").length) {
                    categories = "0";
                    $(".main-category-checkbox:checked").each(function () {
                        categories += "," + $(this).attr("category-id");
                    });
                }
                var subevents = "";
                if ($(".main-subevent-checkbox:checked").length) {
                    subevents = "0";
                    $(".main-subevent-checkbox:checked").each(function () {
                        subevents += "," + $(this).attr("subevent-id");
                    });
                }
                var start = isValidDate($("#calendar-start").html())?$("#calendar-start").html():"";
                var end = isValidDate($("#calendar-end").html())?$("#calendar-end").html():"";
                window.location = "/profile/trade?state=" + state + "&categories=" + categories + "&subevents=" + subevents + "&start=" + start + "&end=" + end;
            });

            $(".main-type-radio").change(function () {
                var text = $(".main-type-radio:checked").attr("text");
                $(".main-type-text").html(text);
                if (text == 'Продаю')
                    showAnimation( $("#add-offer-button"), "blue");

            });
            $(".cabinet-new-table .event-select").each(function () {
                trade.initSubeventAutocomplete(this);

            });
            alert.console("Cotrols inited");
        },
        setPrice: function() {
            if ( offer_id > 0 && price != '')
                trade.changePrice(offer_id,price);
            offer_id = 0;
        },
        oldPrice: function() {
            $(".cabinet-new-item[offer-id=\""+offer_id+"\"] .offer-price").html(oldPrice);
            $(".cabinet-new-item[offer-id=\""+offer_id+"\"] .offer-price-item").val("");

        },
        sendMessagesIfComplete: function(offerId) {
            function isOfferComplete() {
                if (offerId) {
                    var nameElement = findElementByClassAndOfferId("event-select", offerId);
                    var sitsElement = findElementByClassAndOfferId("offer-sits-input", offerId);
                    var noSitNumbersElement = findElementByClassAndOfferIdAndOptionName("offer-option", offerId, "no_sit_numbers");
                    var priceElement = findElementByClassAndOfferId("offer-price-input", offerId);
                    if (nameElement && $(nameElement).attr("subevent-id") &&
                        ($(noSitNumbersElement).attr("checked") != 'checked' || $(sitsElement) && sitsElement.val()) &&
                        priceElement && $(priceElement).val()
                       )
                        return true;
                }
                return false;
            }
                $.ajax({
                    url: "/profile/trade/offer_notification?offer_id="+offerId,
                    type: "GET",
                    async: true,
                    cache: false,
                    success: function (data) {}
                });
        },
        initSubeventAutocomplete: function(input){
            $(input).autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: "/profile/trade/search/subevent",
                        type: "POST",
                        dataType: "json",
                        data: {term: request.term},
                        success: function (data) {
                            response($.map(data, function (item) {
                                return item;
                            }));
                        }
                    });
                },
                select: function (event, ui) {
                    var offer_id = $(this).attr("offer-id");
                    var id = ui.item.id;
                    var text = ui.item.text;
                    var date = ui.item.date;
                    $(this).val(text+" - "+date);
                    trade.changeSubevent(offer_id,id, text);

                    return false;
                },
                open: function () {
                    $(".ui-menu-item a").each(function () {
                        
                        
                    });
                },
                minLength: 2 // начинать поиск с трех символов
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>").data("item.autocomplete", item).append("<div style='height: 25px;'><span style='float: left;'>" + item.text + "</span><span style='float: right;'>" + item.date + "</span></div>")
                    .appendTo(ul);
            };
        },
        initDealActions: function(){

        },
        newOffer: function () {
            var state=$(".offer-state").val();
            if(!state)
            {
                state='READY_TO_SELL';
            }
            $.ajax({
                url: "/profile/trade/new_offer?state="+state,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    $(".cabinet-table-inner").prepend(data);
                    var subevent_input = $(".cabinet-table-inner .event-select").first();
                    var row = $(subevent_input).closest(".cabinet-new-item");
                    trade.initSubeventAutocomplete($(subevent_input));
                    $(subevent_input).val("").focus();
                    $(".cabinet-new-scroll").mCustomScrollbar("scrollTo", 0,{
                        moveDragger:true,
                        callbacks:true,
                        timeout:100,
                        scrollInertia:100
                    });
                    var original_color = $(subevent_input).css('border-left-color');

                    $(subevent_input)
                        .animate({borderColor:'red'}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:original_color}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:'red'}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:original_color}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:'red'}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:original_color}, 500, 'easeOutCirc');
                    //$(row).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);
                }
            });
        },
        deleteOffer: function(offer_id){
            $.ajax({
                url: "/profile/trade/delete_offer?offer_id="+offer_id,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function () {
                    $(".cabinet-new-item[offer-id=\""+offer_id+"\"]").remove();
                }
            });
        },
        copyOffer: function (offer_id) {
            $.ajax({
                url: "/profile/trade/copy_offer?offer_id="+offer_id,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    var new_id = $(data).attr("offer-id");
                    alert.console("Copy offer. New_id: "+new_id);
                    $(".cabinet-table-inner .cabinet-new-item[offer-id=\""+offer_id+"\"]").after(data);
                    var subevent_input = $(".cabinet-table-inner .cabinet-new-item[offer-id=\""+new_id+"\"] input").first();
                    trade.initSubeventAutocomplete($(".cabinet-table-inner .cabinet-new-item[offer-id=\""+new_id+"\"] .event-select"));

                    $(".cabinet-new-scroll").mCustomScrollbar("scrollTo", 0,{
                        moveDragger:true,
                        callbacks:true,
                        timeout:100,
                        scrollInertia:100
                    });
                    $(subevent_input).focus();
                    var original_color = $(subevent_input).css('border-left-color');

                    $(subevent_input)
                        .animate({borderColor:'red'}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:original_color}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:'red'}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:original_color}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:'red'}, 100, 'linear')
                        .delay(100)
                        .animate({borderColor:original_color}, 500, 'easeOutCirc');
                }
            });
        },
        changeSubevent: function (offer_id, subevent_id, text) {
            $.ajax({
                url: "/profile/trade/change_subevent?offer_id=" + offer_id + "&subevent_id=" + subevent_id,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    var arena_id = data.trim();
                    alert.console("Subevent change: arena_id: "+arena_id);

                    $(this).val(text);
                    $(this).attr("subevent-id", subevent_id );

                    trade.changeArena(offer_id, arena_id);
                    trade.checkStatistics(subevent_id, offer_id);
                }
            });
        },
        changeArena: function (offer_id, arena_id) {
            var current_arena_id = $("div[offer-id=\"" + offer_id + "\"] .col-arena").attr("arena-id");
            alert.console("Change arena: current_id:"+current_arena_id+"  new_id:"+arena_id);
            if (current_arena_id != arena_id) {
                trade.fillArenaSectors(offer_id,arena_id,true);
                $.ajax({
                    url: "/profile/trade/change_arena?offer_id=" + offer_id + "&arena_id=" + arena_id,
                    type: "GET",
                    dataType: "json",
                    context: document.body,
                    async: true,
                    cache: false,
                    success: function (data) {
                        var arena_name = data.arena.name;
                        $("div[offer-id=\"" + offer_id + "\"] .col-arena").html(arena_name);
                        $("div[offer-id=\"" + offer_id + "\"] .col-arena").attr("arena-id",arena_id);
                    }
                });
            }
        },
        checkStatistics: function(subevent_id, offer_id) {
            $.ajax({
                url: "/profile/trade/check_statistics?subevent_id=" + subevent_id,
                type: "GET",
                dataType: "json",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    function findStat (offerId) {
                        var result = false;
                        $(".statistics-offer-button").each(function(){
                            var offerIdInElement = $(this).attr("offer-id");
                            if (offerId == offerIdInElement) {
                                result = true;
                            }
                        });
                        return result;
                    }
                    if (data.statistics) {
                        if (!findStat(offer_id)) {
                            var table = $(".table-hover-content");
                            var statElement = '<div class="icon-folder-open-empty statistics-offer-button btn_openModal" offer-id="' + offer_id + '"><div class="hover-text">статистика</div></div>';
                            $(table).prepend(statElement);
                        }
                    }
                }
            });
        },
        fillArenaSectors: function(offer_id, arena_id, forces){
            var select = $("div[offer-id=\"" + offer_id + "\"] .col-sector select");
            var current_sector_id = $(select).find("option:selected").val();
            if($(select).prop("filled")&&!forces)
            {
                alert.console("Sectors already filled");
                return false;
            }
            $.ajax({
                url: "/profile/trade/fill_arena?arena_id=" + arena_id,
                type: "GET",
                dataType: "json",
                context: document.body,
                async: false,
                cache: false,
                success: function (data) {
                    var sectors = data.sectors;
                    var options = "";
                    alert.console("Got sectors");
                    for (var i = 0; i < sectors.length; i++) {
                        var sector_id = sectors[i].id;
                        var sector_name = sectors[i].name;
                        options += "<option value=\"" + sector_id + "\" ";
                        if(sector_id==current_sector_id)
                        {
                            options+=" selected";
                        }
                        options += ">" + sector_name + "</option>";
                    }
                    select.html(options);
                    $(select).prop("filled",true);
                    $(select).attr("arena-id",arena_id);
                    $(select).attr("offer-id",offer_id);

                }
            });
            return true;
        },
        changeSector: function(offer_id, sector_id){
            $.ajax({
                url: "/profile/trade/change_sector?offer_id=" + offer_id + "&sector_id=" + sector_id,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    alert.console("Change sector: "+data);
                }
            });
        },
        changePrice: function(offer_id, price){
            $.ajax({
                url: "/profile/trade/change_price?offer_id=" + offer_id + "&price=" + price,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    $(".cabinet-new-item[offer-id=\""+offer_id+"\"] .offer-price").html(price);
                    alert.console("Change price: "+data);
                    oldPrice = price;
                }
            });
        },
        changeSits: function(offer_id, sits){
            $.ajax({
                url: "/profile/trade/change_sits?offer_id=" + offer_id + "&sits=" + sits,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    $(".cabinet-new-item[offer-id=\""+offer_id+"\"] .offer-sits").html("Места: "+data);
                    alert.console("Change sits: "+data);
                }
            });
        },
        changeOption: function(option, ison, offer_id, element){
            $.ajax({
                url: "/profile/trade/change_option?offer_id=" + offer_id + "&option=" + option+"&ison="+ison,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    if (data == 'VALIDATION_ERROR' && ison) {
                        $(element).prop( "checked", false );
                        alert.modal_small("Внимание!","Нет доступных билетов");
                    }

                    alert.console("Change option: "+option+"="+ison+" for offer:"+offer_id+". "+data);
                }
            });
        },
        changeState: function(state, offer_id){
            $.ajax({
                url: "/profile/trade/change_state?offer_id=" + offer_id + "&state=" + state,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    alert.console("Change state: "+state+" for offer:"+offer_id+". "+data);
                }
            });
        },
        showStatistics: function (offer_id) {
            $.ajax({
                url: "/profile/trade/show_statistics?offer_id="+offer_id,
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    $(".statistics-modal").remove();
                    $("body").append(data);
                    var modal = $(".statistics-modal");


                    // First graph
                    var chartData1 = [];
                    var chartData2 = [];
                    $(".stat-dat",data).each(function(){
                        chartData1.push(
                                {
                                    "date":$(this).attr('date'),
                                    "max_price":$(this).attr('max-price'),
                                    "min_price":$(this).attr('min-price'),
                                    "delta_price":$(this).attr('max-price')*1-$(this).attr('min-price')*1
                                });

                        chartData2.push(
                                {
                                    "date":$(this).attr('date'),
                                    "count":$(this).attr('count')
                                })
                    });


                    var chart_1 = AmCharts.makeChart("graph-1", {
                        "type": "serial",
                        "theme": "light",
                        "marginRight": 0,
                        "dataDateFormat": "MM.DD.YYYY",
                        "dataProvider": chartData1,
                        "valueAxes": [{
                            "axisAlpha": 0,
                            "position": "left",
                            "title": "Цена",
                            "fontSize": 10,
                            "stackType": "regular",
                            "titleBold": false,
                        }],
                        "startDuration": 0.3,
                        "graphs": [{
                            "balloonText" : "Мин. [[min_price]]",
                            "fillAlphas": 0.9,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "min_price",
                            "fillColors" : ["#357", "#42bb6d"]
                        },
                            {
                                "balloonText" : "Макс. [[max_price]]",
                                "fillAlphas": 0.9,
                                "lineAlpha": 0.4,
                                "type": "column",
                                "valueField": "delta_price",
                                "fillColors" : ["#000", "#d31f26"]
                            }],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            "gridPosition": "start",
                            "parseDate":true,
                            "minPeriod": "MM",
                            "title": "Дата",
                            "titleBold": false,
                            "fontSize": 10,
                            "minorGridEnabled": true
                        },
                        "export": {
                            "enabled": true,
                            "dateFormat": "MM.DD HH:NN"
                        }
                    });

                    var chart_2 = AmCharts.makeChart("graph-2", {
                        "type": "serial",
                        "theme": "light",
                        "marginRight": 0,
                        "dataDateFormat": "MM.DD.YYYY",
                        "dataProvider": chartData2,
                        "valueAxes": [{
                            "axisAlpha": 0,
                            "position": "left",
                            "title": "Кол-во билетов",
                            "fontSize": 10,
                            "titleBold": false,
                        }],
                        "startDuration": 0.3,
                        "graphs": [{
                            "fillAlphas": 0.9,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "count",
                            "fillColors" : ["#000", "#d31f26"]
                        }],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            "gridPosition": "start",
                            "parseDate":true,
                            "minPeriod": "MM",
                            "title": "Дата",
                            "titleBold": false,
                            "fontSize": 10,
                            "minorGridEnabled": true
                        },
                        "export": {
                            "enabled": true,
                            "dateFormat": "MM.DD HH:NN"
                        }
                    });


                    // Create graphics
                    $(modal).addClass("modal-opened").show();
                }
            });
        },
        refreshInfo: function () {

        },
        showRequests: function (offerId) {
            $.ajax({
                url: "/profile/trade/show_requests" + (offerId?"?offerId=" + offerId:""),
                type: "GET",
                context: document.body,
                async: true,
                cache: false,
                success: function (data) {
                    $(".buy-request-modal").remove();
                    $("body").append(data);
                    var modal = $(".buy-request-modal");
                    $(".cabinet-new-scroll").mCustomScrollbar({
                        theme:'dark-thin',
                        axis:'y',
                        autoDraggerLength:true,
                        autoExpandScrollbar:false,
                        autoHideScrollbar: true,
                        mouseWheel:{ preventDefault: true },
                        documentTouchScroll:false,
                        alwaysShowScrollbar: 0,
                        scrollbarPosition: 'outside',
                        callbacks:{
                            onScrollStart: function(){

                            }
                        }
                    });
                    $(modal).addClass("modal-opened").show();
                }
            });
        }
    };