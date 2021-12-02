$(function () {
    $('.ox-zodiak__item').click(function () {
        $(this).closest('.ox-zodiak').find('.ox-zodiak__item').removeClass('active');
        $(this).addClass('active');
        var znak = $.trim($(this).text());
        $(this).closest('.ox-zodiak').attr('data-znak', znak);
    });
    const oxZodiaItems = document.querySelectorAll('.ox-zodiak__item');
    oxZodiaItems.forEach(el => {
        el.addEventListener('touchstart', function () {
            $(this).closest('.ox-zodiak').find('.ox-zodiak__item').removeClass('active');
            $(this).addClass('active');
            var znak = $.trim($(this).text());
            $(this).closest('.ox-zodiak').attr('data-znak', znak);
        });
    });
    $('#start').click(function (e) {
        e.preventDefault();
        var here = $('#here').attr('data-znak');
        var she = $('#she').attr('data-znak');
        if (here && she) {
            sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/sovmestimost/js/text.php');
            return false;
        } else {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Выберите знаки',
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
                'here': $('#here').attr('data-znak'),
                'she': $('#she').attr('data-znak'),
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
                            <div class="rezult-list__cardtitle">Результат совместимости</div>\
                        <div class="rezult-list__info"> \
                            <div class="rezult-list__title"><strong>Она:</strong> ' + result.she + '<br/><strong>Он:</strong> ' + result.here + '</div> \
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