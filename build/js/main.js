// Импортируем другие js-файлы

document.addEventListener('DOMContentLoaded',()=>{
    const headerNav = document.querySelector('.main-nav_header'),
          closeNav = document.querySelector('.main-nav__item_close'),
          openNav = document.querySelector('.bar_header');

    openNav.addEventListener('click',(e)=>{
        e.preventDefault();
       headerNav.classList.add('active');
       console.log('123');
    });

    closeNav.addEventListener('click',(e)=>{
        e.preventDefault();
        headerNav.classList.remove('active');
    });


    /****SLDIERS****/


    $('.slider-welcome').slick({
        arrows:false,
        dots:true,
    });
    $('.slider-shares').slick({
        arrows:true,
        dots:false,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<button id="prev" type="button" class="btn slider-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="btn slider-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        responsive:[
            {
                breakpoint:1025,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});