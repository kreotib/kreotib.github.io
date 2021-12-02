$(function() {
	$('.ox__formcontrol').change(function() {
		var tr = $(this).val();
		$(this).closest('.ox__people').attr('data-info', tr);
		$(this).closest('.ox__people').find('.ox-zodiak__item').removeClass('active');
		$(this).closest('.ox__people').find('.ox-zodiak__item.s' + tr).addClass('active');
	});
	$('#start').click(function(e) {
		e.preventDefault();
		var here = $('#hechin').attr('data-info');
		var she = $('#shechin').attr('data-info');

		if (here && she) {
			sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/gorosov-work/js/text.php');
	    	return false; 
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
				'here' : $('#hechin').attr('data-info'),
				'she' : $('#shechin').attr('data-info'),
            },
            success: function(response){ // если запрос успешен вызываем функцию
                result = $.parseJSON(response);
                dfd.resolve(result);
            }
        });
        return dfd.promise();
    }
    function showRezult(selected_card) {
        var answer = result.answer.content;
        var showHtml = '<div class="rezult-list"> \
                            <div class="rezult-list__cardtitle">Результат совместимости</div>\
                        <div class="rezult-list__info"> \
                            <div class="rezult_people">\
                            	<div class="rezult_people__item">\
                            		<div class="ox-zodiak">' + result.she_zod + '</div>\
                            		<div class="rezult_people__title">' + result.answer.she + '</div>\
                            	</div>\
                            	<div class="rezult_people__item">\
                            		<div class="ox-zodiak">' + result.he_zod + '</div>\
                            		<div class="rezult_people__title">' + result.answer.he + '</div>\
                            	</div>\
                            </div>\
                            <div class="rezult-list__content">' + answer + '</div>\
                        </div>\
                    </div>';
        setTimeout(function() {
            $('#showRezult').html(showHtml);
            $('#ox__rezult').slideDown(250);
            $('.ox_form').slideUp(250);
        }, 500);
    }
}