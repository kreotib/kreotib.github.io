var currentdate = new Date();
$(function () {
    $('.ox-zodiak__item').click(function () {
        $(this).closest('.ox-zodiak').find('.ox-zodiak__item').removeClass('active');
        $(this).addClass('active');
        var znak = $.trim($(this).find('.ox-zodiak__text').text());
        $(this).closest('.ox-zodiak').attr('data-znak', znak);
    });
    const oxZodiaItems = document.querySelectorAll('.ox-zodiak__item');
    oxZodiaItems.forEach(el => {
        el.addEventListener('touchstart', function () {
            $(this).closest('.ox-zodiak').find('.ox-zodiak__item').removeClass('active');
            $(this).addClass('active');
            var znak = $.trim($(this).find('.ox-zodiak__text').text());
            $(this).closest('.ox-zodiak').attr('data-znak', znak);
        });
    });
    $('.ox__period-item').click(function () {
        $(this).closest('.ox__period').find('.ox__period-item').removeClass('active');
        $(this).addClass('active');
        var znak = $.trim($(this).attr('data-period'));
        $(this).closest('.ox__period').attr('data-period', znak);
    });
    const oxZodiaPeriods = document.querySelectorAll('.ox__period-item');
    oxZodiaItems.forEach(el => {
        el.addEventListener('touchstart', function () {
            $(this).closest('.ox__period').find('.ox__period-item').removeClass('active');
            $(this).addClass('active');
            var znak = $.trim($(this).attr('data-period'));
            $(this).closest('.ox__period').attr('data-period', znak);
        });
    });
    $('#start').click(function (e) {
        e.preventDefault();
        var zodiak = $('#zodiak').attr('data-znak');
        var period = $('#period').attr('data-period');
        if (zodiak && period) {
            sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/goroskop_big/js/text.php');
            return false;
        } else if (zodiak && !period) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Укажите период',
            })
        } else if (!zodiak && period) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Выберите знак зодиака',
            })
        } else if (!zodiak && !period) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Необходимо выбрать знак и период',
            })
        }
    });
    $('#reset').click(function () {
        location.reload();
    });
});

function sendAjaxForm(result_form, ajax_form, url) {
    myAjax().done(showRezult);

    function myAjax() {
        var dfd = new $.Deferred();
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: {
                'zodiak': $('#zodiak').attr('data-znak'),
                'period': $('#period').attr('data-period'),
                'year': currentdate.getFullYear(),
                'month': currentdate.getMonth() + 1,
                'day': currentdate.getDate(),
                'denned': currentdate.getDay(),
            },
            success: function (response) { // если запрос успешен вызываем функцию
                result = $.parseJSON(response);
                dfd.resolve(result);
            }
        });
        return dfd.promise();
    }

    function showRezult(selected_card) {
        var answer = result.answer;
        var showHtml = '<div class="rezult-list"> \
                            <div class="rezult-list__cardtitle">Знак зодиака ' + result.zodiak + '</div>\
                        <div class="rezult-list__info"> \
                            <div class="rezult-list__title">' + result.period + '</div> \
                            <div class="rezult-list__content">' + answer + '</div>\
                        </div>\
                    </div>';
        setTimeout(function () {
            $('.ox__info').slideUp(250);
            $('.do_btns').slideUp(250);
            $('#showRezult').html(showHtml);
            $('#ox__rezult').slideDown(250);
            var elementClick = '#ox__gadanie';
            var destination = $(elementClick).offset().top;
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
            return false;
        }, 500);
    }
}