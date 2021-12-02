var currentdate = new Date();
$(function() {
    $('.ox-zodiak__item').click(function() {
		$(this).closest('.ox-zodiak').find('.ox-zodiak__item').removeClass('active');
		$(this).addClass('active');
		var znak = $.trim($(this).find('.ox-zodiak__text').text());
		$(this).closest('.ox-zodiak').attr('data-znak', znak);

		var zodiak = $('#zodiak').attr('data-znak');
		if (zodiak) {
			sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/how-to-be-happy/js/text.php');
	    	return false; 
	    } 
        /*else if (zodiak && !mygod) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Укажите год',
            })
        }
        else if (!zodiak && mygod) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Выберите знак зодиака',
            })
        }
        else if (!zodiak && !mygod) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Необходимо выбрать знак и период',
            })
        }*/
    });
    $('#reset').click(function() {
    	location.reload();
    });
});

function sendAjaxForm(result_form, ajax_form, url) {
    myAjax().done(showRezult);
    function myAjax() {
        var dfd = new $.Deferred();
        $.ajax({
            url:  url,
            type: "POST",
            dataType: "html",
            data: {
				'zodiak' : $('#zodiak').attr('data-znak'),
            },
            success: function(response){ // если запрос успешен вызываем функцию
                result = $.parseJSON(response);
                dfd.resolve(result);
            }
        });
        return dfd.promise();
    }
    function showRezult(selected_card) {
        var answer = result.answer;
        $('.ox__title.ox__title-big').text('Результат');
        var icon = $('.ox-zodiak__text:contains("' + result.zodiak + '")').closest('.ox-zodiak__item').find('.ox-zodiak__icon').html();
        console.log(icon);
        var showHtml = '<div class="rezult-list"> \
                            <div class="rezult__icon">\
                                <div class="rezult__icon_svg">' + icon + '</div>\
                                <div class="rezult__icon_text">' + result.zodiak + '</div>\
                            </div>\
                            <div class="rezult-list__cardtitle">Знак зодиака ' + result.zodiak + '</div>\
                        <div class="rezult-list__info"> \
                            <div class="rezult-list__content">' + answer + '</div>\
                        </div>\
                    </div>';
        setTimeout(function() {
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