var currentdate = new Date();
$(function() {
    $('.ox-zodiak__item').click(function() {
		$(this).closest('.ox-zodiak').find('.ox-zodiak__item').removeClass('active');
		$(this).addClass('active');
		var znak = $.trim($(this).find('.ox-zodiak__text').text());
		$(this).closest('.ox-zodiak').attr('data-znak', znak);
        var img_src = $(this).find('.ox-zodiak__icon img').attr('src');
        $(this).closest('.ox-zodiak').attr('data-img', img_src);
	});
	$('#start').click(function(e) {
		e.preventDefault();
		var zodiak = $('#zodiak').attr('data-znak');
		if (zodiak) {
			sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/zhiznennie-etapi-cheloveka/js/text.php');
	    	return false; 
	    } 
        else if (!zodiak) {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Выберите знак зодиака',
            })
        }
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
        var MyImg = $('#zodiak').attr('data-img');
        var showHtml = '<div class="rezult-list"> \
                            <div class="rezult-list__cardtitle">Важнейшие жизненные этапы ' + result.sklon + '</div>\
                            <div class="rezult-list__info"> \
                                <div class="rezult-list__pic">\
                                    <img src="' + MyImg + '" class="rezult-list__img">\
                                    <div class="rezult-list__title">' + result.zodiak + '</div>\
                                    <div class="rezult-list__desc">' + result.zod_data + '</div>\
                                </div>\
                                <div class="rezult-list__content">' + result.answer + '</div>\
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