document.addEventListener('DOMContentLoaded', () => {
    var itemsSlider = new Swiper(".items-slider", {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 12,
        breakpoints:{
            600:{
               spaceBetween: 25
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
        },
    });
    var servicesSlider = new Swiper(".services-slider", {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });
    const imgSlider = new Swiper('.item-img-slider',{
       slidesPerView:1,
        spaceBetween:0,
        pagination: {
           el:".swiper-pagination",
            clickable: true
        }
    });
    const categorySlider = new Swiper('.search-category',{
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });
    /*
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    }); */
});