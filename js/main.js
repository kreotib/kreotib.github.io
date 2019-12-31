// Импортируем другие js-файлы
$(document).ready(function(){
    $('.lvl-two__toggle').click(function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).siblings('.lvl-three').toggle(500);
    });
    $('.left').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInLeft',
    offset: 100
    });
    $('.right').addClass("hidden").viewportChecker({
      classToAdd: 'visible animated fadeInRight',
      offset: 100
      });
      $('.bottom').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        offset: 100
        });
    $(window).on('resize', function(){
        var win = $(this); //this = window
        if (win.width() <= 768) {
            $('.main-nav').addClass('mobile');
        }else{
            $('.main-nav').removeClass('mobile');
        }
        location.reload;
    });
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
    (function($) {
      $(function() {
        $('.tab-caption').on('click', 'label:not(.active)', function() {
         /* $(this).closest('.modal-content').find('.tab-content').find('.bottom-stack-item').addClass('active').siblings().removeClass('active');*/
          $(this).addClass('active').siblings().removeClass('active')
            .closest('div.person-card__language').find('div.tab-content').removeClass('active').eq($(this).index()).addClass('active');
        })
      })
      })(jQuery)
      $("a.main-nav__link.anchor").click(function () {
         $('.main-nav').removeClass('active');
          $('body').removeClass('no_overflow');
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
      });
    });