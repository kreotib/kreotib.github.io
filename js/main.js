// Импортируем другие js-файлы
$(document).ready(function() {
    $(".professors-slider").slick({
        slidesToShow:3,
        slidesToScroll:1,
        arrows: true,
        nextArrow: '<button class="slick-next"></button>',
        prevArrow: '<button class="slick-prev"></button>'
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
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
  });
  $(".slider-one").slick({
    arrows: true,
    nextArrow: '<button class="slick-next"></button>',
    prevArrow: '<button class="slick-prev"></button>'
  });

  $(".slick-arrow").innerHTML = "";
});