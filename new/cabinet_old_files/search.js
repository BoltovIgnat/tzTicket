
        
        
        

$(document).ready(function(){
    search.init();
});

var canSearch = true;
var searchTimerId = -1;
var search = {
    init: function(){
        $('.big-search-form').submit(function(){
            return false;
        });
        $('.big-search-form .search-input').on('keyup',function(e){

            var form = $(this).closest("form");
            var len = $(this).val().length;
            if(len > 2 && canSearch){
                if (searchTimerId != -1)
                    clearTimeout(searchTimerId);
                searchTimerId = setTimeout(function(){
                    canSearch = false;
                    search.show_result(form);
                }, 1000);
            }
            else{
                $(this).closest(".big-search-form").find(".js_searchResults").fadeOut("fast");
                $(this).closest(".big-search-form").find(".btn-reset-search").fadeOut("fast");
            }
        });
        $("body").click(function(){
            $(".js_searchResults").fadeOut("fast")
        });
        $(".btn-reset-search").click(function(){
            $(this).fadeOut("fast");
            $(this).closest(".big-search-form").find(".js_searchResults").fadeOut("fast");
            $(this).closest(".big-search-form").find("input").val("").focus();
        });
        $(".big-search-form").click(function(e){
            e.stopPropagation();
        });
        $(".subcategory-form").submit(function(){
            $(".subevent-checkbox:checked",this).each(function(){
                var subcategory_id = $(this).attr("subcategory-id");
                alert.console(subcategory_id);
                $(this).append("<input type='hidden' name='subcategory_list' value='"+subcategory_id+"'>");
            });
        });
    },
    show_result: function(form){
        alert.console("Show result");
        var formData = new FormData($(form)[0]);
        var formUrl = $(form).attr('action');
        var search_text = $(".search-input", form).val();
        alert.console("Search for: "+search_text);
        $.ajax({
            url: formUrl,
            type: 'POST',
            success: function (dat) {
                $(form).find(".mobile-search-results").html(dat);
                $(form).find(".big-search-results").html(dat);
                $(".big-search-results",form).find(".variant-text").each(function(){
                    var text = $(this).html();
                    var index = text.toLowerCase().indexOf(search_text.toLowerCase());
                    if(index!=-1)
                    {
                        var replacement = text.substring(index,search_text.length+index);
                        var new_text = text.replace(replacement,"<strong>"+replacement+"</strong>");
                        $(this).html(new_text);
                    }
                });
                $(form).find(".js_searchResults").fadeIn("fast");
                $(form).find(".btn-reset-search").fadeIn("fast");
                $(".empty-search-request-link").click(function(){
                    search.empty_search_request(form);
                });

                $(".scrolled-results").mCustomScrollbar({
                    theme:"inset-3-dark",
                    axis:"y",
                    autoDraggerLength:false,
                    autoExpandScrollbar:true
                });

                canSearch = true;
            },
            error: function () {
                canSearch = true;
                alert.noty("warning","Серверная ошибка");
            },
            data: formData,
            cache: false,
            async: true,
            contentType: false,
            processData: false
        });
    },
    empty_search_request: function(form){
        alert.modal_loader(true);
        var formData = new FormData($(form)[0]);
        var formUrl = "/empty_search_request";
        $.ajax({
            url: formUrl,
            type: 'POST',
            success: function (dat) {
                alert.modal_loader(false);
                if(dat.indexOf("SUCCESS")!=-1)
                {
                    alert.modal_small("Отлично!","Мы проанализируем ваш запрос и добавим мероприятие, которое вы искали в течение часа!<br>Спасибо вам!");
                }

            },
            error: function () {
                alert.modal_loader(false);
                alert.modal_small("Отлично!","Мы проанализируем ваш запрос и добавим мероприятие, которое вы искали в течение часа!<br>Спасибо вам!");
            },
            data: formData,
            cache: false,
            async: true,
            contentType: false,
            processData: false
        });
    }
}