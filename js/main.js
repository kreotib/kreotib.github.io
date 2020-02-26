// Импортируем другие js-файлы
$(document).ready(function() {
  //NAV SCROOLL
  var $page = $("html, body");
  $('.header-nav a[href*="#"]').click(function() {
    let href = $($.attr(this,"href")).offset().top;
    let headerHeight = $('.header').height();
    $page.animate(
      {
        scrollTop: href - headerHeight
      },
      1500
    );
    return false;
  });
  
  $(".certificates__slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: '<button class="slick-next"></button>',
    prevArrow: '<button class="slick-prev"></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });
  //SLIDERS SETTINGS

  $(".professors-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<button class="slick-next"></button>',
    prevArrow: '<button class="slick-prev"></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $(".slider-blog").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<button class="slick-next"></button>',
    prevArrow: '<button class="slick-prev"></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  //SLIDER BUTTON SETTINGS
  $(".slider-one").slick({
    arrows: true,
    nextArrow: '<button class="slick-next"></button>',
    prevArrow: '<button class="slick-prev"></button>'
  });
  $(".forWhom-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<button class="slick-next"></button>',
    prevArrow: '<button class="slick-prev"></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });

  //MOBILE MENU SETTINGS
  const showButton = $(".menu-show"),
    hideButton = $(".menu-hide"),
    menuMobile = $(".main-nav.mobile");

  $(showButton).click(() => {
    $(menuMobile).addClass("active");
    $("body").addClass("overflow");
  });
  $(hideButton).click(() => {
    $(menuMobile).removeClass("active");
    $("body").removeClass("overflow");
  });
});