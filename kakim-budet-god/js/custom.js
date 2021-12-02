$(function() {
	$('.ox__formcontrol').each(function() {
        var MyPh = $(this).attr('placeholder');
        $(this).on('focus', function() {
            $(this).attr('placeholder', '');
            $(this).removeClass('wpcf7-not-valid');
        });
        $(this).on('blur', function() {
            $(this).attr('placeholder', MyPh);
        });
    });
	$('#start').click(function(e) {
		e.preventDefault();
		$year = $('#year').val();
		$yearhow = $('#yearhow').val();
		if ($year && $yearhow) {
			sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/kakim-budet-god/js/text.php');
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
				'year' : $('#year').val(),
				'yearhow' : $('#yearhow').val(),
            },
            success: function(response){ // если запрос успешен вызываем функцию
                result = $.parseJSON(response);
                dfd.resolve(result);
            }
        });
        return dfd.promise();
    }
    function showRezult(selected_card) {
        console.log(result);
		
        var showHtml = '<div class="rezult-list"> \
                            <div class="rezult-list__cardtitle">Результат на ' + result.yearhow + ' год.</div>\
	                        <div class="rezult-list__info"> \
                            	<div class="rezult-list__title">Таким будет Ваш год, если вы родились в ' + result.year + ' году.</div> \
                            	<div class="rezult-list__content">' + result.otvet + '</div>\
                        	</div>\
                    </div>';
        setTimeout(function() {
            $('#showRezult').html(showHtml);
            $('#ox__rezult').slideDown(250);
            $('.ox__gad_pole').slideUp(250);
        }, 500);
    }
}