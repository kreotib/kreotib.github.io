const popupOpen = (selector) => {
    const popupBlock = document.querySelector(selector);

    popupClose();

    popupBlock.classList.add('show');
};

const popupClose = () => {
    const popupBlocks = document.querySelectorAll('.popup');

    popupBlocks.forEach(el => {
       el.classList.remove('show');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const itemsSlider = new Swiper(".items-slider", {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 12,
        breakpoints: {
            600: {
                spaceBetween: 25
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
        },
    });
    const itemsSliderImg = new Swiper(".item-slider-img", {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 6,
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
    const servicesSlider = new Swiper(".services-slider", {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });
    const imgSlider = new Swiper('.item-img-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
    const categorySlider = new Swiper('.search-category', {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });



    const popupBtns = document.querySelectorAll('.popup-btn'),
        popupCloseBtns= document.querySelectorAll('.popup-close'),
        popupArray = document.querySelectorAll('.popup');

    popupBtns.forEach(el=>{
        el.addEventListener('click',(e)=>{
            e.preventDefault();
            popupOpen(el.dataset.popup);
        });
    })

    popupCloseBtns.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();
           popupClose();
       });
    });

    popupArray.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();
           const elWrapper = e.target.querySelector('.popup__wrapper');
           !(elWrapper.contains(e.target)) ? popupClose() : null;
       });
    });



    /*
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    }); */
});