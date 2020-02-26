// Импортируем другие js-файлы
$(document).ready(function() {
  //NAV SCROOLL
  var $page = $("html, body");
  $('.header-nav a[href*="#"]').click(function() {
    $page.animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top
      },
      1500
    );
    return false;
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