// Импортируем другие js-файлы
$(document).ready(function(){
    /*
    console.log('123');
    $(window).on('resize', function(){
        var win = $(this); //this = window
        if (win.width() <= 768) {
            $('.main-nav').addClass('mobile');
        }else{
            $('.main-nav').removeClass('mobile');
        }
        location.reload;
    });
    */
   $('.bar').click(function(){
        $('.main-nav').addClass('active');
        $('body').addClass('no_overflow');
   });
   $('.close').click(function(event){
    event.preventDefault();
    $('.main-nav').removeClass('active');
    $('body').removeClass('no_overflow');
});
    function checkWidth() {
        var windowWidth = $('body').innerWidth(),
            mainNav = $('.main-nav'); 
        if(windowWidth <= 768){
            mainNav.addClass('mobile');
            mainNav.removeClass('descktop');
        }
        else{
            mainNav.removeClass('mobile');
            mainNav.addClass('descktop');
        }
      }
    
      checkWidth(); // проверит при загрузке страницы
    
      $(window).resize(function(){
        checkWidth(); // проверит при изменении размера окна клиента
      });
      $(function(){
        $(window).scroll(function() {
            var target = $('.main-nav');
            var targetPos = target.offset().top;
            if($(this).scrollTop() >= targetPos) {
                $(target).addClass('stickytop'); 
            }
            else{
                $(target).removeClass('stickytop');
            }
        });
      });
      $('.instragram-slider__list').slick({
        infinite: true,
        arrows:false,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    });
    });