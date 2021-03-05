$(document).ready(function () {
    $('.burger').click(function () {
        const position = $('.main-nav').position();
       $(this).toggleClass('active');
       $('body').toggleClass('hidden');
       $('.nav-list').toggleClass('active');
       $('.nav-list').css({'top': position.top + $('.main-nav').outerHeight()});
    });
});
