
        
        
        

$(document).ready(function () {

    /*
    $("#auth-alert-form").submit(function(){
        var form = this;
        var formData = new FormData($(this)[0]);
        var formUrl = $(this).attr("action");
        $.ajax({
            url: formUrl,
            type: 'GET',
            success: function (dat) {
                if(dat.indexOf("ALERT")!=-1)
                {
                    window.location.reload();
                }
                else alert('error');
            },
            error: function () {
                alert('error');
            },
            data: formData,
            cache: false,
            async: false,
            contentType: false,
            processData: false
        });
        return false;
    });    
    */

    $(".reg-form").submit(function(){

        $(".rules-group span",this).removeClass("border-red");
        $(".mail input",this).removeClass("border-red");

        alert.console("Do register");
        if(!$(".reg-agree",this).is(":checked"))
        {
            $(".rules-group span",this).addClass("border-red");
            return false;
        }

        var form = this;
        var formData = new FormData($(this)[0]);
        var formUrl = $(this).attr("action");
        $.ajax({
            url: formUrl,
            type: 'POST',
            success: function (dat) {
                if(dat.indexOf("SUCCESS")!=-1)
                {
                    alert.modal_small("Успешная регистрация","Для подтверждения регистрации перейдите по ссылке на вашей почте.");
                }
                else
                {
                    $(".mail input",form).addClass("border-red");
                    alert.modal_small("Регистрация не выполнена","Пожалуйста, убедитесь в том, что все данные введены корректно и вы еще не зарегистрировались под данной электронной почтой");
                }
            },
            error: function () {
                $(".mail input",form).addClass("border-red");
            },
            data: formData,
            cache: false,
            async: false,
            contentType: false,
            processData: false
        });
        return false;
    });

    $(".log-form").submit(function(){
        var form = this;
        var formData = new FormData($(this)[0]);
        var formUrl = $(this).attr("action");
        $.ajax({
            url: formUrl,
            type: 'POST',
            success: function (dat) {
                if(dat.indexOf("SUCCESS")!=-1)
                {
                    window.location.reload();
                }            
                else if(dat.indexOf("WELL")!=-1)
                {
                    window.location.reload();
                    $('#alert4dlg').puidialog('show');                    
                }
                else
                {
                    $(".user input",form).addClass("border-red");
                    alert.modal_small("Авторизация не выполнена","Не верный логин или пароль.<br>Пожалуйста, убедитесь в том, что вы ввели верные данные.");
                }
            },
            error: function () {
                $(".user input",form).addClass("border-red");
            },
            data: formData,
            cache: false,
            async: false,
            contentType: false,
            processData: false
        });
        return false;
    });

    $(".recover-form").submit(function(){
        var form = this;
        var formData = new FormData($(this)[0]);
        var formUrl = $(this).attr("action");
        $.ajax({
            url: formUrl,
            type: 'POST',
            success: function (dat) {
                if(dat.indexOf("SUCCESS")!=-1)
                {
                    alert.modal_small("Пароль отправлен","На указанную вами почту отправлен ваш пароль.");
                }
                else
                {
                    alert.modal_small("Ошибка","Не удалось отправить пароль.");
                }
            },
            error: function () {
                $(".user input",form).addClass("border-red");
            },
            data: formData,
            cache: false,
            async: false,
            contentType: false,
            processData: false
        });
        return false;
    });
});
