$(".g_btn-red-round").click(function () {
    var withDataAndEvents;

    let tbRow = $(".cabinet-new-item").first()
        .clone(([withDataAndEvents]));

    tbRow.removeClass("hidden").addClass("ibc-new");

    tbRow.appendTo(".cabinet-table-inner");

    var ibcEventsListBlock = $(".ibc-new").children().children().children().find( "ul" ).children().children();

    let checkbocBlockPlaces = $(".ibc-new").children().children(".col-places");

    checkbocBlockPlaces.children('.ibc-count-place').css('display', 'none');
    checkbocBlockPlaces.children('.ibc-count-place-label').css('display', 'none');

    let checkbocBlock = $(".ibc-new").children().children(".col-other");

    checkbocBlock.children().each(function(i,elem) {
        let ibcId = 'sell-'+($(".ibc-settings-checbox").length+i);
        $(elem).children('input').prop('id', ibcId);
        $(elem).children('label').prop('for', ibcId);
    });

    let ibcDataAboutParty = JSON.parse(localStorage.getItem("ibcDataAboutParty"));

    if (ibcDataAboutParty == null){
        $.getJSON( "content/events.json", function( data ) {

            localStorage.setItem("ibcDataAboutParty", JSON.stringify(data));

            $.each( data.results, function(index,value) {
                ibcEventsListBlock.append( '<li>' +
                    '<div class="ibc-custom-check" id-row="'+value.id+'">' +
                    value.text
                    + '</div>' +
                    '</li>' );
            });
        });
    }else{
        $.each( ibcDataAboutParty.results, function(index,value) {
            ibcEventsListBlock.append( '<li>' +
                '<div class="ibc-custom-check" id-row="'+value.id+'">' +
                value.text
                + '</div>' +
                '</li>' );
        });
    }

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

$('body').on('click', '.ibc-custom-check', function() {
    let ibcInput = $(this).parents("ul.ibc-event-list").siblings("input");
    ibcInput.val($(this).html().toUpperCase());
    ibcInput.parent().closest('.dropdown-input').removeClass('open');
    var ibcThis = $(this);
    let idRow = $(this).attr("id-row");
    let ibcDataAboutParty = JSON.parse(localStorage.getItem("ibcDataAboutParty"));

    $.each( ibcDataAboutParty.results, function(index,value) {
        if (idRow == value.id){
            let parentRow = ibcThis.parents("div.table-row");
            parentRow.children("div.col-arena").text(value.arena);
            var selectSectors = parentRow.children("div.col-sector").children("select");

            selectSectors.empty();
            $.each( value.sectors, function(secIndex,secValue) {
                selectSectors.append('<option value="'+secValue.id+'">'+secValue.sector+'</option>');
            });
        }
    });
});

$('body').on('click', '.ibc-settings-col-places', function() {
    console.log('ibc-settings-checbox');
    let checkbocBlockPlaces = $(this).parents('.table-row').children(".col-places");


    if($(this).is( ":checked" )){
        checkbocBlockPlaces.children('.ibc-count-place').show();
        checkbocBlockPlaces.children('.ibc-count-place').prop('style', '');
        checkbocBlockPlaces.children('.ibc-count-place-label').show();

        checkbocBlockPlaces.children('.ibc-input-place').hide();
        checkbocBlockPlaces.children('.ibc-input-place-label').hide();
    }else{
        checkbocBlockPlaces.children('.ibc-count-place').hide();
        checkbocBlockPlaces.children('.ibc-count-place-label').hide();

        checkbocBlockPlaces.children('.ibc-input-place').show();
        checkbocBlockPlaces.children('.ibc-input-place').prop('style', '');
        checkbocBlockPlaces.children('.ibc-input-place-label').show();
    }

});

$('body').on('input', '.ibc-input-place', function() {

    var value = $(this).val();
    var re = /[^0-9\,]/gi;
    if (re.test(value)) {
        value = value.replace(re, '');
    }
    $(this).val(value) ;
});

$('body').on('blur', '.ibc-input-place', function() {
    $(this).siblings(".item-clickable").text('МЕСТА: '+$(this).val());
});
